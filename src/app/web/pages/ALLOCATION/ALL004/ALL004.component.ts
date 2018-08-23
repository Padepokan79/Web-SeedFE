import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { Session } from 'app/core/utils/session';

import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { SearchCriteria } from './SearchCriteria';
import { DataTable } from '../../../../core/models/data-table';
import { InputForm } from '../../../../core/models/input-form';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { HttpClient, HttpParams } from '../../../../../../node_modules/@angular/common/http';
import { MultiInsertSdmSkill } from './MultiInsertSdmSkill';
import { FormGroup, FormControl } from '../../../../../../node_modules/@angular/forms';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { startWith, map } from '../../../../../../node_modules/rxjs/operators';
import { ListOfValue } from '../../../../core/models/list-of-value';
import { Router, ActivatedRoute } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'io-ALL004',
  templateUrl: './ALL004.component.html',
  styleUrls: ['./ALL004.component.scss']
})
export class ALL004Component implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  // public action: ActionService;
  // public inputForm: InputForm;
  public dataTable: DataTable;
  public listSearchCriteria: SearchCriteria[] = [];
  // public listSkillSelected: SkillSelected[] = [];

  public lovSDM: LOVService;
  public lovSkillType: LOVService;
  public lovSkill: LOVService;
  public lovSdmSkill: LOVService;

  public title = 'app';
  public isButtonClicked = false;
  public listMultiInsert: MultiInsertSdmSkill[] = [];
  public skillId: number;
  public skilltypeId: number;
  public skillsdmValue: number;
  public myGroup: FormGroup;
  public filteredSdm: any;
  public action: ActionService;
  public sdmId: any;
  public sdmCtrl: FormControl;

  constructor(public _notif: DefaultNotificationService , private route: ActivatedRoute , private _factory: CoreFactory, private http: HttpClient) {
    this.listSearchCriteria.push(new SearchCriteria(_factory));
    this.sdmCtrl = new FormControl();
    this.filteredSdm = this.sdmCtrl.valueChanges
    .startWith('')
    .map((value) => this.filterSdm(value)); 
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
  }

  public setSdmValue(inputForm: FormGroup, dataSdm: ListOfValue) {
    if (dataSdm) {
      this.lovSDM = this._factory.lov({
        api: 'lov/sdm',
        params: {
          sdm_id: dataSdm.key
        },
        initializeData: true
      });
      this.sdmId = dataSdm.key;
      // this.action.patchFormData({sdm_id: dataSdm.key, sdm_name: dataSdm.values.sdm_sdm_name});
      console.log(this.action.getFormControlValue('sdm_id'));
    }
  }

  public filterSdm(val: string) {
    return val ? this.lovSDM.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  // // // tslint:disable-next-line:member-ordering
  // tslint:disable-next-line:member-ordering
  public apiRoot: string = 'http://localhost:7979/allocation/MultiInsertSdm';
  public btnSave() {
  const body = [];
  this.listSearchCriteria.forEach((skillSdm: SearchCriteria) => {
    body.push({
      sdm_id: this.sdmId,
      skilltype_id: skillSdm.skilltype_id,
      skill_id: skillSdm.skill_id,
      sdmskill_value: skillSdm.sdmskillValue
    });
  });
  console.log('POST');
  const url = `${this.apiRoot}/MultiCreate`;
  const httpOptions = {
    params: new HttpParams()
  };
  this.http
    .post(url, {
      listsdm: body
    }, httpOptions)
    .subscribe((res) => {
      this._notif.success({
        message: 'Input Sdm Skill Value berhasil'
      });
    });
  }
}
