/* Draft Sport JS - Communication Mode Class */


class CommunicationMode {

    constructor(
        indexId,  // Integer
        name  // String
    ) {

        this._indexid = indexId;
        this._name = name;
        
        return;

    }

    get indexid() { return this._indexid; }
    get name() { return this._name; }

    static get PHONE_NUMBER() { return new CommunicationMode(
        1,
        'phone'
    )}

    static get EMAIL_ADDRESS() { return new CommunicationMode(
        2,
        'email'
    )}

    static get enumerations() { return [
        CommunicationMode.PHONE_NUMBER,
        CommunicationMode.EMAIL_ADDRESS
    ]}

    static withId(indexid) {
        const Self = CommunicationMode;
        for (let i = 0; i < Self.enumerations.length; i++) {
            if (Self.enumerations[i].indexid == indexid) {
                return Self.enumerations[i];
            }
        }
        return null;
    }

    static decode(data) {
        return new CommunicationMode(
            data['indexid'],
            data['mode_name']
        );
    }

}
