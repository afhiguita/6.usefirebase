import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPostPage } from '../add-post/add-post';

@NgModule({
  declarations: [
    AddPostPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPostPage),
  ],
})
export class AddPostPageModule {}
