import { Component, OnInit, Input } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { FormBuilder, FormArray } from '../../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-tab-language',
  templateUrl: './tab-language.component.html',
  styleUrls: ['./tab-language.component.css']
})
export class TabLanguageComponent implements OnInit {

  public action: ActionService;
  public inputForm;
  public lovLanguage: LOVService;

  @Input()
  public form: number;

  public listLanguage = ['', '', '', ''];

  constructor(private _factory: CoreFactory) {
  }

  public ngOnInit() {

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: 113,
        language_id: '',
      }
    });

    this.action = this._factory.actions({
      api: 'allocation/mengelolaSDMLanguages',
      inputForm: this.inputForm
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

  public save() {

  }

}
