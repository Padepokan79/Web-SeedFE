import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ACTION } from '../../constant/constant';

@Component({
  selector: 'io-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  //@Input() public actionService: ActionService;

  // @Output()
  // public onAction = new EventEmitter<string>();
  // @Output()
  // public onAdd = new EventEmitter<string>();
  // @Output()
  // public onEditFromForm = new EventEmitter<string>();
  // @Output()
  // public onEditFromTable = new EventEmitter<string>();
  // @Output()
  // public onSave = new EventEmitter<string>();
  // @Output()
  // public onCancel = new EventEmitter<string>();
  // @Output()
  // public onDelete = new EventEmitter<string>();
  // @Output()
  // public onSearch = new EventEmitter<string>();
  // @Output()
  // public onReset = new EventEmitter<string>();
  // @Output()
  // public onViewDetail = new EventEmitter<string>();

  public enableInputFormAction: boolean;
  public enableDataTableAction: boolean;

  private toolTipPosition: string;
  private saveMode: string;
  private disableAdd: boolean;
  private disableEditForm: boolean;
  private disableReset: boolean;
  private disableSave: boolean;
  private disableCancel: boolean;
  private disableSearch: boolean;
  private disableEditTable: boolean;
  private disableDelete: boolean;
  private disableViewDetail: boolean;

  constructor() {
    this.toolTipPosition = 'left';
    this.disableAdd = false;
    this.disableEditForm = false;
    this.disableReset = false;
    this.disableSave = false;
    this.disableCancel = false;
    this.disableSearch = false;
    this.disableEditTable = false;
    this.disableDelete = false;
    this.disableViewDetail = false;
    this.enableInputFormAction = true;
    this.enableDataTableAction = true;
  }

  public ngOnInit() {
  }

  public add() {
    this.saveMode = ACTION.CREATE;
    // this.onAdd.emit(CRUD.CREATE);
  }

  public editFromForm() {
    this.saveMode = ACTION.UPDATE_FROM_FORM;
    // this.onEditFromForm.emit(CRUD.UPDATE_FROM_FORM);
  }

  public editFromTable() {
    this.saveMode = ACTION.UPDATE_FROM_TABLE;
    // this.onEditFromTable.emit(CRUD.UPDATE_FROM_TABLE);
  }

  public save() {
    // if (this.actionService) {
    //   this.actionService.create();
    // } else {
    //   this.onSave.emit(this.saveMode);
    // }
  }

  public cancel() {
    this.saveMode = null;
    // this.onAction.emit(CRUD.CANCEL);
    // this.onCancel.emit(CRUD.CANCEL);
  }

  public delete() {
    // this.onAction.emit(CRUD.DELETE);
    // this.onDelete.emit(CRUD.DELETE);
  }

  public search() {
    // this.onAction.emit(CRUD.SEARCH);
    // this.onSearch.emit(CRUD.SEARCH);
  }

  public searchSubmit() {
    // this.onAction.emit(CRUD.SEARCH);
    // this.onSearch.emit(CRUD.SEARCH);
  }

  public searchCancel() {
    // this.onAction.emit(CRUD.SEARCH);
    // this.onSearch.emit(CRUD.SEARCH);
  }

  public reset() {
    // this.onAction.emit(CRUD.RESET);
    // this.onReset.emit(CRUD.RESET);
  }

  public viewDetail() {
    // this.onAction.emit(CRUD.VIEWDETAIL);
    // this.onViewDetail.emit(CRUD.VIEWDETAIL);
  }
}
