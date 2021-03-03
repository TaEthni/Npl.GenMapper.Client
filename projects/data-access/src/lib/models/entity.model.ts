import * as uuidv4 from 'uuid/v4';

export interface IEntity {
    id?: string;
    entityType?: EntityType
}

export class Entity implements IEntity {

    public createdAt: Date;
    public updatedAt: Date;
    public entityType: EntityType;
    public id: string;

    public static uuid(): string { return uuidv4(); }
}

export enum EntityType {
    PeopleGroups = 'peopleGroups',
    AllDocuments = 'streams-all',
    Documents = 'streams',
    Users = 'users',
    DocumentNodes = 'streams/nodes',
    Nodes = 'nodes',
    AllNodes = 'nodes-all'
}
