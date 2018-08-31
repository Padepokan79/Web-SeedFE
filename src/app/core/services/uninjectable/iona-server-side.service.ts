import { IReadAll } from './../../interfaces/param/i-read-all';
import { ISortComponent } from './../../interfaces/main/i-sort-component';
import { InputForm } from './../../models/input-form';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { DataTable } from '../../models/data-table';
import { DefaultNotificationService } from '../default-notification.service';
import { IServerResponse } from '../../interfaces/main/i-server-response';
import { IONAEngine } from '../../abstract/iona-engine';

export class IONAServerSideService extends IONAEngine {

    public forceReload = false;

    constructor(datePipe: DatePipe,
                notification: DefaultNotificationService,
                crudService: CRUDService,
                inputForm?: InputForm,
                dataTable?: DataTable) {
        super(datePipe, notification, crudService, inputForm, dataTable);
    }

    public loadDataOnTable(params?: { [key: string]: any }) {
        super.loadData(params);
    }

    // BE Server cant handle a keyword that exist on parent table
    public searchDataOnTable() {
        this.dataTable
            .pagination()
            .setFilterWithSearchCriteria();
        this.loadDataOnTable();
    }

    // BE Server cant handle a keyword that exist on parent table
    public sortDataOnTable(sort: ISortComponent) {
        this.dataTable
            .pagination()
            .setOrderBy(sort.property + ' ' + sort.direction);
        this.loadDataOnTable();
    }

    public refreshTableAfterAction(response: any) {
        this.loadDataOnTable();
    }
}
