import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { Router } from '../../../../../../node_modules/@angular/router';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { MatDialog } from '@angular/material';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ConfirmDialogsComponent } from '../../../../core/components/confirm-dialogs/confirm-dialogs.component';
@Component({
  selector: 'app-ALL003',
  templateUrl: './ALL003.component.html',
  styleUrls: ['./ALL003.component.scss']
})
export class ALL003Component implements OnInit {
  public time: Date = new Date();
  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;
  @ViewChild('notif')
  public notif: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovSkill: LOVService;
  public lovSkillType: LOVService;
  public lovSdm: LOVService;

  constructor(private _factory: CoreFactory,
              private router: Router,
              public _notif: DefaultNotificationService,
              private http: HttpClient,
              private _dialog: MatDialog) { }

  // tslint:disable-next-line:no-empty
  public ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1);
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdmskill_id: '',
        skilltype_id: '',
        skill_id: '',
        sdm_id: '',
        sdmskill_value: '',
        project_enddate: '',
        sdm_name: ''
      },
    });
    this.dataTable = this._factory.dataTable({
      serverSide : false,
      pagingParams : {
        limit : 10
      },
      searchCriteria : [
        { viewValue: 'Sdm Name', viewKey: 'sdm_name', type: TYPE.STRING },
        { viewValue: 'NIK', viewKey: 'sdm_nik', type: TYPE.NUMBER }
      ],
      tableColumns : [
        { prop: 'sdm_nik', name: 'NIK', flexGrow: 2, sortable: false },
        { prop: 'sdm_name', name: 'Sdm Name', flexGrow: 3, sortable: false },
        { prop: 'end_contractproject', name: 'End date project', flexGrow: 2, sortable: false },
        { prop: 'sdm_notification', name: 'Notifikasi Kontrak', flexGrow: 3,
        cellTemplate: this.notif, sortable: false },
        { prop: 'sdmskill_id', name: 'Action', flexGrow: 2,
        cellTemplate: this.tableActionTemplate, sortable: false },
      ]
    });
    this.action = this._factory.actions({
      api: 'allocation/MengelolaSdmSkill',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });

    this.lovSkill = this._factory.lov({
        api: 'lov/Skill',
        initializeData: true
    });
    this.lovSkillType = this._factory.lov({
      api: 'lov/SkillType',
      initializeData: true
    });
    this.lovSdm = this._factory.lov({
      api: 'lov/Sdm',
      initializeData: true,
      pagingParams: {
        orderby: 'sdm_name ASC',
        filter: {
          field: 'sdm_status',
          operator: COMPARISON_OPERATOR.EQ,
          value: 1
        }
      }
    });
  }

  public navigateEditMenu(id) {
    this.router.navigate(['pages/all/EditNilaiSdm' , {id}]);
  }
  public navigateDetailMenu(id) {
    this.router.navigate(['pages/all/DetailSkillSdm' , {id}]);
  }
  public refreshData() {
    this.action.refreshTable();
  }
  public refresh(): void {
    window.location.reload();
  }

  public onEksekusi(id) {
    const deleteSkillSmd = [];
    deleteSkillSmd.push({
      sdm_id: id
    });
    const deleteAPI = this._factory.api({
      api: 'allocation/MultiDeleteSdmSkill/multiDelete'
    });
    const httpOption = {
      params : new HttpParams()
    };
    this.http.post(deleteAPI, {
      listsdm: deleteSkillSmd
    }, httpOption).subscribe((response: any) => {
      this._notif.success({
        message: 'You have successfully deleted all skill SDM'
      });
      this.refreshData();
    }, (error: any) => {
      this._notif.error({
        message: 'Please check SDM Data'});
      }
      );
  }

  public onDelete(id, deleteMessage: string = 'Are you sure to delete?') {
    this._dialog
        .open(ConfirmDialogsComponent, {
            data: {
                selectedData: id,
                message: deleteMessage
            }
        })
        .afterClosed()
        .subscribe((data: any) => {
            if (data) {
                this.onEksekusi(id);
                this.refreshData();
            }
        });
  }
}
