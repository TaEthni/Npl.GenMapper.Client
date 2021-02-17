import { assign } from 'lodash';
import { Entity, EntityType, IEntity } from './entity.model';
import { NodeDto } from './node.model';

export interface IDocumentDto extends IEntity {
    title?: string;
    type?: string;
    nodes?: NodeDto[];
}

export class DocumentDto extends Entity implements IDocumentDto {
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
    public nodes: NodeDto[];

    constructor(props: object = {}) {
        super();
        assign<DocumentDto, object>(this, props);
    }
}
