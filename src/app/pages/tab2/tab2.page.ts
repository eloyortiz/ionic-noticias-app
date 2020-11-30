import { Component, ViewChild, OnInit } from '@angular/core';
import { IonContent, IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  @ViewChild(IonContent, { static: true }) content: IonContent;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias:Article[] = [];


  constructor(private noticiasSrv: NoticiasService){}

  ngOnInit(){
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(event){
    
    this.content.scrollToTop()

    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria:string, event?){

    this.noticiasSrv.getTopHeadlinesCategoria(categoria)
    .subscribe( resp => {
      this.noticias.push(...resp.articles); 

      //FINALIZA EL INFINITE SCROLL
      if (event){
        event.target.complete();
      }
    });
  }

  loadData(event){
    this.cargarNoticias(this.segment.value, event);
  }

}
