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

@Component({
  selector: 'app-PJA003',
  templateUrl: './PJA003.component.html',
  styleUrls: ['./PJA003.component.css']
})
export class PJA003Component implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;
  @ViewChild('tableActionNotification')
  public tableActionNotification: any;

  public action: ActionService;
  public dataTable: DataTable;
  public inputForm: InputForm;
  public listData: any;

  public lovSdm: LOVService;
  public lovProject: LOVService;
  public time: Date = new Date();

  // sdm
  // public filteredSdm: any;
  // public sdmCtrl: any;
  // public sdm: any;
  // public kdSdm: any;

  constructor(private _factory: CoreFactory, private router: Router) {

    // this.sdmCtrl = new FormControl();
    // this.filteredSdm = this.sdmCtrl.valueChanges
    // .startWith(null)
    // .map((name) => this.filterSdm(name));
  }

  public ngOnInit() {

    setInterval(() => {
      this.time = new Date();
    }, 1);

    this.inputForm = this._factory.inputForm({
      formControls: {
        project_id: '',
        sdm_id: '',
        sdm_name: '',
        project_name: '',
        kdsm1: '',
        nmsdm: '',
        end_date_time: '',
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
        { prop: 'project_id', name: 'No.', width: 100, sortable: true },
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
        { prop: 'project_id', name: 'Notifikasi', width: 100,
          cellTemplate: this.tableActionNotification, sortable: false },
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

  // public filterSdm(val: string) {
  //   // tslint:disable-next-line:max-line-length
  //   return val && val.length > 2 ? this.lovSdm.data.filter((s) => s.values.sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  //   }

  // public setSdmValue(inputForm: FormGroup, dataSdm: ListOfValue) {
  //   if (dataSdm) {
  //     this.kdSdm = dataSdm.key;
  //     this.lovSdm = this._factory.lov({
  //       api: 'lov/Sdm',
  //       initializeData: true
  //     });
  //     this.action.patchFormData({kdsdm1: dataSdm.key, nmsdm1: dataSdm.values.sdm_name});
  //   }
  // }

  // public selectSdm(event, sdmSelect) {
  //     this.lovSdm = this._factory.lov({
  //       api: 'lov/Sdm',
  //       pagingParams: {
  //         filter : {
  //           field: 'sdm_name',
  //           operator: COMPARISON_OPERATOR.LIKE,
  //           value: sdmSelect.key
  //         }
  //       },
  //       initializeData: true
  //   });
  // }
   public navigateEditMenu(id) {
    this.router.navigate(['/pages/pja/PJA002', { id }]);
  }
}
