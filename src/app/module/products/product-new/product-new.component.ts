import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit,OnDestroy {

  _categories:String[] | undefined;
  _addNewProductForm: FormGroup;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private _productsService: ProductsService,private _fb: FormBuilder,
    private _snackBar: MatSnackBar) {
    this._addNewProductForm = this._fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
  });
   }

  ngOnInit(): void {
    this._getCategories();
  }

  _getCategories(){
    this._productsService
      .getCategories()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        console.log(res);
        this._categories = res;
      })
  }

  onAddNewProduct(){
    console.log(this._addNewProductForm.value);
    this._productsService
        .addNewProduct(
          this._addNewProductForm.value.title,
          this._addNewProductForm.value.price,
          this._addNewProductForm.value.description,
          this._addNewProductForm.value.image,
          this._addNewProductForm.value.category
        )
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(res => {
          console.log(res);
          if (res.status === 200) {
            this._snackBar.open('Product Added Successfully','Close')
          }
        })

  }

  ngOnDestroy(): any{
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
