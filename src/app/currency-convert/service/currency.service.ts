import { Injectable } from "@angular/core";
import { Currency_HISTORY } from "src/app/Currency.interface";


@Injectable({
    providedIn: 'root',
  })
export class CurrencyService {

     //Check the variation rate Exchange  
     CalculateVariation(customExchangeRate:number,rate_exChange:number) {
        return Math.abs(((customExchangeRate - rate_exChange) / rate_exChange) * 100);
      }
           //Genrate number 
      generateNumber(): any {
        return (Math.random() - 0.5) / 10;
      }
              //Convert Currency
      convert(firstValue:number,rate_exChange:number): number {
        return firstValue * rate_exChange;

      }
      fillArray(currentArray:Currency_HISTORY[],newObject: Currency_HISTORY) {
        if (currentArray.length < 5) {
          currentArray.push(newObject);
        } else {
          currentArray.shift();
          currentArray.push(newObject);
        }
        return currentArray
      }
}