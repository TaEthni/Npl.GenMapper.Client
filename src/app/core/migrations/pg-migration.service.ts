import { Injectable } from '@angular/core';
import { EntityService } from '@core/entity.service';
import { PeopleGroupModelItem, PeopleGroupService, UnknownPeopleGroup } from '@core/people-group.service';
import { EntityType } from '@models/entity.model';
import { NodeDto, PeopleAttributes } from '@models/node.model';
import { groupBy, keys } from 'lodash';
import { combineLatest } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PgMigrationService {

    constructor(
        private entityService: EntityService,
        private peopleGroupService: PeopleGroupService
    ) { }

    public migrateDocuments(): void {
        combineLatest(
            this.entityService.getAll<NodeDto>(EntityType.AllNodes),
            this.peopleGroupService.load()
        )
            .subscribe(result => {
                const [nodes, peopleGroups] = result;

                this.batch(nodes, peopleGroups.features)

                function chunkArray(myArray, chunk_size) {
                    var index = 0;
                    var arrayLength = myArray.length;
                    var tempArray = [];

                    for (index = 0; index < arrayLength; index += chunk_size) {
                        const chunk = myArray.slice(index, index + chunk_size);
                        // Do something if you want with the group
                        tempArray.push(chunk);
                    }

                    return tempArray;
                }


                const chunks = chunkArray(nodes, 800);

                let len = 0;
                chunks.forEach(c => {
                    len += c.length;
                })

                console.log(nodes.length, len)
                console.log(chunks.length);
                // this.entityService.customPost('nodes-update-all', { nodes: chunks[0] }).subscribe()

                const batch = (req, list: any[]) => {
                    if (!req) { return; }

                    this.entityService.customPost('nodes-update-all', { nodes: req }).subscribe(
                        result => {
                            batch(list.pop(), list);
                        },
                        err => {
                            console.error(err);
                        }
                    )
                }

                // batch(chunks.pop(), chunks);
            })
    }

    public batch(nodes: NodeDto[], peopleGroups: PeopleGroupModelItem[]) {
        nodes = nodes.filter(n => n.attributes.hasOwnProperty('attenders'))
        console.log(nodes.length);
        nodes.forEach(node => {
            node.attributes.peoples = [];

            const def = {} as PeopleAttributes;
            def.identifier = UnknownPeopleGroup.PEID;
            def.label = 'Unknown';
            def.placeOfOrigin = null;
            def.attenders = 0;
            def.believers = 0;
            def.baptized = 0;
            def.newlyBaptized = 0;

            const attenders = parseFloat(node.attributes.attenders as any) || 0
            const believers = parseFloat(node.attributes.believers as any) || 0;
            const baptized = parseFloat(node.attributes.baptized as any) || 0;
            const newlyBaptized = parseFloat(node.attributes.newlyBaptized as any) || 0;

            node.attributes.attenders = attenders;
            node.attributes.believers = believers;
            node.attributes.baptized = baptized;
            node.attributes.newlyBaptized = newlyBaptized;

            node.attributes.peoples.push(def);

            if (node.attributes.peopleGroups) {
                const peidStrings: string[] = node.attributes.peopleGroups.split(',');
                const names: string[] = node.attributes.peopleGroupsNames.split(',');
                const peids: number[] = peidStrings.map((p: string) => parseFloat(p));

                peids.forEach((peid, index) => {
                    const people = {} as PeopleAttributes;
                    const pg = this.peopleGroupService.getByPeid(peid);
                    people.identifier = peid;
                    people.label = pg.NmDisp;
                    people.placeOfOrigin = pg.GENC0;

                    if (!pg) {
                        console.log(peid, node);
                    }

                    if (index === 0) {
                        people.attenders = attenders;
                        people.believers = believers;
                        people.baptized = baptized;
                        people.newlyBaptized = newlyBaptized;
                        if (!node.attributes.country) {
                            node.attributes.country = pg.GENC0;
                        }
                    } else {
                        people.attenders = 0;
                        people.believers = 0;
                        people.baptized = 0;
                        people.newlyBaptized = 0;
                    }

                    node.attributes.peoples.push(people);
                });
            } else {
                def.attenders = attenders;
                def.believers = believers;
                def.baptized = baptized;
                def.newlyBaptized = newlyBaptized;
            }
        });

        nodes.forEach(node => {
            let n = 0;
            node.attributes.peoples.forEach(p => n += p.newlyBaptized);
            if (n !== node.attributes.newlyBaptized) {
                console.log(node);
            }
        })

        const grouped = groupBy(nodes, n => n.parentId);
        keys(grouped).forEach(parentId => {
            const group = grouped[parentId];

            group.forEach((n, index) => {
                if (n.parentId) {
                    n.attributes.nodeOrder = index;
                }
            })
        });

        console.log(nodes.length);
    }
}
