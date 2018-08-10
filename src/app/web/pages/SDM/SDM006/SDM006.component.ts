import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';

@Component({
  selector: 'app-SDM007',
  templateUrl: './SDM006.component.html',
  styleUrls: ['./SDM006.component.scss']
})
export class SDM006Component implements OnInit {

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

  // public sdmCtrl: FormControl;
  // public sdm: any;
  // public filteredSdm: any;
  // public sdmId: any;

  constructor(private _factory: CoreFactory) {}

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

  }

}
