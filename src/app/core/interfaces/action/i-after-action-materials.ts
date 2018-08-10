import { IAfterActionResult } from './i-after-action-result';
import { EventEmitter } from '@angular/core';

export interface IAfterActionMaterials {
    create?: EventEmitter<IAfterActionResult>;
    update?: EventEmitter<IAfterActionResult>;
    delete?: EventEmitter<IAfterActionResult>;
    reset?: EventEmitter<IAfterActionResult>;
}
