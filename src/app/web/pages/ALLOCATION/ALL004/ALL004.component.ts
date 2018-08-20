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
  public skillId: string;
  public sdmId: string;
  public skilltypeId: string;
  public skillsdmValue: number;
  public myGroup: FormGroup;

  constructor(private _factory: CoreFactory, private http: HttpClient) {
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
    this.lovSDM = this._factory.lov({
        api: 'lov/Sdm',
        initializeData: true
    });
  }

  // public btnSave() {
  //   this.myGroup = new FormGroup({
  //     sdm_id: new FormControl()
  //   });
  //   this.isButtonClicked = true;
  //   this.listMultiInsert.forEach((skillSdm: MultiInsertSdmSkill) => {
  //     this.skillId = skillSdm.skillId,
  //     this.sdmId = skillSdm.sdmId,
  //     this.skilltypeId = skillSdm.skilltypeId,
  //     this.skillsdmValue = skillSdm.sdmskillValue,
  //     skillSdm.postSdmSkill();
  //   });
  // }
  // // // tslint:disable-next-line:member-ordering
  public apiRoot: string = 'http://10.10.10.20:7979/allocation/MultiInsertSdm';
  // tslint:disable-next-line:member-ordering
  public btnSave() {
    console.log('POST');
    const url = `${this.apiRoot}/MultiCreate`;
    const httpOptions = {
      params: new HttpParams()
    };
    this.http
      .post(url, {
          data: {
            listdata: [{
                sdm_id: '',
                skilltype_id: '',
                skill_id: '',
                sdmskill_value: ''
              }
            ]
          }
        }, httpOptions)
      .subscribe((res) => console.log(res));
  }
}
