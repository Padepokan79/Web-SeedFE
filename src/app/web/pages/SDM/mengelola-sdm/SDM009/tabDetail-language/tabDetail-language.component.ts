import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../../core/models/input-form';
import { DataTable } from '../../../../../../core/models/data-table';
import { LOVService } from '../../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR, TYPE } from '../../../../../../core/constant/constant';
import { ActivatedRoute } from '@angular/router';
import { Comparison } from '../../../../../../core/enums/comparison-operator.enum';

@Component({
  selector: 'app-tabDetail-language',
  templateUrl: './tabDetail-language.component.html',
  styleUrls: ['./tabDetail-language.component.scss']
})
export class TabDetailLanguageComponent implements OnInit {
  public lovLanguage: LOVService;
  public selected = 0;
  public disabled = true;
  public disabled1 = false;
  public sdmterbesar = 0;

  @Input()
  public form: number;
  @Input()
  public id: number;

  public sdmid: number;

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovSdmlanguage: LOVService;

  public listLanguage = ['', '', '', ''];

  private selectedId: any;
  constructor(private _factory: CoreFactory,
              private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
      console.log(this.selectedId);
    });
  }

  public ngOnInit() {
    if (this.form === 1) {
      this.sdmid = 113;
    } else {
      this.sdmid = this.id;
    }

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdmlanguage_id: '',
        sdm_id: this.sdmid,
        language_id: '',
        language_name: '',
      }
    });

    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        filter: Comparison.EQ('sdm_id', this.selectedId),
        limit : 10
      },
      // searchCriteria : [
      //   { viewValue: 'Edu Name', viewKey: 'edu_name', type: TYPE.STRING}
      // ],
      tableColumns : [
        { prop: 'sdmlanguage_id', name: 'No', width: 40, sortable: false },
        { prop: 'language_name', name: 'Bahasa', width: 100, sortable: false },
      ]
    });

  //   if (this.form === 2) {
  //   this.dataTable = this._factory.dataTable({
  //     serverSide : true,
  //     pagingParams : {
  //       filter: {
  //         field: 'sdm_id',
  //         operator: COMPARISON_OPERATOR.EQ,
  //         value: this.id
  //       },
  //       limit : 5
  //     },
  //     tableColumns : [
  //       { prop: 'sdmlanguage_id', name: 'SDML ID', width: 10, sortable: false },
  //       { prop: 'language_name', name: 'Bahasa', width: 30, sortable: true },
  //       { prop: 'sdmlanguage_id', name: 'Action', width: 20,
  //         cellTemplate: this.tableActionTemplate, sortable: false }

  //     ]
  //   });
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

  // tslint:disable-next-line:no-empty
  public save() {

  }

}
