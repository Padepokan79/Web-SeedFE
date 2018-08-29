  // Author        : Nurdhiat Chaudhary Malik
  // Date Created  : 01 Agustus 2018
  // Status        : Done

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { TYPE } from '../../../../core/constant/constant';

@Component({
  selector: 'app-ALL002',
  templateUrl: './ALL002.component.html',
  styleUrls: ['./ALL002.component.scss']
})
export class ALL002Component implements OnInit {

  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public dataTable: DataTable;
  public inputForm: InputForm;

  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {
    this.inputForm = this._factory.inputForm({
      formControls: {
        skilltype_id: '',
        skilltype_name: '',
      },
      validationMessages: {
        skilltype_name: {
          required: 'Silahkan masukkan Nama Kategori Skill'
        }
      }
    });
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        limit : 10
      },
      tableColumns : [
        { prop: 'skilltype_id', name: 'Category ID', width: 50,  sortable: false },
        { prop: 'skilltype_name', name: 'Category Name', width: 100, sortable: false },
        { prop: 'skilltype_id', name: 'Action', width: 50, cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    this.action = this._factory.actions({
      api: 'allocation/MengelolaKategori/',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });
  }

}
