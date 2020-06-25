/* Draft Sport JS - Fantasy Season Class */


class FantasySeason {

    static get PATH() { return '/fantasy/season'; }
    static get LIST_PATH() { return FantasySeason.PATH + '/list'; }

    constructor(
        publicId,    // String
        name,        // String
        startDate,   // String-encoded date
        competition  // FantasyCompetition
    ) {

        this._public_id = publicId;
        this._name = name;
        this._startDate = startDate;
        this._competition = competition;

        return;

    }

    static get DRAFT_RUGBY_2020() { return _CONSTANT_SEASON_2020_1; }
    static get DRAFT_RUGBY_2020_PRE_COVID() { return _CONSTANT_SEASON_2020_2; }

    static get _CONSTANTS() { return [
        FantasySeason.DRAFT_RUGBY_2020,
        FantasySeason.DRAFT_RUGBY_2020_PRE_COVID
    ]; }

    get publicId() { return this._public_id; }
    get name() { return this._name; }
    get startDate() { return this._startDate; }
    get competition() { return this._startDate; }

    static retrieve(
        publicId,     // String
        callback,     // Function(Error?, FantasySeason?)
        session=null  // Optional<Session>
    ) {

        const Self = FantasySeason;

        ApiRequest.make(
            Self.PATH,
            'GET',
            new UrlParameters([new UrlParameter('season', publicId)]),
            null,
            (e, d) => { ApiRequest.decodeResponse(e, d, callback, Self); },
            session,
            null,
            false,
            true
        );

        return;

    }

    static retrieveList(
        callback,         // Function(Error?, Array<FantasySeason>?)
        session=null,     // Optional<Session>
    ) {

        const Self = FantasySeason;

        ApiRequest.make(
            Self.PATH,
            'GET',
            new UrlParameters([new UrlParameter('season', publicId)]),
            null,
            (e, d) => {
                ApiRequest.decodeManyInResponse(e, d, callback, Self);
            },
            session,
            null,
            false,
            true
        );

        return;

    }

    static decode(data) {
        return new FantasySeason(
            data['public_id'],
            data['name'],
            data['start_date'],
            FantasyCompetition.decode(data['competition'])
        )
    }

    static withId(publicId) {
        const Self = FantasySeason;
        for (let i = 0; i < Self._CONSTANTS.length; i++) {
            if (Self._CONSTANTS[i].publicId == publicId) {
                return Self._CONSTANTS[i].publicId;
            }
            continue;
        }
        throw Error('Unknown FantasySeason ID: ' + publicId);
    }
}

const _CONSTANT_SEASON_2020_1 = new FantasySeason(
    'draft_rugby_2020',
    'Draft Rugby 2020',
    '04 Jul 2020',
    new FantasyCompetition(
        'sru_2020_2',
        'Draft Rugby 2020'
    )
);

const _CONSTANT_SEASON_2020_2 = new FantasySeason(
    'draft_rugby_2020_1',
    'Draft Rugby 2020 (Pre-Covid)',
    '05 Feb 2020',
    new FantasyCompetition(
        'sru_2020_1',
        'Draft Rugby 2020 (Pre-Covid)'
    )
);
