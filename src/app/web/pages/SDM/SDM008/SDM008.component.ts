import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from './../../../../core/constant/constant';
import { CoreFactory } from './../../../../core/factory/core.factory';
import { DataTable } from './../../../../core/models/data-table';
import { InputForm } from './../../../../core/models/input-form';
import { ActionService } from './../../../../core/services/uninjectable/action.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { Router } from '../../../../../../node_modules/@angular/router';
import { FormControl, FormGroup } from '../../../../../../node_modules/@angular/forms';
import { ListOfValue } from '../../../../core/models/list-of-value';
import { Comparison } from '../../../../core/enums/comparison-operator.enum';
import { startWith, map } from '../../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-SDM008',
  templateUrl: './SDM008.component.html',
  styleUrls: ['./SDM008.component.scss']
})
export class SDM008Component implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovSdm: LOVService;
  public lovPsychologicals: LOVService;

  // SDM
  public filteredSdm: any;
  public sdmCtrl: FormControl;

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
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
        sdm_name: '',
      },
      // validationMessages: {
      //   sdm_id: {
      //     required: '',
      //   },
      //   user_id: {
      //     required: 'Silahkan masukkan User ID'
      //   }
      // }
    });

    // First Data Table Initialization
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        // filter: {
        //   operator: CONJUNCTION_OPERATOR.AND,
        //   component: [
        //       {
        //           field: 'kddati1',
        //           operator: COMPARISON_OPERATOR.EQ,
        //           value: Session.getUserData('kddati1')
        //       },
        //       {
        //           field: 'kddati2',
        //           operator: COMPARISON_OPERATOR.EQ,
        //           value: Session.getUserData('kddati2')
        //       }
        //   ]
        // },
        limit : 5
      },
      // searchCriteria : [
      //   { viewValue: 'Name', viewKey: 'sdm_id', type: TYPE.STRING },
      // ],
      tableColumns : [
        { prop: 'num', name: 'No', width: 5, sortable: false },
        { prop: 'sdm_name', name: 'Name', width: 135, sortable: false },
        { prop: 'psyco_name', name: 'Condition', width: 10, sortable: false },
        { prop: 'sdmpsycological_desc', name: 'Reason', width: 300, sortable: false },
        { prop: 'psycological_date', name: 'Date', width: 50,
          cellTemplate: this.viewAsDateTemplate, sortable: false },
        { prop: 'sdmpsycological_id', name: 'Action', width: 10, cellTemplate: this.tableActionTemplate, sortable: false },
      ]
    });

    this.action = this._factory.actions({
        api: 'sdm/SdmPsycological',
        inputForm: this.inputForm,
        dataTable: this.dataTable
    });

    this.lovSdm = this._factory.lov({
        api: 'lov/Sdm',
        initializeData: true
    });

    this.lovPsychologicals = this._factory.lov({
        api: 'lov/Psychologicals',
        initializeData: true
    });
  }

  public navigateEditMenu(id) {
    this.router.navigate(['/pages/sdm/SDM007', { id }]);
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
}
