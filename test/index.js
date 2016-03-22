import Schema from '../src';
import Debug from 'debug';
import assert from 'assert';
var debug=new Debug('test')
describe('#base type string', function () {
    it('==>actual string ', function () {
        var schema = new Schema({
            name: String
        })
        var obj = schema({name: 'wxp'});
        debug(obj)
        assert.ok(typeof obj.name == "string");
    })
    it('==>actual num', function () {
        var schema = new Schema({
            num:String,
        })
        var obj = schema({num:5});
        debug(obj)
        assert.ok(typeof obj.num === "string");
        assert.ok(obj.num === "5");
    })
    it('==>actual bool ', function () {
        var schema = new Schema({
            bool:String
        })
        var obj = schema({bool:true});
        debug(obj)
        assert.ok(typeof obj.bool === "string");
        assert.ok(obj.bool === "true");
    })
    it('==>actual arr ', function () {
        var schema = new Schema({
            arr:String,
        })
        var obj = schema({arr:[4,5,6]});
        debug(obj)
        assert.ok(typeof obj.arr === "string");
        assert.ok(obj.arr === "4,5,6");
    })
    it('==>actual obj ', function () {
        var schema = new Schema({
            obj:String,
        })
        var obj = schema({obj:{name:'g'}});
        debug(obj)
        assert.ok(obj instanceof Error);
        assert.ok(obj.message.indexOf('convert')>-1)
    })
    it('==>actual null ', function () {
        var schema = new Schema({
            obj:String,
        })
        var obj = schema({obj:null});
        debug(obj)
        assert.ok(typeof obj.obj === "object");
        assert.ok(obj.obj === null);
    })
    it('==>input format is object ', function () {
        var schema = new Schema({
            obj:{type:String},
        })
        var obj = schema({obj:'gg'});
        debug(obj)
        assert.ok(typeof obj.obj === "string");
        assert.ok(obj.obj === 'gg');
    })
    it('==>input format is pure string ', function () {
        var schema = new Schema({
            obj:{type:''},
        })
        var obj = schema({obj:'gg'});
        debug(obj)
        assert.ok(typeof obj.obj === "string");
        assert.ok(obj.obj === 'gg');
    })
    it('==>input format is pure string and have content ', function () {
        var schema = new Schema({
            obj:{type:'hhh'},
        })
        var obj = schema({name:'gg'});
        debug(obj)
        assert.ok(typeof obj.obj === "string");
        assert.ok(obj.obj === 'hhh');
    })
    it('==>input format is pure string and is regexp ', function () {
        var schema = new Schema({
            obj:{type:/ggg/},
        })
        var obj = schema({obj:'gssg'});
        debug(obj)
        assert.ok(obj instanceof Error);
        assert.ok(obj.message.indexOf('reg')>-1)
        var obj2 = schema({obj:'gxxggg'});
        assert.ok(obj2.obj === 'gxxggg');
    })
})
describe('#base type number', function () {
    it('==>actual string ', function () {
        var schema = new Schema({
            name: Number
        })
        var obj = schema({name: '55'});
        debug(obj)
        assert.ok(typeof obj.name == "number");
        assert.ok(obj.name == 55);
    })
    it('==>actual num', function () {
        var schema = new Schema({
            num:Number,
        })
        var obj = schema({num:5});
        debug(obj)
        assert.ok(typeof obj.num === "number");
        assert.ok(obj.num === 5);
    })
    it('==>actual bool ', function () {
        var schema = new Schema({
            bool:Number
        })
        var obj = schema({bool:true});
        debug(obj)
        assert.ok(typeof obj.bool === "number");
        assert.ok(obj.bool === 1);

        var obj2 = schema({bool:false});
        assert.ok(obj2.bool === 0);
    })
    it('==>actual arr ', function () {
        var schema = new Schema({
            arr:Number,
        })
        var obj = schema({arr:[4,5,6]});
        debug(obj)
        assert.ok(obj instanceof Error);
        assert.ok(obj.message.indexOf('convert')>-1)
    })
    it('==>actual obj ', function () {
        var schema = new Schema({
            obj:Number,
        })
        var obj = schema({obj:{name:'g'}});
        debug(obj)
        assert.ok(obj instanceof Error);
        assert.ok(obj.message.indexOf('convert')>-1)
    })
    it('==>actual null ', function () {
        var schema = new Schema({
            obj:Number,
        })
        var obj = schema({obj:null});
        debug(obj)
        assert.ok(typeof obj.obj === "object");
        assert.ok(obj.obj === null);
    })
})
describe('#base type array', function () {
    it('==>empty array use []', function () {
        var schema = new Schema({
            name: []
        })
        var obj = schema({name: ['55',44]});
        debug(obj)
        assert.ok(obj.name instanceof  Array);
        assert.ok(obj.name[0] === '55');
        assert.ok(obj.name[1] === 44);
    })
    it('==>empty array use Array ', function () {
        var schema = new Schema({
            name: Array
        })
        var obj = schema({name: ['33',33]});
        debug(obj)
        assert.ok(obj.name instanceof  Array);
        assert.ok(obj.name[0] === '33');
        assert.ok(obj.name[1] === 33);
    })
    it('==>empty array use Array include Number', function () {
        var schema = new Schema({
            name: [Number]
        })
        var obj = schema({name: ['33',33]});
        debug(obj)
        assert.ok(obj.name instanceof  Array);
        assert.ok(obj.name[0] === 33);
        assert.ok(obj.name[1] === 33);
    })

})
describe('#base type object',function(){
    it('==>actual arr should return error ', function () {
        var schema = new Schema({
            arr:Object,
        })
        var obj = schema({arr:[4,5,6]});
        debug(obj)
        assert.ok(obj instanceof Error);
        assert.ok(obj.message.indexOf('convert')>-1)
    })
    it('==>actual object should return origin ', function () {
        var schema = new Schema({
            arr:Object,
        })
        var obj = schema({arr:{name:5}});
        debug(obj)
        assert.ok(obj.arr.name===5)
    })
    it('==>actual null should return null ', function () {
        var schema = new Schema({
            arr:Object,
        })
        var obj = schema({arr:null});
        debug(obj)
        assert.ok(obj.arr===null)
    })
})
describe('#base type boolean',function(){
    it('==>actual 0 should return false ', function () {
        var schema = new Schema({
            arr:Boolean,
        })
        var obj = schema({arr:0});
        debug(obj)
        assert.ok(obj.arr===false)
    })
    it('==>actual "true" should return true ', function () {
        var schema = new Schema({
            arr:Boolean,
        })
        var obj = schema({arr:'true'});
        debug(obj)
        assert.ok(obj.arr===true)
    })
})
