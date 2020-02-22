/* Draft Sport JS - League Pick Class */


class LeaguePick {

    constructor(
        created,  // String
        managerId,  // String
        player,  // Player
        leagueId  // String
    ) {

        this._created = created;
        this._managerId = managerId;
        this._player = player;
        this._leagueId = leagueId;

        return;

    }

    static decode(data) {
        return new LeaguePick(
            data['created'],
            data['manager_id'],
            Player.decode(data['player']),
            data['league_id']
        );
    }

    static decodeMany(data) {
        return data.map((p) => { return LeaguePick.decode(p); });
    }

}
