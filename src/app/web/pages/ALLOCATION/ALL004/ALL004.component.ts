import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { Session } from 'app/core/utils/session';
import { Location } from '@angular/common';
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
  public valid = false;
  public save = false;

  constructor(public _notif: DefaultNotificationService , private route: ActivatedRoute , private _factory: CoreFactory, private http: HttpClient,private location: Location) {
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
      initializeData: true,
      pagingParams: {
        orderby: 'sdm_name ASC',
        filter: {
          field: 'sdm_status',
          operator: COMPARISON_OPERATOR.EQ,
          value: 1
        }
      }
    });
  }

  public setSdmValue(skillSdm: SearchCriteria, dataSdm: ListOfValue) {
    if (dataSdm) {
      this.sdmId = dataSdm.key;
      this.nik = '-';
      this.lovSDM = this._factory.lov({
        api: 'lov/sdm',
        params: {
          sdm_id: dataSdm.key
        },
        initializeData: true,
        pagingParams: {
          filter: {
            field: 'sdm_status',
            operator: COMPARISON_OPERATOR.EQ,
            value: 1
          }
        }
      });
      
      const readAllApi = this._factory.api({
        api : 'lov/SdmNik',
        params: {
          sdm_id: dataSdm.key
        }
      });

      console.log(this.sdmId);
      this.http.get(readAllApi).subscribe((res: any) => {
        for (var i = 0; i < res.data.length; ++i) {
          if (res.data[i].key == this.sdmId) {
            this.nik = res.data[i].values.sdm_sdm_nik;
          }
        }
      });

    }
  }

  public filterSdm(val: string) {
    return val ? this.lovSDM.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  // // // tslint:disable-next-line:member-ordering
  // tslint:disable-next-line:member-ordering

  public apiRoot: string = this._factory.api({
    api : 'allocation/MultiInsertSdm'
  })
  // 'http://localhost:7979/allocation/MultiInsertSdm';
  public btnSave() {


    let save2 = true;
    const body = [];
    var dataDouble = false;
    this.listSearchCriteria.forEach((skillSdm: SearchCriteria) => {
      if (this.sdmId == 0 || this.sdmId == null) {
        this._notif.error({
          message: 'Nama Sdm Wajib diisi'
        });
        save2 = false;
      } else if (skillSdm.skilltype_id == 0 || skillSdm.skilltype_id == null) {
        this._notif.error({
          message: 'Skill Type Wajib diisi'
        });
        save2 = false;
      } else if (skillSdm.skill_id == 0 || skillSdm.skill_id == null) {
        this._notif.error({
          message: 'Skill Wajib diisi'
        });
        save2 = false;
      } else if (skillSdm.sdmskillValue == 0 || skillSdm.sdmskillValue == null) {
        this._notif.error({
          message: 'Value Wajib diisi'
        });
        save2 = false;
      } else {
        if (skillSdm.sdmskillValue > 10) {
          this._notif.error({
            message: 'Value Maximal 10'
          });
          save2 = false;
        } else if (skillSdm.sdmskillValue < 0) {
          this._notif.error({
            message: 'Value hanya bisa 0 sampai 10'
          });
          save2 = false;
        } else {
          body.push({
            sdm_id: this.sdmId,
            skilltype_id: skillSdm.skilltype_id,
            skill_id: skillSdm.skill_id,
            sdmskill_value: skillSdm.sdmskillValue
          });
          this.save = true;
        }
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

    for (var i = 0; i < body.length; i++) { 
      for (var j = i + 1 ; j < body.length; j++) {
        if (body[i].skill_id == body[j].skill_id) { 
          dataDouble = true;
        } 
      }
    }

    if (dataDouble == true) {
      this._notif.error({
        message: 'Ada Data yang sama'
      });
      console.clear();
    } else {
      if (this.save == true && save2 == true) {
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
          .subscribe(
            (res: any) => {
            this._notif.success({
              message: 'Input data berhasil'
            });
            console.clear();
            console.log(res)
            this.location.back();
         },(error: any) => {
            this._notif.error(error);
            console.clear();
         });
      } else {
        console.log('Ada yang kurang');
      } 
    }
  }
}