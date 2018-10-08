  // Author        : Nurdhiat Chaudhary Malik
  // Date Created  : 01 Agustus 2018
  // Status        : Done

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../core/factory/core.factory';

@Component({
  selector: 'app-ALL001',
  templateUrl: './ALL001.component.html',
  styleUrls: ['./ALL001.component.scss']
})
export class ALL001Component implements OnInit {

  public time: Date = new Date();
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovSkillType: LOVService;

  constructor(private _factory: CoreFactory) { }

  public refreshTabel() {
    this.action.refreshTable();
  }

  public ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1);
    this.inputForm = this._factory.inputForm({
      formControls: {
        skill_id: null,
        skilltype_id: '',
        skill_name: '',
      },
      validationMessages: {
        skilltype_id: {
          required: 'Silahkan masukkan Category Name'
        },
        skill_name: {
          required: 'Silahkan masukkan Skill Name'
        }
      }
    });

    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        limit : 10
      },
      tableColumns : [
        { prop: 'skill_id', name: 'Skill ID', flexGrow: 1, sortable: true },
        { prop: 'skilltype_name', name: 'Category Name', flexGrow: 3, sortable: true },
        { prop: 'skill_name', name: 'Skill Name', flexGrow: 2, sortable: true },
        { prop: 'skill_id', name: 'Action', flexGrow: 2, cellTemplate: this.tableActionTemplate, sortable: true }
      ]
    });

    this.action = this._factory.actions({
      api: 'allocation/MengelolaSkill/',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });

    this.lovSkillType = this._factory.lov({
        api: 'lov/SkillType',
        initializeData: true
    });
  }

}
