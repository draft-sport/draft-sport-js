/* Draft Sport JS - League Team Name Class */


class LeagueTeamName {

    static get _PATH() { return '/league/team/name'; }

    constructor(
        name,       // String
        managerId,  // String
        leagueId     // String
    ) {

        this._name = name;
        this._managerId = managerId;
        this._leagueId = leagueId;

        return;
    }

    get leagueId() { return this._leagueId; }
    get managerId() { return this._managerId; }
    get name() { return this._name; }

    static decode(data) {
        return new LeagueTeamName(
            data['name'],
            data['manager_id'],
            data['league_id']
        );
    }

    static create(
        name,         // String
        leagueId,     // String
        managerId,    // String
        callback,     // Function<Error?, LeagueTeamName?>
        session=null  // Optional<Session>
    ) {

        const Self = LeagueTeamName;
        const payload = {
            'name': name,
            'league': leagueId,
            'manager': managerId
        }

        ApiRequest.make(
            Self._PATH,
            'POST',
            null,
            payload,
            (e, d) => { ApiRequest.decodeResponse(e, d, callback, Self); },
            session
        );

        return;
    }

}
