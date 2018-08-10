import { DatePipe } from '@angular/common';
import { PaginationService } from '../services/uninjectable/pagination.service';
import { IDataTableMaterials } from '../interfaces/data-table/i-data-table-materials';
import { ISearchKey } from '../interfaces/main/i-search-key';

export class DataTable {

  public columns: any[];
  public rows: any[];
  public tempRows: any[];
  public selected: any[];
  public checkboxColumn: any;
  public count: number;

  public forceReloadAfterAction: boolean;
  public externalPaging: boolean;
  public loading: boolean;

  private paginationService: PaginationService;
  private responseTime: number;

  constructor(
    private _datePipe?: DatePipe,
    private _dataTableMaterials?: IDataTableMaterials) {

    this.columns = [];
    this.rows = [];
    this.tempRows = [];
    this.selected = [];
    this.count = 0;

    this.externalPaging = false;
    this.loading = false;

    this.buildDataTable(_dataTableMaterials);
  }

  public pagination() {
    return this.paginationService;
  }

  public params() {
    return this._dataTableMaterials.params;
  }

  public pagingParams() {
    return this.paginationService != null ?
            (this.externalPaging ?  this.paginationService.params() : this.paginationService.params(false))
            : null;
  }

  // Called inside constructor
  public initSearchCriteria(keys: ISearchKey[]) {
    this.paginationService.initSearchKeys(keys);
  }

  public buildDataTable(_dataTableMaterials: IDataTableMaterials) {
    if (_dataTableMaterials) {
      this.columns = _dataTableMaterials.tableColumns;

      this.paginationService = new PaginationService(this._datePipe);

      if (_dataTableMaterials.checkboxColumn) {
        this.checkboxColumn = _dataTableMaterials.checkboxColumn;
      }

      if (_dataTableMaterials.searchCriteria) {
        this.paginationService.initSearchKeys(_dataTableMaterials.searchCriteria);
      }

      if (_dataTableMaterials.pagingParams) {
        this.paginationService.initPagingParams(_dataTableMaterials.pagingParams);
      }

      if (_dataTableMaterials.serverSide) {
        this.externalPaging = _dataTableMaterials.serverSide;
      }
      if (_dataTableMaterials.forceReloadAfterAction) {
        this.forceReloadAfterAction = _dataTableMaterials.forceReloadAfterAction;
      }
    }
  }
}
