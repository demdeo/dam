import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Riego } from '../model/Riego';

@Injectable({
  providedIn: 'root'
})
export class RiegoService {

  urlBackend="http://localhost:3000/api";

  constructor(private _http: HttpClient) { }
  
  postLog(riego: Riego){
    return this._http.post(this.urlBackend + "/logriego",{apertura:riego.apertura,fecha:riego.fecha,electrovalvulaId:riego.electrovalvulaId} ).toPromise().then(
      (result) => {console.log(result);}
    );
  }

}
