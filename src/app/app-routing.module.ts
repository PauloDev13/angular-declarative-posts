import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories/categories.module').then((m) => m.CategoriesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
