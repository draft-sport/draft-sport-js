/* Draft Sport JS - Player Order By Module */


class PlayerOrderBy {

    constructor(key) {
        this._key = key;
        return;
    }

    get key() { return this._key; }

    static get PLAYER_NAME() { return new PlayerOrderBy('player_name'); }
    static get AVERAGE_POINTS() { return new PlayerOrderBy('average_points'); }

}
