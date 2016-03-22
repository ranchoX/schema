import BaseType from './base';
class StringType extends BaseType {
    constructor(key, config) {
        super(key, config);
        this.type='string'
    }

    convert(value) {
        if (value === null ) {
            return value;
        }

        if (typeof value !== 'undefined') {

            // Re: gh-647 and gh-3030, we're ok with casting using `toString()`
            // **unless** its the default Object.toString, because "[object Object]"
            // doesn't really qualify as useful data
            if (value.toString && value.toString !== Object.prototype.toString) {
                return value.toString();
            }
        }
        throw new Error(`convert fail expected:${this.type} actual value:${value}`);

    }
    reg(val){
        var reg=new RegExp(val);
        return function(actual){
            if (!reg.test(actual)) {
                throw new Error(`not match reg:${val} actual value:${actual}`)
            }
        };
    }

}
export default StringType;