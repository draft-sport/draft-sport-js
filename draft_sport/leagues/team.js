/* Draft Sport JS - League Team Module */


class LeagueTeam {

    static get _PATH() { return '/league/team'; }

    constructor(
        leagueId,             // String
        picks,                // Array<Pick>
        managerId,            // String
        managerDisplayName,   // String
        name,                 // Optional[String]
        totalPoints,          // Integer
        composition           // Composition
    ) {

        this._leagueId = leagueId;
        this._picks = picks;
        this._managerId = managerId;
        this._managerDisplayName = managerDisplayName;
        this._name = name;
        this._totalPoints = totalPoints;
        this._composition = composition;

        return;

    }

    get leagueId() { return this._leagueId; }
    get picks() { return this._picks; }
    get managerId() { return this._managerId; }
    get name() { return this._name; }
    get managerDisplayName() { return this._managerDisplayName; }
    get totalPoints() { return this._totalPoints; }

    get filledComposition() {

        const filledRequirements = new Array(); // Array<FilledRequirement>

        const remainingPicks = Array.from(this._picks);
        remainingPicks.sort((a, b) => {
            if (a.created < b.created) { return -1; }
            if (a.created < b.created) { return 1; }
            return 0;
        })

        for (
            let i = 0;
            i < this._composition.positionRequirements.length;
            i++
        ) {

            const requirement = this._composition.positionRequirements[i];
            const picksSatisfyingRequirement = new Array();
            const potentialPicks = Array.from(remainingPicks);
            const newRemainingPicks = new Array();
            
            for (let k = 0; k < potentialPicks.length; k++) {

                const pick = potentialPicks[k];
                if (picksSatisfyingRequirement.length < requirement.count) {
                    if (pick.scoreCard.hasPositionWithName(
                        requirement.positionName
                    )) {
                        picksSatisfyingRequirement.push(pick);
                        continue;
                    }
                }

                newRemainingPicks.push(pick);
                continue;

            }

            remainingPicks.splice(
                0,
                remainingPicks.length,
                ...newRemainingPicks
            );

            filledRequirements.push(new FilledRequirement(
                requirement,
                picksSatisfyingRequirement
            ));

            continue;

        }

        for (
            let j = 0;
            j < this._composition.categoryRequirements.length;
            j++
        ) {

            const requirement = this._composition.categoryRequirements[j];
            const picksSatisfyingRequirement = new Array();

            const potentialPicks = Array.from(remainingPicks);
            const newRemainingPicks = new Array();

            for (let m = 0; m < potentialPicks.length; m++) {

                const pick = potentialPicks[m];
                if (pick.scoreCard.hasPositionInCategory(
                    requirement.category
                )) {
                    picksSatisfyingRequirement.push(pick);
                    continue;
                }

                newRemainingPicks.push(pick);
                continue;
            }

            remainingPicks.splice(
                0,
                remainingPicks.length,
                ...newRemainingPicks
            );

            filledRequirements.push(new FilledRequirement(
                requirement,
                picksSatisfyingRequirement
            ));

            continue;
            
        }

        return new FilledComposition(filledRequirements);

    }

    delete(
        callback,     // Function(Error?)
        session=null  
    ) {

        const self = this; const Self = LeagueTeam;

        const parameters = new UrlParameters([
            new UrlParameter('league', self._leagueId),
            new UrlParameter('manager', self._managerId),
        ]);

        ApiRequest.make(
            Self._PATH,
            'DELETE',
            parameters,
            null,
            (e, _) => { callback(e); return},
            session
        );

        return;

    }

    static decodeMany(data) {
        return data.map((t) => { return LeagueTeam.decode(t); } );
    }

    static decode(data) {
        return new LeagueTeam(
            data['league_id'],
            LeaguePick.decodeMany(data['picks']),
            data['manager_id'],
            data['manager_display_name'],
            data['name'],
            data['total_points'],
            Composition.decode(data['composition'])
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

        ApiRequest.make(
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
