import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { DataTable } from '../../../../../core/models/data-table';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { Location } from '@angular/common';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { Comparison } from '../../../../../core/enums/comparison-operator.enum';

@Component({
  selector: 'app-DetailSkillSdm',
  templateUrl: './DetailSkillSdm.component.html',
  styleUrls: ['./DetailSkillSdm.component.css']
})
export class DetailSkillSdmComponent implements OnInit {
  public time: Date = new Date();
  public dataTable: DataTable;
  public action: ActionService;
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

    this.dataTable = this._factory.dataTable({
      serverSide: true,
      pagingParams : {
        filter: Comparison.EQ('sdm_id', this.selectedId.toString())
      },
      tableColumns: [
        { prop: 'sdm_name', name: 'Sdm Name', width: 100, sortable: false },
        { prop: 'skilltype_name', name: 'Skill Type Name', width: 100, sortable: false },
        { prop: 'skill_name', name: 'Skill name', width: 100, sortable: false },
        { prop: 'sdmskill_value', name: 'Skill Value', width: 100, sortable: true },
      ]
    });

    this.action = this._factory.actions({
      api: 'allocation/MengelolaSdmSkill',
      dataTable: this.dataTable
    });

  }

  public goBack() {
    this.location.back();
  }

}
