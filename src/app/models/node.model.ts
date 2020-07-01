import { assign } from "lodash";
import { Entity, EntityType } from "./entity.model";

export interface IFlatNode {
    id: string;
    parentId: string;
    [key: string]: any;
}

export class NodeDto extends Entity {
    public id: string;
    public entityType: EntityType = EntityType.Nodes;
    public parentId: string;
    public documentId: string;
    public attributes: NodeAttributes = {} as NodeAttributes;
    public createdAt: Date;
    public updatedAt: Date;

    // Mapped on client
    public hasChildNodes?: boolean;
    public isRoot: boolean;

    constructor(props: object = {}) {
        super();
        assign(this, props);
    }
}

export interface NodeAttributes {
    // Should not be here, but is used for migration
    id: string;
    parentId: string;
    documentId: string;

    name: string;
    isRoot?: boolean;
    active: boolean;
    inactiveReason: string;
    newGeneration?: boolean;
    country?: string;

    // Optional Properties
    location?: string;
    latitude?: number;
    longitude?: number;
    placeId?: string;
    leaderName?: string;
    leadersName?: string;

    peopleGroups?: string;
    peopleGroupsNames?: string;

    // Mapped on client
    gen: number;

    // Only set on node click from d3 node.descendants();
    descendants?: NodeDto[];
    hasChildNodes?: boolean;
    nodeOrder?: number;
    threeThirds?: any;

    attenders: number;
    believers: number;
    baptized: number;
    newlyBaptized: number;
    peoples: PeopleAttributes[];
}

export interface PeopleAttributes {
    label: string;
    identifier: number;
    placeOfOrigin: string; // alpha-3 country code
    attenders?: number;
    believers?: number;
    baptized?: number;
    newlyBaptized?: number;
}
