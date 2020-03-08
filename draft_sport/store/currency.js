/* Draft Sport JS - Currency Module */


class Currency {

    constructor(
        name,
        iso_4217,
        symbol,
        exponent
    ) {

        this._name = name;
        this._iso_4217 = iso_4217;
        this._symbol = symbol;
        this._exponent = exponent;

        return;

    }
    
    get name() { return this._name; }
    get iso_4217() { return this._iso_4217; }
    get symbol() { return this._symbol; }
    get exponent() { return this._exponent; }

    has_iso4217(iso_4217) {
        const code = String(iso_4217).toLowerCase();
        if (code == this._iso_4217) { return true; }
        return false;
    }

    static get AUD() {
        return new Currency(
            'Australian Dollar',
            'aud',
            '$',
            2
        );
    }

    static get NZD() {
        return new Currency(
            'New Zealand Dollar',
            'nzd',
            '$',
            2
        )
    }

    static get ZAR() { 
        return new Currency(
            'South African Rand',
            'zar',
            'R',
            2
        );
    }

    static with_iso4217(iso_4217) {
        const code = String(iso_4217).toLowerCase();
        switch (code) {
            case 'aud':
                return Currency.AUD;
            case 'nzd':
                return Currency.NZD;
            case 'zar':
                return Currency.ZAR;
            default:
                throw Error('Unknown currency');
        }
    }

}