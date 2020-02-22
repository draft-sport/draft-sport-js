/* Draft Sport JS - League Team Module */


class LeagueTeam {

    constructor(
        leagueId,  // String
        picks,  // Array<Pick>
        managerId,  // String
        managerDisplayName,  // String
        name  // Optional[String]
    ) {

        this._league_id = leagueId;
        this._picks = picks;
        this._managerId = managerId;
        this._managerDisplayName = managerDisplayName;
        this._name = name;

        return;

    }

    get leagueId() { return this._league_id; }
    get picks() { return this._picks; }
    get managerId() { return this._managerId; }
    get name() { return this._name; }
    get managerDisplayName() { return this._managerDisplayName; }

    static decodeMany(data) {
        return data.map((t) => { return LeagueTeam.decode(t); } );
    }

    static decode(data) {
        return new LeagueTeam(
            data['league_id'],
            LeaguePick.decodeMany(data['picks']),
            data['manager_id'],
            data['manager_display_name'],
            data['name']
        );
    }

}
