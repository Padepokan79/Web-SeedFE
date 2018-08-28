import { Arrays } from '../utils/arrays';

export class ListOfValue {
    public key: any;
    public values: any;
    public value: any;

    constructor(key: any, values: any) {
        this.key = key;
        this.values = values;
        this.value = this.getSingleValue();
    }

    public getFormattedValue(format: string): string {
        if (this.values) {
            let valueFromListOfValue = [];
            let valueAttributeNames = [];
            let words = format.split(' ');

            words.forEach((word) => {
                if (word.charAt(0) === '$') {
                    valueAttributeNames.push(word);
                }
            });

            if (Arrays.isContainData(valueAttributeNames)) {
                valueAttributeNames.forEach((markedAttributeName) => {
                    const originalAttributeName = markedAttributeName.replace('$', '');

                    if (this.values.hasOwnProperty(originalAttributeName)) {
                        let attributeNameValue = this.values[originalAttributeName];
                        format = format.replace(markedAttributeName, attributeNameValue);
                    } else {
                        console.log('No attribute name : ' + originalAttributeName);
                    }
                });
            }

            return format;
        } else {
            console.log('No data retrieved from BE Server..');
            return '';
        }
    }

    private getSingleValue(): string {
        for (const key in this.values) {
            if (this.values.hasOwnProperty(key)) {
                return this.values[key];
            }
        }
    }
}
