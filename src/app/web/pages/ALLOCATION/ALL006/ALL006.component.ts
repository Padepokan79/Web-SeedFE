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
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams, HttpClient } from '../../../../../../node_modules/@angular/common/http';
import { Message } from '../../../../../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { DetailSkillSdmComponent } from '../ALL003/DetailSkillSdm/DetailSkillSdm.component';

@Component({
  selector: 'app-ALL006',
  templateUrl: './ALL006.component.html',
  styleUrls: ['./ALL006.component.scss']
})

export class ALL006Component implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;
  @ViewChild('popUp')
  public popUp: ModalComponent;
  @ViewChild('modalDataPopUp')
  public modalDataPopUp: DetailSkillSdmComponent;

  public selectedId: any;

  public sdmCtrl: FormControl;
  public valueCtrl: FormControl;
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
  public assignSubmit: any;
  public keyId: any;
  public doubleFilter: any;
  public time: Date = new Date();
  public categorySkill: any;
  public varSkill: any;
  public skillValue: string;
  public hiringstatId: number;
  public methodIds: any;
  public check: any;
  public tes: string;
  public increment: number = 0;
  public operator: any = 1;
  public isCantFilter: boolean = true;
  public data: number[];
  public cek: boolean = true;
  public unlockSkill: boolean = true;
  public unlockValue: boolean = true;
  public rows: any[] = [];
  public indexData: number;
  public checkData: boolean;

  @ViewChild('notif')
  public notif: any;
  public validasiRolevalue: boolean;
  public roletype: string = '1';
  public skillType: string;

  // tslint:disable-next-line:member-access
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  public onKey(event: any) {
    console.log(event);
    this.keyId = event.target.value;
    if (this.keyId === '') {
      this.IdSdm = null;
      console.log(this.IdSdm);
    }
  }

  // tslint:disable-next-line:member-ordering
  constructor(private _factory: CoreFactory,
              public _notif: DefaultNotificationService,
              private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) {
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
    }
  }

  public addSearchCriteria() {
    console.log(this.increment);
    const searchCriteria = new SearchCriteria(this._factory);
    this.listSearchCriteria.push(searchCriteria);
    this.increment += 1;
    console.log(this.increment);

  }

  public removeSearchCriteria(inc) {
    this.listSearchCriteria.splice(inc, 1);
    this.increment -= 1;
    console.log(this.increment);
    console.log(inc);
  }

  public ngOnInit() {

    setInterval(() => {
      this.time = new Date();
    }, 1);
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

    this.dataTable = this._factory.dataTable({
      serverSide: false,
      pagingParams: {
        limit: 10
      },
      tableColumns: [
        { prop: 'sdm_nik', name: 'NIK', flexGrow: 1, sortable: false },
        { prop: 'sdm_name', name: 'Name', flexGrow: 3, sortable: false },
        // { prop: 'skilltype_name', name: 'Category', width: 20, sortable: false },
        // { prop: 'skill_name', name: 'Skills', width: 20, sortable: false },
        // { prop: 'sdmskill_value', name: 'Value', width: 50, sortable: false },
        { prop: 'end_contractproject', name: 'End date project', flexGrow: 2, sortable: false },
        { prop: 'sdm_notification', name: 'Notifikasi Kontrak', flexGrow: 3,
        cellTemplate: this.notif, sortable: false },
        { prop: 'sdmskill_id', name: 'Action', flexGrow: 2,
        cellTemplate: this.tableActionTemplate, sortable: false },
      ]
    });
  //   this.action = this._factory.actions({
  //   api: 'allocation/MengelolaSdmSkill',
  //   dataTable: this.dataTable,
  // });

    setInterval(() => {
      this.time = new Date();
    }, 1);

  }
 // tslint:disable-next-line:member-ordering
 public apiFilter: string = this._factory.api({
  api: `api/masterdata/MultiFiltering`
});
 public btnFilter() {
   this.isButtonClicked = true;
   this.checkData = true;
   const body = [];
   this.indexData = 1;
   this.listSearchCriteria.forEach((skillSdm: SearchCriteria) => {
     if (this.indexData === 1 ) {
      body.push({
       sdm_id: this.IdSdm,
       skilltype_id: skillSdm.skilltype_id,
       skill_id: skillSdm.skill_id,
       sdmskill_value: skillSdm.value,
       operator: this.operator
     });
     } else if (this.indexData > 1 && skillSdm.skilltype_id == null && skillSdm.skill_id == null && skillSdm.value == null) {
      this.checkData = false;
     } else {
     body.push({
       sdm_id: this.IdSdm,
       skilltype_id: skillSdm.skilltype_id,
       skill_id: skillSdm.skill_id,
       sdmskill_value: skillSdm.value,
       operator: this.operator
     });
     }
     this.indexData++;
    });
   console.log('POST');
   const url = `${this.apiFilter}/multiFilter`;
   const httpOptions = {
     params: new HttpParams()
   };
   this.listSearchCriteria.forEach((skillSdm: SearchCriteria) => {
    console.log(' nilai skill ' + skillSdm.value);
    this.skillType = skillSdm.skilltype_id;
    if (skillSdm.value == null) {
      this.cek = true;
    } else if ( skillSdm.value < 1 || skillSdm.value > 10) {
      this.cek = false;
    }
    // tslint:disable-next-line:triple-equals
    if (this.skillType == this.roletype && (skillSdm.value < 1 || skillSdm.value > 10 ) ) {
      this.validasiRolevalue = true;
    } else {
      this.validasiRolevalue = false;
    }
   });
   if (this.cek === true && this.validasiRolevalue === false && this.checkData === true) {
    this.http.post(url, {
      listsdm: body
    }, httpOptions)
      .subscribe((res: any) => {
        this.rows = res.data;
        console.log(this.rows);
      });
   } else {
    this.http.post(url, {
      listsdm: body
    }, httpOptions)
      .subscribe((res: any) => {
        this.rows = res.null;
      });
    if (this.checkData !== true) {
        this._notif.error({
          message : 'Please fill search parameter'
         });
      } else if ( this.validasiRolevalue === true ) {
        this._notif.error({
          message : 'Role Value Between 1 and 10'
         });
      } else {
        this._notif.error({
          message : 'Input Value Between 1 and 10'
         });
      }
   }
   this.cek = true;
  }

  public resetSource() {
    this.isButtonClicked = false;
    this.IdSdm = null;
    // this.unlockSkill = true;
    // this.unlockValue = true;
    this.listSearchCriteria[0].skill_id = null;
    this.listSearchCriteria[0].skilltype_id = null;
    this.listSearchCriteria[0].value = null;

    console.log(this.listSearchCriteria);

    this.sdmCtrl.setValue('');
    this.increment = 1;
    this.listSearchCriteria.splice(this.increment);
    this.increment = 0;
    console.log(this.increment);
  }

  public setOperatorAnd() {
    if (this.operator === 2 ) {
      this.operator = 1;
    } else if (this.operator === 1) {
      this.operator = 2;
    }
  }

  public setUnbutton() {
    if (this.IdSdm === null) {
      this.listSearchCriteria.forEach((searchCriteria: SearchCriteria) => {
        if (searchCriteria.skilltype_id === null) {
          this.isCantFilter = true;
        }
        this.isCantFilter = true;
      });
    } else {
      this.isCantFilter = false;
    }
  }

  public setSkill() {
    this.unlockSkill = false;
  }

  public setValue() {
    this.unlockValue = false;
  }
  public navigateDetailMenu(id) {
    // this.router.navigate(['pages/all/DetailSkillSdm' , {id}]);
    this.selectedId = id;
  }
}
