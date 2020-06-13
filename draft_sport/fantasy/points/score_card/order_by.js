/* Draft Sport JS - Player Order By Module */


class PlayerOrderBy {

    constructor(key) {
        this._key = key;
        return;
    }

    get key() { return this._key; }

    static get PLAYER_NAME() { return new PlayerOrderBy('player_name'); }
    static get AVERAGE_POINTS() { return new PlayerOrderBy('average_points'); }
    static get TOTAL_POINTS() {
        return new PlayerOrderBy('total_season_points');
    }
    static get POINTS_LAST_ROUND() {
        return new PlayerOrderBy('points_last_round');
    }
    static get POINTS_PER_MINUTE_PLAYED() {
        return new PlayerOrderBy('points_per_minute_played');
    }

    static get _enumerations() { return [
        PlayerOrderBy.PLAYER_NAME,
        PlayerOrderBy.AVERAGE_POINTS,
        PlayerOrderBy.POINTS_LAST_ROUND,
        PlayerOrderBy.TOTAL_POINTS,
        PlayerOrderBy.POINTS_PER_MINUTE_PLAYED
    ]}

    static withKey(
        key  // String
    ) {  // -> PlayerOrderBy
        const Self = PlayerOrderBy
        for (let i = 0; i < Self._enumerations.length; i++) {
            if (Self._enumerations[i].key == key) {
                return Self._enumerations[i]
            }
            continue
        }
        throw Error('Unknown key ' + key);
    }
}
