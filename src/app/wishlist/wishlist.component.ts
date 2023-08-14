import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponentComponent } from '../sharedComponent/card-component/card-component.component';
import { CoursesService } from '../courses.service';
import { CoursesData } from '../sharedComponent/card-component/card-component.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, CardComponentComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist: CoursesData[] | any = [];

  constructor(private courseServices: CoursesService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  async loadWishlist(): Promise<void> {
    const wishlistIds = this.courseServices.getWishlist();
    this.wishlist = await Promise.all(
      wishlistIds.map((courseId) => this.courseServices.getCourseById(courseId))
    );
  }
}
