import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../core/models/input-form';
import { LOVService } from '../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';

@Component({
  selector: 'app-tab-datapribadi',
  templateUrl: './tab-datapribadi.component.html',
  styleUrls: ['./tab-datapribadi.component.css']
})
export class TabDatapribadiComponent implements OnInit {

  public imageUrl: string = 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png';
  public fileToUpload: File = null;
  // public form = 1;
  public gender = '1';

  @Input()
  public form: number;
  @Input()
  public id: number;

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;

  public lovReligion: LOVService;
  public lovHealth: LOVService;
  public lovLevel: LOVService;
  public lovStatus: LOVService;
  public lovDegree: LOVService;

  constructor(private _factory: CoreFactory) { }

    public ngOnInit() {

      this.inputForm = this._factory.inputForm({
        formControls: {
          contracttype_id: '',
          gender_id: '1',
          health_id: '',
          religion_id: '',
          sdm_address: '',
          sdm_contractloc: '',
          sdm_datebirth: '',
          sdm_email: '',
          sdm_endcontract: '',
          sdm_image: '',
          sdm_ktp: '',
          sdm_linkedin: '',
          sdm_name: '',
          sdm_nik: '',
          sdm_objective: '',
          sdm_phone: '',
          sdm_placebirth: '',
          sdm_postcode: '',
          sdm_startcontract: '',
          sdm_status: '1',
          sdmlvl_id: '',
        },
        validationMessages: {
          sdm_name: {
            required: 'Silahkan masukkan Nama Lengkap'
          },
          sdm_nik: {
            pattern: 'Masukkan hanya angka'
          },
          sdm_ktp: {
            pattern: 'Masukkan hanya angka'
          },
          sdm_postcode: {
            pattern: 'Masukkan hanya angka'
          }
        }
      });

      this.action = this._factory.actions({
        api: 'sdm/MengelolaSdm',
        inputForm: this.inputForm
      });

      this.lovReligion = this._factory.lov({
        api: 'lov/religion',
        initializeData: true
      });

      this.lovHealth = this._factory.lov({
        api: 'lov/health',
        initializeData: true
      });

      this.lovLevel = this._factory.lov({
        api: 'lov/sdmLvl',
        initializeData: true
      });

      this.lovStatus = this._factory.lov({
        api: 'lov/contractType',
        initializeData: true
      });

      const readAllApi = this._factory.api({
        api : 'sdm/mengelolaSdm/readAll',
        pagingParams : {
          filter : {
            field : 'sdm_id',
            operator : COMPARISON_OPERATOR.EQ,
            value : this.id
          }
        }
      });

      this._factory.http().get(readAllApi).subscribe((res: any) => {
        console.log(res);
        this.action.patchFormData(res.data.items[0]);
      });
  }

  public handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
}
