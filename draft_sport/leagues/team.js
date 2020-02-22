/* Draft Sport JS - League Team Module */


class LeagueTeam {

    constructor(
        leagueId,  // String
        picks,  // Array<Pick>
        managerId  // String
    ) {

        this._league_id = leagueId;
        this._picks = picks;
        this._managerId = managerId;

        return;

    }

    static decodeMany(data) {
        return data.map((t) => { return LeagueTeam.decode(t); } );
    }

    static decode(data) {
        return new LeagueTeam(
            data['league_id'],
            LeaguePick.decodeMany(data['picks']),
            data['manager_id']
        );
    }

}
