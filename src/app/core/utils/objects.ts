
import { DATE } from '../constant/constant';

export class Objects {

  public static setDefaultValue(result: any, field: string) {
    // console.log('Type of ' + field + ' :' + typeof result[field]);
    if (typeof result[field] === 'boolean') {
      result[field] = 0;
    }
    // } else if (data[attributeName] instanceof Number) {
    //   data[attributeName] = 0;
    // } else if (typeof data[attributeName] === 'string') {
    //   data[attributeName] = '';
    // }
  }

  public static setDefaultValues(result: any) {
    Object.keys(result)
          .forEach((key, index) => {
            if (result.hasOwnProperty(key)) {
              Objects.setDefaultValue(result, key);
            }
          });
  }

  public static mappingValue( source: any,
                              result: any,
                              field: string,
                              ignoreEmpty: boolean = false): any {
    if (source instanceof Array) {
      if (Array.isArray(source) && source.length !== 0) {
        result[field] = source.map(
                                  (value: Object) => Objects.mappingValues(value, value)
                                  // Object.assign({}, value)
                                );
      }
    // } else if (source instanceof Date) {
    //   // console.log('Date, Source Key : ' + field + ', Value :' + source);
    //   result[field] = source.valueOf();
    } else if (typeof source === 'boolean') {
      // console.log('Boolean, Source Key : ' + field + ', Value :' + source);
      result[field] = source ? 1 : 0;
    // } else if (Objects.isNumeric(source)) {
    //   // console.log('Number, Source Key : ' + field + ', Value :' + source);
    //   result[field] = +source.valueOf();
    // } else if (source !== '') {
    //   // console.log('Other, Source Key : ' + field + ', Value :' + source);
    //   result[field] = source;
    } else { // if (ignoreEmpty) {
      result[field] = source;
    }

    return result;
  }

  public static mappingValues(source: any,
                              result: any,
                              ignoreEmpty: boolean = false): any {
    // console.log('Source : ' + JSON.stringify(source));
    // console.log('Before Mapping : ' + JSON.stringify(result));
    Object.keys(result)
          .forEach((key, index) => {
            if (source.hasOwnProperty(key)) {
              const sourceValue = source[key];
              Objects.mappingValue(sourceValue, result, key, ignoreEmpty);
            }
          });
    // console.log('After Mapping : ' + JSON.stringify(data));

    return result;
  }

  public static transformValues(source: any, ignoreEmpty: boolean = false): any {
    return Objects.mappingValues(source, source, ignoreEmpty);
  }

  public static isNumeric(n: any): n is number | string {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  public static intVal(n: number | string): number {
    return typeof n === 'number' ? n : parseInt(n, 10);
  }

  public static convertToDateString(date: Date, format: string) {
    let result = '';

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let seconds = date.getSeconds();

    switch (format) {
      case DATE.DEFAULT_FORMAT:
        result = DATE.DEFAULT_FORMAT
                    .replace('dd', day.toString())
                    .replace('MM', monthIndex.toString())
                    .replace('yyyy', year.toString());
        break;
      default :
        break;
    }

    return result;
  }
}
