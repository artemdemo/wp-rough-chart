import { rndSalt } from '../../services/utils';

export enum TNotification {
    Success,
    Error,
}

class NoteModel {
    public msg: string;
    public type: TNotification;
    public id: string;

    constructor(msg: string, type: TNotification = TNotification.Success) {
        this.msg = msg;
        this.type = type;
        this.id = msg + rndSalt();
    }
}

export default NoteModel;
