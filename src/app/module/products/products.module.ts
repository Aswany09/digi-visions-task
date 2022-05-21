import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { LayoutModule } from 'src/app/layout/layout/layout.module';
import { ProductNewComponent } from './product-new/product-new.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { ProductViewComponent } from './product-view/product-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  //  Load List as default
  {path: '', pathMatch : 'full', redirectTo: 'List'},

  {
      path: 'List',
      component: ProductListComponent
  },
  {
    path: 'List/New',
    component: ProductNewComponent
  },
  {
    path: 'List/:productID',
    component: ProductViewComponent
  },
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductNewComponent,
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
