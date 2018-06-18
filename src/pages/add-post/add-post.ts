import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

//plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

//Models and Providers
import { PostModel } from './../../model/post/post.model';
import { PostControlProvider } from './../../providers/post-control/post-control';
import { LoadFileProvider } from './../../providers/load-file/load-file';


@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {

  previewImg: string;
  post: PostModel  = {
    img: 'http://www.unan.edu.ni/wp-content/plugins/post-grid/assets/frontend/css/images/placeholder.png',
    title: '',
    description: ''
  };

  constructor(
    private viewCtrl: ViewController,
    private plcProv: PostControlProvider,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private loadFileProv: LoadFileProvider
  ) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage');
  }

  //Adding the new records and closing the Modal Page
  addPost(obj: PostModel) {
    console.log("Loading img...");
    //let file = {
    //  img: this.post.img,
    //  title: this.post.title, 
    //  description: this.post.description
    //};
    let promesa: any = this.loadFileProv.loadImg_to_firebase(this.previewImg);
    console.log(promesa);
    this.plcProv.addPost(obj).then(
      (error) => {
        console.log("Error agregando el registro");
      }, () => {
      //this.viewCtrl.dismiss();
    });
  }

  //Close Modal from 
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
     //this.imgPreview = 'data:image/jpeg;base64,' + imageData;
     this.post.img = imageData;

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
          this.previewImg = 'data:image/jpeg;base64,' + results[i];
          this.post.img = results[i];
      }
    }, (err) => {
      console.error("Error en selecctor: ", JSON.stringify(err));
    });
    
  }
}