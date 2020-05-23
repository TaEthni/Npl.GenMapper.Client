import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '@core/entity.service';
import { DocumentDto, IDocumentDto } from '@models/document.model';
import { Entity, EntityType } from '@models/entity.model';
import { IFlatNode, NodeAttributes, NodeDto } from '@models/node.model';
import { cloneDeep, pick, some } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TemplateService } from './template.service';

@Injectable()
export class DocumentService {

    constructor(
        private entityService: EntityService,
        private templateService: TemplateService,
        private http: HttpClient
    ) { }

    public getDocument(id) {
        return this.entityService.customGet(`document/nodes/${id}`);
    }

    public getAllByType(type: string): Observable<DocumentDto[]> {
        return this.entityService
            .getAll<DocumentDto>(EntityType.Documents)
            .pipe(map(docs => {
                return docs.filter(doc => doc.type === type);
            }));
    }

    public getDocumentNodes(documentId: string): Observable<NodeDto[]> {
        return this.entityService.get<NodeDto[]>(EntityType.DocumentNodes, documentId);
    }

    public create(value: IDocumentDto = {}): Observable<DocumentDto> {
        const template = this.templateService.getTemplate(value.type);

        const payload = {
            title: value.title || 'No name',
            type: value.type,
            entityType: EntityType.Documents,
            nodes: null
        };

        let nodes = value.nodes;
        if (!nodes) {
            nodes = [template.createDefaultNode()];
        }

        payload.nodes = this.processNodesBeforeCreate(nodes);

        return this.entityService.create<DocumentDto>(payload);
    }

    public createNode(node: NodeDto): Observable<NodeDto> {
        node.entityType = EntityType.Nodes;
        return this.entityService.create<any>(node, true);
    }

    public batchCreateNodes(documentId: string, nodes: NodeDto[]): Observable<NodeDto[]> {
        return this.entityService.customPost<{ data: NodeDto[] }>(`document/nodes/${documentId}`, nodes).pipe(map(response => response.data));
    }

    public update(doc: DocumentDto): Observable<DocumentDto> {
        const payload = pick(doc, 'title', 'entityType', 'id', 'type') as DocumentDto;
        return this.entityService.update(payload);
    }

    public updateNode(node: NodeDto): Observable<NodeDto> {
        const payload = pick(node, 'id', 'parentId', 'documentId', 'attributes') as NodeDto;
        payload.entityType = EntityType.Nodes;
        return this.entityService.update(payload);
    }

    public remove(document: DocumentDto): Observable<DocumentDto> {
        return this.entityService.delete(document);
    }

    public removeNodes(documentId: string, nodeIds: string[]): Observable<void> {
        return this.entityService.customPost<void>(`document/nodes/${documentId}/remove`, { nodes: nodeIds });
    }

    public processNodesBeforeCreate(nodes: IFlatNode[] | NodeDto[], document?: IDocumentDto): NodeDto[] {
        const isFlatNodes = some(nodes, (n) => !n['attributes']);
        if (isFlatNodes) {
            return this.convertFlatNodesToNodeDto(nodes, document);
        }

        return this.resetNodeIds(nodes as NodeDto[], document);
    }

    private convertFlatNodesToNodeDto(nodes: IFlatNode[], document?: IDocumentDto): NodeDto[] {
        const dtos: NodeDto[] = [];
        const dtosByOldId = {};

        nodes.forEach(node => {
            const dto = new NodeDto();
            dto.id = Entity.uuid();
            dto.documentId = document ? document.id : null;
            dto.attributes = cloneDeep(node) as NodeAttributes;
            dtos.push(dto);
            dtosByOldId[dto.attributes.id] = dto;
        });

        dtos.forEach(dto => {
            if (dto.attributes.parentId) {
                const parent = dtosByOldId[dto.attributes.parentId];
                if (parent) {
                    dto.parentId = parent.id;
                }
            }

            delete dto.attributes.id;
            delete dto.attributes.parentId;
        });

        return dtos;
    }

    private resetNodeIds(nodes: NodeDto[], document?: IDocumentDto): NodeDto[] {
        const dtos: NodeDto[] = [];
        const dtosByOldId = {};

        nodes.forEach(node => {
            const dto = new NodeDto();
            dto.id = Entity.uuid();
            dto.documentId = document ? document.id : null;
            dto.attributes = node.attributes;
            dtos.push(dto);
            dtosByOldId[node.id] = dto;
        });

        dtos.forEach(dto => {
            if (dto.parentId) {
                const parent = dtosByOldId[dto.parentId];
                if (parent) {
                    dto.parentId = parent.id;
                }
            }
        });

        return dtos;
    }
}
