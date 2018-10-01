import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../core/models/input-form';
import { LOVService } from '../../../../../core/services/uninjectable/lov.service';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { FileUploader } from '../../../../../../../node_modules/ng2-file-upload';
import { IAfterActionResult } from '../../../../../core/interfaces/action/i-after-action-result';
import { FormControl } from '../../../../../../../node_modules/@angular/forms';
import { HttpClient, HttpParams } from '../../../../../../../node_modules/@angular/common/http';
import { url } from 'inspector';
import { Location } from '@angular/common';
import { SubjectSubscriber } from '../../../../../../../node_modules/rxjs/Subject';
import { DatePipe } from '@angular/common';
import { angularMath } from 'angular-ts-math';
import * as FileSaver from 'file-saver';
import { Router,ActivatedRoute } from '@angular/router';
import { CoreFactory } from '../../../../../../core/factory/core.factory';
import { DefaultNotificationService } from '../../../../../../core/services/default-notification.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@Component({
  selector: 'io-preview-cv',
  templateUrl: './preview-cv.component.html',
  styleUrls: ['./preview-cv.component.scss']
})
export class PreviewCvComponent implements OnInit {

  public selectedId : number;
  public sdmName : String;
  public progress : boolean;
  public fileURL : String;
  constructor(public location : Location,private route : ActivatedRoute,private _factory: CoreFactory,private _notif : DefaultNotificationService) { 
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
      this.sdmName = param.name;
    });
  }

  ngOnInit() {
    this.progress = true;
    const cv = this._factory.api({
            api: 'sdm/ReportCvSdm/GenerateAsPDF',
            params: {
                sdmId : this.selectedId
            }
        });
    this._factory.http()
    .post(cv, null,
    { responseType: 'blob' })
    // .map((res) => res())
    .subscribe(
        (data)  => {
            this.fileURL = window.URL.createObjectURL(data);
            
            // window.open(this.fileURL, "_blank");
            this.progress = false;
        }
      );
  }
  public onDownloadPDF() {
    // this.router.navigate(['/pages/listSdm', { id }]);
    // this.nama = this.action.getFormControlValue('sdm_name');
    this.progress = true;
    const cv = this._factory.api({
            api: 'sdm/ReportCvSdm/GenerateAsPDF',
            params: {
                sdmId : this.selectedId
            }
        });
    this._factory.http()
    .post(cv, null,
    { responseType: 'blob' })
    // .map((res) => res())
    .subscribe(
        (data)  => {
            FileSaver.saveAs(data, 'CV ' + this.sdmName + '.pdf');
            
            this.progress = false;
        }
      );
  }
  public goBack(){
    this.location.back();
  }
}
