import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TCategories } from '~/pages/categories/models/icategory';
import { CategoriesService } from '~/pages/categories/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: TCategories = [];
  categoriesSubscription: Subscription;

  constructor(private categoriesService: CategoriesService) {
    this.categoriesSubscription = categoriesService
      .getCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
}
