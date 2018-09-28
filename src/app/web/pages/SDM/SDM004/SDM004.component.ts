import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { DataTable } from '../../../../core/models/data-table';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { TYPE, COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { Router } from '../../../../../../node_modules/@angular/router';
import { FormGroup, FormControl } from '../../../../../../node_modules/@angular/forms';
import { ListOfValue } from '../../../../core/models/list-of-value';
import { startWith, map } from '../../../../../../node_modules/rxjs/operators';
import { InputForm } from '../../../../core/models/input-form';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { Comparison } from '../../../../core/enums/comparison-operator.enum';

@Component({
  selector: 'app-SDM004',
  templateUrl: './SDM004.component.html',
  styleUrls: ['./SDM004.component.scss']
})
export class SDM004Component implements OnInit {

  public halRoute = 1;

  public time: Date = new Date();
  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;
  public action: ActionService;
  public dataTable: DataTable;

  public lovSdm: LOVService;

  // SDM
  public filteredSdm: any;
  public sdmCtrl: FormControl;
  public inputForm: InputForm;

  // Hapus
  public KeyId: any;
  public SdmName: any;

  public onKeySdmName(event: any) {
    this.KeyId = event.target.value;
    if (this.KeyId === '') {
      this.SdmName = null;
      console.log('Nama: ', this.SdmName);
    }
  }
  // tslint:disable-next-line:member-ordering
  constructor(private _factory: CoreFactory, private router: Router) {
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
    }, 1);
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
        sdm_name: '',
      }
    });
    this.dataTable = this._factory.dataTable({
      serverSide : false,
      pagingParams : {
        limit : 5
      },
      // searchCriteria : [
      //   { viewValue: 'Nama', viewKey: 'sdm_name', type: TYPE.STRING }
      // ],
      tableColumns : [
        { prop: 'norut', name: 'No', width: 20, sortable: true },
        { prop: 'sdm_name', name: 'Nama', width: 100, sortable: true },
        { prop: 'sdm_nik', name: 'NIK', width: 100, sortable: true },
        { prop: 'sdm_address', name: 'Alamat', width: 100, sortable: true },
        { prop: 'sdm_phone', name: 'Nomor Telepon', width: 100, sortable: true },
        { prop: 'sdm_startcontract', name: 'Start Date', width: 100,
          cellTemplate: this.viewAsDateTemplate, sortable: true },
        { prop: 'sdm_endcontract', name: 'End Date', width: 100,
          cellTemplate: this.viewAsDateTemplate, sortable: true },
        // { prop: 'sdm_status', name: 'Status', width: 100, sortable: false },
        { prop: 'sdm_id', name: 'Action', width: 100,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    this.action = this._factory.actions({
        api: 'sdm/MengelolaHistoriSdm/ReadAll',
        dataTable: this.dataTable,
        inputForm: this.inputForm
    });

    this.lovSdm = this._factory.lov({
      api: 'lov/sdm',
      pagingParams: {
        filter: {
          field: 'sdm_status',
          operator: COMPARISON_OPERATOR.EQ,
          value: 0
        }
      },
      initializeData: true
    });
  }
  public navigateDetailMenu(id) {
    this.router.navigate(['/pages/sdm/SDM009', { id }]);
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
      this.SdmName = dataSdm.key;
      this.action.patchFormData({sdm_id: dataSdm.key, sdm_name: dataSdm.values.sdm_sdm_name});
      console.log(this.SdmName);
    }
  }

  public filterSdm(val: string) {
    return val ? this.lovSdm.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  public onSearch() {
    this.action.setPaginationFilter(
        this.SdmName ? Comparison.EQ('sdm_id', this.SdmName) : Comparison.NE('sdm_id', 'sdm_id'),
    );

    this.action.refreshTable();
  }

  public onReset() {
    this.action.onReset();
    this.SdmName = null;
    console.log('Nama: ', this.SdmName);
    this.action.resetFilter() ;
    this.action.refreshTable();
  }
}
