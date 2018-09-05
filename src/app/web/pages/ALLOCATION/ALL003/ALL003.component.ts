import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { Router } from '../../../../../../node_modules/@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-ALL003',
  templateUrl: './ALL003.component.html',
  styleUrls: ['./ALL003.component.scss']
})
export class ALL003Component implements OnInit {
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

  constructor(private _factory: CoreFactory, private router: Router) { }

  // tslint:disable-next-line:no-empty
  public ngOnInit() {
    this.inputForm = this._factory.inputForm({
      formControls: {
        skilltype_id: '',
        skill_id: '',
        sdm_id: '',
        sdmskill_value: '',
        project_enddate: '',
      },
    //   // validationMessages: {
    //   //   skilltype_name: {
    //   //     required: 'Silahkan masukkan Task ID',
    //   //     pattern: 'Hanya boleh angka'
    //   //   },
    //   // }
    });
    this.dataTable = this._factory.dataTable({
      serverSide : false,
      pagingParams : {
        // filter: {
        //   operator: CONJUNCTION_OPERATOR.AND,
        //   component: [
        //       {
        //           field: 'kddati1',
        //           operator: COMPARISON_OPERATOR.EQ,
        //           value: Session.getUserData('kddati1')
        //       },
        //       {
        //           field: 'kddati2',
        //           operator: COMPARISON_OPERATOR.EQ,
        //           value: Session.getUserData('kddati2')
        //       }
        //   ]
        // },
        limit : 8
      },
      searchCriteria : [
        { viewValue: 'Skill Type Name', viewKey: 'skilltype_name', type: TYPE.STRING },
        { viewValue: 'Skill Name', viewKey: 'skill_name', type: TYPE.STRING },
        { viewValue: 'Sdm Name', viewKey: 'sdm_name', type: TYPE.STRING },
        { viewValue: 'NIK', viewKey: 'sdm_nik', type: TYPE.NUMBER }
      ],
      tableColumns : [
        { prop: 'sdm_nik', name: 'NIK', width: 100, sortable: false },
        { prop: 'sdm_name', name: 'Sdm Name', width: 100, sortable: false },
        { prop: 'skill_name', name: 'Skill name', width: 100, sortable: false },
        { prop: 'skilltype_name', name: 'Skill Type Name', width: 100, sortable: false },
        { prop: 'sdmskill_value', name: 'Skill Value', width: 100, sortable: true },
        { prop: 'project_enddate', name: 'Project End Date', width: 100, sortable: false },
        { prop: 'notif', name: 'Notifikasi', width: 50,
        cellTemplate: this.notif, sortable: false },
        { prop: 'sdmskill_id', name: 'Action', width: 100,
        cellTemplate: this.tableActionTemplate, sortable: false },
        
      ]
    });
    this.action = this._factory.actions({
      api: 'allocation/MengelolaSdmSkill/',
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
      initializeData: true
    });
  }

  public navigateEditMenu(id) {
    this.router.navigate(['pages/all/ALL005' , {id}]);
  }
  public refreshData(){
    this.action.refreshTable();
  }
}