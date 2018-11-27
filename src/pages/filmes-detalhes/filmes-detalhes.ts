import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the FilmesDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filmes-detalhes',
  templateUrl: 'filmes-detalhes.html',
})
export class FilmesDetalhesPage {

  public filmes
  public filmesId

  public loader
  public refresher
  public isRefreshing: boolean = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movie: ApiProvider,
    public loadingCtrl: LoadingController
    ) {
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


  ionViewDidLoad() {
    this.carregaDetalhes()
  }

  carregaDetalhes(){
    this.AbreLoading()
    this.filmesId = this.navParams.get("id")
    console.log(this.filmesId);
    this.movie.movieDetail(this.filmesId).subscribe(
      data=>{
        let retorno = (data as any)
        console.log(retorno);
        this.filmes = retorno
        console.log(this.filmes.genres);
        this.FechaLoading()
      },error=>{
        this.FechaLoading()
        console.log(error);        
      }
    )
  }
}
