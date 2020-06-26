/* Draft Sport JS - Filled Requirement Module */


class FilledRequirement {

    constructor(
        requirement,  // CompositionRequirement
        picks         // Array<Pick>
    ) {

        this._requirement = requirement;
        this._picks = picks;

        return;

    }

    get picks() { return this._picks; }
    get name() { return this._requirement.requirementName; }
    get count() { return this._requirement.count; }

    get isPosition() {
        const key = CompositionRequirement.POSITION_KEY;
        return this._requirement.typeKey === key;
    }

    get isCategory() {
        const key = CompositionRequirement.CATEGORY_KEY;
        return this._requirement.typeKey === key;
    }

    get isPlural()  { return this._requirement.count > 1; }
    get numberFilled() { return this._picks.length; }
    get isEmpty() { return this._picks.length < 1; }
    get isSatisfied() { return this._picks.length == this._requirement.count; }
    get isNotSatisfied() { return !this.isSatisfied; }

}
