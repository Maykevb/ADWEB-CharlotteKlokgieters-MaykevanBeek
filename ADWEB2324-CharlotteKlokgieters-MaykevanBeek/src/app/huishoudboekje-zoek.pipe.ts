import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'huishoudboekjeZoek'
})
export class HuishoudboekjeZoekPipe implements PipeTransform {

  transform(value: any, query: string): any {
    if (!value || !query) return value;

    query = query.toLocaleLowerCase();

    return value.filter((item: any) => {
      let name = item.name.toLocaleLowerCase();

      if (name.includes(query)) {
        return item;
      }
    })
  }
}
