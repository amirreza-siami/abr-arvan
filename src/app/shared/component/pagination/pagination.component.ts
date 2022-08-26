import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

    @Input() totlaRows: number = 0;
    @Input() pageSize: number = 1;

    @Output() onClick: EventEmitter<{pageSize: number; pageIndex: number}> = new EventEmitter<{pageSize: number; pageIndex: number}>();

    paginationItems: { value: number; active: boolean, caption?: string, captionCode?: "next" | "prevoius" | "last" | "first" | "previousOther" | "nextOther", hide?: boolean }[] = new Array();
    currentPageNumber: number = 1;

    constructor() { }

    ngOnInit(): void {

        this.calcPaginationItems();

    }

    calcPaginationItems() {

        // mthode required
        if (!this.totlaRows) return;

        // methode variables
        const paginationLimit = Math.ceil(this.totlaRows / this.pageSize) - 1; //always round up to create last page
        this.paginationItems = new Array();

        // create first link
        if (paginationLimit && paginationLimit > 3) {
            this.paginationItems.push({
                value: 1,
                active: false,
                caption: "Firs Page",
                captionCode: "first"
            });
        }

        // create prevoius link
        this.paginationItems.push({
            value: this.currentPageNumber !== 1 ? this.currentPageNumber - 1 : 1,
            active: false,
            caption: "Prevoius Page",
            captionCode: "prevoius",
            hide: false,
        });

        // create previousOther link
        this.paginationItems.push({
            value: 0,
            active: false,
            caption: "...",
            captionCode: "previousOther",
            hide: true,
        });

        // create pagination items
        for (let index = 1; index <= paginationLimit; index++) {
            this.paginationItems.push({
                value: index,
                active: index === 1 ? true : false,
                hide: index > this.currentPageNumber + 2 ? true : false,
            });
        }

        // create nextOther link
        if (paginationLimit && paginationLimit > 3) {
            this.paginationItems.push({
                value: 0,
                active: false,
                caption: "...",
                captionCode: "nextOther"
            });
        }

        // create next link
        if (paginationLimit && paginationLimit > 3) {
            this.paginationItems.push({
                value: this.currentPageNumber !== paginationLimit ? this.currentPageNumber + 1 : paginationLimit,
                active: false,
                caption: "Next Page",
                captionCode: "next"
            });
        }

        // create last link
        if (paginationLimit && paginationLimit > 3) {
            this.paginationItems.push({
                value: paginationLimit,
                active: false,
                caption: "Last Page",
                captionCode: "last"
            });
        }

    }

    onChangePagination(pItem: any) {
        if (pItem.captionCode && (pItem.captionCode === 'nextOther' || pItem.captionCode === 'previousOther')) return;
        else this.changePagination(pItem.value);
    }

    changePagination(paginationNumber: number | undefined) {
        const paginationItemsWithoutCaptions = this.paginationItems.filter(paginationItem => !paginationItem.captionCode);

        this.paginationItems.forEach(paginationItem => {
            if (paginationItem.value === paginationNumber)
                this.currentPageNumber = paginationItem.value;
        })

        // mthode required
        // if (this.paginationItems && this.paginationItems.length) return;

        // toggle active pagination
        this.paginationItems.forEach(paginationItem => {
            paginationItem.active = false;

            if (typeof paginationNumber === "number" && paginationNumber && paginationNumber === paginationItem.value) paginationItem.active = true;
        });

        // set slice start/end
        if (typeof paginationNumber === "number" && paginationNumber) {
            this.onClick.emit({ pageSize: this.pageSize, pageIndex: paginationNumber });
        }

        //update pagination items
        this.paginationItems.forEach(paginationItem => {
            if (typeof paginationNumber === "number" && paginationNumber) {

                if (!paginationItem.caption) {
                    if (paginationItem.value < this.currentPageNumber && paginationItem.value + 3 > this.currentPageNumber) {
                        paginationItem.hide = false
                    } else if (paginationItem.value > this.currentPageNumber && paginationItem.value < this.currentPageNumber + 3) {
                        paginationItem.hide = false;
                    } else if (paginationItem.value === this.currentPageNumber) {
                        paginationItem.hide = false;
                    } else {
                        paginationItem.hide = true;
                    }
                } else {
                    switch (paginationItem.captionCode) {

                        case "next": {
                            paginationItem.value = paginationNumber !== paginationItemsWithoutCaptions[paginationItemsWithoutCaptions.length - 1].value ? paginationNumber + 1 : paginationItemsWithoutCaptions[paginationItemsWithoutCaptions.length - 1].value;
                            break;
                        }

                        case "prevoius": {
                            paginationItem.value = paginationNumber !== 1 ? paginationNumber - 1 : 1;
                            break;
                        }

                        case "previousOther": {
                            paginationItem.hide = this.currentPageNumber > 3 ? false : true;
                            break;
                        }

                        case "nextOther": {
                            paginationItem.hide = this.currentPageNumber < this.paginationItems[this.paginationItems.length - 1].value - 2 ? false : true;
                            break;
                        }
                    }
                }
            }
        });
    }

    onPaginationChunkChanged() {
        this.currentPageNumber = 1;
        this.onClick.emit({ pageSize: this.pageSize, pageIndex: 1 });
        this.calcPaginationItems(); // rebuild paginatio item/number
    }

}
