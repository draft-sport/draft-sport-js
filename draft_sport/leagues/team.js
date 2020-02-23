/* Draft Sport JS - League Team Module */


class LeagueTeam {

    static get _PATH() { return '/league/team'; }

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

    static retrieve(
        leagueId,  // String
        managerId,  // String
        callback,  // Function(Error?, Team?)
        session=null  // Optional[Session]
    ) {

        const Self = LeagueTeam;

        const parameters = new UrlParameters([
            new UrlParameter('league', leagueId),
            new UrlParameter('manager', managerId),
        ]);

        const _ = new ApiRequest(
            Self._PATH,
            'GET',
            parameters,
            null,
            (error, data) => {
                if (error) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return; }
                catch (error) { callback(error, null); return; }
            },
            session
        );

        return;
    }

}
