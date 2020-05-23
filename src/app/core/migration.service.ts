import { Injectable } from '@angular/core';
import { DocumentDto } from '@models/document.model';
import { Entity, EntityType } from '@models/entity.model';
import { NodeAttributes, NodeDto } from '@models/node.model';
import { cloneDeep } from 'lodash';
import { GNode } from '../tools/gen-mapper/gen-mapper.interface';
import { NodeTreeService } from '../tools/gen-mapper/node-tree/node-tree.service';
import { CSVToJSON } from './csv-to-json';
import { EntityService } from './entity.service';
import { TemplateService } from './template.service';

@Injectable({
    providedIn: 'root'
})
export class MigrationService {

    constructor(
        private entityService: EntityService,
        private templateService: TemplateService
    ) { }

    public migrateDocuments(): void {
        const nodeTree = new NodeTreeService();
        this.entityService
            .getAll<DocumentDto>(EntityType.AllDocuments)
            .subscribe(docs => {
                docs.forEach(doc => {
                    const template = this.templateService.getTemplate(doc.type);

                    if (!template) {
                        return;
                    }

                    const nodes = CSVToJSON(doc.content, template);

                    if (!nodeTree.validateTree(nodes)) {
                        console.log(doc.id, doc.type);
                        return;
                    }

                    this.batchInsertNodes(doc, nodes).subscribe();
                });
            })
    }

    public batchInsertNodes(doc: DocumentDto, nodes: GNode[]) {
        const template = this.templateService.getTemplate(doc.type);
        const dtos = [];
        const dtosByOldId = {};

        nodes.forEach(node => {
            const dto = new NodeDto();
            dto.id = Entity.uuid();
            dto.documentId = doc.id;
            dto.attributes = cloneDeep(node) as unknown as NodeAttributes;
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

        return this.entityService.customPost(`document/nodes/${doc.id}`, dtos);
    }
}
