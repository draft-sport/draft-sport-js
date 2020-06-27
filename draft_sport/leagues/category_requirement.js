/* Draft Sport API - Category Requirement Module */


class CategoryRequirement extends CompositionRequirement {

    constructor(
        count,        // Integer
        category      // PositionCategory
    ) {

        super();

        this._count = count;
        this._category = category;

        return;

    }

    get count() { return this._count; }
    get category() { return this._category; }

    get requirementName() { return this._category.name; }
    get typeKey() { return CompositionRequirement.CATEGORY_KEY; }

    static decode(data) {
        return new CategoryRequirement(
            data['count'],
            PositionCategory.decode(data['category'])
        );
    }

    static decodeMany(data) {
        return data.map((d) => { return CategoryRequirement.decode(d);} )
    }

}
