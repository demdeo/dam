import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicion } from '../model/Medicion';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  urlBackend="http://localhost:3000/api";

  constructor(private _http: HttpClient) { }
  
   getUltimaMedicion(id:number):Promise<Medicion>{
      return this._http.get(this.urlBackend +"/medicion/" + id).toPromise().then((ultimaMedicion:Medicion)=>{
        return ultimaMedicion;
      });
   }
}
