import { CoreFactory } from '../../../../core/factory/core.factory';
import { DataTable } from '../../../../core/models/data-table';
import { InputForm } from '../../../../core/models/input-form';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { SearchCriteria } from './SearchCriteria';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { ListOfValue } from '../../../../core/models/list-of-value';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-PJA008',
  templateUrl: './PJA008.component.html',
  styleUrls: ['./PJA008.component.scss']
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
  public valdasiCheck: boolean [] = [];
  public index: number = 0;
  public IdSdm: any;
  public filteredSdm: any;
  public getClientid: number;
  public lovSDM: LOVService;
  public lovSkillType: LOVService;
  public lovSkill: LOVService;
  public lovSdmSkill: LOVService;
  public isButtonClicked = false;
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
  public isCantFilter: boolean = true;
  public isLocked: boolean = true;
  public isReadOnly: boolean = true;
  public increment: number = 0;
  public clientIds: number;
  public hirestatIds: number = 3;
  public apiRoot: string = 'project/MultiHiring';
  public router: any;
  public operator: any = 1;
  public cek: boolean = true;
  public btndisabled: boolean = false;
  public jumlahDataCheck: number = 0;
  public validasiCheck: boolean = true;
  public rows: any[] = [];
  public selectedId: any;
  @ViewChild('notif')
  public notif: any;
  public roletype: string = '1';
  public skillType: string;
  public validasiRolevalue: boolean;
  public jumlahChecked = 0;

  constructor(private _factory: CoreFactory,
              public _notif: DefaultNotificationService,
              private route: ActivatedRoute,
              private routers: Router ,
              private http: HttpClient) {
    this.listSearchCriteria.push(new SearchCriteria(_factory));
    this.sdmCtrl = new FormControl();
    this.valueCtrl = new FormControl({ value: '', disabled: true });
    this.filteredSdm = this.sdmCtrl.valueChanges
      .startWith('')
      .map((value) => this.filterSdm(value));
    // this.route.params.subscribe((param) => {
    //   this.IdSdm = param.id;
    // });
    // tslint:disable-next-line:no-shadowed-variable
    this.route.params.subscribe((param) => {
      this.clientIds = +param.idClient;
    });
  }

  public onKey(event: any) {
    console.log(event);
    this.keyId = event.target.value;
    if (this.keyId === '') {
      this.IdSdm = null;
      console.log(this.IdSdm);
    }
  }

  public filterSdm(val: string) {
    return val && val.length >= 0 ? this.lovSDM.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  public setSdmValue(dataSdm: ListOfValue) {
    if (dataSdm) {
      this.IdSdm = dataSdm.key;
    }
  }

  public addSearchCriteria() {
    const searchCriteria = new SearchCriteria(this._factory);
    this.listSearchCriteria.push(searchCriteria);
    this.increment += 1;
  }

  public removeSearchCriteria(inc) {
    this.listSearchCriteria.splice(inc, 1);
    this.increment -= 1;
  }

  public ngOnInit() {
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
        skilltype_id: '',
        skill_id: '',
        sdmskill_value: '',
        client_id: '',
      }
    });

    this.lovSDM = this._factory.lov({
      api: 'lov/Sdm',
      pagingParams: {
        orderby: 'sdm_name ASC',
      },
      initializeData: true
    });

    this.dataTable = this._factory.dataTable({
      serverSide: false,
      pagingParams: {
        limit: 10
      },
      tableColumns: [
        { prop: 'sdm_nik', name: 'NIK', width: 10, sortable: false },
        { prop: 'sdm_name', name: 'Name', width: 150, sortable: false },
        // { prop: 'skilltype_name', name: 'Category', width: 20, sortable: false },
        // { prop: 'skill_name', name: 'Skills', width: 20, sortable: false },
        // { prop: 'sdmskill_value', name: 'Value', width: 50, sortable: false },
        { prop: 'end_contractproject', name: 'End date project', width: 50, sortable: false },
        { prop: 'sdm_notification', name: 'Notifikasi Kontrak', width: 50, cellTemplate: this.notif, sortable: false },
        { prop: 'sdmskill_id', name: 'Action', width: 20,
        cellTemplate: this.tableActionTemplate, sortable: false },
     ]
    });

    // this.action = this._factory.actions({
    //   api: 'allocation/MengelolaSdmSkill',
    //   dataTable: this.dataTable
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
    this.jumlahChecked = 0;
    this.isButtonClicked = true;
    const body = [];
    this.listSearchCriteria.forEach((skillSdm: SearchCriteria) => {
      body.push({
        sdm_id: this.IdSdm,
        skilltype_id: skillSdm.skilltype_id,
        skill_id: skillSdm.skill_id,
        sdmskill_value: skillSdm.value,
        operator: this.operator
      });
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
      if (this.skillType == this.roletype && skillSdm.value != 1) {
      this.validasiRolevalue = true;
    } else {
      this.validasiRolevalue = false;
    }
      console.log(this.validasiRolevalue);
     });
    if (this.cek === true && this.validasiRolevalue === false) {
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
          console.log(this.rows);
        });
      if ( this.validasiRolevalue === true ) {
          this._notif.error({
            message : 'Role Value is only preferred 1'
           });
        } else {
          this._notif.error({
            message : 'Input Value Between 1 and 10'
           });
        }
     }
    this.cek = true;
  }

  public distRedundantCheckedSdm() {
    const tempData = [];
    this.rows.forEach((item) => {
      if (item.Checked === true) {
        tempData.push({
          client_id: this.clientIds,
          hirestat_id: this.hirestatIds,
          sdm_id: item.sdm_id
        });
        // tslint:disable-next-line:no-unused-expression
        item.Checked === false;
        console.log(tempData);
      }
    });
    this.jumlahChecked = tempData.length;
  }

  public activateButton() {
    // this.rows.forEach((item) => {
    //   if (item.Checked === true) {
    //     this.jumlahDataCheck++;
    //   } else if (item.Checked === false) {
    //     this.jumlahDataCheck--;
    //   }
    // });
    // if (this.jumlahDataCheck === 0) {
    //   this.validasiCheck = true;
    // }
    // if (this.validasiCheck === true || this.jumlahDataCheck === 0) {
    //   this.jumlahDataCheck++;
    // } else if (this.validasiCheck === false && this.jumlahDataCheck !== 0) {
    //  this.jumlahDataCheck--;
    // }
    // if (this.jumlahDataCheck >= 1) {
    //   this.btndisabled = false;
    // } else {
    //   this.btndisabled = true;
    // }
    // console.log(this.jumlahDataCheck);
    // console.log(this.btndisabled);
  }
  public resetSource() {
    this.jumlahChecked = 0;
    this.isButtonClicked = false;
    this.IdSdm = null;
    // this.listSearchCriteria.splice(null, this.increment);
    // this.sdmCtrl.setValue('');
    // this.listSearchCriteria.forEach((searchCriteria: SearchCriteria) => {
    //   searchCriteria.skilltype_id = null;
    //   searchCriteria.skill_id = null;
    //   searchCriteria.value = null;
    // });
    // this.increment = 0;
    // this.isLocked = true;
    this.listSearchCriteria[0].skill_id = null;
    this.listSearchCriteria[0].skilltype_id = null;
    this.listSearchCriteria[0].value = null;

    console.log(this.listSearchCriteria);

    this.sdmCtrl.setValue('');
    this.increment = 1;
    this.listSearchCriteria.splice(this.increment);
    this.increment = 0;
  }

  public deactivateButton() {
    this.isLocked = true;
  }

  public hiringSubmit() {
    this.isButtonClicked = true;
    const multiInsert = [];
    this.rows.forEach((item) => {
      if (item.Checked === true) {
        multiInsert.push({
          sdmhiring_id: null,
          client_id: this.clientIds,
          hirestat_id: this.hirestatIds,
          sdm_id: item.sdm_id
        });
        // tslint:disable-next-line:no-unused-expression
        item.Checked === false;
        this.jumlahDataCheck++;
      }
    });
    const url = this._factory.api({
      api: `${this.apiRoot}/multiCreate`
    });
    const httpOptions = {
      params: new HttpParams()
    };
    this.http.post(url, {
      listhiring: multiInsert
    }, httpOptions)
      .subscribe((res: any) => {
            this._notif.success({
              message: 'You have successfully Hired'
            });
            setTimeout(() => this.routers.navigate(['pages/pja/PJA007']), 1000);
      }, (error: any) => {
        if (this.jumlahDataCheck === 0) {
          this._notif.error({
            message: 'Please check SDM Data'
          });
        } else {
          this._notif.error({
            message: 'SDM already Hired'
          });
        }
      }

    );
  }

  public checkMethod(event: any) {
    this.check = event.checked;
  }

  public setUnbutton() {
    if (this.IdSdm == null) {
      this.listSearchCriteria.forEach((searchCriteria: SearchCriteria) => {
        if (searchCriteria.skilltype_id == null) {
          this.isCantFilter = true;
        }
        this.isCantFilter = true;
      });
    } else {
      this.isCantFilter = false;
    }
  }

  public setOperatorAnd() {
    if (this.operator === 2 ) {
      this.operator = 1;
    } else if (this.operator === 1) {
      this.operator = 2;
    }
  }

  // tslint:disable-next-line:no-empty
  public ActivateCheckbox() {}
  public navigateDetailMenu(id) {
    // this.routers.navigate(['pages/all/DetailSkillSdm' , {id}]);
    this.selectedId = id;
  }
}
