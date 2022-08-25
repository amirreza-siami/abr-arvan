import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    topToasts: any[] = [];
    bottomToasts: any[] = [];
    defaultDelay = 5;

    constructor() { }

    /**
     * shows a successfull message like a notification to the user
     * @param message the message to be displayed
     * @param title the title of the toast message
     * @param delay number of seconds to toast be faded away
     * @param position the position of toaster to be in top OR bottom
     */
    success(message: string | TemplateRef<any>, title: string = '', delay: number = this.defaultDelay, position: 'top' | 'bottom' = 'top') {
        if (position === 'top')
            this.topToasts.push({ message, classname: 'bg-success text-light ', delay: delay * 1000, header: title, position });
        if (position === 'bottom')
            this.bottomToasts.push({ message, classname: 'bg-success text-light ', delay: delay * 1000, header: title, position });
    }

    /**
     * shows a warning message like a notification to the user
     * @param message the message to be displayed
     * @param title the title of the toast message
     * @param delay number of seconds to toast be faded away
     * @param position the position of toaster to be in top OR bottom
     */
    warning(message: string | TemplateRef<any>, title: string = '', delay: number = this.defaultDelay, position: 'top' | 'bottom' = 'top') {
        if (position === 'top')
            this.topToasts.push({ message, classname: 'bg-warning text-dark ', delay: delay * 1000, header: title, position });
        if (position === 'bottom')
            this.bottomToasts.push({ message, classname: 'bg-warning text-dark ', delay: delay * 1000, header: title, position });

    }

    /**
     * shows a error message like a notification to the user
     * @param message the message to be displayed
     * @param title the title of the toast message
     * @param delay number of seconds to toast be faded away
     * @param position the position of toaster to be in top OR bottom
     */
    error(message: string | TemplateRef<any>, title: string = '', delay: number = this.defaultDelay, position: 'top' | 'bottom' = 'top') {
        if (position === 'top') {
            this.topToasts.push({ message, classname: 'bg-danger text-light ', delay: delay * 1000, header: title, position });
        }
        if (position === 'bottom')
            this.bottomToasts.push({ message, classname: 'bg-danger text-light ', delay: delay * 1000, header: title, position });

    }

    /**
     * remove a toast from toasts array
     * @param toast the toast to be removed
     */
    remove(toast: any) {
        this.topToasts = this.topToasts.filter(t => t !== toast);
        this.bottomToasts = this.bottomToasts.filter(t => t !== toast);
    }
}
