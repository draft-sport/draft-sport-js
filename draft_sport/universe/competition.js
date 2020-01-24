/* Draft Sport JS - Competition Class */


class Competition {

    constructor(
        sport,  // Sport
        name  // String
    ) {

        this._sport = sport;
        this._name = name;
        return;
    }

    get sport() { return this._sport; }
    get name() { return this._name; }

    static get SUPER_RUGBY() {
        return new Competition(Sport.RUGBY_UNION, 'Super Rugby');
    }

}
