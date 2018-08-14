import { ConjunctionOperator } from './../../enums/conjunction-operator.enum';
import { ISimplifiedFilterComponent } from './i-simplified-filter-component';

export interface ISimplifiedFilterOperand {
    criteria: [ ConjunctionOperator, Array<ISimplifiedFilterComponent | ISimplifiedFilterOperand> ];
}
