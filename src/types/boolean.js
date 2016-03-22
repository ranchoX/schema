import BaseType from './base';
class BooleanType extends BaseType {
    constructor(key, config) {
        super(key, config);
        this.type='boolean'
    }

    convert(value) {
        if (value === null) {
            return value;
        }
        if (value === '0') {
            return false;
        }
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        return !!value;
    }

}
export default BooleanType;