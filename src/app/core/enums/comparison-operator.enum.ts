import { ISimplifiedFilterComponent } from './../interfaces/main/i-simplified-filter-component';

export const ComparisonOperatorValue = Object.freeze([
    '=', '!=', '<', '<=', '>', '>=', ' like '
]);

export enum ComparisonOperator {
    EQ,
    NEQ,
    LT,
    LE,
    GT,
    GE,
    LIKE
}

export class Comparison {
    public static EQ(field: string, value: string): ISimplifiedFilterComponent {
        return { criterion : [field, ComparisonOperator.EQ, value] };
    }

    public static NE(field: string, value: string): ISimplifiedFilterComponent {
        return { criterion : [field, ComparisonOperator.NEQ, value] };
    }

    public static LT(field: string, value: string): ISimplifiedFilterComponent {
        return { criterion : [field, ComparisonOperator.LT, value] };
    }

    public static GT(field: string, value: string): ISimplifiedFilterComponent {
        return { criterion : [field, ComparisonOperator.GT, value] };
    }

    public static LE(field: string, value: string): ISimplifiedFilterComponent {
        return { criterion : [field, ComparisonOperator.LE, value] };
    }

    public static GE(field: string, value: string): ISimplifiedFilterComponent {
        return { criterion : [field, ComparisonOperator.GE, value] };
    }

    public static LIKE(field: string, value: string): ISimplifiedFilterComponent {
        return { criterion : [field, ComparisonOperator.LIKE, value] };
    }

}
