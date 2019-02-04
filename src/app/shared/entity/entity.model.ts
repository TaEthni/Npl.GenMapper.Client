import * as uuidv4 from 'uuid/v4';

export class Entity {

    public createdAt: Date;
    public updatedAt: Date;
    public entityType: EntityType;
    public id: string;

    public static uuid(): string { return uuidv4(); }
}

export enum EntityType {
    AllDocuments = 'documents-all',
    Documents = 'documents',
    Users = 'users'
}
