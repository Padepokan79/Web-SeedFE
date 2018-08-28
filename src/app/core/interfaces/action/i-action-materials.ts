import { DataTable } from './../../models/data-table';
import { InputForm } from './../../models/input-form';
import { IUrl } from '../main/i-url';
import { IAfterActionMaterials } from './i-after-action-materials';
import { ICustomUrl } from '../main/i-custom-url';
import { ICRUDMaterials } from '../crud/i-crud-materials';

export interface IActionMaterials extends ICRUDMaterials {
    inputForm?: InputForm;
    dataTable?: DataTable;
    afterAction?: IAfterActionMaterials;
}
