import { ISimplifiedFilterOperand } from './i-simplified-filter-operand';
import { ISimplifiedFilterComponent } from './i-simplified-filter-component';
import { IFilterOperand } from './i-filter-operand';
import { IFilterComponent } from './i-filter-component';

export interface IPagingParams {
    filter?: IFilterComponent | IFilterOperand | ISimplifiedFilterComponent | ISimplifiedFilterOperand;
    orderby?: string;
    limit?: number;
    offset?: number;
}
