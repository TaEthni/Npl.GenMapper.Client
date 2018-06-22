import { Entity, EntityType } from '@shared/entity.model';

export class Document extends Entity {
    public id: string;
    public title: string;
    public format: string;
    public description: string;
    public content: string;
    public createdAt: Date;
    public updatedAt: Date;
    public owner: string;

    public entityType = EntityType.Documents;
}
