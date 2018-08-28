import { ISimplifiedFilterOperand } from './../../interfaces/main/i-simplified-filter-operand';
import { ISimplifiedFilterComponent } from './../../interfaces/main/i-simplified-filter-component';
import { ConjunctionOperatorValue } from './../../enums/conjunction-operator.enum';
import { ComparisonOperatorValue } from './../../enums/comparison-operator.enum';
import { DATE } from './../../constant/constant';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { IFilterOperand } from '../../interfaces/main/i-filter-operand';
import { IFilterComponent } from '../../interfaces/main/i-filter-component';

@Injectable()
export class FilterAdapterService {

    constructor(private _datePipe: DatePipe) { }

    public transform(source: IFilterComponent | IFilterOperand | ISimplifiedFilterComponent | ISimplifiedFilterOperand, mode: any = null): any {
        const filterQuery = '';
        return this.generateFilterQuery(source, filterQuery);
    }

    private generateFilterQuery(operand: IFilterComponent | IFilterOperand | ISimplifiedFilterComponent | ISimplifiedFilterOperand, filterQuery: string): string {
        if (this.isSimplifiedFilterOperand(operand)) {
            const simplifiedFilterOperand = operand as ISimplifiedFilterOperand;
            return this.generateFilterQueryFromSimplifiedFilterOperand(simplifiedFilterOperand, filterQuery);
        } else if (this.isSimplifiedFilterComponent(operand)) {
            const simplifiedFilterComponent = operand as ISimplifiedFilterComponent;
            return this.generateFilterQueryFromSimplifiedFilterComponent(simplifiedFilterComponent, filterQuery);
        } else if (this.isFilterOperand(operand)) {
            const filterOperand = operand as IFilterOperand;
            return this.generateFilterQueryFromFilterOperand(filterOperand, filterQuery);
        } else {
            const filterComponent = operand as IFilterComponent;
            return this.generateFilterQueryFromFilterComponent(filterComponent, filterQuery);
        }
    }

    private generateFilterQueryFromFilterOperand(filterOperand: IFilterOperand, filterQuery: string): string {
        let filterOperator = '';
        const component = filterOperand.component;

        for (const key in component) {
            if (component.hasOwnProperty(key)) {
                if (this.isFilterOperand(component[key])) {
                    const recursivefilterOperand = component[key]['component'] as IFilterOperand;
                    filterQuery += filterOperator + this.generateFilterQuery(recursivefilterOperand, '');
                    filterOperator = filterOperand.operator;
                } else {
                    const filterComponent = component[key] as IFilterComponent;
                    filterQuery += filterOperator + this.generateFilterQueryFromFilterComponent(filterComponent, '');
                    filterOperator = filterOperand.operator;
                }
            }
        }

        if (filterQuery) {
            filterQuery = '(' + filterQuery + ')';
        }

        return filterQuery;
    }

    private generateFilterQueryFromSimplifiedFilterOperand(filterOperand: ISimplifiedFilterOperand, filterQuery: string): string {
        let filterOperator = '';
        const filterOperandValue = filterOperand.criteria;
        const component = filterOperandValue[1];

        for (const key in component) {
            if (component.hasOwnProperty(key)) {
                if (this.isSimplifiedFilterOperand(component[key])) {
                    const recursivefilterOperand = component[key] as ISimplifiedFilterOperand;
                    filterQuery += filterOperator + this.generateFilterQuery(recursivefilterOperand, '');
                    filterOperator = ConjunctionOperatorValue[filterOperandValue[0]];
                } else {
                    const filterComponent = component[key] as ISimplifiedFilterComponent;
                    filterQuery += filterOperator + this.generateFilterQueryFromSimplifiedFilterComponent(filterComponent, '');
                    filterOperator = ConjunctionOperatorValue[filterOperandValue[0]];
                }
            }
        }

        if (filterQuery) {
            filterQuery = '(' + filterQuery + ')';
        }

        return filterQuery;
    }

    private generateFilterQueryFromFilterComponent(filterComponent: IFilterComponent, filterQuery: string): string {
        const filterValue = this.getFilterValue(filterComponent.value);

        filterQuery += filterComponent.field
                    + filterComponent.operator
                    + filterValue;

        return filterQuery;
    }

    private generateFilterQueryFromSimplifiedFilterComponent(filterComponent: ISimplifiedFilterComponent, filterQuery: string): string {
        const filterComponentValue = filterComponent.criterion;
        const filterValue = this.getFilterValue(filterComponentValue[2]);

        filterQuery += filterComponentValue[0]
                    + ComparisonOperatorValue[filterComponentValue[1]]
                    + filterValue;

        return filterQuery;
    }

    private getFilterValue(value: any): string {
        if (value instanceof Date) {
            return "'" + this._datePipe.transform(value, DATE.YEAR_MONTH_DATE) + "'";
        } else if (typeof value === 'string') {
            return "'" + value + "'";
        } else {
            return value;
        }
    }

    private isFilterOperand(operand: any) {
        return operand.hasOwnProperty('component');
    }

    private isSimplifiedFilterOperand(operand: any) {
        return operand.hasOwnProperty('criteria');
    }

    private isSimplifiedFilterComponent(operand: any) {
        return operand.hasOwnProperty('criterion');
    }

}
