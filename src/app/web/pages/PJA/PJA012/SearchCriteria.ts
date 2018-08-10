// import { COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from '../../../core/constant/constant';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { DataTable } from '../../../../core/models/data-table';
import { COMPARISON_OPERATOR } from 'app/core/constant/constant';

export class SearchCriteria {
    // tslint:disable-next-line:variable-name
    public skilltype_id: string = '';
    // tslint:disable-next-line:variable-name
    public skill_id: string = '';
    public value: string = '';
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
}
