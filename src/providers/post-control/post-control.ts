import { AngularFireDatabase } from 'angularfire2/database';
import { PostModel } from '../../model/post/post.model';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Service provider for using Firebase Database Connection.
*/
@Injectable()
export class PostControlProvider {

  private postListReference = this.fbDB.list<PostModel>('post');
  
  constructor(private fbDB: AngularFireDatabase) {
    console.log('Hello PostControlProvider Provider');
  }

  //get the Post list created and enabled
  getPostList(){
    return this.postListReference;
  }

  //Add new record to DB
  addPost(obj:PostModel){
    return this.postListReference.push(obj);
  }

  //Edit a record selected
  editPost(obj:PostModel){
    console.log(obj.key, obj);
    return this.postListReference.update(obj.key, obj);
  }

  //Remove a record selected
  removePost(obj:PostModel){
    return this.postListReference.remove(obj.key);
  }

}
