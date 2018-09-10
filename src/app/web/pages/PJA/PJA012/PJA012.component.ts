import { CoreFactory } from './../../../../core/factory/core.factory';
import { DataTable } from './../../../../core/models/data-table';
import { InputForm } from './../../../../core/models/input-form';
import { ActionService } from './../../../../core/services/uninjectable/action.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LOVService } from './../../../../core/services/uninjectable/lov.service';
import { SearchCriteria } from './SearchCriteria';
import { DefaultNotificationService } from './../../../../core/services/default-notification.service';
import { ListOfValue } from './../../../../core/models/list-of-value';
import { FormControl } from './../../../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';
import { HttpClient, HttpParams } from '../../../../../../node_modules/@angular/common/http';
import { COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { isNgTemplate } from '../../../../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-PJA012',
  templateUrl: './PJA012.component.html',
  styleUrls: ['./PJA012.component.scss']
})

export class PJA012Component implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public sdmCtrl: FormControl;
  public valueCtrl: FormControl;
  public action: ActionService;
  public actionClient: ActionService;
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
  public isButtonClicked = true;
  public keyId: any;
  public doubleFilter: any;
  public time: Date = new Date();
  public categorySkill: any;
  public varSkill: any;
  public skillValue: string;
  public hiringstatId: number;
  public check: any;
  public tes: string;
  public isCantFilter: boolean = true;
  public isLocked: boolean;
  public isReadOnly: boolean = true;
  public defaultDate1: string = this.time.getFullYear() + '-' + ((this.time.getMonth() + 1) < 10 ? '0' + this.time.getMonth() + 1 : this.time.getMonth() + 1) + '-' + ((this.time.getDate() + 1) < 10 ? '0' + this.time.getDate() + 1 : this.time.getDate() + 1);
  public defaultDate2: string = (this.time.getFullYear() + 1) + '-' + ((this.time.getMonth() + 1) < 10 ? '0' + this.time.getMonth() + 1 : this.time.getMonth() + 1) + '-' + ((this.time.getDate() + 1) < 10 ? '0' + this.time.getDate() + 1 : this.time.getDate() + 1);
  public increment: number = 0;
  public clientIds: number;
  public hirestatIds: number = 4;
  public methodIds: number = 1;
  public assignClientName: string;
  public assignStartdate: Date;
  public assignEnddate: Date;
  public assignLoc: string = 'Bandung';
  public assignClient: string = '';
  public assignClientPhone: string = '';
  public apiRoot: string = 'project/MultiInsertHiringAssign';
  public router: any;
  public operator: any = 1;
  public btndisabled: boolean = true;
  public jumlahDataCheck: number = 0;
  public validasiCheck: boolean = true;
  public cek: boolean = true;

  @ViewChild('notif')
  public notif: any;

  constructor(private _factory: CoreFactory, public _notif: DefaultNotificationService, private route: ActivatedRoute, private http: HttpClient) {
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
      this.clientIds    = +param.idClient;
      this.assignClient = 'Tes';
      this.assignLoc = 'Bandung';
      this.assignClientPhone = param.client_name;
      this.assignStartdate = new Date (this.defaultDate1);
      this.assignEnddate = new Date (this.defaultDate2);
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
        { prop: 'skilltype_name', name: 'Category', width: 20, sortable: false },
        { prop: 'skill_name', name: 'Skills', width: 20, sortable: false },
        { prop: 'sdmskill_value', name: 'Value', width: 50, sortable: false },
        { prop: 'end_contractproject', name: 'End date project', width: 50, sortable: false },
        { prop: 'sdm_notification', name: 'Notifikasi Kontrak', width: 50, cellTemplate: this.notif, sortable: false },
        { prop: 'sdm_id', name: 'Select', width: 10, cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    this.action = this._factory.actions({
      api: 'allocation/MengelolaSdmSkill',
      dataTable: this.dataTable
    });

    this.actionClient = this._factory.actions({
      api: 'project/MengelolaClient',
      dataTable: this.dataTable
    });

    const readAllApi = this._factory.api({
      api : 'project/MengelolaClient',
      pagingParams : {
        filter : {
          field : 'client_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.clientIds
        }
      }
    });

    this._factory.http().get(readAllApi).subscribe((res: any) => {
      this.actionClient.patchFormData(res.data.items[0]);
      this.assignClientName = res.data.items[0].client_name;
      this.assignClient = res.data.items[0].client_pic;
      this.assignClientPhone = res.data.items[0].client_mobileclient;
    });

    setInterval(() => {
      this.time = new Date();
    }, 1);
  }
  // tslint:disable-next-line:member-ordering
  public apiFilter = this._factory.api({
    api: `api/masterdata/MultiFiltering`
  });
  public btnFilter() {
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
      if (skillSdm.value == null) {
        this.cek = true;
      } else if ( skillSdm.value < 1 || skillSdm.value > 10) {
        this.cek = false;
      }
    });
    if (this.cek === true) {
     this.http.post(url, {
       listsdm: body
     }, httpOptions)
       .subscribe((res: any) => {
         this.action.table().rows = res.data;
         console.log(this.action.table().rows);
       });
    } else {
     this.http.post(url, {
       listsdm: body
     }, httpOptions)
       .subscribe((res: any) => {
         this.action.table().rows = res.null;
         console.log(this.action.table().rows);
       });
     this._notif .error({
       message : 'Input Value Between 1 and 10'
      });
    }
    this.cek = true;
  }

  public distRedundantCheckedSdm() {
    const tempData = [];
    this.action.table().rows.forEach((item) => {
      if (item.Checked === true) {
        tempData.push({
          client_id: this.clientIds,
          hirestat_id: this.hirestatIds,
          sdm_id: item.sdm_id,
          method_id: this.methodIds,
          sdmhiring_id: null,
          sdmassign_startdate: this.assignStartdate,
          sdmassign_enddate: this.assignEnddate,
          sdmassign_loc: this.assignLoc,
          sdmassign_picclient: this.assignClient,
          sdmassign_picclientphone: this.assignClientPhone
        });
        // tslint:disable-next-line:no-unused-expression
        item.Checked === false;
        console.log(tempData);
      }
    });
  }

  public activateButton() {
    this.action.table().rows.forEach((item) => {
      if (item.Checked === true) {
        this.validasiCheck = true;
      } else if (item.Checked === false) {
        this.validasiCheck = false;
      }
    });
    if (this.validasiCheck === true || this.jumlahDataCheck === 0) {
      this.jumlahDataCheck++;
    } else if (this.validasiCheck === false && this.jumlahDataCheck !== 0) {
     this.jumlahDataCheck--;
    }
    if (this.jumlahDataCheck >= 1) {
      this.btndisabled = false;
    } else {
      this.btndisabled = true;
    }
    console.log(this.jumlahDataCheck);
    console.log(this.btndisabled);
  }

  public resetSource() {
    this.isButtonClicked = false;
    this.IdSdm = null;
    this.listSearchCriteria.splice(null, this.increment);
    this.sdmCtrl.setValue('');
    this.listSearchCriteria.forEach((searchCriteria: SearchCriteria) => {
      searchCriteria.skilltype_id = null;
      searchCriteria.skill_id = null;
      searchCriteria.value = null;
    });
    this.increment = 0;
    this.isLocked = true;
  }

  public deactivateButton() {
    this.isLocked = true;
    this.btndisabled = true;
  }

  public assignSubmit() {
    console.log(this.defaultDate1);
    console.log(this.defaultDate2);
    this.isButtonClicked = true;
    const multiInsert = [];
    this.action.table().rows.forEach((item) => {
      if (item.Checked === true) {
        multiInsert.push({
          client_id: this.clientIds,
          hirestat_id: this.hirestatIds,
          sdm_id: item.sdm_id,
          method_id: this.methodIds,
          sdmhiring_id: null,
          sdmassign_startdate: this.assignStartdate,
          sdmassign_enddate: this.assignEnddate,
          sdmassign_loc: this.assignLoc,
          // sdmassign_picclient: this.assignClient,
          // sdmassign_picclientphone: this.assignClientPhone
        });
        // tslint:disable-next-line:no-unused-expression
        item.Checked === false;
        console.log(multiInsert);
      }
    });
    const url = this._factory.api({
      api: `${this.apiRoot}/multiCreate`
    });
    const httpOptions = {
      params: new HttpParams()
    };
    this.http.post(url, {
      listassignment: multiInsert
    }, httpOptions)
      .subscribe(() => {
        // this.action.table().rows.forEach((item) => {
        // });
        // if (this.clientIds != null && this.hirestatIds != null && item.sdm_id != null && this.assignStartdate != null && this.assignEnddate != null) {
        // if (this.clientIds != null && this.hirestatIds != null && item.sdm_id != null && this.assignStartdate != null && this.assignEnddate != null) {
                            // if (assignSubmit(this.item.Checked === true))  {
                              this._notif.success({
                                message: 'You have successfully Assigned'
                              });
                              setTimeout(() => this.router.navigate(['pages/pja/PJA010']), 1000);
                            // } else {
                            //   this._notif.error({
                            //     message: 'no item checked, please check first to assgin'
                            //   });
                            // }
        // } else {
          // this._notif.error({
          //   message: 'Failed to Assigned'
          // });
        // }
      });
  }

  public checkMethod(event: any) {
    this.check = event.checked;
  }

  public setOperatorAnd() {
    if (this.operator === 2 ) {
      this.operator = 1;
    } else if (this.operator === 1) {
      this.operator = 2;
    }
  }

}
