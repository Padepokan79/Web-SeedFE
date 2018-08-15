import { CoreFactory } from './../../../../core/factory/core.factory';
import { DataTable } from './../../../../core/models/data-table';
import { InputForm } from './../../../../core/models/input-form';
import { ActionService } from './../../../../core/services/uninjectable/action.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LOVService } from './../../../../core/services/uninjectable/lov.service';
import { SearchCriteria } from './SearchCriteria';
import { ISimplifiedFilterOperand } from './../../../../core/interfaces/main/i-simplified-filter-operand';
import { Comparison } from './../../../../core/enums/comparison-operator.enum';
import { Conjunction } from './../../../../core/enums/conjunction-operator.enum';
import { DefaultNotificationService } from './../../../../core/services/default-notification.service';
import { ListOfValue } from './../../../../core/models/list-of-value';
import { FormGroup, FormControl } from './../../../../../../node_modules/@angular/forms';

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

  public sdmCtrl: FormControl;
  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  public listSearchCriteria: SearchCriteria[] = [];
  public IdSdm: any;
  public filteredSdm: any;

  public lovSDM: LOVService;
  public lovSkillType: LOVService;
  public lovSkill: LOVService;
  public lovSdmSkill: LOVService;
  public isButtonClicked = false;

  constructor(private _factory: CoreFactory, public _notif: DefaultNotificationService) {
    this.listSearchCriteria.push(new SearchCriteria(_factory));
    this.sdmCtrl = new FormControl();
    this.filteredSdm = this.sdmCtrl.valueChanges
    .startWith('')
    .map((value) => this.filterSdm(value) );
  }

  public filterSdm(val: string) {
    return val && val.length >= 0 ? this.lovSDM.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  public setSdmValue(inputForm: FormGroup, dataSdm: ListOfValue) {
    if (dataSdm) {
      this.IdSdm = dataSdm.key;
      this.lovSDM = this._factory.lov({
        api: 'lov/Sdm',
        params: {
          sdm_id : dataSdm.key
        },
        initializeData: true
      });
      this.action.patchFormData({ sdm_id: dataSdm.key, sdm_name: dataSdm.values.sdm_sdm_name });
    }
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

    this.dataTable = this._factory.dataTable({
      serverSide: true,
      pagingParams: {
        limit: 10
      },
      tableColumns: [
        { prop: 'sdm_nik', name: 'NIK', width: 10, sortable: false },
        { prop: 'sdm_name', name: 'Name', width: 150, sortable: false },
        { prop: 'skilltype_name', name: 'Category', width: 20, sortable: false },
        { prop: 'skill_name', name: 'Skills', width: 20, sortable: false },
        { prop: 'sdmskill_value', name: 'Value', width: 50, sortable: false },
        { prop: 'sdm_id', name: 'Action', width: 10, cellTemplate: this.tableActionTemplate, sortable: false },
      ]
    });

    this.action = this._factory.actions({
      api: 'allocation/MengelolaSdmSkill',
      dataTable: this.dataTable
    });

    // this.action = this._factory.actions({
    //   api: 'allocation/MengelolaSdmSkill',
    //   dataTable: this.dataTable
    // });

    // this.lovSkill = this._factory.lov({
    //   api: 'lov/Skill',
    //   initializeData: true
    // });

  }

  public selectToAssign() {
    this.isButtonClicked = true;
    const filterComponent: ISimplifiedFilterOperand[] = [];
    this.listSearchCriteria.forEach((searchCriteria: SearchCriteria) => {
      filterComponent.push(
        Conjunction.AND(
          Comparison.EQ('skilltype_id', searchCriteria.skilltype_id),
          Comparison.EQ('skill_id', searchCriteria.skill_id),
          Comparison.GE('sdmskill_value', searchCriteria.value)
        )
      );

      this._notif.success({
        message : searchCriteria.skilltype_id + ' , ' + searchCriteria.skill_id + ' , ' + searchCriteria.value
      });
    });

    const doubleFilter = Conjunction.OR(...filterComponent);

    this.action.setPaginationFilter(doubleFilter);
    this.action.refreshTable();
  }

  // public assignSdmSubmit() {

  // }
}
