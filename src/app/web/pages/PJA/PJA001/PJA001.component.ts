// 
// AUTHOR  	: Malik Chaudhary
// CREATED 	: Wednesday, ‎August ‎1, ‎2018, ‏‎9:48:58 AM
// UPDATE	  : APN, Thursday, August 16, ‎2018, ‏‎9:37:29 AM
// UPDATE   : MLK, Tuesday, August 21, ‎2018, ‏‎4:35:00 PM
import { Component, OnInit, ViewChild } from '@angular/core';
import { InputForm } from './../../../../core/models/input-form';
import { CoreFactory } from './../../../../core/factory/core.factory';
import { ActionService } from './../../../../core/services/uninjectable/action.service';
import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import { ListOfValue } from '../../../../core/models/list-of-value';
import { MatOptionSelectionChange } from '@angular/material';
//import { DataTable } from './../../../../core/models/data-table';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-PJA001',
  templateUrl: './PJA001.component.html',
  styleUrls: ['./PJA001.component.scss']
})
export class PJA001Component implements OnInit {
	selectedValue: String;
  // myControl = new FormControl();
  // //options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<any>;

   @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  // @ViewChild('tableActionTemplate')
  // public tableActionTemplate: any;

  public inputForm: InputForm;
  public action: ActionService;
  public lovSdm: LOVService;

  public skill: any;
  public sdmCtrl: FormControl;
  public filteredSdm: any;
	public listSkill: any[] = [];
	public kdSdm: any;
  public selectNik: any;
  public sdm_nik: String;
  //public dataTable: DataTable;

  constructor(
    private _factory: CoreFactory,
    private router: Router
  ) {
			this.sdmCtrl = new FormControl();
              this.filteredSdm = this.sdmCtrl.valueChanges
              .startWith('')
              .map((value) => this.filterSdm(value));
   }

  public ngOnInit() {
  	 this.inputForm = this._factory.inputForm({
      formControls: {
  			sdm_id: '',
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
  			sdm_id: {
  				required: 'Silahkan masukan Nama SDM'
  			},
        sdm_nik: {
          required: 'Silahkan masukan NIK SDM'
        },
  			project_name: {
  				required: 'Silahkan masukan Nama Project'
  			},
  			project_desc: {
  				required: 'Silahkan masukan Project Deskripsi'
  			},
  			project_role: {
  				required: 'Silahkan masukan Project Role'
  			},
  			project_startdate: {
  				required: 'Silahkan masukan Tanggal Mulai Project'
  			},
  			project_enddate: {
  				required: 'Silahkan masukan Tanggal Akhir Project'
  			},
  			project_projectsite: {
  				required: 'Silahkan masukan lokasi project'
  			},
  			project_customer: {
  				required: 'Silahkan masukan nama pelanggan'
  			},
  			project_apptype: {
  				required: 'Silahkan masukan type aplikasi'
  			},
  			project_serveros: {
  				required: 'Silahkan masukan server OS'
  			},
  			project_devlanguage: {
  				required: 'Silahkan masukan bahasa pemrograman'
  			},
  			project_framework: {
  				required: 'Silahkan masukan nama framework'
  			}, 
  			project_database: {
  				required: 'Silahkan masukan nama database'
  			},
  			project_appserver: {
  				required: 'Silahkan masukan nama aplikasi server'
  			},
  			project_devtool: {
  				required: 'Silahkan masukan tool pengembang'
  			},
  			project_technicalinfo: {
  				required: 'Silahkan masukan info teknik'
  			},
  			project_otherinfo: {
  				required: 'Silahkan masukan info lain'
  			}
  		}
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
   public filterSdm(val: string) {
    return val && val.length > 1 ? this.lovSdm.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
        
  }
 
  public setSdmValue(inputForm: FormGroup, dataSdm: ListOfValue) {
        if (dataSdm) {
            this.kdSdm = dataSdm.key;
            this.lovSdm = this._factory.lov({
                api: 'lov/Sdm',
                params: {
                    sdm_id: dataSdm.key
                },
                initializeData: true
            });
            this.selectNik = dataSdm.key-1;
            // tslint:disable-next-line:max-line-length
            this.action.patchFormData({sdm_id: dataSdm.key, sdm_name: dataSdm.values.sdm_sdm_name});

        }
    }

   public ambilData(){ 
     const readAllApi = this._factory.api({
      api : 'sdm/MengelolaSdm/readAll',
        params : {
          value : this.selectNik
        }
    });
    console.log(this.selectNik);
    this._factory.http().get(readAllApi).subscribe((res: any) => {
    console.log(res);
    this.action.patchFormData(res.data.items[this.selectNik]);
    this.sdm_nik = res.data.items[this.selectNik].sdm_nik;
    console.log(this.sdm_nik);
    });

  } 

  public timeOut() {
      setTimeout(() => this.router.navigate(['pages/pja/PJA003']), 1000);
  }
  // public aksi = this._factory.lov({api: 'lov/Skill', initializeData:true});
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

}
