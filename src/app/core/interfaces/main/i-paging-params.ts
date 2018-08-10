import { IFilterOperand } from './i-filter-operand';
import { IFilterComponent } from './i-filter-component';

export interface IPagingParams {
    filter?: IFilterOperand | IFilterComponent;
    orderby?: string;
    limit?: number;
    offset?: number;
}
