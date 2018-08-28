import { IUpdate } from './../../interfaces/param/i-update';
import { ICreate } from './../../interfaces/param/i-create';
import { IReadByModelId } from './../../interfaces/param/i-read-by-id';
import { ApiAdapterService } from './../adapter/api-adapter.service';
import { IReadAll } from './../../interfaces/param/i-read-all';
import { ICRUDMaterials } from './../../interfaces/crud/i-crud-materials';
import { IPagingParams } from './../../interfaces/main/i-paging-params';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, Subscriber, Subscription } from 'rxjs/Rx';
import { ConfigService } from '../config.service';
import { Responses } from '../../utils/responses';
import { IServerResponse } from '../../interfaces/main/i-server-response';
import { ICustomUrl } from '../../interfaces/main/i-custom-url';
import { IUrl } from '../../interfaces/main/i-url';
import { IDelete } from '../../interfaces/param/i-delete';
import { IDeleteCreate } from '../../interfaces/param/i-delete-create';

export class CRUDService {

  private defaultURLs: Map<string, string>;
  private defaultURLActions: string[];

  constructor(
    private _httpRequest: HttpClient,
    private _apiAdapter: ApiAdapterService,
    private _config: ConfigService,
    private _crudMaterials: ICRUDMaterials) {
      this.defaultURLs = new Map<string, string>();
      this.defaultURLActions = [
        'create',
        'readAll',
        'readById',
        'update',
        'delete',
        'deleteCreate'
      ];

      this.initDefaultURLs(_crudMaterials);
  }

  public getAll(params?: IReadAll): Observable<any> {
    let readAllURL = this.defaultURLs.get('readAll');

    if (params) {
      readAllURL = this._apiAdapter.transform(readAllURL, params.params, params.pagingParams);
    }

    return this._httpRequest
                .get(readAllURL);
                // .map((response: any) => Responses.transform(response));
  }

  // public getTotalItems(paramss?: ReadAllParam) {
  //   let getTotalItemsAPI = this.serverURL + this.api + '/totalItems';
  //   if (paramss) {
  //     let coreParam = new CoreParam(paramss.filter, params.orderby, params.skip, params.top);
  //     getTotalItemsAPI = coreparams.buildAPI(getTotalItemsAPI, true);
  //   }

  //   return this._httpRequest
  //               .get(getTotalItemsAPI)
  //               .map((response: any) => this.transform(response));
  // }

  public getByItem(params: IReadByModelId): Observable<any> {
    let getByIdAPI = this.defaultURLs.get('readById');
    getByIdAPI = this.attachModelIDAsParam(getByIdAPI, params.item);

    return this._httpRequest
                .get(getByIdAPI);
                // .map((response: any) => Responses.transform(response));
  }

  public create(params: ICreate): Observable<any> {
    let createAPI = this.defaultURLs.get('create');

    if (params.params) {
      createAPI = this._apiAdapter.transform(createAPI, params.params);
    }

    return this._httpRequest
                .post(createAPI, params.item);
                // .map((response: any) => Responses.transform(response));
  }

  public update(params: IUpdate): Observable<any> {
    let updateURL = this.defaultURLs.get('update');
    updateURL = this.attachModelIDAsParam(updateURL, params.item);

    if (params.params) {
      updateURL = this._apiAdapter.transform(updateURL, params.params);
    }

    return this._httpRequest
                .put(updateURL, params.item);
                // .map((response: any) => Responses.transform(response));
  }

  public deleteCreate(params: IDeleteCreate) {
    let deleteCreateURL = this.defaultURLs.get('deleteCreate');
    deleteCreateURL = this.attachModelIDAsParam(deleteCreateURL, params.item);

    if (params.params) {
      deleteCreateURL = this._apiAdapter.transform(deleteCreateURL, params.params);
    }

    return this._httpRequest
                .put(deleteCreateURL, params.item);
                // .map((response: any) => Responses.transform(response));
  }

  public delete(params: IDelete): Observable<any> {
    let deleteURL = this.defaultURLs.get('delete');
    deleteURL = this.attachModelIDAsParam(deleteURL, params.item);

    if (params.params) {
      deleteURL = this._apiAdapter.transform(deleteURL, params.params);
    }

    return this._httpRequest
                .delete(deleteURL);
                // .map((response: any) => Responses.transform(response));
  }

  private attachModelIDAsParam(api: string, item: any) {
    console.log(item.Model_ID);
    if (item && item.Model_ID && item.Model_ID != undefined) {
      api += '?' + item.Model_ID;
    }

    return api;
  }

  private initDefaultURLs(materials: ICRUDMaterials) {
    this.defaultURLActions.forEach((action) => {
      if (materials.customUrl && materials.customUrl[action]) {
        this.defaultURLs.set(action, this.initURL(materials.customUrl[action] as IUrl));
      } else {
        this.defaultURLs.set(action, this.initURL(materials, '/' + action));
      }
    });
  }

  private initURL(url: IUrl, defaultAction?: string): string {
    let result = '';

    let serverDomain = this._config.data.URL.BE_SERVER;
    if (url.serverDomain) {
      serverDomain = url.serverDomain;
    }

    result = serverDomain + url.api;

    if (defaultAction) {
      result += defaultAction;
    }

    return result;
  }
}
