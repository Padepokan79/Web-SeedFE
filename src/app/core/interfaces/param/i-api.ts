import { IPagingParams } from './../main/i-paging-params';
import { IUrl } from '../main/i-url';

export interface IApi extends IUrl {
    params?: { [key: string]: any };
    pagingParams?: IPagingParams;
}
