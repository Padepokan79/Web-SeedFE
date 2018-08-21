import { HttpParams, HttpClient } from '@angular/common/http';

export class MultiInsert {
    public clientId: number;
    public sdmId: string = '';
    public hirestatId: number = 3;

    public apiRoot: string = 'api/project/MengelolaHiring';

    constructor(private httpClient: HttpClient) {

    }

    public postSdmHiring() {
        const urlPost = '${this.apiRoot}/post';
        const httpOptions = {
            params : new HttpParams()
        };
        this.httpClient.post(urlPost, {
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
