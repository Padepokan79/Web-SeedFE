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

@Component({
  selector: 'app-SDM003',
  templateUrl: './SDM003.component.html',
  styleUrls: ['./SDM003.component.css']
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
  // sdm
  public filteredSdm: any;
  public sdmCtrl: FormControl;
  public inputForm: InputForm;
   // Hapus
   public KeyId: any;
   public SdmName: any;
   public SdmEndDate: any;

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
  constructor(private _factory: CoreFactory, private router: Router, private route: ActivatedRoute) {

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
      // searchCriteria : [
      //   { viewValue: 'Nama', viewKey: 'sdm_name', type: TYPE.STRING }
      // ],
      tableColumns : [
        { prop: 'norut', name: 'No', width: 20, sortable: true },
        { prop: 'sdm_name', name: 'Nama', width: 100, sortable: true },
        { prop: 'sdm_nik', name: 'NIK', width: 50, sortable: true },
        { prop: 'sdm_startcontract', name: 'Start Date', width: 50,
          cellTemplate: this.viewAsDateTemplate, sortable: true },
        { prop: 'sdm_endcontract', name: 'End Date', width: 50,
          cellTemplate: this.viewAsDateTemplate, sortable: true },
        { prop: 'sdm_status', name: 'Status', width: 50, sortable: false },
        { prop: 'sdm_id', name: 'Action', width: 100,
          cellTemplate: this.tableActionTemplate, sortable: false },
        { prop: 'notif', name: 'Notifikasi', width: 50,
          cellTemplate: this.notif, sortable: false }
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

  public onSearch() {
    const filterCriteria = [];
    const SdmLvl = this.action.getFormControlValue('sdmlvl_id');
    this.SdmEndDate = this.action.getFormControlValue('sdm_endcontract');
    console.log('Level: ', SdmLvl , 'Nama: ', this.SdmName, 'Tanggal berakhir: ', this.SdmEndDate);

    this.action.setPaginationFilter(
      Conjunction.AND(
        // filterCriteria
        this.SdmEndDate ? Comparison.LE('sdm_endcontract', this.SdmEndDate) : Comparison.NE('sdm_endcontract', 'sdm_endcontract'),
        SdmLvl ? Comparison.EQ('sdmlvl_id', SdmLvl) : Comparison.NE('sdmlvl_id', 'sdmlvl_id'),
        this.SdmName ? Comparison.EQ('sdm_name', this.SdmName) : Comparison.NE('sdm_name', 'sdm_name'),
      )
    );

    this.action.refreshTable();
  }
}
