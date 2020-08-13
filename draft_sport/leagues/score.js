/* Draft Sport JS Library */


class LeagueScore {

    static get _ROUND_PATH() { return '/league/round/scores'}

    constructor(
        roundSequence,    // Integer
        fantasyPlayer,    // FantasyPlayer
        totalScore,       // Integer
        scores,           // Array<Score>
        benched,          // Boolean
        managerPublicId,  // String
        leaguePublicId,   // String
    ) {

        this._roundSequence = roundSequence;
        this._fantasyPlayer = fantasyPlayer;
        this._totalScore = totalScore;
        this._scores = scores;
        this._benched = benched;
        this._managerPublicId = managerPublicId;
        this._leaguePublicId = leaguePublicId;
        
        return;

    }

    static decode(data) {  // -> LeagueScore
        return new LeagueScore(
            data['round_sequence_number'],
            FantasyPlayer.decode(data['fantasy_player']),
            data['total_score'],
            Score.decodeMany(data['scores']),
            data['benched'],
            data['manager_public_id'],
            data['league_public_id']
        );
    }

    static decodeMany(data) {  // -> Array<LeagueScore>
        return data.map((s) => { return LeagueScore.decode(s); });
    }

    static retrieveForManagerInRound(
        leagueId,      // String
        managerId,     // String
        round,         // Integer
        callback,      // Function(Error?, Array<LeagueScore>)
        session = null // Optional<Session>
    ) { // -> Optional<Array<LeagueScore>>

        const Self = LeagueScore;

        if (!leagueId)  { throw Error('Missing leagueId'); }
        if (!managerId) { throw Error('Missing managerId'); }
        if (!round)     { throw Error('Missing round'); }

        const parameters = UrlParameters([
            new UrlParameter('league', leagueId),
            new UrlParameter('manager', managerId),
            new UrlParameter('round', round)
        ]);

        const c = callback;

        ApiRequest.make(
            Self._ROUND_PATH,
            'GET',
            parameters,
            null,
            (e, d) => { ApiRequest.decodeManyInResponse(e, d, c, Self); },
            session
        );

        return;

    }
}
