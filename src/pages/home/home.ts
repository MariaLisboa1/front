import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NavController, IonicModule, IonicPage, NavParams, ModalController, LoadingController, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FilmesDetalhesPage } from '../filmes-detalhes/filmes-detalhes';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lista_filmes_popular = new Array<any>();
  public lista_mais_v = new Array<any>();

  public loader
  public refresher
  public isRefreshing: boolean = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private movie: ApiProvider,
    public loadingCtrl: LoadingController) {

  }

AbreLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  FechaLoading() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher
    this.isRefreshing = true
    this.carregarFilmes()
  }

  ionViewDidEnter() {
    this.carregarFilmes()
    this.MovieTerror()
  }


  carregarFilmes(){
    this.AbreLoading()
    this.movie.moviePopular().subscribe(
      data => {
        const response = (data as any)

        this.lista_filmes_popular = response.results

        console.log(this.lista_filmes_popular[0].genres);

        this.FechaLoading()
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false
        }
      }, error => {
        console.log(error);
        this.FechaLoading()
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false
        }
      }
    )
  }

  abrirDetalhes(filmes){
    // console.log(filmes);    
    this.navCtrl.push(FilmesDetalhesPage, {id:filmes.id})
  }

  MovieTerror(){
    this.movie.movieTop_rated().subscribe(
      data=>{
        const res = (data as any)
        this.lista_mais_v = res.results
        console.log(this.lista_mais_v);
        
        
      },error=>{
        console.log(error);
        
      }
    )
  }
}
