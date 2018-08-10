import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { Observable } from '../../../../../../node_modules/rxjs';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { CoreFactory } from '../../../../core/factory/core.factory';

@Component({
  selector: 'app-SDM007',
  templateUrl: './SDM007.component.html',
  styleUrls: ['./SDM007.component.scss']
})
export class SDM007Component implements OnInit {

  // @ViewChild('viewAsDateTemplate')
  // public viewAsDateTemplate: any;
  // @ViewChild('tableActionTemplate')
  // public tableActionTemplate: any;

  public time: Date = new Date();
  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovSdm: LOVService;
  public lovCondition: LOVService;

  public psychology$: Observable<any>;
  private selectedId: string;

  constructor(private _factory: CoreFactory, private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
    });
  }

  public ngOnInit() {

    setInterval(() => {
      this.time = new Date();
    }, 1);
    
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
        psyco_id: '',
        sdmpsycological_desc: '',
        psycological_date: ''
      },
    });

    // this.dataTable = this._factory.dataTable({
    // serverSide : true,
    // tableColumns : [
    //     { prop: 'sdm_name', name: 'SDM Name', width: 100, sortable: false },
    //     { prop: 'psyco_name', name: 'Condition', width: 100, sortable: false },
    //     { prop: 'sdmpsycological_desc', name: 'Description', width: 100, sortable: false },
    //     { prop: 'psycological_date', name: 'Date', width: 100,
    //       cellTemplate: this.viewAsDateTemplate, sortable: false }
    //   ]
    // });

    this.action = this._factory.actions({
        api: 'sdm/sdmPsycological',
        inputForm: this.inputForm,
        // dataTable: this.dataTable
    });

    this.lovSdm = this._factory.lov({
        api: 'lov/sdm',
        initializeData: true
    });

    this.lovCondition = this._factory.lov({
        api: 'lov/psychologicals',
        initializeData: true
    });

    const readAllApi = this._factory.api ({
      api: 'sdm/sdmPsycological',
      pagingParams : {
        filter : {
          field : 'psyco_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.selectedId
        }
      }
    });

    this._factory.http().get(readAllApi).subscribe((res: any) => {
      console.log(res);
      this.action.patchFormData(res.data.items[0]);
    });
  }

}
