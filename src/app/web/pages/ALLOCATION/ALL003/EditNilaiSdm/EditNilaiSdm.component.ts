  // Author        : Muhamad Rifan Andrian
  // Date Created  : 21/09/2018
  // Status        : Done

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { DataTable } from '../../../../../core/models/data-table';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { Location } from '@angular/common';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { Comparison } from '../../../../../core/enums/comparison-operator.enum';
import { InputForm } from '../../../../../core/models/input-form';
import { DefaultNotificationService } from '../../../../../core/services/default-notification.service';

@Component({
  selector: 'app-EditNilaiSdm',
  templateUrl: './EditNilaiSdm.component.html',
  styleUrls: ['./EditNilaiSdm.component.css']
})
export class EditNilaiSdmComponent implements OnInit {

  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public time: Date = new Date();
  public dataTable: DataTable;
  public action: ActionService;
  public inputForm: InputForm;
  public editId: number;
  public isButtonClicked = false;
  private selectedId: number;

  constructor(private location: Location,
              private _factory: CoreFactory,
              private route: ActivatedRoute,
              public _notif: DefaultNotificationService) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
    });
  }

  public refreshTabel() {
    this.action.refreshTable();
  }

  public ngOnInit() {
    // this.sdmid = this.id;
    setInterval(() => {
      this.time = new Date();
    }, 1);

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdmskill_id: '',
        sdm_name: '',
        skilltype_name: '',
        skill_name: '',
        sdmskill_value: ''
      }
    });

    this.dataTable = this._factory.dataTable({
      serverSide: true,
      pagingParams : {
        filter: Comparison.EQ('sdm_id', this.selectedId.toString()),
        limit: 10
      },
      tableColumns: [
        { prop: 'skilltype_name', name: 'Skill Type Name', width: 100, sortable: false },
        { prop: 'skill_name', name: 'Skill name', width: 100, sortable: false },
        { prop: 'sdmskill_value', name: 'Skill Value', width: 100, sortable: true },
        { prop: 'skilltype_id', name: 'Action', width: 50, cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    const readAllApi = this._factory.api({
      api : 'allocation/MengelolaSkillSdm/readAll',
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
      api: 'allocation/MengelolaSkillSdm',
      dataTable: this.dataTable,
      inputForm: this.inputForm
    });

  }

  public goBack() {
    this.location.back();
  }

  public onSave() {
    const updateApi = this._factory.api({
      api : 'allocation/MengelolaSkillSdm/update',
    });
    this._factory.http().put(updateApi + '?sdmskill_id=' + this.action.getFormControlValue('sdmskill_id'), this.action.getFormData()).subscribe((response: any) => {
      this._notif.success({
        message: 'Data Berhasil Disimpan'
        });
      });
  }

  public validasiNilai() {
    if (this.action.getFormControlValue('sdmskill_value') <= 10 ) {
        // tslint:disable-next-line:no-unused-expression
        this.onSave();
      } else {
        this._notif.error({
          message: 'Nilai melebihi 10'
        });
      }
  }

  public btnOn() {
    this.isButtonClicked = true;
  }
}
