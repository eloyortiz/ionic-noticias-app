import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  
  @Input() noticia:Article;
  @Input() indice:number;
  @Input() enFavoritos;

  constructor( private iab: InAppBrowser,
              private actoinSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalSrv: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');

    
  }

  async lanzarMenu(){


    let guardarBorrarBtn;

    if(this.enFavoritos){
      //BORRAR
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito borrado');
          this.dataLocalSrv.borrarNoticia(this.noticia);
        }
      };
    }
    else{
      //GUARDAR
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito borrado');
          this.dataLocalSrv.guardarNoticia(this.noticia);
        }
      };
    }



    const actionSheet = await this.actoinSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share-social',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Compartir clicked');
          this.socialSharing.share(
              this.noticia.title,
              this.noticia.source.name,
              '',
              this.noticia.url
          );
        }
      },
       guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancelar clicked');
        }
      }]
    });
    await actionSheet.present();

  }

}
