import { environment } from './../../environments/environment';
import { fbCreateResponse, Post } from './interfaces';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({providedIn: "root"})

export class PostsService{

    constructor(private http : HttpClient){}

    create(post: Post): Observable<Post> {
       return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
       .pipe(
           map((response: fbCreateResponse)=> {
               return {
                   ...post,
                   id: response.name,
                   date: new Date(post.date)
               }
           }))
       
    }
}