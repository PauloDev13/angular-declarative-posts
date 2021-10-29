import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { TPosts } from '~/pages/posts/models/ipost';

import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  URL = environment.FIREBASE_URL;

  constructor(private httpClient: HttpClient) {}

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
}
