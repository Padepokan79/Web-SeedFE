import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from './../../../../core/constant/constant';
import { CoreFactory } from './../../../../core/factory/core.factory';
import { DataTable } from './../../../../core/models/data-table';
import { InputForm } from './../../../../core/models/input-form';
import { ActionService } from './../../../../core/services/uninjectable/action.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-SDM008',
  templateUrl: './SDM008.component.html',
  styleUrls: ['./SDM008.component.scss']
})
export class SDM008Component implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovSDM: LOVService;
  public lovPsychologicals: LOVService;

  constructor(private _factory: CoreFactory, private router: Router) { }

  public ngOnInit() {
    this.inputForm = this._factory.inputForm({
      // formControls: {
      //   sdm_id: '',
      //   psycho_id: '',
      //   sdmpsycological_desc: '',
      //   psycological_date: '',
      // },
      // validationMessages: {
      //   sdm_id: {
      //     required: '',
      //   },
      //   user_id: {
      //     required: 'Silahkan masukkan User ID'
      //   }
      // }
    });

    // First Data Table Initialization
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        // filter: {
        //   operator: CONJUNCTION_OPERATOR.AND,
        //   component: [
        //       {
        //           field: 'kddati1',
        //           operator: COMPARISON_OPERATOR.EQ,
        //           value: Session.getUserData('kddati1')
        //       },
        //       {
        //           field: 'kddati2',
        //           operator: COMPARISON_OPERATOR.EQ,
        //           value: Session.getUserData('kddati2')
        //       }
        //   ]
        // },
        limit : 5
      },
      searchCriteria : [
        { viewValue: 'Name', viewKey: 'sdm_id', type: TYPE.STRING },
      ],
      tableColumns : [
        { prop: 'norut', name: 'No', width: 5, sortable: false },
        { prop: 'sdm_name', name: 'Name', width: 135, sortable: false },
        { prop: 'psyco_name', name: 'Condition', width: 10, sortable: false },
        { prop: 'sdmpsycological_desc', name: 'Reason', width: 300, sortable: false },
        { prop: 'psycological_date', name: 'Date', width: 50,
          cellTemplate: this.viewAsDateTemplate, sortable: false },
        { prop: 'sdmpsycological_id', name: 'Action', width: 10, cellTemplate: this.tableActionTemplate, sortable: false },
      ]
    });

    this.action = this._factory.actions({
        api: 'sdm/SdmPsycological',
        inputForm: this.inputForm,
        dataTable: this.dataTable
    });

    this.lovSDM = this._factory.lov({
        api: 'lov/Sdm',
        initializeData: true
    });

    this.lovPsychologicals = this._factory.lov({
        api: 'lov/Psychologicals',
        initializeData: true
    });
  }

  public navigateEditMenu(id) {
    this.router.navigate(['/pages/sdm/SDM007', { id }]);
  }

}
