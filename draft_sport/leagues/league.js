/* Draft Sport JS - League Class */

class League {

    static get _PATH() { return '/league' }
    static get _LIST_PATH() { return '/league/list' }

    constructor(
        publicId,       // String
        commissionerId, // String
        name,           // String
        created,        // String
        teams           // Array<TeamSummary>
    ) {

        this._publicId = publicId;
        this._commissionerId = commissionerId;
        this._name = name;
        this._created = created;
        this._teams = teams;

        return;

    }

    get publicId() { return this._publicId; }
    get commissionerId() { return this._commissionerId; }
    get name() { return this._name; }
    get created() { return this._created; }
    get teams() { return this._teams; }

    static decode(data) {
        const league = new League(
            data['public_id'],
            data['commissioner_id'],
            data['name'],
            data['created'],
            data['teams'].map((t) => { return TeamSummary.decode(t); })
        );
        return league;
    }

    static decodeMany(data) {
        return data.map((d) => { return League.decode(d); });
    }

    static create(
        commissionerId,  // String
        name,            // String
        season,          // FantasySeason
        callback,        // Function(Error? League?)
        session = null   // Optional[Session]
    ) {

        const Self = League;
        const payload = {
            'name': name,
            'commissioner_id': commissionerId,
            'season': season.publicId
        }

        ApiRequest.make(
            Self._PATH,
            'POST',
            null,
            payload,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return;} 
                catch (error) { callback(error, null); return; }
            },
            session
        );

        return;
    }

    static retrieveMany(
        managerId,       // Optional[String]
        commissionerId,  // Optional[String]
        season,          // FantasySeason
        callback,        // Function(Error?, Array<League>?)
        limit = 10,
        offset = 0,
        session = null
    ) {

        const Self = League;

        const rawParameters = [
            new UrlParameter('offset', offset),
            new UrlParameter('limit', limit)
        ]

        if (managerId != null) { rawParameters.push(
            new UrlParameter('manager', managerId)
        ); }

        if (commissionerId != null) { rawParameters.push(
            new UrlParameter('commissioner', commissionerId)
        ); }

        if (season != null) { rawParameters.push(
            new UrlParameter('season', season.publicId)
        ); }

        const parameters = new UrlParameters(rawParameters);

        ApiRequest.make(
            Self._LIST_PATH,
            'GET',
            parameters,
            null,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, Self.decodeMany(data)); return; }
                catch (error) { callback(error, null); return; }
            },
            session
        );

        return;

    }

    static retrieve(
        publicId,  // String
        callback,  // Function(Error? League?)
        session = null
    ) {

        const Self = League;

        const rawParameters = [
            new UrlParameter('league', publicId),
        ];

        ApiRequest.make(
            Self._PATH,
            'GET',
            new UrlParameters(rawParameters),
            null,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, League.decode(data)); return; }
                catch (error) { callback(error, null); return; }
            },
            session
        );

        return;

    }

}
