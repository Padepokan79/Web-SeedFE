import { Arrays } from './../utils/arrays';
import { IPagingParams } from './../interfaces/main/i-paging-params';
import { IReadAll } from './../interfaces/param/i-read-all';
import { IDelete } from './../interfaces/param/i-delete';
import { ICreate } from './../interfaces/param/i-create';
import { IIONAEngine } from './../interfaces/main/i-iona-engine';
import { InputForm } from './../models/input-form';
import { DatePipe } from '@angular/common';
// import { IServerResponse } from './../interfaces/main/i-server-response';
import { ISortComponent } from './../interfaces/main/i-sort-component';
import { DefaultNotificationService } from '../services/default-notification.service';
import { CRUDService } from '../services/uninjectable/crud.service';
import { DataTable } from '../models/data-table';
import { IAfterActionMaterials } from '../interfaces/action/i-after-action-materials';
import { ACTION } from '../constant/constant';
import { IUpdate } from '../interfaces/param/i-update';
import { IDeleteCreate } from '../interfaces/param/i-delete-create';

export abstract class IONAEngine implements IIONAEngine {

    public enableInputForm: boolean;
    public enableDataTable: boolean;
    public actionMode: string;
    public afterActionMaterials: IAfterActionMaterials;
    private params: { [key: string]: any };
    private pagingParams: IPagingParams;

    constructor(public datePipe: DatePipe,
                public notification: DefaultNotificationService,
                public crudService: CRUDService,
                public inputForm?: InputForm,
                public dataTable?: DataTable) {

        if (dataTable) {
            this.setActionMode(ACTION.CREATE);

            this.enableDataTable = true;
            this.loadDataOnTable();
        }

        if (inputForm) {
            if (inputForm.isNewData) {
                this.setActionMode(ACTION.CREATE);
            } else {
                this.setActionMode(ACTION.UPDATE);
            }

            this.enableInputForm = true;
            this.inputForm.buildForm();
        }
    }

    public setTable(dataTable: DataTable) {
        this.dataTable = dataTable;
        this.enableDataTable = true;
    }

    public setForm(inputForm: InputForm) {
        this.inputForm = inputForm;
        this.enableInputForm = true;
    }

    public setAfterActionMaterials(afterActionMaterials: IAfterActionMaterials) {
        this.afterActionMaterials = afterActionMaterials;
    }

    public setActionMode(actionMode: string) {
        this.actionMode = actionMode;
    }

    public loadData(params?: { [key: string]: any }) {
        this.dataTable.loading = true;

        if (!this.params) {
            this.params = this.dataTable.params();
        }
        if (params) {
            this.params = params;
        }
        this.pagingParams = this.dataTable.pagingParams();

        this.crudService
            .getAll({
                params: this.params,
                pagingParams: this.pagingParams
            })
            .subscribe(
                (success) => {
                    const data = success.data;
                    this.dataTable.rows = data.items;

                    if (this.dataTable.externalPaging) {
                        this.dataTable.count = data.totalItems;
                    } else {
                        console.log('Inside non server side mode');
                        if (this.dataTable.checkboxColumn) {
                            console.log('checkboxColumn exist');
                            if (Arrays.isContainData(data.items)) {
                                this.dataTable.selected = [];
                                for (const item of data.items) {
                                    if (item.hasOwnProperty(this.dataTable.checkboxColumn)
                                    && (item[this.dataTable.checkboxColumn] === 1
                                     || item[this.dataTable.checkboxColumn] === '1'
                                     || item[this.dataTable.checkboxColumn] === true)) {
                                        this.dataTable.selected.push(item);
                                    }
                                }
                            }
                        }
                    }

                    this.dataTable.loading = false;
                },
                (error) => {
                    this.notification.error(error);
                }
            );
    }

    public create(param: ICreate) {
        this.crudService
            .create(param)
            .subscribe(
                (success) => {
                    this.afterAction(success);
                    this.notification.success(success);

                    if (this.afterActionMaterials && this.afterActionMaterials.create) {
                        this.afterActionMaterials.create.emit({
                            clientData: param.item,
                            serverData: success.data
                        });
                    }
                },
                (error) => {
                    this.notification.error(error);
                }
            );
    }

    public update(param: IUpdate) {
        this.crudService
            .update(param)
            .subscribe(
                (success) => {
                    this.afterAction(success);
                    this.notification.success(success);

                    if (this.afterActionMaterials && this.afterActionMaterials.update) {
                        this.afterActionMaterials.update.emit({
                            clientData: param.item,
                            serverData: success.data
                        });
                    }
                },
                (error) => {
                    this.notification.error(error);
                }
            );
    }

    public deleteCreate(param: IDeleteCreate) {
        this.crudService
            .deleteCreate(param)
            .subscribe(
                (success) => {
                    this.afterAction(success);
                    this.notification.success(success);
                },
                (error) => {
                    this.notification.error(error);
                }
            );
    }

    public delete(param: IDelete) {
        this.crudService
            .delete(param)
            .subscribe(
                (success) => {
                    this.afterAction(success);
                    this.notification.success(success);

                    if (this.afterActionMaterials && this.afterActionMaterials.delete) {
                        this.afterActionMaterials.delete.emit({
                            clientData: param.item,
                            serverData: success.data
                        });
                    }
                },
                (error) => {
                    this.notification.error(error);
                }
            );
    }

    public reset(forceResetAll: boolean) {
        if (this.afterActionMaterials && this.afterActionMaterials.reset) {
            this.afterActionMaterials.reset.emit({
                clientData: this.inputForm.data.value,
                serverData: undefined
            });
        }

        this.inputForm.deactivateImmutableState();
        this.inputForm.resetData(forceResetAll);

        if (this.enableDataTable) {
            this.setActionMode(ACTION.CREATE);
        } else {
            this.setActionMode(ACTION.UPDATE);
        }
    }

    public afterAction(response: any) {
        if (this.enableDataTable) {
            switch (response.actionType) {
                case ACTION.CREATE:
                    this.dataTable.pagination().setOffset(0);
                    break;
                default:
                    break;
            }

            if (this.dataTable.forceReloadAfterAction) {
                this.loadData();
            } else {
                this.refreshTableAfterAction(response);
            }

            if (this.inputForm.resetFormAfterAction) {
                this.inputForm.resetData(false);
            }

            if (this.enableDataTable) {
                this.setActionMode(ACTION.CREATE);
            } else {
                this.setActionMode(ACTION.UPDATE);
            }
        }
    }

    public abstract loadDataOnTable(params?: { [key: string]: any });
    public abstract searchDataOnTable();
    public abstract sortDataOnTable(sort: ISortComponent);
    public abstract refreshTableAfterAction(response: any);

    // private isPrimaryKeyValuesChanged(item: any) {
    //     if (item.Model_ID) {
    //         let listPrimaryKeyNameWithValue = (<string> item).split('&');
    //         listPrimaryKeyNameWithValue.forEach((primaryKeyNameWithValue) => {
    //             let primaryKeyNameAndValue = (<string> primaryKeyNameWithValue).split('=');

    //             let primaryKeyName = primaryKeyNameAndValue[0];
    //             let primaryKeyValue = primaryKeyNameAndValue[1];

    //             if (item[primaryKeyName] != primaryKeyValue) {
    //                 return true;
    //             }
    //         });
    //     }

    //     return false;
    // }
}
