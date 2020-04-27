import { assign } from 'lodash';
import { Entity, EntityType } from './entity.model';

export class User extends Entity {
    public username?: string;
    public email: string;
    public id: string;
    public password?: string;
    public entityType: EntityType = EntityType.Users;
    public agreementDate: Date;

    constructor(props: object = {}) {
        super();
        assign(this, props);
    }
}
