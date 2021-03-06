import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  post: Post
  submitted = false
  uSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params)=>{
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post)=>{
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  submit(){
    if(this.form.invalid) return

    this.submitted = true

    this.uSub = this.postService.update({
      ...this.post,
      id: this.post.id,
      title: this.form.value.title,
      text: this.form.value.text,
    }).subscribe(()=>{
      this.submitted = false
    })
  }

  ngOnDestroy(){
    if(this.uSub){
      return this.uSub.unsubscribe()
    }
  }

}
