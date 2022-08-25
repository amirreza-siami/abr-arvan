import { Component, OnInit } from '@angular/core';
import {ToastService} from "./toast-service.service";

@Component({
    selector: 'app-toasts-container',
    templateUrl: './toaster.component.html',
    styleUrls: ['./toaster.component.css']
})
export class ToastsContainerComponent implements OnInit {

    constructor(public toastService: ToastService) { }

    ngOnInit() {
    }

}
