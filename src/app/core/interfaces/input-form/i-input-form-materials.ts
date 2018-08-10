import { IDTOModel } from './../main/i-dto-model';

export interface IInputFormMaterials {
    model?: new () => IDTOModel;
    formControls?: { [key: string]: any };
    immutableFormControls?: { [key: string]: any };
    validationMessages?: any;
    resetFormAfterAction?: boolean;
    isNewData?: boolean;
    defaultAction?: string;
}
