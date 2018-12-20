import { Entity, EntityType } from '@shared/entity/entity.model';

export class DocumentDto extends Entity {
    public id: string;
    public title: string;
    public format: string;
    public description: string;
    public content: string;
    public createdAt: Date;
    public updatedAt: Date;
    public owner: string;

    public entityType = EntityType.Documents;

    public static create(value: any): DocumentDto {
        return Object.assign<DocumentDto, any>(new DocumentDto(), value);
    }
}
