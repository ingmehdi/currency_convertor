import { Component, Input } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

@Component({
    selector: 'generic-table',
    standalone:true,
    imports:[BrowserModule],
    template: `
    <table class="table" >
    <thead>
      <tr>
      <th *ngFor="let field of fileds">{{ field.name }}</th>
      </tr>
    </thead>
    <tbody>
    <tr *ngFor="let d of data">
      <td *ngFor="let field of fileds">{{ d[field.id] }}</td>
    </tr>
  </tbody>
  </table>`,
  })
export class TableComponent  {
    @Input() fileds:any; 
    @Input() data: any; 
}