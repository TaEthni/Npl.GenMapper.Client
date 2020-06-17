import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { LocaleService } from '@core/locale.service';
import { OtherPeopleGroup, UnknownPeopleGroup } from '@core/people-group.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { ActionType } from '@models/action-type';
import { DocumentDto } from '@models/document.model';
import { NodeDto, PeopleAttributes } from '@models/node.model';
import { Template } from '@models/template.model';
import { FileInputDialogComponent } from '@shared/file-input-dialog/file-input-dialog.component';
import { ControlType, GMField } from '@templates';
import { assign, cloneDeep } from 'lodash';
import { filter, takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { PeopleDialogComponent, PeopleDialogConfig, PeopleDialogResponse } from '../dialogs/people-dialog/people-dialog.component';
import { AddPeopleGroupConfig, SelectPeopleGroupDialogComponent } from '../dialogs/select-people-group-dialog/select-people-group-dialog.component';
import { GenMapperService } from '../gen-mapper.service';
import { NodeClipboardService } from '../node-clipboard.service';

@Component({
    selector: 'app-node-drawer',
    templateUrl: './node-drawer.component.html',
    styleUrls: ['./node-drawer.component.scss']
})
export class NodeDrawerComponent extends Unsubscribable implements OnInit {
    public node: NodeDto;
    public nodes: NodeDto[];
    public document: DocumentDto;
    public documents: DocumentDto[];
    public template: Template;
    public isNodeInClipboard: boolean;
    public fields: GMField[];
    public form: FormGroup;
    public pendingPeoples: PeopleAttributes[] = [];
    public selectedTabIndex = 0;

    @Input()
    public hideActions: boolean;

    @Output()
    public pasteAsChildNode = new EventEmitter<NodeDto>();

    @Output()
    public replaceNode = new EventEmitter<NodeDto>();

    @Output()
    public copyNode = new EventEmitter<NodeDto>();

    @Output()
    public updateNode = new EventEmitter<NodeDto>();

    @Output()
    public deleteNode = new EventEmitter<NodeDto>();

    @Output()
    public importSubtree = new EventEmitter<NodeDto>();

    constructor(
        private localeService: LocaleService,
        private genMapper: GenMapperService,
        private nodeClipboard: NodeClipboardService,
        private drawer: MatDrawer,
        private dialog: MatDialog,
    ) { super(); }

    public ngOnInit(): void {

        this.genMapper.template$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(template => {
                this.fields = template.fields;
                this.template = template;
                this.initializeForm();
            });

        this.genMapper.documents$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(documents => this.documents = documents);

        this.genMapper.selectedDocument$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(document => {
                this.document = document;
            });

        this.genMapper.selectedNode$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(node => {
                this.node = node;

                if (this.node) {
                    this.configureNode();
                }

                if (this.node) {
                    this.drawer.open();
                } else {
                    this.form.reset();
                    this.drawer.close();
                }
            });

        this.genMapper.nodes$.pipe(takeUntil(this.unsubscribe)).subscribe(nodes => {
            this.nodes = nodes;
        });

        this.nodeClipboard.get()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.checkClipboard(result);
            });
    }

    public configureNode(): void {
        this.checkClipboard();
        this.pendingPeoples = cloneDeep(this.node.attributes.peoples);
        this.form.reset(this.node.attributes);
        this.form.patchValue({ parentId: this.node.parentId });
    }

    public onBackdropClick(): void {
        this.drawer.disableClose = this.form.dirty;

        if (this.form.dirty && this.drawer.disableClose) {
            this.dialog
                .open(ConfirmDialogComponent, {
                    data: {
                        title: this.localeService.t('Common_SaveChanges'),
                        prompt: this.localeService.t('Common_SaveChangesQuestion'),
                        buttons: [
                            this.localeService.t('Common_Yes'),
                            this.localeService.t('Common_Cancel'),
                        ],
                    }
                })
                .afterClosed()
                .subscribe(result => {
                    if (result) {
                        this.onSave();
                    }
                });
        } else {
            this.drawer.close();
        }
    }

    public onSave(): void {
        // if node is active, then remove reason for being inactive.

        const value = this.form.getRawValue();
        if (value.hasOwnProperty('active') && value.hasOwnProperty('inactiveReason') && value.active) {
            value.inactiveReason = null;
        }

        assign(this.node.attributes, value);
        this.node.attributes.peoples = this.pendingPeoples;
        this.node.parentId = value.parentId;
        delete this.node.attributes.parentId;

        // Apply Peoples Attributes to field Attributes
        const peopleField = this.template.getField('peoples');
        peopleField.fields.forEach(field => {
            this.node.attributes[field.id] = 0;
        });
        this.node.attributes.peoples.forEach(people => {
            peopleField.fields.forEach(field => {
                this.node.attributes[field.id] += people[field.id];
            });
        });

        this.updateNode.emit(this.node);
        this.drawer.disableClose = false;
        this.genMapper.setNode(null);
    }

    public onReplaceNode(): void {
        this.dialog
            .open(ConfirmDialogComponent, {
                data: {
                    title: this.localeService.t('Message_confirmReplaceNode'),
                    alert: this.localeService.t('Message_confirmReplaceNodeWarning'),
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.replaceNode.emit(this.node);
                    this.drawer.close();
                }
            });
    }

    public onPastAsChildNode(): void {
        this.dialog
            .open(ConfirmDialogComponent, {
                data: {
                    title: this.localeService.t('Message_confirmPasteAsChildNode'),
                    alert: this.localeService.t('Message_confirmPasteAsChildNodeWarning'),
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.pasteAsChildNode.emit(this.node);
                    this.drawer.close();
                }
            });
    }

    public onCopyNode(): void {
        this.copyNode.emit(this.node);
        this.checkClipboard();
    }

    public onImportSubtree(): void {
        this.dialog
            .open(FileInputDialogComponent, { minWidth: '350px' })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    // Update graph
                    // this.graph.csvIntoNode(node, result.content);

                    this.importSubtree.emit(result.content);
                    this.drawer.close();
                }
            });
    }

    public onCancel(): void {
        this.configureNode();
        this.drawer.disableClose = this.form.dirty;
        if (!this.drawer.disableClose) {
            this.drawer.close();
        }
    }

    public onDeleteNode(): void {
        this.deleteNode.emit(this.node);
    }

    public onFormChange(value: NodeDto): void {
        this.drawer.disableClose = this.form.dirty;
    }

    public selectPeople(people: PeopleAttributes): void {
        this.dialog
            .open<PeopleDialogComponent, PeopleDialogConfig, PeopleDialogResponse>(
                PeopleDialogComponent, {
                autoFocus: false,
                data: {
                    template: this.template,
                    people: people
                }
            })
            .afterClosed()
            .pipe(filter(r => !!r))
            .subscribe(result => {
                if (result.actionType === ActionType.Success) {
                    Object.assign(people, result.people);
                    this.pendingPeoples = this.pendingPeoples.slice();
                    this.form.markAsDirty();
                }

                if (result.actionType === ActionType.Update) {
                    this.changePeopleGroup(people);
                }

                if (result.actionType === ActionType.Delete) {
                    this.removePendingPeoples(result.people);
                }
            });
    }

    public addPeopleGroup(): void {
        const countryField = this.fields.find(field => field.type === ControlType.countrySelector);

        if (!countryField) {
            return;
        }

        this.dialog
            .open<SelectPeopleGroupDialogComponent, AddPeopleGroupConfig, PeopleAttributes>(
                SelectPeopleGroupDialogComponent, {
                data: {
                    countryCode: this.form.get(countryField.id).value,
                    template: this.template,
                    peoples: this.pendingPeoples
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.insertPendingPeoples(result);
                    this.selectPeople(result);
                }
            })
    }

    public changePeopleGroup(people: PeopleAttributes): void {
        const countryField = this.fields.find(field => field.type === ControlType.countrySelector);

        if (!countryField) {
            return;
        }

        const country = people.placeOfOrigin || this.form.get(countryField.id).value;

        this.dialog
            .open<SelectPeopleGroupDialogComponent, AddPeopleGroupConfig, PeopleAttributes>(
                SelectPeopleGroupDialogComponent, {
                data: {
                    countryCode: country,
                    template: this.template,
                    peoples: this.pendingPeoples,
                    selectedPeople: people,
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.removePendingPeoples(people);
                    this.insertPendingPeoples(result);
                    this.insertUnknownPeopleGroupAtBeginning();
                }
            })
    }

    private initializeForm(): void {
        const group: any = {};
        const fields: { name: string, order: number }[] = [];

        this.fields
            .filter(field => !!field.type)
            .forEach(field => {
                fields.push({ name: field.id, order: field.controlOrder });
            });

        fields.sort((a, b) => a.order - b.order)
            .forEach(field => {
                group[field.name] = new FormControl(null);
            });

        // Add custom control for parentId
        group.parentId = new FormControl(null);

        if (group.location) {
            group.placeId = new FormControl(null);
            group.latitude = new FormControl(null);
            group.longitude = new FormControl(null);
        }

        this.form = new FormGroup(group);

        this.form.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => {
                // we use getRawValue instead of form.value, so we can also get disabled controls
                this.drawer.disableClose = this.form.dirty;
            });
    }

    private checkClipboard(clipboard?: NodeDto[]): void {
        clipboard = clipboard || this.nodeClipboard.getValue();
        if (!clipboard) {
            this.isNodeInClipboard = false;
        }

        if (clipboard) {
            const root = clipboard.find(n => !n.parentId);
            if (root && root.id === this.node.id) {
                this.isNodeInClipboard = false;
            } else {
                this.isNodeInClipboard = true;
            }
        }
    }

    private insertPendingPeoples(people: PeopleAttributes): void {
        let found;

        if (people.identifier === OtherPeopleGroup.PEID) {
            found = this.pendingPeoples.find(f => f.identifier === people.identifier && f.placeOfOrigin === people.placeOfOrigin && f.label === people.label);
        } else {
            found = this.pendingPeoples.find(f => f.identifier === people.identifier);
        }

        if (found) {
            Object.assign(found, people);
        } else {
            this.pendingPeoples.push(people);
        }

        this.form.markAsDirty();
    }

    private insertUnknownPeopleGroupAtBeginning(): void {
        const unknown = this.pendingPeoples.find(p => p.identifier === UnknownPeopleGroup.PEID);
        if (unknown) {
            return;
        }

        const people = {} as PeopleAttributes;
        people.identifier = UnknownPeopleGroup.PEID;
        people.label = UnknownPeopleGroup.NmDisp;
        people.placeOfOrigin = null;

        const peopleField = this.template.getField('peoples');
        peopleField.fields.forEach(field => {
            people[field.id] = field.defaultValue || 0;
        });

        this.pendingPeoples.unshift(people);
    }

    public removePendingPeoples(people: PeopleAttributes): void {
        const found = this.pendingPeoples.find(f => f.identifier === people.identifier && f.placeOfOrigin === people.placeOfOrigin);
        const index = this.pendingPeoples.indexOf(found);
        if (index > -1) {
            this.pendingPeoples.splice(index, 1);
        }

        this.form.markAsDirty();
    }
}
