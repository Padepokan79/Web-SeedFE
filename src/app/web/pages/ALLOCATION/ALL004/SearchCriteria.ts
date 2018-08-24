import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR } from '../../../../core/constant/constant';

export class SearchCriteria {
    // tslint:disable-next-line:variable-name
    public skilltype_id: string;
    // tslint:disable-next-line:variable-name
    public skill_id: string;
    public value: string;
    public lovSkillType: LOVService = null;
    public lovSkill: LOVService = null;
    public lovSdmSkill: LOVService = null;
    public sdmskillValue: string;
    public sdmId: string;

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

    //   public selectToAssign(event, sdmSelect) {
    //     if(event.source.selected && sdmSelect) {
    //       this.lovSdmSkill = this._factory.lov({
    //         api: 'allocation/MengelolaSdmSkill',
    //         pagingParams: {
    //           filter: {
    //             field: 'skill_id',
    //             operator: COMPARISON_OPERATOR.EQ,
    //             value: sdmSelect.key
    //           }
    //         },
    //         initializeData: true
    //       });
    //     }
    //   }
}
