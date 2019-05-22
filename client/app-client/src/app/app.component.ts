import { Product } from './models/product.model';
import { ProductsService } from './products.service';
import { Component, OnInit } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  simpleReqProductsObs$: Observable<Product[]>;
  productsErrorHandling: Product[];
  productsLoading: Product[];
  isLoading = false;

  constructor(private productsService: ProductsService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  getSimpleHttpRequest() {
    this.simpleReqProductsObs$ =  this.productsService.getProducts();
  }

  getProductsWithErrorHandling() {
    this.productsService.getProductsError().subscribe((prods) => {
      this.productsErrorHandling = prods;
    }, (error) => {
      console.log(error);
      const config = new MatSnackBarConfig();
      config.duration = 2000;
      config.panelClass = ['snack_error'];
      if (error.status === 0 ) {
        this.snackBar.open('Could not connect to the server', '', config);
      } else {
        this.snackBar.open(error.error.msg, '', config);
      }
    });
  }

  getProductsWithErrorHandlingOK() {
    this.productsService.getProductsDelay().subscribe((prods) => {
      this.productsErrorHandling = prods;
      const config = new MatSnackBarConfig();
      config.duration = 2000;
      config.panelClass = ['snack_ok'];
      this.snackBar.open('Products Sucess', '', config);
    }, (error) => {
      console.log(error);
    });
  }

  getProductsLoading() {
    this.isLoading = true;
    this.productsService.getProductsDelay().subscribe((prods) => {
      this.productsLoading = prods;
      this.isLoading = false;
    }, (error) => {
      console.log(error);
      this.isLoading = false;
    });
  }
}
