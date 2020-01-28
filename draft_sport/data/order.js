/* Draft Sport JS - Order Class */


class Order {

    constructor(key) {
        this._key = key;
        return;
    }

    get key() { return this._key }

    static get ASCENDING() { return new Order('ascending'); }
    static get DESCENDING() { return new Order('descending'); }

    static get enumerations() { return [
        Order.ASCENDING,
        Order.DESCENDING
    ];}

    static withKey(
        key  // String
    ) {  // -> Order
        const Self = Order
        for (let i = 0; i < Self.enumerations.length; i++) {
            if (Self.enumerations[i].key == key) {
                return Self.enumerations[i]
            }
            continue
        }
        throw Error('Unknown key ' + key);
    }

}
