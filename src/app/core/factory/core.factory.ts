import { FormBuilder } from '@angular/forms';
import { IApi } from './../interfaces/param/i-api';
import { IPagingParams } from './../interfaces/main/i-paging-params';
import { ActionService } from './../services/uninjectable/action.service';
import { IONAClientSideService } from './../services/uninjectable/iona-client-side.service';
import { IONAServerSideService } from './../services/uninjectable/iona-server-side.service';
import { IIONAEngine } from './../interfaces/main/i-iona-engine';
import { DataTable } from './../models/data-table';
import { InputForm } from './../models/input-form';
import { IInputFormMaterials } from './../interfaces/input-form/i-input-form-materials';
import { UploaderService } from './../services/uninjectable/uploader.service';
import { ICRUDMaterials } from './../interfaces/crud/i-crud-materials';
import { LOVService } from './../services/uninjectable/lov.service';
import { ApiAdapterService } from './../services/adapter/api-adapter.service';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfigService } from '../services/config.service';
import { DefaultNotificationService } from '../services/default-notification.service';
import { FilterAdapterService } from '../services/adapter/filter-adapter.service';
import { ValueAdapterService } from '../services/adapter/value-adapter.service';
import { ILOVMaterials } from '../interfaces/list-of-value/i-lov-materials';
import { CRUDService } from '../services/uninjectable/crud.service';
import { IUploaderMaterials } from '../interfaces/uploader/i-uploader-materials';
import { IDataTableMaterials } from '../interfaces/data-table/i-data-table-materials';
import { PaginationService } from '../services/uninjectable/pagination.service';
import { IActionMaterials } from '../interfaces/action/i-action-materials';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CoreFactory {

  private notificationOption: any;

  constructor(
    private _httpRequest: HttpClient,
    private _datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _config: ConfigService,
    private _notification: DefaultNotificationService,
    private _apiAdapter: ApiAdapterService,
    private _filterAdapter: FilterAdapterService,
    private _valueAdapter: ValueAdapterService
  ) {
    this.notificationOption = {
      position: ['bottom', 'left'],
      timeOut: 5000,
      lastOnBottom: true,
      clickToClose: true,
      animate: 'fromRight'
    };
  }

  public lov(materials: ILOVMaterials): LOVService {
    return new LOVService(
      this._httpRequest,
      this._apiAdapter,
      this._config,
      materials);
  }

  public crud(materials: ICRUDMaterials): CRUDService {
    return new CRUDService(
      this._httpRequest,
      this._apiAdapter,
      this._config,
      materials);
  }

  public uploader(materials: IUploaderMaterials): UploaderService {
    return new UploaderService(
      this._httpRequest,
      this._config,
      this._notification,
      materials);
  }

  public inputForm(materials?: IInputFormMaterials): InputForm {
    return new InputForm(this._formBuilder, materials);
  }

  public dataTable(materials?: IDataTableMaterials): DataTable {
    return new DataTable(this._datePipe, materials);
  }

  public config() {
    return this._config;
  }

  public http() {
    return this._httpRequest;
  }

  public actions(materials: IActionMaterials) {
    let crudService = this.crud(materials);
    let ionaEngine = {} as IIONAEngine;

    if (materials.dataTable && !materials.dataTable.externalPaging) {
      ionaEngine = new IONAClientSideService(
        this._datePipe,
        this._notification,
        crudService,
        materials.inputForm,
        materials.dataTable
      );
    } else {
      ionaEngine = new IONAServerSideService(
        this._datePipe,
        this._notification,
        crudService,
        materials.inputForm,
        materials.dataTable
      );
    }

    return new ActionService(this._dialog, this._valueAdapter, ionaEngine);
  }

  // public filter(operand: IFilter | FilterComponent): string {
  //   return this._filterAdapter.transform(operand);
  // }

  public api(materials: IApi): string {
    let url = this.config().url('BE_SERVER');

    if (materials.serverDomain) {
      url = materials.serverDomain;
    }

    return this._apiAdapter.transform(url + materials.api, materials.params, materials.pagingParams);
  }
}
