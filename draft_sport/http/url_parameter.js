/* Draft Sport - Url Parameter Class */


class UrlParameter {

    constructor(key, value) {
        this._key = key;
        this._value = value;
        return;
    }

    get string() {
        return this._key + '=' + encodeURIComponent(this._value);
    }

}
