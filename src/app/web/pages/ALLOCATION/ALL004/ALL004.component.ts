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
import { FormGroup, FormControl } from '../../../../../../node_modules/@angular/forms';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { startWith, map } from '../../../../../../node_modules/rxjs/operators';
import { ListOfValue } from '../../../../core/models/list-of-value';
import { Router, ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { Comparison } from '../../../../core/enums/comparison-operator.enum';
import { Conjunction } from '../../../../core/enums/conjunction-operator.enum';

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

  public inputForm: InputForm;
  public dataTable: DataTable;
  public listSearchCriteria: SearchCriteria[] = [];
  // public listSkillSelected: SkillSelected[] = [];

  public lovSDM: LOVService;
  public lovSkillType: LOVService;
  public lovSkill: LOVService;
  public lovSdmSkill: LOVService;

  public title = 'app';
  public save = false;
  public skillId: number;
  public skilltypeId: number;
  public skillsdmValue: number;
  public myGroup: FormGroup;
  public filteredSdm: any;
  public action: ActionService;
  public sdmId: number;
  public sdmCtrl: FormControl;
  public nik: string;
  public selected: string;
  public baris: number = 1;

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
    this.baris = this.baris + 1;
  }

  public removeSearchCriteria(inc) {
    this.listSearchCriteria.splice(inc, 1);
    this.baris = this.baris - 1;
  }

  public ngOnInit() {
    this.lovSDM = this._factory.lov({
      api: 'lov/Sdm',
      initializeData: true
    });
  }

  public setSdmValue(skillSdm: SearchCriteria, dataSdm: ListOfValue) {
    if (dataSdm) {
      this.sdmId = dataSdm.key;
      this.lovSDM = this._factory.lov({
        api: 'lov/sdm',
        params: {
          sdm_id: dataSdm.key
        },
        initializeData: true
      });
      
      const readAllApi = this._factory.api({
      api : 'sdm/MengelolaSdm/readAll',
        params : {
          value : this.sdmId
        }
      });

      this._factory.http().get(readAllApi).subscribe((res: any) => {
        console.log(res);
        console.log(this.sdmId);
        // this.action.patchFormData(res.data.items[this.selected]);
        this.nik = res.data.items[this.sdmId-1].sdm_nik;
      });

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
      if (this.sdmId == 0 || this.sdmId == null) {
        this._notif.error({
          message: 'Nama Sdm Wajib diisi'
        });
      } else if (skillSdm.skilltype_id == 0 || skillSdm.skilltype_id == null) {
        this._notif.error({
          message: 'Skill Type di baris ke '+this.baris+' Wajib diisi'
        });
      } else if (skillSdm.skill_id == 0 || skillSdm.skill_id == null) {
        this._notif.error({
          message: 'Skill di baris ke '+this.baris+' Wajib diisi'
        });
      } else if (skillSdm.sdmskillValue == 0 || skillSdm.sdmskillValue == null) {
        this._notif.error({
          message: 'Value di baris ke '+this.baris+' Wajib diisi'
        });
      } else {
        body.push({
          sdm_id: this.sdmId,
          skilltype_id: skillSdm.skilltype_id,
          skill_id: skillSdm.skill_id,
          sdmskill_value: skillSdm.sdmskillValue
        });
        this.save = true;
      }
    });

    const validationCek = this._factory.api({
      api : 'sdm/MengelolaSdm/readAll',
        params : {
          value : this.sdmId
        }
    });

    this._factory.http().get(validationCek).subscribe((res: any) => {
      console.log(res);
      console.log(this.sdmId);
      // this.action.patchFormData(res.data.items[this.selected]);
      this.nik = res.data.items[this.sdmId-1].sdm_nik;
    });

    if (this.save == true) {
      let valid = false;
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
            message: 'data berhasil di masukan'
          });
          valid = true;
       });
       if (valid == false) {
        this._notif.error({
          message: 'Data sudah ada'
        });
      }
    } else {
      console.log('Ada yang kurang');
    }
  }
}