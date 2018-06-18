import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';


import { MyApp } from '../app/app.component';
import { HomePage, AddPostPage, EditPostPage } from '../pages/index.pages';


//Pipes
import { PipesModule } from '../pipes/pipes.module';

//Firebase Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Firebase Config
import { fb_Config } from '../app/firebase.credenctial';
import { LoadFileProvider } from '../providers/load-file/load-file';
import { PostControlProvider } from '../providers/post-control/post-control';

@NgModule({
  declarations: [
    MyApp,
    HomePage, AddPostPage, EditPostPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fb_Config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, AddPostPage, EditPostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PostControlProvider,
    LoadFileProvider
  ]
})
export class AppModule {}
