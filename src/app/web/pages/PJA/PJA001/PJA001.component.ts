// 
// AUTHOR  	: Malik Chaudhary
// CREATED 	: Wednesday, ‎August ‎1, ‎2018, ‏‎9:48:58 AM
// UPDATE	: 
// 
import { Component, OnInit, ViewChild } from '@angular/core';
import { InputForm } from './../../../../core/models/input-form';
import { CoreFactory } from './../../../../core/factory/core.factory';
import { ActionService } from './../../../../core/services/uninjectable/action.service';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import {FormControl, FormGroup} from '@angular/forms';
import { ListOfValue } from '../../../../core/models/list-of-value';
// import { DataTable } from './../../../../core/models/data-table';

@Component({
  selector: 'app-PJA001',
  templateUrl: './PJA001.component.html',
  styleUrls: ['./PJA001.component.css']
})
export class PJA001Component implements OnInit {
  // myControl = new FormControl();
  // //options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<any>;

   @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  // @ViewChild('tableActionTemplate')
  // public tableActionTemplate: any;

  public inputForm: InputForm;
  public action: ActionService;
  public lovSkill: LOVService;

  public skill: any;
  public skillCtrl: FormControl;
  public filteredSkill: any;
  public listSkill: any[] = [];
    public kdSkill: any;
  // public dataTable: DataTable;

  constructor(private _factory: CoreFactory) {
    this.skillCtrl = new FormControl();
    this.filteredSkill = this.skillCtrl.valueChanges
              .startWith('')
              .map((name) => this.filterSkill(name));
   }

  public ngOnInit() {
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
  			nip_sdm: {
  				required: 'Silahkan masukan NIP',
  				pattern: 'Hanya boleh angka'
  			}
  		}
  	});

    this.action = this._factory.actions({
        api: 'project/MengelolaProject',
        inputForm: this.inputForm
        // dataTable: this.dataTable
    });

    this.lovSkill = this._factory.lov({
        api: 'lov/Skill',
        initializeData: true
    });
  }
   public filterSkill(val: string) {
    return val && val.length > 2 ? this.lovSkill.data.filter((s) => s.values.skill_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  public setSkillValue(inputForm: FormGroup, dataSkill: ListOfValue) {
        if (dataSkill) {
            this.kdSkill = dataSkill.key;
            this.lovSkill = this._factory.lov({
                api: 'lov/Skill',
                params: {
                    skill_id: dataSkill.key
                },
                initializeData: true
            });

            // tslint:disable-next-line:max-line-length
            this.action.patchFormData({skill_id: dataSkill.key, skill_name: dataSkill.values.skill_name});

        }
    }
  // public aksi = this._factory.lov({api: 'lov/Skill', initializeData:true});
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

}
