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

@Component({
  selector: 'app-PJA003R',
  templateUrl: './PJA003R.component.html',
  styleUrls: ['./PJA003R.component.css']
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

  public ceritanyaFilter: any;

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
        project_name: this.filteredProject.project_name,
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
      //    { viewValue: 'Name', viewKey: 'sdm.sdm_name', type: TYPE.NUMBER},
      //    { viewValue: 'Project Name', viewKey: 'project_name', type: TYPE.STRING },
      //    { viewValue: 'Project Date', viewKey: 'project_enddate', type: TYPE.STRING },
      // ],
      tableColumns : [
        { prop: 'project_id', name: 'No.', width: 100, sortable: true },
        { prop: 'sdm_name', name: 'Nama Sdm', width: 100, sortable: true },
        { prop: 'project_name', name: 'Project Name', width: 100, sortable: true },
        // { prop: 'project_desc', name: 'Project Desc.', width: 100, sortable: true },
        // { prop: 'project_role', name: 'Role', width: 100, sortable: true },
        { prop: 'project_startdate', name: 'Start Date', width: 100,
        cellTemplate: this.viewAsDateTemplate, sortable: true },
        { prop: 'project_enddate', name: 'End Date', width: 100,
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
        { prop: 'notif', name: 'Notifikasi', width: 100,
          cellTemplate: this.notif, sortable: false },
        { prop: 'project_id', name: 'Action', width: 100,
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
      initializeData: true
  });

    this.lovProject = this._factory.lov({
      api: 'lov/Project',
      initializeData: true
    });

  }

  public navigateMenuDetail(id) {
    this.router.navigate(['/pages/PJA002', {id}]);
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

      this.action.patchFormData({sdm_id: dataSdm.key, sdm_name: dataSdm.values.sdm_sdm_name});
      console.log(this.action.getFormControlValue('sdm_id'));
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

      this.action.patchFormData({project_id: dataProject.key, project_name: dataProject.values.project_project_name});
      console.log(this.action.getFormControlValue('project_id'));
    }
  }

  public filterProject(val: string) {
    return val ? this.lovProject.data.filter((s) => s.values.project_project_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  public onSearch() {
    const filterCriteria = [];

    const SdmName = this.action.getFormControlValue('sdm_id');
    const SdmProject = this.action.getFormControlValue('project_name');
    const Projectdate = this.action.getFormControlValue('project_enddate');

    this.action.setPaginationFilter(
      Conjunction.AND(
        // filterCriteria
        Projectdate ? Comparison.LE('project_enddate', Projectdate) : Comparison.NE('project_enddate', 'project_enddate'),
        SdmName ? Comparison.EQ('sdm_id', SdmName) : Comparison.NE('sdm_id', 'sdm_id'),
        SdmProject ? Comparison.EQ('project_name', SdmProject) : Comparison.NE('project_name', 'project_name')
      )
    );

    this.action.refreshTable();
  }

}
