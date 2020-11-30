import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  noticias:Article[] = [];

  constructor(private noticiasSrv: NoticiasService) {

  }

  ngOnInit(){
    this.cargarNoticias();
  }

  loadData(event){
    this.cargarNoticias( event );
  }

  cargarNoticias( event? ){
    this.noticiasSrv.getTopHeadlines()
    .subscribe( resp => {

      //PARA DETENER EL INFINITE SCROLL
      if(event || resp.articles.length === 0){
        event.target.complete();
      }

      // this.noticias = resp.articles;
      this.noticias.push( ...resp.articles);

    });
  }

}
