/* Draft Sport JS - Composition Class */


class Composition {

    static get _PATH() { return '/leagues/team/composition' }

    constructor(
        positionRequirements,   // Array<PositionRequirement>
        categoryRequirements    // Array<CategoryRequirement>
    ) {
        this._positionRequirements = positionRequirements;
        this._categoryRequirements = categoryRequirements;

        return;
    }

    get positionRequirements() { return this._positionRequirements; }
    get categoryRequirements() { return this._categoryRequirements; }

    get requirements() {
        return this.positionRequirements.concat(this.categoryRequirements);
    }

    static decode(data) {
        return new Composition(
            PositionRequirement.decodeMany(data['position_requirements']),
            CategoryRequirement.decodeMany(data['category_requirements'])
        );
    }

    static retrieve(
        callback,     // Function(Error?, Composition?)
        session=null  // Optional[Session]
    ) {

        const Self = Composition;

        ApiRequest.make(
            Self._PATH,
            'GET',
            null,
            null,
            (error, data) => {
                if (error) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return; }
                catch (error) { callback(error, null); return; }
            },
            session,
            null,
            false,
            true
        );

        return;
    }

}
