/* Draft Spoirt JS - Fantasy Score Class */


class Score {

    constructor(
        fantasyMetricName,  // String
        pointsValue  // Integer
    ) {

        this._fantasyMetricName = fantasyMetricName;
        this._pointsValue = pointsValue;

        return;

    }

    get fantasyMetricName() { return this._fantasyMetricName; }
    get pointsValue() { return this._pointsValue; }

    static decode(data) {  // -> Score
        return new Score(
            data['fantasy_metric_name'],
            data['points_value']
        );
    }

    static decodeMany(data) {  // -> Array<Score>
        return data.map((s) => { return Score.decode(s); });
    }

}
