/* Draft Sport JS - Filled Composition Class */


class FilledComposition {

    constructor(
        filledRequirements  // Array<FilledRequirement>
    ) {

        this._filledRequirements = filledRequirements;

    }

    get filledRequirements() { return this._filledRequirements; }

}
