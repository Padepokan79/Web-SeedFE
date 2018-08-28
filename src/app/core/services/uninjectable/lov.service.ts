import { IServerResponse } from './../../interfaces/main/i-server-response';
import { ApiAdapterService } from './../adapter/api-adapter.service';
import { ILOVMaterials } from './../../interfaces/list-of-value/i-lov-materials';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, Subscriber, Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ConfigService } from '../config.service';
import { ListOfValue } from '../../models/list-of-value';
import { FormControl } from '@angular/forms';
import { Responses } from '../../utils/responses';
import { IPagingParams } from '../../interfaces/main/i-paging-params';

export class LOVService {

  public data: ListOfValue[];
  public autoComplete: FormControl;
  public filteredData: any;

  private serverDomain: string;

  constructor(
    private _httpRequest: HttpClient,
    private _apiAdapter: ApiAdapterService,
    private _config: ConfigService,
    private _lovMaterials: ILOVMaterials) {
      this.serverDomain = _config.data.URL.BE_SERVER;
      if (_lovMaterials.serverDomain) {
        this.serverDomain = _lovMaterials.serverDomain;
      }

      this.data = [];

      if (_lovMaterials.initializeData) {
        this.getAll()
            .subscribe((response: any) => {
              this.data = response.data;
              if (_lovMaterials.initializeAutoComplete) {
                let minValueLength = _lovMaterials.autoCompleteMinLength ?
                                      _lovMaterials.autoCompleteMinLength : 2;

                this.autoComplete = new FormControl();
                this.filteredData = this.autoComplete
                                        .valueChanges
                                        .startWith(null)
                                        .map((field) => {
                                          this.filterDataByValue(field, this.data, minValueLength);
                                        });
              }
        });
      }
  }

  public getAll(): Observable<any> {
    let lovAPI = this._apiAdapter.transform(
                    this._lovMaterials.api,
                    this._lovMaterials.params,
                    this._lovMaterials.pagingParams);

    return this._httpRequest
                .get(this.serverDomain + lovAPI)
                .map((response: any) => {
                  let result = [];
                  // let coreResponse = response;

                  response.data.forEach((data) => {
                    result.push(new ListOfValue(data.key, data.values));
                  });

                  response.data = result;
                  return response;
                });
  }

  public filterDataByValue(val: string, data: ListOfValue[] = null, minValueLength: number = 0) {
    let source: ListOfValue[] = [];

    if (data) {
      source = data;
    } else {
      source = this.data;
    }

    return val && val.length > minValueLength ?
      source.filter((s) => s.value.toLowerCase().indexOf(val.toLowerCase()) === 0) : [];
  }

  public filterDataByKey(key: any, data: ListOfValue[] = null) {
    let source: ListOfValue[] = [];

    if (data) {
      source = data;
    } else {
      source = this.data;
    }

    return key ?
      source.filter((s) => s.key.indexOf(key) === 0) : [];
  }
}
