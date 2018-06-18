import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, ToastController } from 'ionic-angular';

//Providers
import { PostControlProvider } from '../../providers/post-control/post-control';

//Data Model
import { PostModel } from './../../model/post/post.model';

@IonicPage()
@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {

  post: PostModel;

  constructor(public navParams: NavParams,
  private viewCtrl: ViewController, private toastCtrl: ToastController, private plcProv: PostControlProvider) {
    console.log("cargando Post");
    this.post = this.navParams.get('post');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPostPage');
  }

  updatePost(post: PostModel){
    this.plcProv.editPost(post).then(
      ( error ) => {
        console.error("Error al actualizar el registro", JSON.stringify(error));
        this.showMSG(JSON.stringify( error ), 2000);
      },
      () => {
      this.viewCtrl.dismiss();
    });
  }

  removePost(post: PostModel){
    this.plcProv.removePost(post).then(
      ( error ) => {
        console.error("Error al eliminar el registro", JSON.stringify(error));
        this.showMSG(JSON.stringify( error ), 2000);
      },
      () => {
      this.viewCtrl.dismiss();
    });
  }

  showMSG(msg:string, drt: number){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: drt,
      showCloseButton: false
    });

    toast.present();
  }

}
