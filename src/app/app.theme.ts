import { Injectable } from '@angular/core';

export const IMAGES_ROOT = 'assets/img/';
export const LAYOUT_PATH = {
    images: {
        root: IMAGES_ROOT,
        profile: IMAGES_ROOT + 'app/profile/'
    }
};
export const IMAGES_PATH = {
    background: LAYOUT_PATH.images.root + 'transblue-bg.jpg',
};

@Injectable()
export class AppTheme {

    private preloaderElement: HTMLElement;

    constructor() {
        this.preloaderElement = document.getElementById('preloader');
    }

    public showPreloader(): void {
        this.preloaderElement.style['display'] = 'block';
    }

    public hidePreloader(delay: number = 0): void {
        setTimeout(() => {
            this.preloaderElement.style['display'] = 'none';
        }, delay);
    }

    public loadBackgroundImage() {
        return this.loadImage(IMAGES_PATH.background);
    }

    public loadImage(src): Promise<any> {
        return new Promise((resolve, reject) => {
                let img = new Image();
                img.src = src;
                img.onload = function() {
                resolve('Image with src ' + src + ' loaded successfully.');
            };
        });
    }
}
