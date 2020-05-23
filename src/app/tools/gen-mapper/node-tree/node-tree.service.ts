import { Injectable } from '@angular/core';
import { NodeDto } from '@models/node.model';
import { Template } from '@models/template.model';
import { HierarchyPointNode, stratify, tree, TreeLayout } from 'd3';
import { cloneDeep, Dictionary, keyBy } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import uuid from 'uuid';
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

        this.treeData = this.treeLayout(this.rootNode);
        this.nodes = this.treeData.descendants() as NodeDatum[];
        this.treeDataSource.next(this.treeData);
    }

    public getNodeDatumById(id: string): NodeDatum {
        return this.nodes.find(d => d.data.id === id);
    }

    public addChildNodeToParent(parentNode: NodeDto): NodeDto {
        const newNode = this.template.createDefaultNode();

        newNode.id = uuid();
        newNode.parentId = parentNode.id;
        newNode.attributes.nodeOrder = 1000;

        this.rawData.push(newNode);
        this.createTree(this.rawData);

        return newNode;
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

    public removeNode(node: NodeDto): void {
        this.removeNodeAndDescendants(node);
        this.createTree(this.rawData);
    }

    private removeNodeAndDescendants(node: NodeDto): void {
        const nodeDatum = this.nodes.find(d => d.data.id === node.id);
        const nodesToDelete = nodeDatum.descendants();

        nodesToDelete.forEach(n => {
            const raw = this.rawDataById[n.id];
            const index = this.rawData.indexOf(raw);
            this.rawData.splice(index, 1);
        });
    }

    public cloneNodeTree(node: NodeDto): NodeDto[] {
        const nodeDatum = this.getNodeDatumById(node.id);
        const descendants = nodeDatum.descendants();
        const clonedNodes = [];
        const nodeMap = {};

        descendants.forEach(d => {
            const raw = cloneDeep(d.data);

            if (raw.id === node.id) {
                raw.parentId = null;
            }

            nodeMap[raw.id] = raw;
            raw.id = uuid();
            clonedNodes.push(raw);
        });

        clonedNodes.forEach(clone => {
            if (clone.parentId) {
                // Set new Parent Ids
                clone.parentId = nodeMap[clone.parentId].id;
            }
        });

        return clonedNodes;
    }

    public cloneData(nodes: NodeDto[]): NodeDto[] {
        const clonedData = [];
        const nodeMap = {};

        nodes.forEach(node => {
            nodeMap[node.id] = cloneDeep(node);
            nodeMap[node.id].id = uuid();
            clonedData.push(nodeMap[node.id]);
        });

        clonedData.forEach(node => {
            if (node.parentId) {
                const parent = nodeMap[node.parentId];
                node.parentId = parent.id;
            }
        });

        return clonedData;
    }

    public insertChildNodes(newParentNode: NodeDto, childNodes: NodeDto[]): void {
        const data = this.cloneData(childNodes);
        const root = data.find(d => !d.parentId);

        if (!root) {
            throw new Error('(insertChildNodes) requires a root node without a parentId');
        }

        root.parentId = newParentNode.id;
        this.rawData = this.rawData.concat(data);
        this.createTree(this.rawData);
    }

    public replaceNode(nodeToReplace: NodeDto, childNodes: NodeDto[]): void {
        const data = this.cloneData(childNodes);
        const root = data.find(d => !d.parentId);

        if (!root) {
            throw new Error('(insertChildNodes) requires a root node without a parentId');
        }

        root.parentId = nodeToReplace.parentId;
        this.removeNodeAndDescendants(nodeToReplace);
        this.rawData = this.rawData.concat(data);
        this.createTree(this.rawData);
    }
}
