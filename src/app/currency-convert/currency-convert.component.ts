import { Component, EventEmitter, OnInit, Output, inject } from "@angular/core";
import { Currency_HISTORY } from "../Currency.interface";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CurrencyService } from "./service/currency.service";
import { debounceTime, pipe } from "rxjs";

@Component({
    selector: 'currency-convert',
    imports:[FormsModule,BrowserModule],
    standalone:true,
    templateUrl: './currency-convert.component.html',
    styleUrls: ['./currency-convert.component.scss']
  })
  export class CurrencyConvert implements OnInit {
    @Output() dataHistoryEvent = new EventEmitter<Currency_HISTORY[]>();


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
    private currencyService = inject(CurrencyService);
    
    ngOnInit(): void {
        this.runexchanges();
    
      }
      onfirstValueChange(e: any) {
        if(e?.target?.value){
          pipe(debounceTime(3000))
          this.convertCurrency();
        }
      }
      runexchanges() {
        setInterval(() => {
          this.updateExchanges();
          if (this.firstValue) { this.convertCurrency() }
        }
          , 3000);
      }
      updateExchanges() {
        if (this.addition) {
          this.rate_exChange +=this.currencyService.generateNumber();
        } else {
          this.rate_exChange -= this.currencyService.generateNumber();
        }
        this.addition = !this.addition;
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
            this.result = this.currencyService.convert(this.firstValue , this.rate_exChange)
          } else (this.text1 === 'Euro')
          this.rate_exChange = this.rate_exChange / 1;
          this.firstValue = this.result;
          this.result = this.currencyService.convert(this.firstValue , this.rate_exChange)
        }
    
    
      }
      customRate(e: Event) {
        this.isCustomChange = !this.isCustomChange;
      }
      //To add custom rate Exchange  
      onCustomRate(e: Event) {
        var variation = this.currencyService.CalculateVariation(this.customExchangeRate,this.rate_exChange);
        if (variation <= 2) {
          this.result = this.customExchangeRate * this.firstValue;
        } else {
          this.convertCurrency();
        }
      }
      convertCurrency(): number {
        this.result = this.currencyService.convert(this.firstValue , this.rate_exChange);
        const object={
          exchangeRate: this.rate_exChange,
          customRate: this.customExchangeRate,
          firstValue: this.firstValue,
          result: this.result
        }
       const result= this.currencyService.fillArray(this.historyArray,object)
       console.log("result",result);
       
        this.sendData(result)
        return this.result
      }
      sendData(result:Currency_HISTORY[]) {
        this.dataHistoryEvent.emit(result);
      }
}