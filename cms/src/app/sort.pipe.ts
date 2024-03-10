import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any): any {
    let sorted = value.sort(
      (a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
      console.log(sorted);
    return sorted;
  }

}