import { layoutPaths } from './../../core.theme.constants';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ioProfilePicture' })
export class IOProfilePicturePipe implements PipeTransform {

  public transform(input: string, ext = 'png'): string {
    let filePath = '';

    if (input) {
      filePath = input;
    } else {
      filePath = layoutPaths.images.profile + 'default_user.' + ext;
    }

    return filePath;
  }
}
