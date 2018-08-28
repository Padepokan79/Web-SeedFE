/*
AUTHOR     : Malik Chaudhary 
CREATED   : ‎Thursday, ‎August ‎2, ‎2018, ‏‎1:45:06 PM
UPDATE     : ‎Thursday, ‎August ‎16, ‎2018, ‏‎1:51 PM
*/
import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
import { DefaultNotificationService } from './../../../../core/services/default-notification.service';


@Component({
  selector: 'app-PJA002',
  templateUrl: './PJA002.component.html',
  styleUrls: ['./PJA002.component.scss']
})
export class PJA002Component implements OnInit {
  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;

public time: Date = new Date();
public inputForm: InputForm;
public action: ActionService;
public lovSdm: LOVService;
private selectedId: number;

// tslint:disable-next-line:member-ordering

  constructor(private _factory: CoreFactory,private route: ActivatedRoute, public _notif: DefaultNotificationService) { 
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
    });
  }

  public ngOnInit() {
     setInterval(() => {
      this.time = new Date();
    }, 1);

     console.log('Selected ID : ' + this.selectedId);
    setInterval(() => {
      this.time = new Date();
    }, 1);
  	this.inputForm = this._factory.inputForm({
      formControls: {
        project_id: '',
        sdm_nik: '',
        sdm_name: '',
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
    });
  }

  public onEdit() { 
    const updateAPI = this._factory.api({
     api: 'project/MengelolaProject/update',

  });
  this._factory.http().put(updateAPI + '?project_id=' + this.selectedId, this.action.getFormData()).subscribe((response: any) => {
  console.log('Berhasil');
   });  
  this._notif.success({
    message: 'Data ' + this.action.getFormControlValue('sdm_name') + ' berhasil diperbarui'
  });
  }
}
