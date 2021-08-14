import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Adresse} from '../Models/adresse';
import {adresses} from "../mock-adresse";

@Injectable({ providedIn: 'root' })

export class AdresseService{


  private adressesUrl = 'api/adresses';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }


  /** GET adresse from fake server */

  getAdresses(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(this.adressesUrl).pipe(tap( _ => this.log('fetched adresse'),
        catchError(this.handleError<Adresse[]>('getAdresses', []))
      ));
  }



  /** GET adresse by id. Return `undefined` when id not found */

  getAdresseNo404<Data>(id: number): Observable<Adresse> {
    const url = `${this.adressesUrl}/?id=${id}`;
    return this.http.get<Adresse[]>(url)
      .pipe(
        map(adresse => adresses[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} adresse id=${id}`);
        }),
        catchError(this.handleError<Adresse>(`getAdresse id=${id}`))
      );
  }




  /** GET adresse by id. Will 404 if id not found */
  getAdresse(id: string): Observable<Adresse> {
    const url = `${this.adressesUrl}/${id}`;
    return this.http.get<Adresse>(url).pipe(
      tap(_ => this.log(`fetched adresse id=${id}`)),
      catchError(this.handleError<Adresse>(`getAdresse id=${id}`))
    );
  }

  //////// CRUD methods //////////

  /** POST: add a new adresse to the server */
  addAdresse(adresse: Adresse): Observable<Adresse> {
    return this.http.post<Adresse>(this.adressesUrl, adresse, this.httpOptions).pipe(
      tap((newAdresse: Adresse) => this.log(`added adresse `)),
      catchError(this.handleError<Adresse>('addAdresse'))
    );
  }

  /** DELETE: delete the adresse from the server */

  deleteAdresse(id: string): Observable<Adresse> {
    const url = `${this.adressesUrl}/${id}`;

    return this.http.delete<Adresse>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted adresse `)),
      catchError(this.handleError<Adresse>('deleteAdresse'))
    );
  }


  /** PUT: update the adresse on the server */


  updateAdresse(adresse: Adresse): Observable<any> {
    return this.http.put(this.adressesUrl, adresse, this.httpOptions).pipe(
      tap(_ => this.log(`updated adresse `)),
      catchError(this.handleError<any>('updateAdresse'))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(''+message);
  }
}


