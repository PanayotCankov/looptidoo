//angular imports
import { Component, OnInit, HostBinding, ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute, Params, UrlSegment } from '@angular/router';

//nativescript imports
import { RouterExtensions } from 'nativescript-angular/router';
import { SegmentedBar } from 'ui/segmented-bar';

import * as dialogs from "ui/dialogs";
import { ModalDialogService, ModalDialogOptions, ModalDialogParams } from 'nativescript-angular/modal-dialog'
//import { ModalDialogService, ModalDialogOptions, ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ItemTypePickerModalComponent } from "../shared/item-type-picker-modal.component";
import { UserPickerModalComponent } from "../shared/user-picker-modal.component";

//3rd party imports
import 'rxjs/add/operator/switchMap';

//app imports
import { slideInDownAnimation, slideInAnimations } from '../../shared/animations';
import { BacklogService, AuthenticationService } from '../../services';
import { ItemTypeEnum, PriorityEnum } from '../../shared/static-data';
import { PTDomain } from '../../typings/domain';
import IPTItem = PTDomain.IPTItem;
import IUser = PTDomain.IUser;


@Component({
    moduleId: module.id,
    selector: 'pt-item-details',
    templateUrl: 'pt-item-details.component.html',
    animations: slideInAnimations
})
export class PTItemDetailsComponent {
    //@HostBinding('@routeAnimation') routeAnimation = true;

    public item: IPTItem;
    private selectedViewIndex = 0;

    public get animationState() {
        return this.selectedViewIndex === 2 ? 'off' : 'on';
    }

    public formFieldGridCols = '90, *, 90';



    public get priorityDecEnabled() {
        return !PriorityEnum.isMin(this.item.priority);
    }

    public get priorityIncEnabled() {
        return !PriorityEnum.isMax(this.item.priority);
    }

    constructor(private route: ActivatedRoute,
        private router: Router,
        private routerExtensions: RouterExtensions,
        private backlogService: BacklogService,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef) { }


    public ngOnInit() {
        console.log('init item details: ' + this.route.parent.toString());

        this.route.parent.params
            .switchMap((params: Params) => this.backlogService.getItem(params['id']))
            .subscribe((item: IPTItem) => this.item = item);
    }


    public changeMeTapped() {
        //this.item.estimate++;
        this.backlogService.incrementEstimate(this.item);
        this.backlogService.switchAssignee(this.item);
    }

    public textViewFieldHeight(value: string): number {
        if (value) {
            let lineHeight = 20;
            let numlines = Math.ceil(value.length / 36);
            let newHeight = ((numlines < 2 ? 2 : numlines) * lineHeight) + 10;
            return newHeight < 150 ? newHeight : 150;
        }
        else {
            return 40;
        }
    }

    public titleChange(newVal: string) {
        this.item.title = newVal;
        this.backlogService.updatePtItem(this.item);
    }

    public descriptionChange(newVal: string) {
        this.item.description = newVal;
        this.backlogService.updatePtItem(this.item);
    }

    public estimateIncDecTapped(incdec: boolean) {
        this.backlogService.updatePtItemEstimate(this.item, incdec);
    }

    public priorityIncDecTapped(incdec: boolean) {
        this.backlogService.updatePtItemPriority(this.item, incdec);
    }

    public showTypeModal() {
        const options: ModalDialogOptions = {
            context: { promptMsg: "Select item type" },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };

        this.modal.showModal(ItemTypePickerModalComponent, options).then((res: ItemTypeEnum) => {
            this.backlogService.updatePtItemType(this.item, res);
        });
    }

    public showAssigneeModal() {
        const options: ModalDialogOptions = {
            context: { promptMsg: "Select assignee" },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };

        this.modal.showModal(UserPickerModalComponent, options).then((res: IUser) => {
            this.backlogService.updatePtItemAssignee(this.item, res);
        });
    }

}