import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { InputSkill } from './InputSkill';

@Component({
  selector: 'io-ALL004',
  templateUrl: './ALL004.component.html',
  styleUrls: ['./ALL004.component.scss']
})
export class ALL004Component implements OnInit {

  public action: ActionService;
  public inputForm: InputForm;

  public lovSkill: LOVService;
  public lovSkillType: LOVService;
  public lovSdm: LOVService;

  public listinputSkill: InputSkill[] = [];

  constructor(private _factory: CoreFactory) {
    this.listinputSkill.push(new InputSkill(_factory));
  }

  public inputSkillValue() {
    const inputskillValue = {} as InputSkill;
    const addSkill = this.listinputSkill;
    addSkill.push(inputskillValue);
  }

  public deleteSkillValue(inc) {
    const inputskillValue = {} as InputSkill;
    const addSkill = this.listinputSkill;
    addSkill.splice(inc, 1);
  }

  public ngOnInit() {
    this.inputForm = this._factory.inputForm({
      formControls: {
        skilltype_id: '',
        skill_id: '',
        sdm_id: '',
        sdmskill_value: ''
      }
    });
    this.action = this._factory.actions({
      api: 'allocation/MengelolaSdmSkill/',
      inputForm: this.inputForm,
    });

    // this.lovSkill = this._factory.lov({
    //     api: 'lov/Skill',
    //     initializeData: true
    // });
    // this.lovSkillType = this._factory.lov({
    //   api: 'lov/SkillType',
    //   initializeData: true

    // });

    this.lovSdm = this._factory.lov({
      api: 'lov/Sdm',
      initializeData: true
    });

  }
}
