// import { IServerResponse } from './../interfaces/main/i-server-response';
import { HttpResponse } from '@angular/common/http';

export class Responses {
  public static transform(response: any): any {
    console.log('Response : ');
    console.log(response);
    let body = response.data;

    return {
      data: body.data,
      message: body.message,
      details: body.details,
      statusCode: response.status,
      actionType: body.actionType
    };
  }
}
