import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigService {

  public data: any;

  constructor(private http: HttpClient) {
  }

  public load(): Promise<any> {
    let url = './config.json';

    let promise = this.http
                    .get<any>(url)
                    .toPromise();

    promise.then((config) => {
      let URL = config.URL;

      if (!URL) {
          console.log("Cannot found config with key 'URL'!");
      } else {
          if (!URL.BE_SERVER) {
              console.log("Cannot found config with key 'BE_SERVER' inside key 'URL'!");
          }
          if (!URL.RESOURCE_SERVER) {
              console.log("Cannot found config with key 'RESOURCE_SERVER' inside key 'URL'!");
          }
          if (URL.BE_SERVER && URL.RESOURCE_SERVER) {
            this.data = config;
          }
      }
    });

    return promise;
  }

  public staticResourceFullPath(filePath: string): string {
    return this.data.URL.RESOURCE_SERVER + filePath;
  }

  public url(serverPath: string): string {
    return this.data.URL[serverPath];
  }

  public configValue(key: string): string {
    return this.data[key];
  }
}
