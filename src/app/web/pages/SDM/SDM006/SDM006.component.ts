import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { FormControl, FormGroup } from '../../../../../../node_modules/@angular/forms';
import { ListOfValue } from '../../../../core/models/list-of-value';
import { map, startWith } from '../../../../../../node_modules/rxjs/operators';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-SDM007',
  templateUrl: './SDM006.component.html',
  styleUrls: ['./SDM006.component.scss']
})
export class SDM006Component implements OnInit {

  // @ViewChild('viewAsDateTemplate')
  // public viewAsDateTemplate: any;
  // @ViewChild('tableActionTemplate')
  // public tableActionTemplate: any;

  public time: Date = new Date();
  public maxDate: Date = new Date();
  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovSdm: LOVService;
  public lovCondition: LOVService;

  public sdmCtrl: FormControl;
  public filteredSdm: any;

  constructor(
    public _notif: DefaultNotificationService, private _factory: CoreFactory,
    private router: Router) {
    this.sdmCtrl = new FormControl();
    this.filteredSdm = this.sdmCtrl.valueChanges
    .pipe(
      startWith(''),
      map((value) => this.filterSdm(value))
    );
  }

  public ngOnInit() {

    setInterval(() => {
      this.time = new Date();
      this.maxDate = new Date();
    }, 1);

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
        sdm_name: '',
        psyco_id: '',
        sdmpsycological_desc: '',
        psycological_date: ''
      },
      validationMessages: {
        sdm_id: {
          required: 'Silahkan masukan Nama'
        },
        psyco_id: {
          required: 'Silahkan masukan Psychology'
        },
        sdmpsycological_desc: {
          required: 'Silahkan masukan deskripsi'
        },
        psycological_date: {
          required: 'Silahkan masukan tanggal'
        }
      }
    });

    // this.dataTable = this._factory.dataTable({
    // serverSide : true,
    // tableColumns : [
    //     { prop: 'sdm_name', name: 'SDM Name', width: 100, sortable: false },
    //     { prop: 'psyco_name', name: 'Condition', width: 100, sortable: false },
    //     { prop: 'sdmpsycological_desc', name: 'Description', width: 100, sortable: false },
    //     { prop: 'psycological_date', name: 'Date', width: 100,
    //       cellTemplate: this.viewAsDateTemplate, sortable: false }
    //   ]
    // });

    this.action = this._factory.actions({
        api: 'sdm/sdmPsycological',
        inputForm: this.inputForm,
        // dataTable: this.dataTable
    });

    this.lovSdm = this._factory.lov({
        api: 'lov/sdm',
        initializeData: true
    });

    this.lovCondition = this._factory.lov({
        api: 'lov/psychologicals',
        initializeData: true
    });

  }

  public setSdmValue(inputForm: FormGroup, dataSdm: ListOfValue) {
    if (dataSdm) {
      this.lovSdm = this._factory.lov({
        api: 'lov/sdm',
        params: {
          sdm_id: dataSdm.key
        },
        initializeData: true
      });

      this.action.patchFormData({sdm_id: dataSdm.key, sdm_name: dataSdm.values.sdm_sdm_name});
      console.log(this.action.getFormControlValue('sdm_id'));
    }
  }

  public filterSdm(val: string) {
    return val ? this.lovSdm.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  public timeOut() {
  // tslint:disable-next-line:align
    setTimeout(() => this.router.navigate(['pages/sdm/SDM008']), 1000);
 }

}
