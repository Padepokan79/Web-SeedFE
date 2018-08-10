/*
AUTHOR     : Malik Chaudhary 
CREATED   : ‎Thursday, ‎August ‎2, ‎2018, ‏‎1:45:06 PM
UPDATE     :
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { InputForm } from './../../../../core/models/input-form';
import { CoreFactory } from './../../../../core/factory/core.factory';
import { ActionService } from './../../../../core/services/uninjectable/action.service';
import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { LOVService } from '../../../../core/services/uninjectable/lov.service'; 
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import { letProto } from '../../../../../../node_modules/rxjs/operator/let';
import { ActivatedRoute, ParamMap } from '../../../../../../node_modules/@angular/router';
import { switchMap } from '../../../../../../node_modules/rxjs/operators/switchMap';
import { filter } from '../../../../../../node_modules/rxjs/operator/filter';

@Component({
  selector: 'app-PJA002',
  templateUrl: './PJA002.component.html',
  styleUrls: ['./PJA002.component.css']
})
export class PJA002Component implements OnInit {
  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;

public time: Date = new Date();
  public inputForm: InputForm;
  public action: ActionService;
  public lovSdm: LOVService;
private selectedId: string;

  constructor(private _factory: CoreFactory,private route: ActivatedRoute) { 
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
    });
  }

  public ngOnInit() {
     console.log('Selected ID : ' + this.selectedId);
    setInterval(() => {
      this.time = new Date();
    }, 1);
  	  this.inputForm = this._factory.inputForm({
      formControls: {
  			sdm_id: '',
  			project_name: '',
  			project_desc: '',
  			project_role: '',
  			project_startdate: '',
  			project_enddate: '',
  			project_projectsite: '',
  			project_customer: '',
  			project_apptype: '',
  			project_serveros: '',
  			project_devlanguage: '',
  			project_framework: '', 
  			project_database: '',
  			project_appserver: '',
  			project_devtool: '',
  			project_technicalinfo: '',
  			project_otherinfo: ''
  		},
  		validationMessages: {
  			
  		}
  	});
    const readAllApi = this._factory.api({
      api : 'project/MengelolaProject/readAll',
      pagingParams : {
        filter : {
          field : 'project_id',
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
        api: 'project/MengelolaProject',
        inputForm: this.inputForm
        //dataTable: this.dataTable
    });
    this.lovSdm = this._factory.lov({
        api: 'lov/Sdm',
        initializeData: true
    });
  }

}
