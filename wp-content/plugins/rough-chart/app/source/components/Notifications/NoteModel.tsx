import { rndSalt } from '../../services/utils';

export enum NotificationTypes {
    Success,
    Error,
}

class NoteModel {
    public msg: string;
    public type: NotificationTypes;
    public id: string;

    constructor(msg: string, type: NotificationTypes = NotificationTypes.Success) {
        this.msg = msg;
        this.type = type;
        this.id = msg + rndSalt();
    }
}

export default NoteModel;
