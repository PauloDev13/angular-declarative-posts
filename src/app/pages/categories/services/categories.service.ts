import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { TCategories } from '~/pages/categories/models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient
      .get<TCategories>(
        `https://ng-fitness-tracker-b6920-default-rtdb.firebaseio.com/categories.json`,
      )
      .pipe(
        map((dataCategories: TCategories) => {
          const categories: TCategories = [];
          for (const key in dataCategories) {
            categories.push({ ...dataCategories[key], id: key });
          }
          return categories;
        }),
      );
  }
}
