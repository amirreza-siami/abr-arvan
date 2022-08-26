import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Storage service
 * used for persist application data in observable key value pair
 */
export class StorageService {

    constructor() {}

    getItem( key: string ): BehaviorSubject<any> {
        const storageString = localStorage.getItem(key);
        if(storageString) return new BehaviorSubject( JSON.parse(storageString) );
        return new BehaviorSubject(null);
    }

    delItem( key: string ): BehaviorSubject<boolean> {
        localStorage.removeItem(key);
        const storageString = localStorage.getItem(key);
        if(storageString) return new BehaviorSubject(false);
        return new BehaviorSubject(true);
    }

    setItem( key: string, value: string | number ): BehaviorSubject<boolean> {
        localStorage.setItem(key, value.toString());
        const storageString = localStorage.getItem(key);
        if(storageString) return new BehaviorSubject(true);
        return new BehaviorSubject(false);
    }

}