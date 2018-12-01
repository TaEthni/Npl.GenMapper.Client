import { Entity, EntityType } from './entity.model';

export class User extends Entity {
    public username?: string;
    public email: string;
    public id: string;
    public entityType: EntityType = EntityType.Users;
    public password?: string;
}
