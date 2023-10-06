import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  dataTable:any;
  public headers=[
    {name:'Taux réel',id:'exchangeRate'},
    {name:'Taux saisi',id:'customRate'},
    {name:'La valeur initiale',id:'firstValue'},
    {name:'La valeur calculée',id:'result'}

  ]
  getData(event:any){
      console.log("event",event);
      
    this.dataTable = event;

  }
}
