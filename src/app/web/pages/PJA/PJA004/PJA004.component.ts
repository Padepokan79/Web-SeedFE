import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { TYPE } from '../../../../core/constant/constant';
import { Router } from '../../../../../../node_modules/@angular/router';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogsComponent } from '../../../../core/components/confirm-dialogs/confirm-dialogs.component';

@Component({
  selector: 'app-PJA004',
  templateUrl: './PJA004.component.html',
  styleUrls: ['./PJA004.component.scss']
})
export class PJA004Component implements OnInit {

  public time: Date = new Date();

  // public btnClick = function() {
  //   this.router.navigateByUrl('/dashboard');
  // };

  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  constructor(private _factory: CoreFactory,
              private router: Router,
              public _notif: DefaultNotificationService,
              private _dialog: MatDialog) { }

  public refreshTabel() {
    this.action.refreshTable();
  }

  public ngOnInit() {

    setInterval(() => {
      this.time = new Date();
    }, 1);

    // First Data Table Initialization
    this.dataTable = this._factory.dataTable({
      serverSide : false,
      pagingParams : {
        limit : 10
      },
      searchCriteria : [
        { viewValue: 'Client Name', viewKey: 'client_name', type: TYPE.STRING }
      ],
      tableColumns : [
        { prop: 'norut', name: 'No', flexGrow: 1, sortable: false },
        { prop: 'client_name', name: 'Client Name', flexGrow: 2, sortable: true },
        { prop: 'client_picclient', name: 'PIC Handler', flexGrow: 3, sortable: true },
        { prop: 'client_mobileclient', name: 'Contact Person', flexGrow: 3, sortable: true },
        { prop: 'client_name', name: 'Action', flexGrow: 2,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    this.action = this._factory.actions({
      api: 'project/MengelolaClient',
      inputForm: this.inputForm,
      dataTable: this.dataTable
  });
  }

  public navigateEditMenu(id) {
    this.router.navigate(['/pages/pja/PJA006', { id }]);
  }

  public onEksekusi(id) {
    const deleteAPI = this._factory.api ({
      api : 'project/MengelolaClient/delete'
    });
    this._factory.http().delete(deleteAPI + '?client_id=' + id).subscribe((response: any) => {
      this._notif.success({
        message: 'Delete Data Berhasil'
      });
    });
    this.action.refreshTable();
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
          if (data) {
            this.onEksekusi(id);
          }
          this.action.refreshTable();
        });
  }
}
