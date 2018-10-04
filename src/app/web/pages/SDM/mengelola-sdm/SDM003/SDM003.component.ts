import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { ResponseContentType } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Session } from 'inspector';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { DataTable } from '../../../../../core/models/data-table';
import { LOVService } from '../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { startWith, map } from '../../../../../../../node_modules/rxjs/operators';
import { ListOfValue } from '../../../../../core/models/list-of-value';
import { InputForm } from '../../../../../core/models/input-form';
import { Comparison } from '../../../../../core/enums/comparison-operator.enum';
import { Conjunction } from '../../../../../core/enums/conjunction-operator.enum';
import { HttpClient, HttpParams } from '../../../../../../../node_modules/@angular/common/http';
import { DefaultNotificationService } from '../../../../../core/services/default-notification.service';
import { Title } from '@angular/platform-browser';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';

@Component({
  selector: 'app-SDM003',
  templateUrl: './SDM003.component.html',
  styleUrls: ['./SDM003.component.scss']
})
export class SDM003Component implements OnInit {
  public time: Date = new Date();
  public myControl = new FormControl();
  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;
  public action: ActionService;
  public dataTable: DataTable;
  public nama: string;
  public lovSdmLvl: LOVService;
  public lovSdm: LOVService;
  @ViewChild('notif')
  public notif: any;
  public notifications: any;
  public progress: boolean;
  @ViewChild('name')
  public name: any;
  // sdm
  public filteredSdm: any;
  public sdmCtrl: FormControl;
  public inputForm: InputForm;
   // Hapus
   public KeyId: any;
   public SdmName: any;
   public SdmEndDate: any;
   public SdmLvl: any;

  public onKeySdmName(event: any) {
    this.KeyId = event.target.value;
    if (this.KeyId === '') {
      this.SdmName = null;
      console.log('Nama: ', this.SdmName);
    }
  }

  public onKeySdmEndDate(event: any) {
    this.KeyId = event.target.value;
    if (this.KeyId === '') {
      this.SdmEndDate = undefined;
      console.log('Tanggal: ', this.SdmEndDate);
    }
  }

  // tslint:disable-next-line:member-ordering
  constructor(public _notif : DefaultNotificationService,private http: HttpClient,private _factory: CoreFactory, private router: Router, private route: ActivatedRoute) {

    this.sdmCtrl = new FormControl();
    this.filteredSdm = this.sdmCtrl.valueChanges
    .pipe(
      startWith(''),
      map((value) => this.filterSdm(value))
    );
    // this.route.params.subscribe((param) => {
    //   this.sdmid = param.id;
    // });
  }
  public ngOnInit() {

    this.http.get(this._factory.api({api: 'sdm/MengelolaHistoriSdm/ReadAll/readAll'}))
    .subscribe((res: any) => {
      this.http.get(this._factory.api({api: 'sdm/MengelolaSdm/ReadAll'}))
      .subscribe((response: any) => {
        let sdmNonactive = [];
        let sdmNonActive2 = [];
        for (var i = 0; i < response.data.items.length; ++i) {
          if (response.data.items[i].sdm_status == 'Non-Active') {
            sdmNonactive.push(response.data.items[i]);
          }
        }

        for (var i = 0; i < sdmNonactive.length; ++i) {
          for (var ii = 0; ii < res.data.items.length; ++ii) {
            if (sdmNonactive[i].sdm_id == res.data.items[ii].sdm_id && sdmNonactive[i].sdm_endcontract == res.data.items[ii].sdm_endcontract) {
              sdmNonActive2.push(sdmNonactive[i]);
            }
          }
        }

        for (var i = 0; i < sdmNonActive2.length; ++i) {
          for (var a = 0; a < sdmNonactive.length; ++a) {
            if (sdmNonActive2[i].sdm_id == sdmNonactive[a].sdm_id && sdmNonActive2[i].sdm_endcontract == sdmNonactive[a].sdm_endcontract) {
              sdmNonactive.splice(a, 1)
            }
          } 
        }

        console.log(sdmNonactive);
        for (var i = 0; i < sdmNonactive.length; ++i) {
          this.http.post(this._factory.api({api: 'sdm/MengelolaHistoriSdm/Create'}), {
            sdm_id: sdmNonactive[i].sdm_id,
            sdmhistory_startdate: sdmNonactive[i].sdm_startcontract,
            sdmhistory_enddate: sdmNonactive[i].sdm_endcontract
          }).subscribe((eaa: any) => {
            console.log(eaa);
          });
        }
      });
    });

    // console.log('gh' + this.sdmid);
    setInterval(() => {
      this.time = new Date();
    }, 1);
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
        sdm_name: '',
        sdmlvl_id: '',
        sdm_endcontract: '',
      }
    });
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        // filter: {
        //   field: 'sdm_status',
        //   operator: COMPARISON_OPERATOR.EQ,
        //   value: 1
        // },
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
        limit : 10,
        orderby : 'sdm_status DESC,sdm_endcontract ASC'
        
        
      },
      // searchCriteria : [
      //   { viewValue: 'Nama', viewKey: 'sdm_name', type: TYPE.STRING }
      // ],
      tableColumns : [
        { prop: 'norut', name: 'No', flexGrow: 1, sortable: false },
        { prop: 'sdm_name', name: 'Nama', flexGrow: 6,
        cellTemplate: this.name, sortable: true },
        { prop: 'sdm_nik', name: 'NIK', flexGrow: 2, sortable: true },
        { prop: 'sdm_startcontract', name: 'Start Date', flexGrow: 2,
          cellTemplate: this.viewAsDateTemplate, sortable: true },
        { prop: 'sdm_endcontract', name: 'End Date', flexGrow: 2,
          cellTemplate: this.viewAsDateTemplate, sortable: true },
        { prop: 'sdm_status', name: 'Status', flexGrow: 2, sortable: false },
        { prop: 'sdm_id', name: 'Action', flexGrow: 3,
          cellTemplate: this.tableActionTemplate, sortable: false },
        { prop: 'notif', name: 'Notifikasi', flexGrow: 2,
          cellTemplate: this.notif, sortable: true }
      ]
    });
    this.action = this._factory.actions({
        api: 'sdm/MengelolaSdm/readAll',
        dataTable: this.dataTable,
        inputForm: this.inputForm
    });
    this.lovSdmLvl = this._factory.lov({
      api: 'lov/sdmLvl',
      initializeData: true
    });
    this.lovSdm = this._factory.lov({
      api: 'lov/sdm',
      initializeData: true
    });
  }
  public navigateEditMenu(id) {
    this.router.navigate(['/pages/sdm/SDM002', { id }]);
  }
  public navigateDetailMenu(id) {
    this.router.navigate(['/pages/sdm/SDM009', { id }]);
  }
  public navigate() {
    this.router.navigate(['/pages/sdm/SDM001']);
  }

  public setSdmValue(inputForm: FormGroup, dataSdm: ListOfValue) {
    if (dataSdm) {
      this.lovSdm = this._factory.lov({
        api: 'lov/sdm',
        params: {
          sdm_id: dataSdm.key
        },
        initializeData: true
      });
      this.SdmName = dataSdm.values.sdm_sdm_name;
      this.action.patchFormData({sdm_id: dataSdm.key, sdm_name: dataSdm.values.sdm_sdm_name});
      console.log(this.SdmName);
    }
  }

  public filterSdm(val: string) {
    return val ? this.lovSdm.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  // public onDownload() {
  //   const dataApi = this._factory.api({
  //     api: 'sdm/ReportCvSdm/GenerateAsPDF?$sdmId=30'
  //                   // params: {
  //                   // }
  //   });
  //   this._factory.http().post(dataApi, null,
  //     { responseType: ResponseContentType.Blob }) // ResponseContentType harus diimport
  //     .map((res) => res.blob())
  //     .subscribe(
  //         (data)  => {
  //                 // tslint:disable-next-line:max-line-length
  //                 FileSaver.saveAs(data, 'REKAPITULASIBENDAHARWAN_' + 'SELURUHSKPD' + '_' + '.pdf');
  //         },
  //     // tslint:disable-next-line:max-line-length
  //     (error) => {console.log ('Error', 'Error Downloading the File'); this.notifications.error('INFO', 'File gagal diunduh'); },
  //     ()    => {console.log('Completed file download.');
  //               this.notifications.success('SUCCESS', 'File berhasil diunduh.');
  //     });
  // }
  public onPrintReportPDF(id, sdmName) {
    // this.router.navigate(['/pages/listSdm', { id }]);
    // this.nama = this.action.getFormControlValue('sdm_name');
    this.progress = true;
    const cv = this._factory.api({
            api: 'sdm/ReportCvSdm/GenerateAsPDF',
            params: {
                sdmId : id
            }
        });
    this._factory.http()
    .post(cv, null,
    { responseType: 'blob' })
    // .map((res) => res())
    .subscribe(
        (data)  => {
            // FileSaver.saveAs(data, 'CV ' + sdmName + '.pdf');
            var fileURL = window.URL.createObjectURL(data);
            window.open(fileURL, "_blank");
            this.progress = false;
        },
        (error) => {
            this.notifications.warn(
                'Warning', 'Data Tidak Ada'
            );
            this.progress = false;
        },
        ()    => console.log('Completed file download.')
      );
  }

  public onDownloadPDF(id, sdmName) {
    // this.router.navigate(['/pages/listSdm', { id }]);
    // this.nama = this.action.getFormControlValue('sdm_name');
    this.progress = true;
    const cv = this._factory.api({
            api: 'sdm/ReportCvSdm/GenerateAsPDF',
            params: {
                sdmId : id
            }
        });
    this._factory.http()
    .post(cv, null,
    { responseType: 'blob' })
    // .map((res) => res())
    .subscribe(
        (data)  => {
            FileSaver.saveAs(data, 'CV ' + sdmName + '.pdf');
            
            this.progress = false;
        },
        (error) => {
            this.notifications.warn(
                'Warning', 'Data Tidak Ada'
            );
            this.progress = false;
        },
        ()    => console.log('Completed file download.')
      );
  }
  onPreviewCV(id,name){
    this.router.navigate(['/pages/sdm/previewCV', { id,name }]);
  }

  public onSearch() {
    const filterCriteria = [];
    this.SdmLvl = this.action.getFormControlValue('sdmlvl_id');
    this.SdmEndDate = this.action.getFormControlValue('sdm_endcontract');
    console.log('Level: ', this.SdmLvl , 'Nama: ', this.SdmName, 'Tanggal berakhir: ', this.SdmEndDate);

    this.action.setPaginationFilter(
      Conjunction.AND(
        // filterCriteria
        this.SdmEndDate ? Comparison.LE('sdm_endcontract', this.SdmEndDate) : Comparison.NE('sdm_endcontract', 'sdm_endcontract'),
        this.SdmLvl ? Comparison.EQ('sdmlvl_id', this.SdmLvl) : Comparison.NE('sdmlvl_id', 'sdmlvl_id'),
        this.SdmName ? Comparison.EQ('sdm_name', this.SdmName) : Comparison.NE('sdm_name', 'sdm_name'),
      )
    );

    this.action.refreshTable();
  }
  public onReset() {
    this.action.onReset();
    this.SdmName = null;
    this.SdmEndDate = null;
    this.SdmLvl = null;
    this.action.resetFilter() ;
    this.action.refreshTable();
  }
}
