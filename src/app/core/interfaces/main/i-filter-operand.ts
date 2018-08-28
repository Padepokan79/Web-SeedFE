import { IFilterComponent } from './i-filter-component';

export interface IFilterOperand {
    operator: string;
    component: Array<IFilterOperand|IFilterComponent>;
}
