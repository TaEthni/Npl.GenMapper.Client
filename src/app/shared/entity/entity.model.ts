export class Entity {
    public createdAt: Date;
    public updatedAt: Date;
    public entityType: EntityType;
    public id: string;
}

export enum EntityType {
    Documents = 'documents',
    Users = 'users'
}
