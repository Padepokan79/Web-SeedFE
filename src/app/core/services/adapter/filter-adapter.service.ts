import { DATE } from './../../constant/constant';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { IFilterOperand } from '../../interfaces/main/i-filter-operand';
import { IFilterComponent } from '../../interfaces/main/i-filter-component';

@Injectable()
export class FilterAdapterService {

    constructor(private _datePipe: DatePipe) { }

    public transform(source: IFilterOperand | IFilterComponent, mode: any = null): any {
        let filterQuery = '';
        return this.generateFilterQuery(source, filterQuery);
    }

    private generateFilterQuery(operand: IFilterOperand | IFilterComponent, filterQuery: string): string {

        if (operand.hasOwnProperty('component')) {
            operand = operand as IFilterOperand;
            let component = operand.component;
            let filterOperator = '';
            let filterValue = '';

            for (let key in component) {
                if (component.hasOwnProperty(key)) {
                    let filterComponent = component[key];

                    if (filterComponent.value instanceof Date) {
                        filterValue = "'" + this._datePipe.transform(filterComponent.value, DATE.YEAR_MONTH_DATE) + "'";
                    } else if (typeof filterComponent.value === 'string') {
                        filterValue = "'" + filterComponent.value + "'";
                    } else {
                        filterValue = filterComponent.value;
                    }

                    filterQuery += filterOperator
                                + filterComponent.field
                                + filterComponent.operator // + ComparisonOperator[filterComponent.operator]
                                + filterValue;

                    filterOperator = operand.operator; // ConjunctionOperator[operand.operator];
                }
            }

            return filterQuery;
        } else {
            let filterValue = '';
            let filterComponent = operand as IFilterComponent;

            if (filterComponent.value instanceof Date) {
                filterValue = "'" + this._datePipe.transform(filterComponent.value, DATE.YEAR_MONTH_DATE) + "'";
            } else if (typeof filterComponent.value === 'string') {
                filterValue = "'" + filterComponent.value + "'";
            } else {
                filterValue = filterComponent.value;
            }

            filterQuery += filterComponent.field
                        + filterComponent.operator // + ComparisonOperator[filterComponent.operator]
                        + filterValue;

            return filterQuery;
        }
    }
}
