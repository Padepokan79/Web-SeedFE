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
  //  this.inputForm = this._factory.inputForm({
  //     formControls: {
  //       skilltype_id: '',
  //       skill_id: '',
  //       sdm_id: '',
  //       sdmskill_value: ''
  //     }
  //   });
  //  this.action = this._factory.actions({
  //     api: 'allocation/MengelolaSdmSkill/',
  //     inputForm: this.inputForm,
  //   });

   this.lovSDM = this._factory.lov({
        api: 'lov/Sdm',
        initializeData: true
    });
  }


  public apiRoot: string = 'allocation/MengelolaSdmSkill';
  public localhostUrl = this._factory.config().url();
  public doPOST() {
    console.log('POST');
    const url = `${this.localhostUrl}${this.apiRoot}/MultiCreate`;
    const httpOptions = {
      params: new HttpParams()
    };
    this.http
      .post(url, {
          listdata: [{
              sdm_id: '',
              skilltype_id: '',
              skill_id: '',
              sdmskill_value: ''
            }
          ] 
        }, httpOptions)
      .subscribe((res) => console.log(res));
  }
}
