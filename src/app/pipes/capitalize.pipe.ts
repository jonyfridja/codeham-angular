import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value.length) {
      const str = value as string;
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
}
