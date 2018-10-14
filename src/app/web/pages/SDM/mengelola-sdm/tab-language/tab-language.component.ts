import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { LOVService } from '../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { DataTable } from '../../../../../core/models/data-table';
import { InputForm } from '../../../../../core/models/input-form';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { Comparison } from 'app/core/enums/comparison-operator.enum';
import { Console } from '../../../../../../../node_modules/@angular/core/src/console';
import { DefaultNotificationService } from '../../../../../core/services/default-notification.service';
@Component({
  selector: 'app-tab-language',
  templateUrl: './tab-language.component.html',
  styleUrls: ['./tab-language.component.scss']
})
export class TabLanguageComponent implements OnInit {

  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  public lovLanguage: LOVService;
  public lovSDMLang: LOVService;

  @Input()
  public form: number;
  @Input()
  public id: number;
  @Input()
  public sdmId: number;

  public sdmid: number;

  // public listLanguage = ['', '', '', ''];
  public listLangs = [];
  public status = [];
  public statusSimpan;
  public lov;

  constructor(private _factory: CoreFactory, private _notif: DefaultNotificationService) {
  }

  public ngOnInit() {

    if (this.form === 1) {
      this.sdmid = this.sdmId;
    } else {
      this.sdmid = this.id;
    }

    this.inputForm = this._factory.inputForm({
      formControls: {
        language_id: '',
      },
      immutableFormControls: {
        sdm_id: this.sdmid,
      }
    });

    // if (this.form === 2) {
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        filter: Comparison.EQ('sdm_id', this.sdmid.toString()),
        limit : 20
      },
      tableColumns : [
        { prop: 'norut', name: 'No', flexGrow: 1, sortable: true },
        { prop: 'language_name', name: 'Bahasa', flexGrow: 12, sortable: true },
        { prop: 'sdmlanguage_id', name: 'Action', flexGrow: 2,
          cellTemplate: this.tableActionTemplate, sortable: false }

      ]
    });
  // }

    this.action = this._factory.actions({
      api: 'allocation/mengelolaSDMLanguages',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });

    this.lovLanguage = this._factory.lov({
      api: 'lov/languages',
      initializeData: false
    });

    this.listLangs = [];
    this.lovLanguage.getAll().subscribe((lov) => {
      this.lov = lov;
    });
  }

  public change() {
      this.removeUnionLanguage(this.lov);
  }

  public removeUnionLanguage(lov) {
    // console.log(lov.data);
    // console.log(this.dataTable);
    // console.log(this.dataTable.rows);
    const datatableLength = this.dataTable.rows.length;
    const lovLength = lov.data.length;

    this.lovLanguage.data = lov.data;

    for (let index = 0; index < lovLength; index++) {
      for (let idx = 0; idx < datatableLength; idx++) {
        if (lov.data[index].values.languages_language_name === this.dataTable.rows[idx].language_name) {
          this.listLangs.push(lov.data[index].key);
        }
      }
    }
    // console.log('Yang ada' + this.listLangs);
  }

  public saveLanguage() {
    const length = this.listLangs.length;
    for (let index = 0; index < length; index++) {
      if (this.action.getFormControlValue('language_id') === this.listLangs[index] ) {
        // console.log('Sudah ada');
        this.status.push(true);
      } else {
        // console.log('Tidak ada');
        this.status.push(false);
      }
    }
    console.log('Yang dipilih adalah' + this.action.getFormControlValue('language_id'));
    const lengthStatus = this.status.length;
    for (let index = 0; index < lengthStatus; index++) {
      if (this.status[index] === true) {
        this.statusSimpan = 1;
        index = lengthStatus;
      }
    }

    if (this.statusSimpan !== 1) {
      this.action.onSave();
      // console.log('Tersimpan');
    } else {
      this._notif.error({
        message: 'Bahasa Sudah Ada'
      });
      // console.log('Tidak Tersimpan');
    }
    this.statusSimpan = 0;
    this.status = [];
    this.listLangs = [];
  }
}
