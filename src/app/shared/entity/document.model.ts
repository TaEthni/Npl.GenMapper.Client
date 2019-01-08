import { Entity, EntityType } from '@shared/entity/entity.model';
import { merge } from 'lodash';

export class DocumentDto extends Entity {
    public id: string;
    public title: string;
    public type: string;
    public description?: string;
    public content: string;
    public createdAt: Date;
    public updatedAt: Date;

    public entityType = EntityType.Documents;

    constructor(props: object = {}) {
        super();
        merge<DocumentDto, object>(this, props);
    }
}
