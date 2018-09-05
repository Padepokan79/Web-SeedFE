import { CoreFactory } from '../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from '../../../../core/constant/constant';
import { DataTable } from '../../../../core/models/data-table';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';

export class SearchCriteria {
    // tslint:disable-next-line:variable-name
    public skilltype_id: string = null;
    // tslint:disable-next-line:variable-name
    public skill_id: string = null;
    public value: number = null;
    public lovSkillType: LOVService = null;
    public lovSkill: LOVService = null;
    public lovSdmSkill: LOVService = null;
    public dataTable: DataTable;

    constructor(private _factory: CoreFactory, ) {
        this.lovSkillType = this._factory.lov({
            api: 'lov/SkillType',
            initializeData: true
        });
    }

    public selectedSkill(event, skillSelect) {
        if (event && event.source.selected && skillSelect) {
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

    // public availyValue(event, availValue) {
    //     if(event && event.source.selected && availValue) {

    //     }
    // }
}
