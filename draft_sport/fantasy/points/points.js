/* Draft Sport JS - Fantasy Points Class */


class Points {

    constructor(
        averagePoints,  // Integer
        totalPoints,  // Integer
        pointsLastRound,  // Integer
        pointsPerMinutePlayed,  // Optional[Integer]
        rounds  // Array<Rounds>
    ) {

        this._averagePoints = averagePoints;
        this._totalPoints = totalPoints;
        this._pointsLastRound = pointsLastRound;
        this._pointsPerMinutePlayed = pointsPerMinutePlayed;
        this._rounds = rounds;

        return;

    }

    get averagePoints() { return this._averagePoints; }
    get totalPoints() { return this._totalPoints; }
    get pointsLastRound() { return this._pointsLastRound; }
    get pointsPerMinutePlayed() { return this._pointsPerMinutePlayed; }
    get rounds() { return this._rounds; }

    static decode(data) {  // -> Points
        return new Points(
            data['average_points'],
            data['total_points'],
            data['points_last_round'],
            data['points_per_minute_played'],
            RoundPoints.decodeMany(data['rounds'])
        );
    }

}
