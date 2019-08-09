import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { DataTable } from '../../../../core/models/data-table';
import { FileUploader } from 'ng2-file-upload';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import * as FileSaver from 'file-saver';
import { TYPE } from 'app/core/constant/constant';

@Component({
  selector: 'app-SDM010',
  templateUrl: './SDM010.component.html',
  styleUrls: ['./SDM010.component.scss']
})
export class SDM010Component implements OnInit {
  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  public time: Date = new Date();
  public maxDate: Date = new Date();
  public uploader: FileUploader;

  constructor(private _factory: CoreFactory,
              private _notif: DefaultNotificationService) { }

  public ngOnInit() {
    setInterval(() => {
      this.time = new Date();
      this.maxDate = new Date();
    }, 1);

    this.inputForm = this._factory.inputForm({
      formControls: {
      },
      validationMessages: {
      }
    });

    this.dataTable = this._factory.dataTable({
      pagingParams: {
        limit: 10
      },
      serverSide : false,
      searchCriteria: [
        { viewValue: 'NIP', viewKey: 'nip', type: TYPE.STRING },
        { viewValue: 'Nama', viewKey: 'nama', type: TYPE.STRING },
      ],
      tableColumns : [
        { prop: 'nip', name: 'Nip', flexGrow: 1 },
        { prop: 'nama', name: 'Nama SDM', flexGrow: 2 },
        { prop: 'tgl', name: 'Tgl', flexGrow: 1,
          cellTemplate: this.viewAsDateTemplate, sortable: false },
        { prop: 'waktu', name: 'Waktu', flexGrow: 1, sortable: false },
        { prop: 'stts_checkin', name: 'STTS Checkin', flexGrow: 1, sortable: false },
      ]
    });

    this.action = this._factory.actions({
      api: 'sdm/',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });

    this.uploader = new FileUploader({
      url: this._factory.api({
          api: 'project/UploadFile/upload'
      }),
      authToken: 'bearer ' + localStorage.getItem('token'),
      authTokenHeader: 'authorization'
    });
  }

  public onImportFile() {
    if (this.uploader.queue.length > 0) {
      let namaFile;
      this.uploader.onBuildItemForm = (item, form) => {
        namaFile = item.file.name;
      };
      this.uploader.queue[0].upload();
      this.uploader.onSuccessItem = (item, response, status, headers) => {
        this.uploader.clearQueue();

        const importDataFullApi = this._factory.api({
          api: 'project/ReadFileDAT/reads',
          params: {
            filename: namaFile,
          }
        });

        this._factory.http()
        .get(importDataFullApi)
        // tslint:disable-next-line:no-shadowed-variable
        .subscribe((response: any) => {
          const list = response.data;
          console.log(list);
          this.action.table().count = response.data.totalItems;
          this.action.table().rows = list.items;
          this._notif.success({
            message: response.message
          });
        }, (error) => {
          this._notif.error({
            message: error.message
          });
        });

      };
    } else {
      this._notif.error({
        message: 'No file to upload'
      });
    }
  }

  public createExampleFile() {
    const createExampleFileApi = this._factory.api({
      api: 'project/CetakExcelTesting/generateAsXLS',
    });

    this._factory.http()
    .post(createExampleFileApi, null, { responseType: 'blob' })
    .subscribe((response) => {
      FileSaver.saveAs(response, 'contoh_file.xls');
    });
  }

}
