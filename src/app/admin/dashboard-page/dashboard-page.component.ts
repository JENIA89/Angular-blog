import { PostsService } from './../../shared/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSub: Subscription
  dSub: Subscription
  searchStr = ''

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
   this.pSub = this.postsService.getAll().subscribe(posts=>{
      this.posts = posts
    })
  }

  remove(id: string){
    this.dSub = this.postsService.remove(id).subscribe(()=>{
      this.posts = this.posts.filter(post=> post.id !== id)
    })
  }

  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }

    if(this.dSub){
      this.pSub.unsubscribe()
    }
  }

}
