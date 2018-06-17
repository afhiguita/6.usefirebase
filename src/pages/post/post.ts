import { LoadFileProvider } from './../../providers/load-file/load-file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  titulo:string;
  imgPreview:any;
  img64:string;
  
  constructor(public viewCtrl: ViewController, 
    private camera: Camera,
    private imagePicker: ImagePicker,
    public loadFileProv: LoadFileProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  showCam(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     //let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.imgPreview = 'data:image/jpeg;base64,' + imageData;
     this.img64 = imageData;

    }, (err) => {
     // Handle error
     console.log( "Error Camara: " , JSON.stringify(err) );
    });
    
  }

  selectPhoto(){
    let options: ImagePickerOptions = {
      quality: 50,
      maximumImagesCount: 1,
      outputType:1
    }
    this.imagePicker.getPictures( options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          //console.log('Image URI: ' + results[i]);
          this.imgPreview = 'data:image/jpeg;base64,' + results[i];
          this.img64 = results[i];
      }
    }, (err) => {
      console.error("Error en selecctor: ", JSON.stringify(err));
    });
    
  }

  createPost(){
    let file = {
      img: this.img64,
      title: this.titulo, 
      description: ''
    };
    this.loadFileProv.loadImg_to_firebase(file);
  }

}
