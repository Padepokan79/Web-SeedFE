import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { DataTable } from '../../../../core/models/data-table';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { InputForm } from '../../../../core/models/input-form';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { TYPE, COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { FormControl, FormGroup } from '../../../../../../node_modules/@angular/forms';
import { ListOfValue } from '../../../../core/models/list-of-value';
import { Router } from '../../../../../../node_modules/@angular/router';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { map, startWith } from '../../../../../../node_modules/rxjs/operators';
import { ComparisonOperator, Comparison } from '../../../../core/enums/comparison-operator.enum';
import { Conjunction } from '../../../../core/enums/conjunction-operator.enum';
import { PopUpDetailComponent } from './PopUpDetail/PopUpDetail.component';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { ConfirmDialogsComponent } from '../../../../core/components/confirm-dialogs/confirm-dialogs.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-PJA003R',
  templateUrl: './PJA003R.component.html',
  styleUrls: ['./PJA003R.component.scss']
})
export class PJA003RComponent implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;
  @ViewChild('popUp')
  public popUp: ModalComponent;
  @ViewChild('modalDataPopUp')
  public modalDataPopUp: PopUpDetailComponent;

  @ViewChild('notif')
  public notif: any;
  public notifications: any;
  public progress: boolean;

  public action: ActionService;
  public dataTable: DataTable;
  public inputForm: InputForm;
  public listData: any;

  public lovSdm: LOVService;
  public lovProject: LOVService;
  public time: Date = new Date();

  // sdm
  public filteredSdm: any;
  public sdmCtrl: FormControl;

  // project
  public filteredProject: any;
  public projectCtrl: FormControl;
  public selectedId: any;

  // Hapus
  public KeyId: any;
  public SdmName: any;
  public ProjectName: any;
  public ProjectEndDate: any;

  public onKeySdmName(event: any) {
    this.KeyId = event.target.value;
    if (this.KeyId === '') {
      this.SdmName = null;
      console.log('Nama: ', this.SdmName);
    }
  }
  public onKeyProjectName(event: any) {
    this.KeyId = event.target.value;
    if (this.KeyId === '') {
      this.ProjectName = null;
      console.log('Project Name: ', this.ProjectName);
    }
  }
  public onKeyProjectEndDate(event: any) {
    this.KeyId = event.target.value;
    if (this.KeyId === '') {
      this.ProjectEndDate = undefined;
      console.log('Tanggal: ', this.ProjectEndDate);
    }
  }

  // tslint:disable-next-line:member-ordering
  constructor(private _factory: CoreFactory,
              private router: Router,
              public _notif: DefaultNotificationService,
              private _dialog: MatDialog) {

    this.sdmCtrl = new FormControl();
    this.filteredSdm = this.sdmCtrl.valueChanges
    .pipe(
      startWith(''),
      map((value) => this.filterSdm(value))
    );

    this.projectCtrl = new FormControl();
    this.filteredProject = this.projectCtrl.valueChanges
    .pipe(
      startWith(''),
      map((value) => this.filterProject(value))
    );
  }

  public ngOnInit() {

    setInterval(() => {
      this.time = new Date();
    }, 1);

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
        sdm_name: '',
        project_name: this.filteredProject.project_name,
        project_enddate: '',
      }
    });

    this.dataTable = this._factory.dataTable({
      serverSide : false,
      pagingParams : {
        limit: 10
      },
      // searchCriteria : [
      //    { viewValue: 'ID', viewKey: 'project_id', type: TYPE.NUMBER },
      //    { viewValue: 'Name', viewKey: 'sdm.sdm_name', type: TYPE.NUMBER},
      //    { viewValue: 'Project Name', viewKey: 'project_name', type: TYPE.STRING },
      //    { viewValue: 'Project Date', viewKey: 'project_enddate', type: TYPE.STRING },
      // ],
      tableColumns : [
        { prop: 'norut', name: 'No.', flexGrow: 1, sortable: true },
        { prop: 'sdm_name', name: 'Nama Sdm', flexGrow: 3, sortable: true },
        { prop: 'project_name', name: 'Project Name', flexGrow: 5, sortable: true },
        // { prop: 'project_desc', name: 'Project Desc.', width: 100, sortable: true },
        // { prop: 'project_role', name: 'Role', width: 100, sortable: true },
        { prop: 'project_startdate', name: 'Start Date', flexGrow: 2,
        cellTemplate: this.viewAsDateTemplate, sortable: true },
        { prop: 'project_enddate', name: 'End Date', flexGrow: 2,
        cellTemplate: this.viewAsDateTemplate, sortable: true },
        // { prop: 'project_site', name: 'Project Site', width: 100, sortable: true },
        // { prop: 'project_customer', name: 'Customer', width: 100, sortable: false },
        // { prop: 'project_apptype', name: 'App Type', width: 100, sortable: false },
        // { prop: 'project_serveros', name: 'Server Os', width: 100, sortable: false },
        // { prop: 'project_devlanguage', name: 'Dev Language', width: 100, sortable: false },
        // { prop: 'project_framework', name: 'Framework', width: 100, sortable: false },
        // { prop: 'project_database', name: 'Database', width: 100, sortable: false },
        // { prop: 'project_appserver', name: 'App Server', width: 100, sortable: false },
        // { prop: 'project_devtool', name: 'Dev Tools', width: 100, sortable: false },
        // { prop: 'project_technicalinfo', name: 'Technical Info', width: 100, sortable: false },
        // { prop: 'project_othertinfo', name: 'Other Info', width: 100, sortable: false },
        { prop: 'notif', name: 'Notifikasi Project', flexGrow: 2,
          cellTemplate: this.notif, sortable: false },
        { prop: 'project_id', name: 'Action', flexGrow: 3,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    this.action = this._factory.actions({
      api: 'project/MengelolaProject',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });

    this.lovSdm = this._factory.lov({
      api: 'lov/Sdm',
      pagingParams: {
        orderby: 'sdm_name ASC',
      },
      initializeData: true
  });

    this.lovProject = this._factory.lov({
      api: 'lov/Project',
      initializeData: true
    });

    this.ProjectEndDate = this.action.getFormControlValue('project_enddate');

  }

  public navigateEditMenu(id) {
    this.router.navigate(['/pages/pja/PJA002', {id}]);
  }

  public getId(id) {
    this.selectedId = id;
  }

  public setSdmValue(inputForm: FormGroup, dataSdm: ListOfValue) {
    if (dataSdm) {
      this.lovSdm = this._factory.lov({
        api: 'lov/sdm',
        params: {
          sdm_id: dataSdm.key
        },
        initializeData: true
      });
      this.SdmName = dataSdm.key;
      this.action.patchFormData({sdm_id: dataSdm.key, sdm_name: dataSdm.values.sdm_sdm_name});
      console.log(this.SdmName);
    }
  }

  public filterSdm(val: string) {
    return val ? this.lovSdm.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  public setProjectValue(inputForm: FormGroup, dataProject: ListOfValue) {
    if (dataProject) {
      this.lovProject = this._factory.lov({
        api: 'lov/project',
        params: {
          project_id: dataProject.key
        },
        initializeData: true
      });
      this.ProjectName = dataProject.values.project_project_name;
      this.action.patchFormData({project_id: dataProject.key, project_name: dataProject.values.project_project_name});
      console.log(this.ProjectName);
    }
  }

  public filterProject(val: string) {
    return val ? this.lovProject.data.filter((s) => s.values.project_project_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  public onSearch() {
    // const filterCriteria = [];
    // this.SdmName =  this.action.getFormControlValue('sdm_name');
    this.ProjectName =  this.action.getFormControlValue('project_name');
    this.ProjectEndDate = this.action.getFormControlValue('project_enddate');
    console.log('Nama: ', this.SdmName, 'Nama Project: ', this.ProjectName, 'Tanggal berakhir: ', this.ProjectEndDate);
    this.action.setPaginationFilter(
      Conjunction.AND(
        // filterCriteria
        this.ProjectEndDate ? Comparison.LE('project_enddate', this.ProjectEndDate) : Comparison.NE('project_enddate', 'project_enddate'),
        this.SdmName ? Comparison.EQ('sdm_id', this.SdmName) : Comparison.NE('sdm_id', 'sdm_name'),
        this.ProjectName ? Comparison.EQ('project_name', this.ProjectName) : Comparison.NE('project_name', 'project_name')
      )
    );

    this.action.refreshTable();
  }

  public onReset() {
    this.action.onReset();
    this.SdmName = null;
    this.ProjectName = null;
    this.ProjectEndDate = null;
    console.log('Nama: ', this.SdmName, 'Nama Project: ', this.ProjectName, 'Tanggal berakhir: ', this.ProjectEndDate);
    this.action.resetFilter() ;
    this.action.refreshTable();
  }

  public refreshData() {
    this.action.refreshTable();
  }

  public onEksekusi(id) {
    console.log(id);
    const deleteAPI = this._factory.api({
      api : 'project/MengelolaProject/delete'
    });
    this._factory.http().delete(deleteAPI + '?project_id=' + id).subscribe((response: any) => {
    this._notif.success({
        message: 'Delete Data Berhasil'
      });
    this.refreshData();
    });
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
    // setTimeout(() => this.refreshData(), 1000);
  }

}
