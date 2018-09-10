import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of, throwError, pipe } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Register } from '../classes/register';
@Injectable({
  providedIn: 'root'
})
export class ApplyserviceService {
  private baseUrl = 'http://localhost:8080/api/ksrtc';

  constructor(private http: HttpClient) { }

  apply(apply: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/apply`, apply);
  }

  register(register:Object): Observable<Object>
  {
    return this.http.post(`${this.baseUrl}` + `/register`, register);
  }

  insertContact( contact:any)
  {
    return this.http.post(this.baseUrl + '/contact', contact)
      .pipe(
        map(res => res),
        catchError( this.errorHandler)
      );
  }
  errorHandler(error:Response)
  {
    console.log(error);
    return throwError(error);
  }

  getRegList() {
    return this.http.get<Register[]>(this.baseUrl + '/getReg');
  }

  getUserById(id: number) {
    return this.http.get<Register>(this.baseUrl + '/' + id);
  }

  updateUser(user: Register) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/delReg/' + id);
  }
  // getRegList()
  // {
  //   return this.http.get(this.baseUrl + '/getReg')
  //     .pipe(
  //       map(res => res),
  //         catchError(this.errorHandler)
  //     );
  // }

  // updateRegList(id:any, reg:any)
  // {
  //   return this.http.put(this.baseUrl + '/' + id,reg)
  //     .pipe(
  //       map(res => res),
  //         catchError(this.errorHandler)
  //     );
  // }
}
