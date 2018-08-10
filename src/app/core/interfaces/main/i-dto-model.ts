export interface IDTOModel {
    attributes(): { [key: string]: any; };
    validationMessages(): { [key: string]: any; };
}
