import { Product } from './models/product.model';
import { ProductsService } from './products.service';
import { Component, OnInit } from '@angular/core';
import { Observer, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  simpleReqProductsObs$: Observable<Product[]>;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
  }

  getSimpleHttpRequest() {
    this.simpleReqProductsObs$ =  this.productsService.getProducts();
  }
}
