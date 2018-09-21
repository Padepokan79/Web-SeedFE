import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { DataTable } from '../../../../../core/models/data-table';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { Location } from '@angular/common';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { Comparison } from '../../../../../core/enums/comparison-operator.enum';
import { InputForm } from '../../../../../core/models/input-form';

@Component({
  selector: 'app-DetailSkillSdm',
  templateUrl: './DetailSkillSdm.component.html',
  styleUrls: ['./DetailSkillSdm.component.css']
})
export class DetailSkillSdmComponent implements OnInit {
  public time: Date = new Date();
  public dataTable: DataTable;
  public action: ActionService;
  public inputForm: InputForm;
  private selectedId: number;

  constructor(private location: Location, private _factory: CoreFactory, private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
    });
  }

  public ngOnInit() {
    // this.sdmid = this.id;
    setInterval(() => {
      this.time = new Date();
    }, 1);

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_name: '',
      }
    });

    this.dataTable = this._factory.dataTable({
      serverSide: true,
      pagingParams : {
        filter: Comparison.EQ('sdm_id', this.selectedId.toString()),
        limit: 10
      },
      tableColumns: [
        { prop: 'skilltype_name', name: 'Skill Type Name', width: -20, sortable: false },
        { prop: 'sdm_skill_value', name: 'Skill name', width: 100, sortable: false },
        // { prop: 'sdmskill_value', name: 'Skill Value', width: 100, sortable: true },
      ]
    });

    const readAllApi = this._factory.api({
      api : 'allocation/DetailSdmSkill/readAll',
      pagingParams : {
        filter : {
          field : 'sdm_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.selectedId
        }
      }

    });
    this._factory.http().get(readAllApi).subscribe((res: any) => {
      console.log(res);
      this.action.patchFormData(res.data.items[0]);
    });

    this.action = this._factory.actions({
      api: 'allocation/DetailSdmSkill',
      dataTable: this.dataTable,
      inputForm: this.inputForm
    });

  }

  public goBack() {
    this.location.back();
  }

}
