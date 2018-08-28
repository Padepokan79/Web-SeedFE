import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DATE } from '../../constant/constant';

@Injectable()
export class ValueAdapterService {

    constructor(private _datePipe: DatePipe) { }

    public transform(source: any): any {
        return this.mappingValues(source, source);
    }

    private mappingValue(source: any,
                         result: any,
                         field: string): any {
        if (source instanceof Array) {
            if (Array.isArray(source) && source.length !== 0) {
                result[field] = source.map(
                    (value: object) => this.mappingValues(value, value)
                );
            }
        } else if (source instanceof Date) {
            result[field] = this._datePipe.transform(source, DATE.YEAR_MONTH_DATE);
        } else if (typeof source === 'boolean') {
            result[field] = source ? 1 : 0;
        } else {
            result[field] = source;
        }

        return result;
    }

    private mappingValues(source: any,
                          result: any): any {
        Object.keys(result)
                .forEach((key, index) => {
                    if (source.hasOwnProperty(key)) {
                        const sourceValue = source[key];
                        this.mappingValue(sourceValue, result, key);
                    }
                });

        return result;
    }
}
