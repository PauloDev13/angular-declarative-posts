import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs';

import { TCategory } from '~/pages/categories/models/icategory';
import { CategoriesService } from '~/pages/categories/services/categories.service';
import { TPosts } from '~/pages/posts/models/ipost';

import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  URL = environment.FIREBASE_URL;

  constructor(
    private httpClient: HttpClient,
    private categoriesService: CategoriesService,
  ) {}

  getAllPosts() {
    return this.httpClient
      .get<TPosts>(
        `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/posts.json`,
      )
      .pipe(
        map((dataPosts: TPosts) => {
          const posts: TPosts = [];
          for (const key in dataPosts) {
            posts.push({ ...dataPosts[key], id: key });
          }
          return posts;
        }),
      );
  }

  getPostsWithCategory() {
    return this.getAllPosts().pipe(
      mergeMap((posts) => {
        return this.categoriesService.getCategories().pipe(
          map((categories) => {
            return posts.map((post) => {
              return {
                ...post,
                categoryName: categories.find(
                  (category: TCategory) => category.id === post.categoryId,
                )?.title,
              };
            });
          }),
        );
      }),
    );
  }
}
