/* Draft Sport JS - Fantasy Player Class */


class PlayerPoints {

    static get _LIST_PATH() { return '/fantasy/player/list'; }
    static get DEFAULT_ORDER_BY() { return PlayerOrderBy.AVERAGE_POINTS; }

    constructor(
        player,  // Player instance
        limit,  // Integer
        offset,  // Integer
        sequence,  // Integer
        requestingAgentId,  // String
        points,  // Points,
        queryTime, // String encoded time interval
        queryCount  // Integer
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

    get profile() { return this._player; }
    get points() { return this._points; }
    get limit() { return this._limit; }
    get offset() { return this._offset; }
    get sequence() { return this._sequence; }
    get requestingAgentId() { return this._requestingAgentId; }
    get queryTime() { return this._queryTime; }
    get queryCount() { return this._queryCount; }

    static decode(data) {  // -> PlayerPoints
        return new PlayerPoints(
            Player.decode(data['player']),
            data['limit'],
            data['offset'],
            data['sequence'],
            data['requesting_agent_id'],
            Points.decode(data['points']),
            data['query_time'],
            data['query_count']
        );
    }

    static decodeMany(data) {  // -> Array<PlayerPoints>
        return data.map((p) => { return PlayerPoints.decode(p); });
    }

    static retrieveMany(
        season,  // Season
        callback,  // Function(Error?, Array<PlayerPoints>?)
        limit = 20,  // Integer, Max 20
        offset = 0,  // Integer
        orderBy = PlayerPoints.DEFAULT_ORDER_BY,  // OrderBy
        order = Order.DESCENDING,  // Order,
        nameFragment = null,  // Optional[String]
        session = null  // Optional[Session]
    ) {

        const Self = PlayerPoints;

        const rawParameters = [
            new UrlParameter('offset', offset),
            new UrlParameter('limit', limit),
            new UrlParameter('order_by', orderBy.key),
            new UrlParameter('order', order.key),
            new UrlParameter('season', season.name)
        ]

        if (nameFragment != null) {
            rawParameters.push(new UrlParameter('fragment', nameFragment));
        }

        const parameters = new UrlParameters(rawParameters);
    
        const _ = new ApiRequest(
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
            session
        );

        return;

    }
}
