import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from 'src/app/services/products/model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit,OnDestroy {

  _productID: number | 0;
  _productDetails!: IProduct | '';
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private _activatedRoute: ActivatedRoute,
    private _productsService:ProductsService) {
    this._productID = this._activatedRoute.snapshot.params['productID'];
   }

  ngOnInit(): void {
    this._getProductByID(this._productID);
  }

  _getProductByID(productID: number){
    this._productsService
      .getProductByID(productID)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        console.log(res);
        this._productDetails = res;
      })
  }

  ngOnDestroy(): any{
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
