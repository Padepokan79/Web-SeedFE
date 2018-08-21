import { HttpParams, HttpClient } from '@angular/common/http';

export class MultiInsertSdmAssign {
    public methodId: string = '';
    public sdmhiringId: string = '';
    public sdmassignStartdate: string = '';
    public sdmassignEnddate: string = '';
    public sdmassignLoc: string = '';
    public sdmassignPicclient: string = '';
    public sdmassignPicclientphone: string = '';
    public apiRoot: string = 'api/project/SdmAssignment';

    constructor(private http: HttpClient) {

    }

    public postSdmAssignment() {
        const urlPost = '${this.apiRoot}/post';
        const httpOptions = {
            params : new HttpParams()
        };
        this.http.post(urlPost, {
            listData: [{
                method_id: this.methodId,
                sdmhiring_id: this.sdmhiringId,
                sdmassign_startdate: this.sdmassignStartdate,
                sdmassign_enddate: this.sdmassignEnddate,
                sdmassign_loc: this.sdmassignLoc,
                sdmassign_picclient: this.sdmassignPicclient,
                sdmassign_picclientphone: this.sdmassignPicclientphone
            }]
        }, httpOptions)
        .subscribe((res) => console.log(res));
    }
}