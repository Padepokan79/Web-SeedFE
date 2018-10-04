import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { InputForm } from '../../../../../core/models/input-form';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { LOVService } from '../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { ActivatedRoute } from '../../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-PopUpDetail',
  templateUrl: './PopUpDetail.component.html',
  styleUrls: ['./PopUpDetail.component.scss']
})
export class PopUpDetailComponent implements OnInit {
  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;

  @Input()
  public value: number;

  public time: Date = new Date();
  public inputForm: InputForm;
  public action: ActionService;
  public lovSdm: LOVService;
  private selectedId: string;

  constructor(private _factory: CoreFactory, private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
    });
  }

  public ngOnInit() {
    // this.value = 1;
    console.log('Print Value : ' + this.value);
    setInterval(() => {
            this.time = new Date();
          }, 1);

    this.inputForm = this._factory.inputForm({
      formControls: {
          sdm_id: '',
          sdm_name: '',
          sdm_nik: '',
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

    console.log(this.value);
    const readAllApi = this._factory.api({
      api : 'project/MengelolaProject/readAll',
      pagingParams : {
        filter : {
          field : 'project_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.value
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

    this.lovSdm = this._factory.lov({
        api: 'lov/Sdm',
        pagingParams: {
          orderby: 'sdm_name ASC',
        },
        initializeData: true
    });
  }

}
