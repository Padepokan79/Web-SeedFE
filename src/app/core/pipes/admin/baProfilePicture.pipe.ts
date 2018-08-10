import { layoutPaths } from './../../core.theme.constants';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'baProfilePicture'})
export class BaProfilePicturePipe implements PipeTransform {

  transform(input:string, ext = 'png'):string {
    const filePath = layoutPaths.images.profile + input;

    return filePath + '.' + ext;
  }
}
