import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

//Pages
import { AddPostPage, EditPostPage } from '../index.pages';

//Providers
import { PostControlProvider } from '../../providers/post-control/post-control';

//Data models
import { PostModel } from './../../model/post/post.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: Observable<PostModel[]>;

  constructor(public navCtrl: NavController, 
    private modalCtrl: ModalController,
    private plcProv: PostControlProvider
  ) {
    console.log("iniciando...");
    this.posts = this.plcProv.getPostList()
    .snapshotChanges()
    .map(
    changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });

  }

  createPost(){
    console.log("Creando post");
    let modal = this.modalCtrl.create( AddPostPage );
    modal.present();
  }

  editPost(post: PostModel){
    console.log("Editando post");
    let modal = this.modalCtrl.create( EditPostPage, {post} );
    modal.present();
  }
}
