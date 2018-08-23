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
import { FormControl } from './../../../../../../node_modules/@angular/forms';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-ALL006',
  templateUrl: './ALL006.component.html',
  styleUrls: ['./ALL006.component.css']
})

export class ALL006Component implements OnInit {

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
  public getClientid: number;
  public lovSDM: LOVService;
  public lovSkillType: LOVService;
  public lovSkill: LOVService;
  public lovSdmSkill: LOVService;
  public isButtonClicked = false;
  public hiringSubmit: any;
  public assignSubmit: any;
  public doubleFilter: any;
  public categorySkill: any;
  public varSkill: string;
  public skillValue: string;
  public hiringstatId: number;
  public methodIds: any;

  constructor(private _factory: CoreFactory, public _notif: DefaultNotificationService, private route: ActivatedRoute) {
    this.listSearchCriteria.push(new SearchCriteria(_factory));
    this.sdmCtrl = new FormControl();
    this.filteredSdm = this.sdmCtrl.valueChanges
      .startWith('')
      .map((value) => this.filterSdm(value));
    this.route.params.subscribe((param) => {
      this.IdSdm = param.id;
    });
  }

  public filterSdm(val: string) {
    return val && val.length >= 0 ? this.lovSDM.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  public setSdmValue(dataSdm: ListOfValue) {
    if (dataSdm) {
      this.IdSdm = dataSdm.key;
      console.log(this.IdSdm);
      // this.action.patchFormData({ sdm_id: dataSdm.key, sdm_name: dataSdm.values.sdm_sdm_name });
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
        { prop: 'sdm_id', name: 'Select', width: 10, cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    this.action = this._factory.actions({
      api: 'allocation/MengelolaSdmSkill',
      // api: 'allocation/MultifilteringSdm',
      dataTable: this.dataTable
    });

    // this.lovSkill = this._factory.lov({
    //   api: 'lov/Skill',
    //   initializeData: true
    // });

  }

  public selectToAssign() {
    this.isButtonClicked = true;
    const filterComponent: ISimplifiedFilterOperand[] = [];
    this.listSearchCriteria.forEach((searchCriteria: SearchCriteria) => {
      this.categorySkill = searchCriteria.skilltype_id;
      this.varSkill = searchCriteria.skill_id;
      this.skillValue = searchCriteria.value;

      filterComponent.push(
        Conjunction.AND(
          Comparison.EQ('skilltype_id', this.categorySkill),
          this.varSkill !== '' ? Comparison.EQ('skill_id', this.varSkill) : Comparison.NE('skill_id', this.varSkill),
          Comparison.GE('sdmskill_value', this.skillValue)
        )
      );
    });

    if (this.IdSdm == null) {
      this.IdSdm = '';
      this.doubleFilter = Conjunction.OR(...filterComponent);
    }

    if (this.categorySkill === null && (this.varSkill === null || this.skillValue === null)) {
      this.doubleFilter = Comparison.EQ('sdm_id', this.IdSdm);
    }

    this.doubleFilter = Conjunction.OR(
      ...filterComponent,
      Comparison.EQ('sdm_id', this.IdSdm)
    );

    if (this.IdSdm != null) {
      if (this.categorySkill !== '') {
        this._notif.success({
          message: 'Data filtered by Name and Category'
        });
      } else if (this.varSkill !== '' && this.categorySkill !== '') {
        this._notif.success({
          message: 'Data filtered by Name, Category and Skill'
        });
      } else if (this.skillValue !== '' && this.varSkill !== '' && this.categorySkill !== '') {
        this._notif.success({
          message: 'Data filtered by Name, Category, Skill and Value'
        });
      } else {
        this._notif.error({
          message: 'You have failed to filter'
        });
      }
    } else if (this.IdSdm == null) {
      if (this.categorySkill !== '') {
        this._notif.success({
          message: 'Data filtered by Category'
        });
      } else if (this.varSkill !== '' && this.categorySkill !== '') {
        this._notif.success({
          message: 'Data filtered by Category and Skill'
        });
      } else if (this.skillValue !== '' && this.varSkill !== '' && this.categorySkill !== '') {
        this._notif.success({
          message: 'Data filtered by Category, Skill and Value'
        });
      } else {
        this._notif.error({
          message: 'You have failed to filter'
        });
      }
    }

    this.action.setPaginationFilter(this.doubleFilter);
    this.action.refreshTable();
  }

  public resetSource() {
    this.IdSdm = '';
    this.categorySkill = '';
    this.varSkill = '';
    this.skillValue = '';
  }
}
