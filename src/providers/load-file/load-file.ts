import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';


@Injectable()
export class LoadFileProvider {

  constructor( private ToastCtrl: ToastController ) {  }

  //Save data on Firebase Storage 
  loadImg_to_firebase( img: string ){
    let imgURL: string;

    let promesa = new Promise( (resolve, reject) => {
      this.showMSG("Cargando...", 3000);
      
      let storageRef = firebase.storage().ref();
      let FileName: string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask = 
          storageRef.child(`img/${ FileName }`)
                    .putString(img, 'base64', { contentType: 'image/jpeg'});

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{ }, // saber el % de cuantos Mbs se han subido
        ( error ) => {
          console.error("Error en la carga", JSON.stringify(error));
          this.showMSG(JSON.stringify( error ), 2000);
          reject();
        },
        () => {
          console.log("Todo bien");
          this.showMSG("Carga satisfactoria...", 2000);
          imgURL = uploadTask.snapshot.downloadURL;
          resolve();
        }
      )
    })

    return imgURL;
  }

  //Display message on screen
  showMSG(msg:string, d: number){
    let toast = this.ToastCtrl.create({
      message: msg,
      duration: d
    });

    toast.present();
  }

}