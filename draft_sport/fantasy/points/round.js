/* Draft Sport JS - Fantasy Round Class */


class RoundPoints {

    constructor(
        sequence,  // Integer
        scores  // Array<Score>
    ) {

        this._sequence = sequence;
        this._scores = scores;

        return;

    }

    get sequence() { return this._sequence; }
    get scores() { return this._scrores; }

    static decode(data) {  // -> RoundPoints
        return new RoundPoints(
            data['round_sequence'],
            Score.decodeMany(data['scores'])
        );
    }

    static decodeMany(data) { // -> Array<RoundPoints>
        return data.map((r) => { return RoundPoints.decode(r); });
    }

}
