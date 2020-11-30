import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
})


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  
  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http:HttpClient ) { }

  private ejecutarQuery<T>( query:string){
    query = apiUrl + query;

    return this.http.get<T>(query, { headers } );
  }



  getTopHeadlines(){
    this.headlinesPage++;
    // return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=d73d0521591841b2bc7d2452a47cdf05`);
    
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesCategoria( categoria:string){


    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    }
    else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    // return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d73d0521591841b2bc7d2452a47cdf05`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }



}
