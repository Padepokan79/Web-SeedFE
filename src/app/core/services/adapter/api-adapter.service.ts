import { FilterAdapterService } from './filter-adapter.service';
import { IPagingParams } from './../../interfaces/main/i-paging-params';
import { ValueAdapterService } from './value-adapter.service';
import { ConfigService } from './../config.service';
import { Injectable } from '@angular/core';
import { Params } from '../../utils/params';

@Injectable()
export class ApiAdapterService {

    constructor(
        private filterAdapter: FilterAdapterService,
        private valueAdapter: ValueAdapterService) { }

    public transform(api: string, params?: { [key: string]: any }, pagingParams?: IPagingParams): any {
        return this.generateApi(api, params, pagingParams);
    }

    private generateApi(api: string, params?: { [key: string]: any }, pagingParams?: IPagingParams): string {
        let result = '';
        let conjunction = '?';

        if (api.indexOf('?') > -1) {
            api = api.slice(0, api.indexOf('?'));
        }

        result += api;

        if (pagingParams) {
            let apiParam = this.convertPagingParamsAsString(pagingParams);

            if (apiParam) {
                result += apiParam;
                conjunction = '&';
            }
        }

        if (params) {
            let transformedParam = this.valueAdapter.transform(params);

            for (let key in transformedParam) {
                if (transformedParam.hasOwnProperty(key)) {
                    result += conjunction + '$' + key + '=' + transformedParam[key];
                    conjunction = '&';
                }
            }
        }

        return result;
    }

    private convertPagingParamsAsString(params: IPagingParams, filterOnly?: boolean) {
        let result = '';
        let mapParam = new Map<string, string>();

        if (params.filter || params.orderby || ((params.offset != null) && (params.limit != null))) {
            result += '?';

            if (params.filter != null) {
                mapParam.set('$filter=', this.filterAdapter.transform(params.filter));
            }

            if (!filterOnly) {
                if (params.orderby != null) { mapParam.set('$orderby=', params.orderby); }
                if (params.offset != null) { mapParam.set('$skip=', params.offset.toString()); }
                if (params.limit != null) { mapParam.set('$top=', params.limit.toString()); }
            }

            mapParam.forEach((value, key) => {
                if (value) { result += key + value + '&'; }
            });

            result = result.slice(0, result.length - 1);
        }

        return result;
    }
}
