import { IReadAll } from './../../interfaces/param/i-read-all';
import { Objects } from './../../utils/objects';
import { DatePipe } from '@angular/common';
import { TYPE, DATE } from './../../constant/constant';
import { InputForm } from './../../models/input-form';
import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { DataTable } from '../../models/data-table';
import { ACTION } from '../../constant/constant';
import { Arrays } from '../../utils/arrays';
import { DefaultNotificationService } from '../default-notification.service';
// import { IServerResponse } from '../../interfaces/main/i-server-response';
import { ISortComponent } from '../../interfaces/main/i-sort-component';
import { IONAEngine } from '../../abstract/iona-engine';

export class IONAClientSideService extends IONAEngine {

    public forceReload = true;

    constructor(datePipe: DatePipe,
                notification: DefaultNotificationService,
                crudService: CRUDService,
                inputForm?: InputForm,
                dataTable?: DataTable) {
        super(datePipe, notification, crudService, inputForm, dataTable);
    }

    public loadDataOnTable(params?: { [key: string]: any }) {
        if (this.forceReload) {
            console.log('Was Here');
            this.forceReload = false;
            super.loadData(params);
        }
    }

    public searchDataOnTable() {
        this.dataTable.loading = true;

        if (!Arrays.isContainData(this.dataTable.tempRows)) {
            this.dataTable.tempRows = this.dataTable.rows;
        }

        this.dataTable.rows = this.dataTable.tempRows.filter((data) => {
            const fieldValue = this.dataTable.pagination().searchValue;
            const fieldType = this.dataTable.pagination().selectedSearchKey.type;
            const fieldName = this.dataTable.pagination().selectedSearchKey.viewKey;

            if (data[fieldName]) {
                let result;
                switch (fieldType) {
                    case TYPE.STRING:
                        result = data[fieldName]
                                    .toLowerCase()
                                    .indexOf(fieldValue) !== -1
                                || !fieldValue;
                        break;
                    case TYPE.DATE:
                        let dateString = this.datePipe.transform(data[fieldName], DATE.DEFAULT_FORMAT);

                        result = dateString
                                    .indexOf(fieldValue) !== -1
                                || !fieldValue;
                        break;
                    case TYPE.NUMBER:
                        if (Objects.isNumeric(data[fieldName])) {
                            result = ('' + data[fieldName])
                                        .indexOf(fieldValue) !== -1
                                    || !fieldValue;
                        } else {
                            result = false;
                        }
                    default :
                        break;
                }

                return result;
            } else {
                return false;
            }
        });

        this.dataTable.pagination().setOffset(0);
        this.dataTable.loading = false;
    }

    public sortDataOnTable(sort: ISortComponent) {
        // Not Yet
    }

    public refreshTableAfterAction(response: any) {
        this.dataTable.rows = [
            ...this.refreshTable(this.dataTable.rows, response, response.actionType)];

        if (Arrays.isContainData(this.dataTable.tempRows)) {
            this.dataTable.tempRows = [
                ...this.refreshTable(this.dataTable.tempRows, response, response.actionType)];
        }
    }

    private refreshTable(resources: any[], data: any, mode: string): any[] {
        switch (mode) {
            case ACTION.CREATE :
                resources.splice(0, 0, data);
                break;
            case ACTION.UPDATE :
                let indexUpdate = resources
                    .findIndex((arrayData) => arrayData.Model_ID === data.Model_ID);

                if (indexUpdate > -1) {
                    resources.splice(indexUpdate, 1, data);
                }
                break;
            case ACTION.DELETE :
                let indexDelete = resources
                    .findIndex((arrayData) => arrayData.Model_ID === data.Model_ID);

                if (indexDelete > -1) {
                    resources.splice(indexDelete, 1);
                }
                break;
            case ACTION.DELETE_CREATE :
                let indexDeleteCreate = resources
                    .findIndex((arrayData) => arrayData.Model_ID === data.Old_Model_ID);

                if (indexDeleteCreate > -1) {
                    resources.splice(indexDeleteCreate, 1, data);
                }
                break;
            default :
                break;
        }

        return resources;
    }
}
