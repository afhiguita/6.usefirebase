import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { PostPage } from './../post/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: Observable<any[]>;

  constructor(public navCtrl: NavController, 
    private modalCtrl: ModalController,
    private afDB: AngularFireDatabase
  ) {
    console.log("iniciando...");
    this.posts = this.afDB.list('post').valueChanges();
  }

  createPost(){
    console.log("Cargando post");
    let modal = this.modalCtrl.create( PostPage );
    modal.present();
  }

}
