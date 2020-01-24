/* Draft Sport JS - Season Class */


class Season {

    constructor(
        competition,
        name
    ) {
        this._competition = competition;
        this._name = name;
        return;
    }

    get competition() { return this._competition; }
    get name() { return this._name; }
    get sport() { return this._competition.sport; }

    static get SUPER_RUGBY_2019() { return new Season(
        Competition.SUPER_RUGBY,
        '2019'
    )}
    static get SUPER_RUGBY_2020() { return new Season(
        Competition.SUPER_RUGBY,
        '2020'
    )}

}
