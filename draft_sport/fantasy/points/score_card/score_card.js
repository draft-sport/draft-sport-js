/* Draft Sport JS - Fantasy Player Class */


class ScoreCard {

    static get _LIST_PATH() { return '/fantasy/score-card/list'; }
    static get DEFAULT_ORDER_BY() { return PlayerOrderBy.TOTAL_POINTS; }

    constructor(
        player,             // FantasyPlayer
        limit,              // Integer
        offset,             // Integer
        sequence,           // Integer
        requestingAgentId,  // String
        points,             // Points,
        queryTime,          // String encoded time interval
        queryCount          // Integer
    ) {

        this._player = player;
        this._limit = limit;
        this._offset = offset;
        this._sequence = sequence;
        this._requestingAgentId = requestingAgentId;
        this._points = points;
        this._queryTime = queryTime;
        this._queryCount = queryCount;

        return;

    }

    get publicId() { return this._player.publicId; }

    get profile() { return this._player; }
    get points() { return this._points; }
    get limit() { return this._limit; }
    get offset() { return this._offset; }
    get sequence() { return this._sequence; }
    get requestingAgentId() { return this._requestingAgentId; }
    get queryTime() { return this._formatQueryTime(); }
    get queryCount() { return this._queryCount; }

    _formatQueryTime() {
        const time = (this._queryTime / 1000000).toFixed(4);
        return time;
    }

    hasPositionWithName(name) {
        return this._player.positionName == name;
    }

    hasPositionInCategory(category) {
        return this._player.position.isInCategory(category);
    }

    static decode(data) {  // -> ScoreCard
        return new ScoreCard(
            FantasyPlayer.decode(data['player']),
            data['limit'],
            data['offset'],
            data['sequence'],
            data['requesting_agent_id'],
            Points.decode(data['points']),
            data['query_time'],
            data['query_count']
        );
    }

    static decodeMany(data) {  // -> Array<ScoreCard>
        return data.map((p) => { return ScoreCard.decode(p); });
    }

    static retrieveMany(
        season,                     // FantasySeason
        callback,                   // Function(Error?, Array<ScoreCard>?)
        limit = 20,                 // Integer, Max 20
        offset = 0,                 // Integer
        orderBy = ScoreCard.DEFAULT_ORDER_BY,  // OrderBy
        order = Order.DESCENDING,   // Order,
        teamName = null,            // Optional[String]
        positionName = null,        // Optional[String]
        nameFragment = null,        // Optional[String]
        categoryName = null,        // Optional[String]
        session = null              // Optional[Session]
    ) {

        const Self = ScoreCard;

        const rawParameters = [
            new UrlParameter('offset', offset),
            new UrlParameter('limit', limit),
            new UrlParameter('order_by', orderBy.key),
            new UrlParameter('order', order.key),
            new UrlParameter('season', season.publicId)
        ]

        if (nameFragment != null) {
            rawParameters.push(new UrlParameter('name', nameFragment));
        }

        if (teamName != null && teamName != 'null') {
            rawParameters.push(new UrlParameter('team', teamName));
        }

        if (positionName != null && positionName != 'null') {
            rawParameters.push(new UrlParameter('position', positionName));
        }

        if (categoryName != null && categoryName != 'null') {
            rawParameters.push(new UrlParameter('category', categoryName));
        }

        const parameters = new UrlParameters(rawParameters);
    
        ApiRequest.make(
            Self._LIST_PATH,
            'GET',
            parameters,
            null,
            (error, data) => {
                if (error) { callback(error, null); return; }
                try {
                    const players = Self.decodeMany(data);
                    callback(null, players)
                }
                catch (error) { callback(error, null); return; }
                return;
            },
            session,
            null,
            null,
            true  // Optional Auth
        );

        return;

    }
}
