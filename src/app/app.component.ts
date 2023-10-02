import { Component, OnInit } from '@angular/core';
import { Currency_HISTORY } from './Currency.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public rate_exChange: number = 1.1;
  public addition: boolean = false;
  public firstValue!: number;
  public result!: number;
  activation = false;
  isCustomChange: boolean = false;
  customExchangeRate: number = 0;
  public text1 = "Euro";
  public text2 = "Dollar";
  public historyArray: Currency_HISTORY[] = [];
  ngOnInit(): void {
    this.runexchanges();

  }
  onfirstValueChange(e: any) {
    this.convert();
  }
  runexchanges() {
    setInterval(() => {
      this.updateExchanges();
      if (this.firstValue) { this.convert() }
    }
      , 3000);
  }
  updateExchanges() {
    if (this.addition) {
      this.rate_exChange += this.generateNumber();
    } else {
      this.rate_exChange -= this.generateNumber();
    }
    this.addition = !this.addition;
  }

  generateNumber(): any {
    return (Math.random() - 0.5) / 10;
  }
  convert(): number {
    this.result = this.firstValue * this.rate_exChange;

    this.fillArray({
      exchangeRate: this.rate_exChange,
      customRate: this.customExchangeRate,
      firstValue: this.firstValue,
      result: this.result
    })
    return this.result
  }
  //Switch currency and text in input
  toggleInputs(e: Event) {
    const text1 = this.text1
    const text2 = this.text2
    if (this.firstValue) {
      this.text1 = text2;
      this.text2 = text1;
      if (this.text1 === 'Dollar') {
        this.rate_exChange = this.result / this.firstValue;
        this.firstValue = this.result;
        this.result = this.firstValue * this.rate_exChange
      } else (this.text1 === 'Euro')
      this.rate_exChange = this.rate_exChange / 1;
      this.firstValue = this.result;
      this.result = this.firstValue * this.rate_exChange
    }


  }
  customRate(e: Event) {
    this.isCustomChange = !this.isCustomChange;
  }
  //To add custom rate Exchange  
  onCustomRate(e: Event) {
    var variation = this.CalculateVariation();
    if (variation <= 2) {
      this.result = this.customExchangeRate * this.firstValue;
    } else {
      this.convert();
    }
  }
  //Check the variation rate Exchange  
  CalculateVariation() {
    return Math.abs(((this.customExchangeRate - this.rate_exChange) / this.rate_exChange) * 100);
  }
  //Fill a history array 
  fillArray(newObject: Currency_HISTORY) {
    if (this.historyArray.length < 5) {
      this.historyArray.push(newObject);
    } else {
      this.historyArray.shift();
      this.historyArray.push(newObject);
    }
  }
}
