import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from 'src/app/services/products/model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  limit = 10;
  _products:IProduct[] = [];
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private _productsService:ProductsService) { }

  ngOnInit(): void {
    this._getProductList();
  }

  _getProductList(){
    this._productsService
        .getProduct(this.limit)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(res => {
          console.log(res);
          this._products = res;
        })

  }

  ngOnDestroy(): any{
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
