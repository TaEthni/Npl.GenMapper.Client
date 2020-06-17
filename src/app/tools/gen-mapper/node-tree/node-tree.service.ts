import { Injectable } from '@angular/core';
import { NodeDto } from '@models/node.model';
import { Template } from '@models/template.model';
import { HierarchyPointNode, stratify, tree, TreeLayout } from 'd3';
import { cloneDeep, Dictionary, keyBy } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { NodeDatum } from '../gen-mapper.interface';

@Injectable({
    providedIn: 'root'
})
export class NodeTreeService {
    private treeDataSource = new BehaviorSubject<HierarchyPointNode<NodeDto>>(null);
    public treeData$ = this.treeDataSource.asObservable();

    public rootNode: NodeDatum;
    public treeLayout: TreeLayout<NodeDto>
    public treeData: HierarchyPointNode<NodeDto>;
    public nodes: NodeDatum[];
    public template: Template;
    private rawData: NodeDto[];
    private rawDataById: Dictionary<NodeDto>;

    constructor() { }

    public createLayout(template: Template): void {
        this.template = template;
        this.treeLayout = tree<NodeDto>()
            .nodeSize([
                this.template.svgSettings.nodeWidth,
                this.template.svgSettings.nodeHeight
            ])
            .separation((a, b) => {
                return a.parent === b.parent ? 1 : 1.2;
            });
    }

    public getData(): NodeDto[] {
        return this.rawData;
    }

    public validateTree(data: { id: string, parentId: string }[]): boolean {
        try {
            stratify<{ id: string, parentId: string }>()
                .id(d => d.id)
                .parentId(d => d.parentId)(data) as NodeDatum;
        } catch (error) {
            return false;
        }

        return true;
    }

    public createTree(nodes: NodeDto[]): void {
        this.rawData = nodes.slice();
        this.rawDataById = keyBy(nodes, d => d.id);

        this.rootNode = stratify<NodeDto>()
            .id(d => d.id)
            .parentId(d => d.parentId)(nodes) as NodeDatum;

        this.rootNode.isRoot = true;
        this.updateLayout();
    }

    public updateLayout(): void {
        this.rootNode.sort(sortNodes);

        this.treeData = this.treeLayout(this.rootNode);

        this.nodes = this.treeData.descendants() as NodeDatum[];

        this.nodes.forEach(node => {
            node['isRoot'] = node.parent === this.rootNode;
        });

        this.treeDataSource.next(this.treeData);
    }

    public getNodeDatumById(id: string): NodeDatum {
        return this.nodes.find(d => d.data.id === id);
    }

    public createSubtreeFrom(id: string): NodeDto[] {
        const nodeDatum = this.getNodeDatumById(id);
        const subtree = cloneDeep(nodeDatum.descendants().map(d => d.data));
        const root = subtree.find(d => d.id === id);
        root.parentId = null;
        return subtree;
    }

    public getSubtree(id: string): NodeDto[] {
        const nodeDatum = this.getNodeDatumById(id);
        const subtree = nodeDatum.descendants().map(d => d.data);
        return subtree;
    }

    public insertNode(node: NodeDto): void {
        this.createTree(this.rawData.concat([node]));
    }

    public updateNode(node: NodeDto): void {
        const raw = this.rawDataById[node.id];
        const index = this.rawData.indexOf(raw);
        Object.assign(this.rawData[index], node);
        this.createTree(this.rawData);
    }

    public batchUpdateAttributes(nodes: NodeDto[]): void {
        nodes.forEach(node => {
            const raw = this.rawDataById[node.id];
            const index = this.rawData.indexOf(raw);
            Object.assign(this.rawData[index].attributes, node.attributes);
        });

        this.updateLayout();
    }
}

function sortNodes(a: NodeDatum, b: NodeDatum): number {
    if (a.data.attributes.nodeOrder > b.data.attributes.nodeOrder) {
        return 1;
    }
    if (b.data.attributes.nodeOrder > a.data.attributes.nodeOrder) {
        return -1;
    }
    return 0;
}
