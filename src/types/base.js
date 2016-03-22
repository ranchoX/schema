const INVALIDVALIDATORS = ['require', 'defaultValue', 'type','inner'];
 class BaseType {
    constructor(key, config) {

        this.isRequired = !!config.require;
        this.defaultValue = config.defaultValue;
        this.inner=config.inner;
        this.validators = [];
        for (let k in config) {
            if (INVALIDVALIDATORS.indexOf(k) == -1) {
                if (!this[k]) {
                    console.warn(`validator ${k} not found`);
                    return;
                }
                this.validators.push(this[k](config[k]));
            }
        }
        this.key = key;
    }

    cast(actual) {
        try{
            this.required(actual);
            //defaultValue
            if (actual === undefined) {
                return this.defaultValue;
            }
            var val = this.convert(actual);
            this.validators.forEach((item)=> {
                item(val);
            })
            return val;
        }catch(e){
            return e;
        }
    }

    required(actual) {
        if (this.isRequired && actual === undefined) {
            throw new Error(`${this.key} is required`);
        }
    }

    convert(val) {
        throw new Error('Not Implement Convert');
    }

}
export default BaseType;