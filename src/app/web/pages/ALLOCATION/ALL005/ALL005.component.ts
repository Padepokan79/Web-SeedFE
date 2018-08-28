import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { COMPARISON_OPERATOR, TYPE } from '../../../../core/constant/constant';
import { DataTable } from '../../../../core/models/data-table';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { SearchCriteria } from './SearchCriteria';

@Component({
  selector: 'app-ALL005',
  templateUrl: './ALL005.component.html',
  styleUrls: ['./ALL005.component.css']
})
export class ALL005Component implements OnInit {

  public dataTable: DataTable;
  public action: ActionService;
  public inputForm: InputForm;
  public time: Date = new Date();

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;
  public lovSkillType: LOVService;
  public lovSkill: LOVService;
  public listSearchCriteria: SearchCriteria[] = [];
  private selectedId: string;

  constructor(
    public _notif: DefaultNotificationService,
    private _factory: CoreFactory,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
    });
    this.listSearchCriteria.push(new SearchCriteria(_factory));
  }
  public addSearchCriteria() {
    const searchCriteria = new SearchCriteria(this._factory);
    this.listSearchCriteria.push(searchCriteria);
  }

  public removeSearchCriteria(inc) {
    this.listSearchCriteria.splice(inc, 1);
  }
  public ngOnInit() {
    console.log('Selected ID : ' + this.selectedId);
    setInterval(() => {
      this.time = new Date();
    }, 1);
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdmskill_id: '',
        sdm_nik: '',
        sdm_name: '',
        skilltype_id: '',
        skill_id: '',
        skilltype_name: '',
        skill_name: '',
        sdmskill_value: '',
      },
      validationMessages: {
        sdmskill_value: {
          required: 'Silahkan Masukan Nilai'
        }
      }
    });

    this.action = this._factory.actions({
      api: 'allocation/mengelolaSdmSkill/',
      inputForm: this.inputForm,
    });
    const readAllApi = this._factory.api({
      api : 'allocation/mengelolaSdmSkill/readAll',
      pagingParams : {
        filter : {
          field : 'sdmskill_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.selectedId
        }
      }
    });

    this._factory.http().get(readAllApi).subscribe((data: any) => {
      console.log(data);
      this.action.patchFormData(data.data.items[0]);
    });

    // this.dataTable = this._factory.dataTable({
    //   pagingParams: {
    //     limit: 10
    //   },
    //   serverSide: true,
    //   searchCriteria: [
    //     { viewValue: 'sdmskill_id', viewKey: 'sdmskill_id', type: TYPE.NUMBER}
    //   ],
    //   tableColumns: [
    //     { prop: 'sdmskill_id', name: 'Sdm Skill ID', width: 100 },
    //     {
    //       prop: 'id', name: 'Action', width: 100,
    //       cellTemplate: this.tableActionTemplate, sortable: false
    //     }
    //   ]
    // });
  }

  public onEdit() {
    const updateAPI = this._factory.api({
      api : 'allocation/mengelolaSdmSkill/update',
      // params : {
      //   client_id : this.selectedId
      // }
    });

    this._factory.http().put(updateAPI + '?sdmskill_id=' + this.selectedId, this.action.getFormData()).subscribe((response: any) => {
      console.log('Berhasil');
      this._notif.success({
        message: 'Data Updated'
      });
    });
  }
}
