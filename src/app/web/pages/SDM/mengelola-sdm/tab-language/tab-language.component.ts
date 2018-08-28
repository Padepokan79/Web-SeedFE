import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { LOVService } from '../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { DataTable } from '../../../../../core/models/data-table';
import { InputForm } from '../../../../../core/models/input-form';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { Comparison } from 'app/core/enums/comparison-operator.enum';
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

  @Input()
  public form: number;
  @Input()
  public id: number;
  @Input()
  public sdmId: number;

  public sdmid: number;

  public listLanguage = ['', '', '', ''];

  constructor(private _factory: CoreFactory) {
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
        limit : 5
      },
      tableColumns : [
        { prop: 'language_name', name: 'Bahasa', width: 30, sortable: true },
        { prop: 'sdmlanguage_id', name: 'Action', width: 20,
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
      initializeData: true
    });
  }

  public onChangeLanguage(checkedData, index) {
    this.listLanguage.splice(index, 1);
    this.listLanguage.splice(index, 0, checkedData);
  }

}
