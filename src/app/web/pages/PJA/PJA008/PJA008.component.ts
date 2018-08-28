import { CoreFactory } from '../../../../core/factory/core.factory';
import { DataTable } from '../../../../core/models/data-table';
import { InputForm } from '../../../../core/models/input-form';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { SearchCriteria } from './SearchCriteria';
import { ISimplifiedFilterOperand } from '../../../../core/interfaces/main/i-simplified-filter-operand';
import { Comparison } from '../../../../core/enums/comparison-operator.enum';
import { Conjunction } from '../../../../core/enums/conjunction-operator.enum';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { ListOfValue } from '../../../../core/models/list-of-value';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MultiInsert } from './MultiInsert';

@Component({
  selector: 'app-PJA008',
  templateUrl: './PJA008.component.html',
  styleUrls: ['./PJA008.component.css']
})

export class PJA008Component implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public sdmCtrl: FormControl;
  public valueCtrl: FormControl;
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
  public assignSubmit: any;
  public keyId: any;
  public doubleFilter: any;
  public time: Date = new Date();
  public categorySkill: any;
  public varSkill: any;
  public skillValue: string;
  public hiringstatId: number;
  public methodIds: any;
  public apiRoot: string = 'http://localhost:7979/project/MultiHiring';
  public check: any;
  public tes: string;

  public onKey(event: any) {
    console.log(event);
    this.keyId = event.target.value;
    if (this.keyId === '') {
      this.IdSdm = null;
      console.log(this.IdSdm);
    }
  }

  // tslint:disable-next-line:member-ordering
  constructor(private _factory: CoreFactory, public _notif: DefaultNotificationService, private route: ActivatedRoute, private http: HttpClient) {
    this.listSearchCriteria.push(new SearchCriteria(_factory));
    this.sdmCtrl = new FormControl();
    this.valueCtrl = new FormControl({ value: '', disabled: true });
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

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
        skilltype_id: '',
        skill_id: '',
        sdmskill_value: ''
      }
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

    setInterval(() => {
      this.time = new Date();
    }, 1);

  }

  public selectToAssign() {
    this.isButtonClicked = true;
    const filterComponent: ISimplifiedFilterOperand[] = [];
    const filterComponentPlusName: ISimplifiedFilterOperand[] = [];
    this.listSearchCriteria.forEach((searchCriteria: SearchCriteria) => {
      this.categorySkill = searchCriteria.skilltype_id;
      console.log(this.categorySkill);
      if (this.categorySkill === 0) {
        searchCriteria.skill_id = '';
        this.varSkill = '';
      } else {
        this.varSkill = searchCriteria.skill_id;
      }
      console.log(this.varSkill);
      this.skillValue = searchCriteria.value;
      filterComponent.push(
        Conjunction.AND(
          this.categorySkill ? Comparison.EQ('skilltype_id', this.categorySkill) : Comparison.NE('skilltype_id', this.categorySkill),
          this.varSkill ? Comparison.EQ('skill_id', this.varSkill) : Comparison.NE('skill_id', this.varSkill),
          this.skillValue ? Comparison.GE('sdmskill_value', this.skillValue) : Comparison.NE('sdmskill_value', this.skillValue)
        )
      );
      filterComponentPlusName.push(
        Conjunction.AND(
          this.IdSdm ? Comparison.EQ('sdm_id', this.IdSdm) : Comparison.NE('sdm_id', this.IdSdm),
          this.categorySkill ? Comparison.EQ('skilltype_id', this.categorySkill) : Comparison.NE('skilltype_id', this.categorySkill),
          this.varSkill ? Comparison.EQ('skill_id', this.varSkill) : Comparison.NE('skill_id', this.varSkill),
          this.skillValue ? Comparison.GE('sdmskill_value', this.skillValue) : Comparison.NE('sdmskill_value', this.skillValue)
        )
      );
    });
    console.log(this.listSearchCriteria);
    // if (this.IdSdm == null) {
    //   this.doubleFilter = Conjunction.OR(...filterComponent);
    // }

    // if (this.categorySkill == null || this.varSkill == null || this.skillValue == null) {
    //   this.doubleFilter = Comparison.EQ('sdm_id', this.IdSdm);
    // }
    if (this.check === true) {
      console.log('Filter dengan AND');
      if (this.IdSdm != null) {
        this.doubleFilter = Conjunction.AND(...filterComponentPlusName);
      } else {
        this.doubleFilter = Conjunction.AND(...filterComponent);
      }
    } else {
      console.log('Filter dengan OR');
      if (this.IdSdm != null) {
        this.doubleFilter = Conjunction.OR(...filterComponentPlusName);
      } else {
        this.doubleFilter = Conjunction.OR(...filterComponent);
      }
    }

    this.action.setPaginationFilter(this.doubleFilter);
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

  public resetSource() {
    this.IdSdm = null;
    console.log(this.IdSdm);
    this.listSearchCriteria.push(new SearchCriteria(this._factory));
  }

  public hiringSubmit() {
    this.isButtonClicked = true;
    const bodyHiring = [];
    this.listMultiInsert.forEach((sdmHiring: MultiInsert) => {
      bodyHiring.push({
        sdm_id: sdmHiring.sdmId,
        client_id: sdmHiring.clientId,
        hiringstat_id: sdmHiring.hirestatId
      });
    });
    console.log('POST');
    const url = `${this.apiRoot}/MultiCreate`;
    const httpOptions = {
      params: new HttpParams()
    };
    this.http.post(url, {
      listhiring: bodyHiring
    }, httpOptions)
      .subscribe((res) => {
        this._notif.success({
          message: 'You have successfully Hired'
        });
      });
  }

  //   public onReset(){
  //     this.IdSdm = null;
  //     this.sdmCtrl.setValue('');
  //   }

  public checkMethod(event: any, check: any) {
    console.log(event.checked);
    this.check = event.checked;
  }

  public valueDisabled() {
    this.listSearchCriteria.forEach((searchCriteria: SearchCriteria) => {
      this.categorySkill = searchCriteria.skilltype_id;
      if (this.categorySkill === 0) {
        searchCriteria.skill_id = '';
        this.varSkill = '';
      } else {
        this.varSkill = searchCriteria.skill_id;
      }
      if (this.varSkill === 1) {
        this.tes = '111';
      }
      if (this.varSkill !== '') {
        this.valueCtrl = new FormControl({ value: '', disabled: false });
      } else {
        this.valueCtrl = new FormControl({ value: '', disabled: true });
      }
      console.log(this.varSkill);
    });
  }

}
