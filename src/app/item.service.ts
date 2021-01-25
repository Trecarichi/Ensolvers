import { Injectable } from '@angular/core';
import { Item } from './item/item';
import { ITEMS } from './mock-items';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'api/items';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

/*   getItems(): Observable<Item[]> {
    return of(ITEMS);
  } */

  /** GET heroes from the server */
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl)
    .pipe(
      catchError(this.handleError<Item[]>('getItems', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url).pipe(
      catchError(this.handleError<Item>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateItem(item: Item): Observable<any> {
    return this.http.put(this.itemsUrl, item, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions).pipe(
      catchError(this.handleError<Item>('addItem'))
    );
  }

  /** DELETE: delete the hero from the server */
deleteItem(item: Item | number): Observable<Item> {
  const id = typeof item === 'number' ? item : item.id;
  const url = `${this.itemsUrl}/${id}`;

  return this.http.delete<Item>(url, this.httpOptions).pipe(
       catchError(this.handleError<Item>('deleteitem'))
  );
}

/* 
  getItem(id: number): Observable<Item> {
    return of(ITEMS.find(item => item.id === id)!);
  } */
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

