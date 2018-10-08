  // Author        : Nurdhiat Chaudhary Malik
  // Date Created  : 01 Agustus 2018
  // Status        : Done

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { TYPE } from '../../../../core/constant/constant';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogsComponent } from '../../../../core/components/confirm-dialogs/confirm-dialogs.component';

@Component({
  selector: 'app-ALL002',
  templateUrl: './ALL002.component.html',
  styleUrls: ['./ALL002.component.scss']
})
export class ALL002Component implements OnInit {

  public time: Date = new Date();
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public dataTable: DataTable;
  public inputForm: InputForm;

  constructor(private _factory: CoreFactory,
              public _notif: DefaultNotificationService,
              private _dialog: MatDialog) { }

  public refreshTabel() {
    this.action.refreshTable();
  }

  public ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1);
    this.inputForm = this._factory.inputForm({
      formControls: {
        skilltype_id: null,
        skilltype_name: '',
      },
      validationMessages: {
        skilltype_name: {
          required: 'Silahkan masukkan Nama Kategori Skill'
        }
      }
    });
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        limit : 10
      },
      tableColumns : [
        { prop: 'norut', name: 'Category ID', flexGrow: 1,  sortable: false },
        { prop: 'skilltype_name', name: 'Category Name', flexGrow: 3, sortable: false },
        { prop: 'skilltype_id', name: 'Action', flexGrow: 2, cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    this.action = this._factory.actions({
      api: 'allocation/MengelolaKategori/',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });
  }

  public onEksekusi(id) {
    const deleteAPI = this._factory.api ({
      api : 'allocation/MengelolaKategori/delete'
    });
    this._factory.http().delete(deleteAPI + '?skilltype_id=' + id).subscribe((response: any) => {
      this._notif.success({
        message: 'Delete Data Berhasil'
      });
      this.action.refreshTable();
    });
  }

  public onDelete(id, deleteMessage: string = 'Are you sure to delete?') {
    this._dialog
        .open(ConfirmDialogsComponent, {
          data: {
            selecetedData : id,
            message : deleteMessage
          }
        })
        .afterClosed()
        .subscribe((data: any) => {
          this.onEksekusi(id);
          this.action.refreshTable();
        });
  }

}
