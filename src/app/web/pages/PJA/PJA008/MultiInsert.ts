import { HttpParams } from '../../../../../../node_modules/@angular/common/http';
import { HttpClient } from '../../../../../../node_modules/@types/selenium-webdriver/http';

export class MultiInsert {
    public clientId: number;
    public sdmId: string = '';
    public hirestatId: number = 3;
    public http: any;

    public apiRoot: string = 'api/project/MengelolaSdmHiring/';

    constructor(private httpClient: HttpClient) {

    }

    public postSdmHiring() {
        const urlPost = '${this.apiRoot}/post';
        const httpOptions = {
            params : new HttpParams()
        };
        this.http.post(urlPost, {
            listData: [
                {
                    client_id: this.clientId,
                    sdm_id: this.sdmId,
                    hirestat_id: this.hirestatId
                },
            ]
        }, httpOptions)
        .subscribe((res) => console.log(res));
    }
}
