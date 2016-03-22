import BaseType from './types/base'
import StringType from './types/string'
import NumberType from './types/number'
import ArrayType from './types/array'
import ObjectType from './types/object'
import BooleanType from './types/boolean'
const ToString=Object.prototype.toString;
const CLASSTYPEREG=/^function\s(.*)\(\)/;
const TYPELINK={
    "String":StringType,
    "Number":NumberType,
    "Object":ObjectType,
    "Boolean":BooleanType,
    "Array":ArrayType
}
class ObjectSchemaType {
    constructor(key,config){
        if (!config) {
            config=key
            key='_schema';
        }
        var innerObj={}
        for(let k in config){
            innerObj[k] =getType(k,config[k])
        }
        this.innerObj=innerObj;
    }
    cast(inputObj){
        var resultObj={};
        var err;
        for(let k in this.innerObj){

            let val=this.innerObj[k].cast(inputObj[k])
            if (val instanceof Error) {
                err=val;
                return err;
            }
            resultObj[k]=val;
        }
        return err||resultObj;
    }
}

function getType(k,type,option={}){
    if (ToString.call(type) === "[object Object]") {
        if (type.type!==undefined) {
            option=type;
            type=option.type;
            delete option.type;
        }else{
            return new ObjectSchemaType(k,type);
        }

    }
    switch (ToString.call(type)){
        case "[object Function]":
            var matchs=CLASSTYPEREG.exec(type.toString());
            if (matchs && matchs[1]&&TYPELINK[matchs[1]]) {
               return new TYPELINK[matchs[1]](k,option);
            }else{
                throw new Error(`Current Type:${type} Evil`);
            }
            break;
        case "[object String]":
            if (type) {
                option.defaultValue=type
            }
           return new StringType(k,option);
            break;
        case "[object Array]":
            if (type.length) {
                option.inner=getType(`${k}_array_item`,type[0])
            }
            return new ArrayType(k,option);
            break;
        case "[object RegExp]":
            option.reg=type
           return new StringType(k,option);
            break;
        case "[object Object]":
            return new ObjectType(k,option)
            break;
        default:
            throw new Error(`Current Type:${type} Evil`);
    }
}

function Schema(config){
    var x=new ObjectSchemaType(config)
    return function(inputObj){
        return x.cast(inputObj)
    }
}
export default Schema;