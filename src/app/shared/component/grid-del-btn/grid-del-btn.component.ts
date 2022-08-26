import { Component, OnDestroy } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'btn-del',
    template: `
    <button class="btn btn-sm btn-danger" (click)="btnClickedHandler(content)">Delete</button>
    <ng-template #content let-modal>
  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">Delete Article</h4>
    <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-body">
  Are you sure to delete Article?
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="modal.dismiss('Cross click')">No</button>
    <button type="button" class="btn btn-danger" (click)="confirmedDelete()">Yes</button>
  </div>
</ng-template>
  `,
})
export class GridDelBtnComponent implements ICellRendererAngularComp {
    private params: any;

    constructor(
        private modalService: NgbModal
    ) {}

    agInit(params: any): void {
        this.params = params;
    }

    btnClickedHandler(event: any) {
        this.modalService.open(event);
    }

    confirmedDelete(){
        this.params.clicked(this.params.data);
    }

    refresh() {
        return false;
    }
}
