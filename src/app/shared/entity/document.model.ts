import { Entity, EntityType } from '@shared/entity/entity.model';
import { assign } from 'lodash';

import { GMElement, GNode } from '../../tools/gen-mapper/gen-mapper.interface';

export class DocumentDto extends Entity {
    public id: string;
    public title: string;
    public type: string;
    public description?: string;
    public content: string;
    public elements: string;
    public createdAt: Date;
    public updatedAt: Date;

    // Mapped on client
    public entityType = EntityType.Documents;
    public parsedElements: GMElement[];
    public nodes: GNode[];

    constructor(props: object = {}) {
        super();
        assign<DocumentDto, object>(this, props);
    }
}
