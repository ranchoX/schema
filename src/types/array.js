import BaseType from './base'
class ArrayType extends BaseType {
    constructor(key, config) {
        super(key, config);
        this.type='array'
    }

    convert(value) {
        if (Array.isArray(value)) {
            if (!value.length ) {
                return;
            }
            if (this.inner) {
                try {
                    for (var i = 0;i < value.length;i++) {
                        value[i] = this.inner.cast(value[i]);
                    }
                } catch (e) {
                    // rethrow
                    throw e;
                }
            }
            return value;
        }
        throw new Error(`convert fail expected:${this.type} actual value:${val}`);
    }
}
export default ArrayType;