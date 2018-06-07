import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) { return []; }
        if (!searchText) { return items; }
        console.log("items ", items);
        console.log("searchText ", searchText);
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.owner_name.toLowerCase().includes(searchText);
        });
    }
}
