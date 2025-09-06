import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'priceWithTax' })
export class PriceWithTaxPipe implements PipeTransform {
  transform(price: number, taxRate: number = 0.1): string {
    return (price * (1 + taxRate)).toFixed(2);
  }
}