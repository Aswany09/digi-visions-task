import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IProduct} from "./model"


@Injectable({
  providedIn: 'root'
})
export class ProductsService{
  private rootAPI = 'https://fakestoreapi.com/';
  private ProductAPI = 'products';
  private getCategoriesAPI = 'products/categories';



  constructor(private _http: HttpClient) { }
  getProduct(limit : number): Observable<IProduct[]>{
    return this._http.get<IProduct[]>(this.rootAPI + this.ProductAPI + '?limit=' + limit);
  }

  getProductByID(productID: number): Observable<IProduct>{
    return this._http.get<IProduct>(this.rootAPI + this.ProductAPI + '/' + productID);
  }

  getCategories(): Observable<String[]>{
    return this._http.get<String[]>(this.rootAPI + this.getCategoriesAPI);
  }

  addNewProduct(title: String,price: number,desc: String,img: String,category: String): Observable<any> {
    return this._http.post(this.rootAPI + this.ProductAPI ,{
      title: title,
      price: price,
      description: desc,
      image: img,
      category: category
    },{observe:'response'})
  }


}


