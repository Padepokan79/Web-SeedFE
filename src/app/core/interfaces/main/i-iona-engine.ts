import { IDeleteCreate } from './../param/i-delete-create';
import { IUpdate } from './../param/i-update';
import { ICreate } from './../param/i-create';
import { InputForm } from './../../models/input-form';
import { IServerResponse } from './i-server-response';
import { IAfterActionMaterials } from '../action/i-after-action-materials';
import { ISortComponent } from './i-sort-component';
import { IReadAll } from '../param/i-read-all';
import { IDelete } from '../param/i-delete';
import { CRUDService } from '../../services/uninjectable/crud.service';
import { DataTable } from '../../models/data-table';

export interface IIONAEngine {
    actionMode: string;
    dataTable?: DataTable;
    inputForm?: InputForm;
    crudService?: CRUDService;

    setTable(dataTable: DataTable);
    setForm(inputForm: InputForm);

    setAfterActionMaterials(afterActionMaterials: IAfterActionMaterials);
    setActionMode(actionMode: string);
    create(param: ICreate);
    update(param: IUpdate);
    deleteCreate(param: IDeleteCreate);
    delete(param: IDelete);
    reset(forceResetAll: boolean);
    afterAction(response: any);
    loadDataOnTable(params?: { [key: string]: any });
    searchDataOnTable();
    sortDataOnTable(sort: ISortComponent);
    refreshTableAfterAction(response: any);
}
