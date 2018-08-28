import { ISimplifiedFilterOperand } from './../interfaces/main/i-simplified-filter-operand';
import { ISimplifiedFilterComponent } from './../interfaces/main/i-simplified-filter-component';

export const ConjunctionOperatorValue = Object.freeze([
    ' and ', ' or ', ''
]);

export enum ConjunctionOperator {
    AND,
    OR,
    NONE
}

export class Conjunction {
    public static AND(...components: Array<ISimplifiedFilterComponent | ISimplifiedFilterOperand>): ISimplifiedFilterOperand {
        return { criteria :
            [ ConjunctionOperator.AND, components ]
        };
    }
    public static OR(...components: Array<ISimplifiedFilterComponent | ISimplifiedFilterOperand>): ISimplifiedFilterOperand {
        return { criteria:
            [ ConjunctionOperator.OR, components ]
        };
    }
}