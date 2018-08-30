import { Conjunction } from './../../enums/conjunction-operator.enum';
import { ISimplifiedFilterOperand } from './../../interfaces/main/i-simplified-filter-operand';
import { ISimplifiedFilterComponent } from './../../interfaces/main/i-simplified-filter-component';
import { operators } from 'rxjs';
import { DATE, TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from './../../constant/constant';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ISearchKey } from '../../interfaces/main/i-search-key';
import { FilterAdapterService } from '../adapter/filter-adapter.service';
import { IPagingParams } from '../../interfaces/main/i-paging-params';
import { IFilterOperand } from '../../interfaces/main/i-filter-operand';
import { IFilterComponent } from '../../interfaces/main/i-filter-component';
import { Comparison } from '../../enums/comparison-operator.enum';

export class PaginationService {

    public searchKeys: ISearchKey[];
    public selectedSearchKey: ISearchKey;
    public searchValue: any;

    public filters: Map<string, IFilterOperand | IFilterComponent | ISimplifiedFilterComponent | ISimplifiedFilterOperand>;
    public pagingParams: IPagingParams;

    constructor(private _datePipe: DatePipe) {
        this.searchKeys = [];
        this.filters = new Map<string, IFilterOperand | IFilterComponent | ISimplifiedFilterComponent | ISimplifiedFilterOperand>();
        this.pagingParams = {} as IPagingParams;
    }

    public initSearchKeys(searchKeys: ISearchKey[]) {
        if (searchKeys && searchKeys.length !== 0) {
            this.searchKeys = searchKeys;
            this.selectedSearchKey = searchKeys[0];
        }
    }

    public initPagingParams(pagingParams: IPagingParams) {
        this.pagingParams = pagingParams;

        if (!this.pagingParams.orderby) {
            this.pagingParams.orderby = '';
        }

        if (!this.pagingParams.offset) {
            this.pagingParams.offset = 0;
        }

        if (!this.pagingParams.limit) {
            this.pagingParams.limit = 5;
        }
    }

    public filter() {
        return this.pagingParams.filter;
    }

    public orderby() {
        return this.pagingParams.orderby;
    }

    public limit() {
        return this.pagingParams.limit;
    }

    public offset() {
        return this.pagingParams.offset;
    }

    public setFilterWithSearchCriteria() {
        this.filters.set('serverSideSearchData', this.convertSearchAsFilter());
    }

    public setFilter(value: IFilterOperand | IFilterComponent | ISimplifiedFilterComponent | ISimplifiedFilterOperand, filterKey?: string) {
        if (value) {
            if (filterKey) {
                this.filters.set(filterKey, value);
            } else {
                this.filters.set('default', value);
            }
        }
    }

    public setOrderBy(value: string) {
        this.pagingParams.orderby = value;
    }

    public setLimit(value: number) {
        this.pagingParams.limit = value;
    }

    public setOffset(value: number) {
        this.pagingParams.offset = value;
    }

    public params(externalPaging: boolean = true) {
        if (externalPaging) {
            return {
                filter: this.combineFilterWithSearchCriteria(),
                orderby: this.orderby(),
                limit: this.limit(),
                offset: this.offset()
            } as IPagingParams;
        } else {
            return {
                filter: this.combineFilterWithSearchCriteria(),
                orderby: this.orderby()
            } as IPagingParams;
        }
    }

    private combineFilterWithSearchCriteria() {
        // let filterOperand = {
        //     operator: CONJUNCTION_OPERATOR.AND,
        //     component: []
        // } as IFilterOperand;
        let filterOperand = [];

        if (this.pagingParams && this.pagingParams.filter) {
            filterOperand.push(this.pagingParams.filter);
            // if (this.pagingParams.filter.hasOwnProperty('component')) {
            //     let filter = this.pagingParams.filter as IFilterOperand;
            //     if (filter.operator == CONJUNCTION_OPERATOR.AND) {
            //         filter.component.forEach((filterComponent) => {
            //             filterOperand.component.push(filterComponent);
            //         });
            //     }
            // } else {
            //     let filter = this.pagingParams.filter as IFilterComponent;
            //     filterOperand.component.push(filter);
            // }
        }

        this.filters.forEach((filter) => {
            filterOperand.push(filter);
            // if (filter.hasOwnProperty('component')) {
            //     filter = filter as IFilterOperand;
            //     if (filter.operator == CONJUNCTION_OPERATOR.AND) {
            //         filter.component.forEach((filterComponent) => {
            //             filterOperand.component.push(filterComponent);
            //         });
            //     }
            // } else {
            //     filter = filter as IFilterComponent;
            //     filterOperand.component.push(filter);
            // }
        });

        return Conjunction.AND(...filterOperand);
    }

    private convertSearchAsFilter(): ISimplifiedFilterComponent {
        let result = {} as ISimplifiedFilterComponent;

        switch (this.selectedSearchKey.type) {
            case TYPE.STRING:
                result = Comparison.LIKE('LOWER(' + this.selectedSearchKey.viewKey + ')',this.searchValue.toLowerCase() + '%25');
                break;
            case TYPE.NUMBER:
                result = Comparison.EQ(this.selectedSearchKey.viewKey, this.searchValue);
                break;
            case TYPE.DATE:
                const dateString = this._datePipe.transform(new Date(this.searchValue), DATE.DEFAULT_FORMAT);
                result = Comparison.EQ(this.selectedSearchKey.viewKey, dateString);
                break;
            default :
                break;
        }

        return result;
    }
}
