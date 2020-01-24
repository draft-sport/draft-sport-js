/* Draft Sport JS - Order Class */


class Order {

    constructor(key) {
        this._key = key;
        return;
    }

    get key() { return this._key }

    static get ASCENDING() { return new Order('ascending'); }
    static get DESCENDING() { return new Order('descending'); }

}
