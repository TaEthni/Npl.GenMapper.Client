import { Entity, EntityType } from './entity.model';
import { merge } from 'lodash';

export class User extends Entity {
    public username?: string;
    public email: string;
    public id: string;
    public password?: string;
    public entityType: EntityType = EntityType.Users;

    constructor(props: object = {}) {
        super();
        merge(this, props);
    }
}
