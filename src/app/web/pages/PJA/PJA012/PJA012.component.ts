
import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchCriteria } from './SearchCriteria';
// import { COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from '../../../core/constant/constant';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { IFilterOperand } from '../../../../core/interfaces/main/i-filter-operand';
import { CONJUNCTION_OPERATOR, COMPARISON_OPERATOR } from 'app/core/constant/constant';

@Component({
  selector: 'app-PJA012',
  templateUrl: './PJA012.component.html',
  styleUrls: ['./PJA012.component.css']
})
export class PJA012Component implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  public listSearchCriteria: SearchCriteria[] = [];

  public lovSDM: LOVService;
  public lovSkillType: LOVService;
  public lovSkill: LOVService;
  public lovSdmSkill: LOVService;

  constructor(private _factory: CoreFactory) {
    this.listSearchCriteria.push(new SearchCriteria(_factory));
  }

  public addSearchCriteria() {
    const searchCriteria = new SearchCriteria(this._factory);
    this.listSearchCriteria.push(searchCriteria);
  }

  public removeSearchCriteria(inc) {
    this.listSearchCriteria.splice(inc, 1);
  }

  public ngOnInit() {
    this.inputForm = this._factory.inputForm({

    });

    this.lovSDM = this._factory.lov({
      api: 'lov/Sdm',
      initializeData: true
    });

    // this.lovSkill = this._factory.lov({
    //   api: 'lov/Skill',
    //   initializeData: true
    // });

  }

  public selectToAssign() {
    const filterComponent: IFilterOperand[] = [];
    this.listSearchCriteria.forEach((searchCriteria: SearchCriteria) => {
      filterComponent.push({
        operator : CONJUNCTION_OPERATOR.AND,
        component : [
          {
            field : 'skilltype_id',
            operator : COMPARISON_OPERATOR.EQ,
            value : searchCriteria.skilltype_id
          },
          {
            field : 'skill_id',
            operator : COMPARISON_OPERATOR.EQ,
            value : searchCriteria.skill_id
          },
          {
            field : 'value',
            operator : COMPARISON_OPERATOR.GE,
            value : searchCriteria.value
          }
        ]
      });
    });

    const filterr: IFilterOperand = {
      operator: CONJUNCTION_OPERATOR.AND,
      component : [
        {
          field : 'skilltype_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.listSearchCriteria[0].skilltype_id
        },
        {
          field : 'skill_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.listSearchCriteria[0].skill_id
        },
        {
          field : 'value',
          operator : COMPARISON_OPERATOR.GE,
          value : this.listSearchCriteria[0].value
        }
      ]
    };

    this.dataTable = this._factory.dataTable({
      serverSide: true,
      pagingParams: {
        filter: filterr,
        limit: 10
      },
      tableColumns: [
        { prop: 'sdm_nik', name: 'NIK', width: 10, sortable: false },
        { prop: 'sdm_name', name: 'Name', width: 150, sortable: false },
        { prop: 'skilltype_name', name: 'Skills', width: 20, sortable: false },
        { prop: 'skill_name', name: 'Skills', width: 20, sortable: false },
        { prop: 'sdmskill_value', name: 'Value', width: 50, sortable: false },
        { prop: 'sdm_id', name: 'Action', width: 10, cellTemplate: this.tableActionTemplate, sortable: false },
      ]
    });
  }

  // public assignSdmSubmit() {

  // }
}
