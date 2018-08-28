import { Injectable } from '@angular/core';

@Injectable()
export class AppLoader {

    private loaders: Array<Promise<any>> = [];

    constructor() {
        // Do Nothing : Patrick Star Quote's
    }

    public load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.executeAll(resolve);
        });
    }

    public register(method: Promise<any>): void {
        this.loaders.push(method);
    }

    public clear(): void {
        this.loaders = [];
    }

    private executeAll(done: () => void): void {
        setTimeout(() => {
            Promise.all(this.loaders).then((values) => {
                done.call(null, values);
            }).catch((error) => {
                console.error(error);
            });
        });
    }
}
