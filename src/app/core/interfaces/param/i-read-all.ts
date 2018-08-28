import { IParam } from './i-param';
import { IPagingParams } from '../main/i-paging-params';

export interface IReadAll extends IParam {
    pagingParams?: IPagingParams;
}
