import { HttpParams, HttpClient } from '@angular/common/http';

export class MultiInsertSdmSkill {

    public skillId: string = '';
    public sdmId: string = '';
    public skilltypeId: string = '';
    public sdmskillValue: number;

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:member-ordering
    public apiRoot: string = 'http://10.10.10.20:7979/allocation/MultiInsertSdm';
    public postSdmSkill() {
        console.log('POST');
        const url = `${this.apiRoot}/MultiCreate`;
        const httpOptions = {
            params : new HttpParams()
        };
        this.http.post(url, {
            listdata: [
                {
                    skillId: this.skillId,
                    sdmId: this.sdmId,
                    skilltypeId: this.skilltypeId,
                    sdmskillvalueId: this.sdmskillValue
                }
            ]
        }, httpOptions)
        .subscribe((res) => console.log(res));
    }
}
