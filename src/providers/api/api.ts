import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiProvider {

  apiKey: String = 'a62280dae111df8b673a34286dc3f8b1'
  UrlApi: string = 'https://api.themoviedb.org/3';

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  moviePopular(){
    // return this.http.get(this.url + "/movie/popular?api_key=" + this.apiKey)
    return this.http.get(`${this.UrlApi}/movie/popular?api_key=${this.apiKey}`)
  }

  movieDetail(filmesid){
    return this.http.get(`${this.UrlApi}/movie/${filmesid}?api_key=${this.apiKey}`)
  }

  movieTop_rated(){
    return this.http.get(`${this.UrlApi}/movie/top_rated?api_key=${this.apiKey}`)
  }

}
