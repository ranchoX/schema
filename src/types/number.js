import BaseType from './base'
class NumberType extends BaseType {
    constructor(key, config) {
        super(key, config);
        this.type='number'
    }

    convert(val) {
        if (!isNaN(val)) {
            if (val === null) {
                return val;
            }
            if (val === '') {
                return null;
            }
            if (typeof val === 'string' || typeof val === 'boolean') {
                val = Number(val);
            }
            if (val instanceof Number) {
                return val;
            }
            if (typeof val === 'number') {
                return val;
            }
            if (val.toString && !Array.isArray(val) && val.toString() == Number(val)) {
                return new Number(val);
            }
        }

        throw new Error(`convert fail expected:${this.type} actual value:${val}`);
    }
}
export default NumberType;