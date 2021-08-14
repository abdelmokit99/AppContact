import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Contact } from '../Models/contact';
import {contacts} from "../mock-contact";

@Injectable({ providedIn: 'root' })

export class ContactService{


  private contactsUrl = 'api/contacts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }


  /** GET contact from fake server */

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
      .pipe(tap( _ => this.log('fetched contact'),
        catchError(this.handleError<Contact[]>('getContacts', []))
      ));
  }



  /** GET contact by id. Return `undefined` when id not found */

  getContactNo404<Data>(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/?id=${id}`;
    return this.http.get<Contact[]>(url)
      .pipe(
        map(contact => contacts[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} contact id=${id}`);
        }),
        catchError(this.handleError<Contact>(`getContact id=${id}`))
      );
  }




  /** GET contact by id. Will 404 if id not found */
  getContact(id: string): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap(_ => this.log(`fetched contact id=${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  //////// CRUD methods //////////

  /** POST: add a new contact to the server */
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, this.httpOptions).pipe(
      tap((newContact: Contact) => this.log(`added contact `)),
      catchError(this.handleError<Contact>('addContact'))
    );
  }

  /** DELETE: delete the contact from the server */

  deleteContact(id: string): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;

    return this.http.delete<Contact>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted contact `)),
      catchError(this.handleError<Contact>('deleteContact'))
    );
  }


  /** PUT: update the contact on the server */


  updateContact(contact: Contact): Observable<any> {
    return this.http.put(this.contactsUrl, contact, this.httpOptions).pipe(
      tap(_ => this.log(`updated contact `)),
      catchError(this.handleError<any>('updateContact'))
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


