import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'huishoudboekjeZoek'
})
export class HuishoudboekjeZoekPipe implements PipeTransform {

  transform(value: any[], query: string): any[] {
    if (!value || !query) return value;

    query = query.toLocaleLowerCase();

    return value.filter((item: any) => {
      let naam = item.naam.toLocaleLowerCase();
      return naam.includes(query);
    });
  }
}
