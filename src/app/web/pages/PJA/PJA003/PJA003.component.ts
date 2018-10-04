import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { DataTable } from '../../../../core/models/data-table';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { InputForm } from '../../../../core/models/input-form';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { TYPE, COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { FormControl, FormGroup } from '../../../../../../node_modules/@angular/forms';
import { ListOfValue } from '../../../../core/models/list-of-value';
import { Router } from '../../../../../../node_modules/@angular/router';
import { startWith, map } from '../../../../../../node_modules/rxjs/operators';
import { Conjunction } from '../../../../core/enums/conjunction-operator.enum';
import { Comparison } from '../../../../core/enums/comparison-operator.enum';

@Component({
  selector: 'app-PJA003',
  templateUrl: './PJA003.component.html',
  styleUrls: ['./PJA003.component.scss']
})
export class PJA003Component implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;
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
  constructor(private _factory: CoreFactory, private router: Router) {

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
        project_name: '',
        project_enddate: '',
      }
    });

    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        limit: 10
      },
      // searchCriteria : [
      //    { viewValue: 'ID', viewKey: 'project_id', type: TYPE.NUMBER },
      //    { viewValue: 'Name', viewKey: 'sdm_name', type: TYPE.NUMBER},
      //    { viewValue: 'Project Name', viewKey: 'project_name', type: TYPE.STRING },
      //    { viewValue: 'Project Date', viewKey: 'project_enddate', type: TYPE.STRING },
      // ],
      tableColumns : [
        { prop: 'norut', name: 'No.', width: 100, sortable: true },
        { prop: 'sdm_name', name: 'Nama Sdm', width: 100, sortable: true },
        { prop: 'project_name', name: 'Project Name', width: 100, sortable: true },
        // { prop: 'project_desc', name: 'Project Desc.', width: 100, sortable: true },
        { prop: 'project_role', name: 'Role', width: 100, sortable: true },
        { prop: 'project_startdate', name: 'Start Date', width: 100,
        cellTemplate: this.viewAsDateTemplate, sortable: true },
        { prop: 'project_enddate', name: 'End Date', width: 100,
        cellTemplate: this.viewAsDateTemplate, sortable: true },
        { prop: 'project_site', name: 'Project Site', width: 100, sortable: true },
        { prop: 'project_customer', name: 'Customer', width: 100, sortable: false },
        { prop: 'project_apptype', name: 'App Type', width: 100, sortable: false },
        { prop: 'project_serveros', name: 'Server Os', width: 100, sortable: false },
        { prop: 'project_devlanguage', name: 'Dev Language', width: 100, sortable: false },
        { prop: 'project_framework', name: 'Framework', width: 100, sortable: false },
        { prop: 'project_database', name: 'Database', width: 100, sortable: false },
        { prop: 'project_appserver', name: 'App Server', width: 100, sortable: false },
        { prop: 'project_devtool', name: 'Dev Tools', width: 100, sortable: false },
        { prop: 'project_technicalinfo', name: 'Technical Info', width: 100, sortable: false },
        { prop: 'project_othertinfo', name: 'Other Info', width: 100, sortable: false },
        { prop: 'notif', name: 'Notifikasi', width: 100,
          cellTemplate: this.notif, sortable: false },
        { prop: 'project_action', name: 'Action', width: 100,
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

  }

   public navigateEditMenu(id) {
    this.router.navigate(['/pages/pja/PJA002', { id }]);
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
      // console.log(this.action.getFormControlValue(this.SdmName));
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
    // const SdmName = this.action.getFormControlValue('sdm_id');
    // const SdmProject = this.action.getFormControlValue('project_name');
    // const Projectdate = this.action.getFormControlValue('project_enddate');

    // this.action.setPaginationFilter(
    //   Conjunction.AND(
    //     // filterCriteria
    //     // Conjunction.AND(
    //     //   Comparison.EQ('sdm_id', SdmName),
    //     //   Comparison.EQ('project_name', SdmProject)),
    //     // Comparison.LE('project_enddate', Projectdate),
    //     Projectdate ? Comparison.LE('project_enddate', Projectdate) : Comparison.NE('project_enddate', 'project_enddate'),
    //     SdmName ? Comparison.EQ('sdm_id', SdmName) : Comparison.NE('sdm_id', 'sdm_id'),
    //     SdmProject ? Comparison.EQ('project_name', SdmProject) : Comparison.NE('project_name', 'project_name')
    //   )
    // );
    this.ProjectEndDate = this.action.getFormControlValue('project_enddate');
    console.log('Nama: ', this.SdmName, 'Nama Project: ', this.ProjectName, 'Tanggal berakhir: ', this.ProjectEndDate);
    this.action.setPaginationFilter(
      Conjunction.AND(
        // filterCriteria
        this.ProjectEndDate ? Comparison.LE('project_enddate', this.ProjectEndDate) : Comparison.NE('project_enddate', 'project_enddate'),
        this.SdmName ? Comparison.EQ('sdm_id', this.SdmName) : Comparison.NE('sdm_id', 'sdm_id'),
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
  }

}
