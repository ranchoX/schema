import BaseType from './base';
class ObjectType extends BaseType {
    constructor(key, config) {
        super(key, config);
        this.type='object'
    }

    convert(value) {
        if (value === null ) {
            return value;
        }

        if (Object.prototype.toString.call(value)==="[object Object]") {
            return value;
        }
        throw new Error(`convert fail expected:${this.type} actual value:${value}`);

    }

}
export default ObjectType;