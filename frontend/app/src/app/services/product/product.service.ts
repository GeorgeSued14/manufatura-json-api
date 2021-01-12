import { Injectable } from '@angular/core';
import { PRODUCTS } from '../../mock-heroes';
import { Product } from '../../types/product';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'http://localhost:3030/products';

  constructor(
    private messageService: MessageService,
    private HttpClient: HttpClient
  ) {}

  private log(message: string) {
    this.messageService.add(`Products Service: ${message}`);
  }
  getProducts(): Observable<Product[]> {
    this.log('Fetched products');
    return this.HttpClient.get<Product[]>(this.productsUrl);
  }

  getProduct(id: number): Observable<Product> {
    this.messageService.add(`fetched products id=${id}`);
    return of(PRODUCTS.find((product) => product.id === id));
  }
}
