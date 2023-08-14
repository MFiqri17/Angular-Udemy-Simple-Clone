import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'course/:id', component: DetailComponent },
  { path: 'wishlist', component: WishlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DetailComponent],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export default routes;
