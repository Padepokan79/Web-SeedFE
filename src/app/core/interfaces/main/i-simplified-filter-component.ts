import { ComparisonOperator } from './../../enums/comparison-operator.enum';

export interface ISimplifiedFilterComponent {
    criterion: [ string, ComparisonOperator, any ];
}
