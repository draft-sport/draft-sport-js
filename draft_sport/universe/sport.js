/* Draft Sport JS - Sport Class */


class Sport {

    constructor(name) {
        this._name = name;
    }

    get name() { return this._name; }

    static get RUGBY_UNION() { return new Sport('Rugby Union'); }

}
