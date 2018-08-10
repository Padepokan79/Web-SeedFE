import { COMPARISON_OPERATOR } from '../../../core/constant/constant';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';

export class InputSkill {
// public skiltype_id: string;
// public skill_id: string;
// public sdmskill_value: string;
public lovSkill: LOVService = null;
public lovSkillType: LOVService = null;

  constructor(private _factory: CoreFactory) {
    this.lovSkillType = this._factory.lov({
        api: 'lov/SkillType',
        initializeData: true
    });
  }
  public selectedSkill(event, skillSelect) {
    if (event.source.selected && skillSelect) {
      this.lovSkill = this._factory.lov({
        api: 'lov/Skill/',
        pagingParams: {
          filter: {
            field: 'skilltype_id',
            operator: COMPARISON_OPERATOR.EQ,
            value: skillSelect.key
          }
        },
        initializeData: true
      });
    }
  }
}
