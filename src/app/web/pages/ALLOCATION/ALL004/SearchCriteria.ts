import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';

export class SearchCriteria {
    // tslint:disable-next-line:variable-name
    public skilltype_id: number;
    // tslint:disable-next-line:variable-name
    public skill_id: number;
    public lovSkillType: LOVService = null;
    public lovSkill: LOVService = null;
    public lovSdmSkill: LOVService = null;
    public sdmskillValue: number;
    public sdmId: string;

    public clientId: number = 4;
    public hirestatId: number = 3;
    public temp = [1,2];

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
              },
            },
            initializeData: true,
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
