import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TPosts } from '~/pages/posts/models/ipost';
import { PostsService } from '~/pages/posts/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: TPosts = [];
  postsSubscription: Subscription;

  constructor(private postsService: PostsService) {
    this.postsSubscription = postsService
      .getPostsWithCategory()
      .subscribe((data: TPosts) => {
        this.posts = data;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
