export const ACTION = Object.freeze({
    CREATE : 'Create',
    UPDATE : 'Update',
    SAVE : 'Save',
    UPDATE_FROM_FORM : 'UFF',
    UPDATE_FROM_TABLE : 'UFT',
    DELETE : 'Delete',
    DELETE_CREATE : 'Delete_Create',
    CANCEL : 'CANCEL',
    RESET : 'RESET',
    SEARCH : 'SEARCH',
    VIEWDETAIL : 'VIEWDETAIL'
});

export const CORE = Object.freeze({
    ACTION_TYPE : 'Action-Type'
});

export const TYPE = Object.freeze({
    STRING : 'string',
    NUMBER : 'number',
    DATE : 'date',
    BOOLEAN : 'boolean'
});

export const DATE = Object.freeze({
    DEFAULT_FORMAT : 'dd-MM-yyyy',
    YEAR_MONTH_DATE : 'yyyy-MM-dd'
});

export const PATTERN = Object.freeze({
    FIRST_NON_ZERO_NUMBER : '^0$|^((?!(0))[0-9]{0,9})$'
});

export const DATE_FORMATS = {
    parse: {
        dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
    },
    display: {
        dateInput: 'input',
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'},
    }
 };

export const COMPARISON_OPERATOR = Object.freeze({
    EQ: '=',
    NEQ: '!=',
    LT: '<',
    LE: '<=',
    GT: '>',
    GE: '>=',
    LIKE: ' like '
});

export const CONJUNCTION_OPERATOR = Object.freeze({
    AND: ' and ',
    OR: ' or ',
    NONE: ''
});
