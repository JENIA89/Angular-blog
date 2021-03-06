import { Observable } from 'rxjs';
import { PostsService } from 'src/app/shared/posts.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from '../shared/interfaces';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>
  
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
    ) { }

  ngOnInit(): void {
    this.post$ = this.route.params
    .pipe(switchMap((params: Params)=>{
      return this.postService.getById(params['id'])
    }))
  }

}
