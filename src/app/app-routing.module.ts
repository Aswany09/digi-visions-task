import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './layout/layout/layout.module';

const routes: Routes = [
  // Redirect empty path to Product List'
  {path: '', pathMatch : 'full', redirectTo: 'Product'},
  // Product Module
  {
    path: 'Product',
    loadChildren: () =>
    import('./module/products/products.module').then(
        mod => mod.ProductsModule
    ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
