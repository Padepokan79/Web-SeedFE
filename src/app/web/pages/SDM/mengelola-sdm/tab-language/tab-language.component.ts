import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { LOVService } from '../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { DataTable } from '../../../../../core/models/data-table';
import { InputForm } from '../../../../../core/models/input-form';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { Comparison } from 'app/core/enums/comparison-operator.enum';
import { Console } from '../../../../../../../node_modules/@angular/core/src/console';
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

  public listLanguage = ['', '', '', ''];
  public listLangs = [];

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

    this.lovLanguage.getAll().subscribe((lov) => {
      this.removeUnionLanguage(lov);
    });
  }

  public onChangeLanguage(checkedData, index) {
    this.listLanguage.splice(index, 1);
    this.listLanguage.splice(index, 0, checkedData);
  }

  public getList() {
    // this.listLangs = {2, 4};
  }

  public removeUnionLanguage(lov) {
    // console.log(lov.data);
    // console.log(this.dataTable);
    // console.log(this.dataTable.rows);

    this.lovLanguage.data = lov.data;
    // lov.data.forEach(function(langs) {
    //   if (langs.id !== this.dataTable.rows.id) {
    //     this.listLangs.push(langs.id);
    //   }
    // });
    // console.log(this.listLangs);
    // for (let index = 0; index < lov.data.length; index++) {
    //   if (lov.data.id[index] !== this.dataTable.rows[index]) {
    //     this.listLangs.push();
    //   }
    // }

    const a = [];
    const b = [];
    lov.data.forEach(function(langs) {
        a.push(langs.id);
    });
    this.dataTable.rows.forEach(function(langs) {
      b.push(langs.id);
    });
    const list1 = lov.data.filter(this.comparer(a));
    const list2 = this.dataTable.rows.filter(this.comparer(b));
    console.log(list1.concat(list2));
  }

  public comparer(otherArray) {
    return function(current){
      return otherArray.filter(function(other){
        return other.value === current.value && other.display === current.display;
      }).length === 0;
    }
  }

}
