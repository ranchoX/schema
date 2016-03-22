import BaseType from './base';
class StringType extends BaseType {
    constructor(key, config) {
        super(key, config);
        this.type='date'
    }

    convert(value) {
        if (value === null || value === void 0 || value === '') {
            return null;
        }

        if (value instanceof Date) {
            return value;
        }

        var date;

        if (value instanceof Number || typeof value === 'number'
            || String(value) == Number(value)) {
            // support for timestamps
            date = new Date(Number(value));
        } else if (value.valueOf) {
            // support for moment.js
            date = new Date(value.valueOf());
        }

        if (!isNaN(date.valueOf())) {
            return date;
        }

        throw new Error(`convert fail expected:${this.type} actual value:${value}`);

    }

}
export default StringType;