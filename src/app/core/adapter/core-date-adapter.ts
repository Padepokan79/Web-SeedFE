import { NativeDateAdapter } from '@angular/material';

export class CoreDateAdapter extends NativeDateAdapter {
    // tslint:disable-next-line:ban-types
    public format(date: Date, displayFormat: Object): string {
        if (displayFormat == 'input') {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            let twoDigitsDay = day.toString().length < 2 ? '0' + day.toString() : day.toString();
            let twoDigitsMonth = month.toString().length < 2 ? '0' + month.toString() : month.toString();

            return `${year}-${twoDigitsMonth}-${twoDigitsDay}`; // this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
        } else {
            return date.toDateString();
        }
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }
}
