import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'btn-edit',
  template: `<button class="btn btn-sm btn-info" (click)="btnClickedHandler()">Edit</button>`,
})
export class GridEditBtnComponent implements ICellRendererAngularComp {
  private params: any;

  constructor(
    private router: Router
  ) { }

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.router.navigate(["/articles/edit/" + this.params.data.slug])
  }

  refresh() {
    return false;
  }
}

