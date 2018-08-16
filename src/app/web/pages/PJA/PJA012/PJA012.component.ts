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
import { FormGroup, FormControl, CheckboxControlValueAccessor } from './../../../../../../node_modules/@angular/forms';
import { ISimplifiedFilterComponent } from '../../../../core/interfaces/main/i-simplified-filter-component';
import { MultiInsert } from './MultiInsert';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { HttpClient } from '../../../../../../node_modules/@angular/common/http';

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
  public listMultiInsert: MultiInsert[] = [];
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
  public dataHiringInput: [];

  constructor(private _factory: CoreFactory, public _notif: DefaultNotificationService, private route: ActivatedRoute, private httpClient: HttpClient) {
    this.listSearchCriteria.push(new SearchCriteria(_factory));
    this.sdmCtrl = new FormControl();
    this.filteredSdm = this.sdmCtrl.valueChanges
    .startWith('')
    .map((value) => this.filterSdm(value) );
    this.route.params.subscribe((param) => {
      this.getClientid = param.id;
    });
  }

  public filterSdm(val: string) {
    return val && val.length >= 0 ? this.lovSDM.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  public setSdmValue(inputForm: FormGroup, dataSdm: ListOfValue) {
    if (dataSdm) {
      this.IdSdm = dataSdm.key;
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
        message : 'Data has been Filtered'
      });
    });

    // const filterNameComponent: ISimplifiedFilterComponent[] = [];
    // filterNameComponent.push(
    //   Comparison.EQ('sdm_id', this.IdSdm)
    // );

    // this._notif.success({
    //   message : this,
    // });

    const doubleFilter = Conjunction.OR(
      ...filterComponent,
      Comparison.EQ('sdm_id', this.IdSdm)
    );

    this.action.setPaginationFilter(doubleFilter);
    // this.action.setPaginationFilter(filterNameComponent);
    this.action.refreshTable();
  }

  public distRedundantCheckedSdm() {
    const tempData = [];
    this.action.table().rows.forEach((item) => {
      if (item.checked) {
        tempData.push(item);
      }
    });

    console.log(tempData);
  }

  public assignSdmSubmit() {
    this.isButtonClicked = true;
    // const postAPI = this._factory.api({
    //   api: 'project/mengelolaSdmHiring',
    // });
    console.log(this.dataHiringInput);
    // this._factory.http().post(postAPI,this.action.getFormData()).subscribe((response: any) => { });
  }
}