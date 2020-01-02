import { Injectable } from '@angular/core';
import { HierarchyPointNode, stratify, tree, TreeLayout } from 'd3';
import { cloneDeep, Dictionary, keyBy } from 'lodash';
import uuid from 'uuid';
import { GNode, NodeDatum } from '../gen-mapper.interface';
import { Template } from '../template.model';

@Injectable({
    providedIn: 'root'
})
export class NodeTreeService {
    public rootNode: NodeDatum;
    public treeLayout: TreeLayout<GNode>
    public treeData: HierarchyPointNode<GNode>;
    public nodes: NodeDatum[];
    public template: Template;

    private rawData: GNode[];
    private rawDataById: Dictionary<GNode>;

    constructor() { }

    public createLayout(template: Template): void {
        this.template = template;
        this.treeLayout = tree<GNode>()
            .nodeSize([
                this.template.svgSettings.nodeWidth,
                this.template.svgSettings.nodeHeight
            ])
            .separation((a, b) => {
                return a.parent === b.parent ? 1 : 1.2;
            });
    }

    public getData(): GNode[] {
        return this.rawData;
    }

    public validateTree(data: GNode[]): boolean {
        try {
            stratify<GNode>()
                .id(d => d.id)
                .parentId(d => d.parentId)(data) as NodeDatum;
        } catch (error) {
            return false;
        }

        return true;
    }

    public createTree(nodes: GNode[]): void {
        this.rawData = nodes;
        this.rawDataById = keyBy(nodes, d => d.id);

        this.rootNode = stratify<GNode>()
            .id(d => d.id)
            .parentId(d => d.parentId)(nodes) as NodeDatum;

        this.treeData = this.treeLayout(this.rootNode);
        this.nodes = this.treeData.descendants() as NodeDatum[];
    }

    public getNodeDatumById(id: string): NodeDatum {
        return this.nodes.find(d => d.data.id === id);
    }

    public addChildNodeToParent(parentNode: GNode): GNode {
        const newNode = {} as GNode;

        newNode.id = uuid();
        newNode.parentId = parentNode.id;
        newNode.nodeOrder = 1000;

        this.template.fields.forEach(field => {
            if (field.defaultValue || field.hasOwnProperty('defaultValue')) {
                newNode[field.id] = field.defaultValue;
            }
        });

        this.rawData.push(newNode);
        this.createTree(this.rawData);

        return newNode;
    }

    public updateNode(node: GNode): void {
        const raw = this.rawDataById[node.id];
        const index = this.rawData.indexOf(raw);
        Object.assign(this.rawData[index], node);
        this.createTree(this.rawData);
    }

    public removeNode(node: GNode): void {
        this.removeNodeAndDescendants(node);
        this.createTree(this.rawData);
    }

    private removeNodeAndDescendants(node: GNode): void {
        const nodeDatum = this.nodes.find(d => d.data.id === node.id);
        const nodesToDelete = nodeDatum.descendants();

        nodesToDelete.forEach(n => {
            const raw = this.rawDataById[n.id];
            const index = this.rawData.indexOf(raw);
            this.rawData.splice(index, 1);
        });
    }

    public cloneNodeTree(node: GNode): GNode[] {
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

    public cloneData(nodes: GNode[]): GNode[] {
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

    public insertChildNodes(newParentNode: GNode, childNodes: GNode[]): void {
        const data = this.cloneData(childNodes);
        const root = data.find(d => !d.parentId);

        if (!root) {
            throw new Error('(insertChildNodes) requires a root node without a parentId');
        }

        root.parentId = newParentNode.id;
        this.rawData = this.rawData.concat(data);
        this.createTree(this.rawData);
    }

    public replaceNode(nodeToReplace: GNode, childNodes: GNode[]): void {
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
