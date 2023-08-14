import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesData } from '../sharedComponent/card-component/card-component.component';
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonComponent } from '../sharedComponent/skeleton-component/skeleton-component.component';

const courseInitialValue: CoursesData = {
  createdAt: '',
  name: '',
  image: '',
  description: '',
  author: '',
  excercise: '',
  article: '',
  downloadable: '',
  review: [],
  hours: '',
  price: '',
  id: '',
};

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, SkeletonComponent],
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  courseId: string = '';
  course: CoursesData | undefined = courseInitialValue;
  totalRating: number = 0;
  roundedRating: number = 0;
  hasHalfStar: boolean = false;
  totalReviewer: number = 0;
  isAddedToWishlist: boolean = false;
  isLoading: boolean = false;

  getRange(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id') || '';
      if (this.courseId) {
        this.coursesService.getCourseById(this.courseId).then((course) => {
          if (course) {
            this.course = course;
            this.isLoading = false;
            if (this.course.review?.length > 0) {
              const total = this.course.review.reduce(
                (sum, review) => sum + review.rating,
                0
              );
              const reviewLength = this.course.review.length || 1;
              this.totalRating = parseFloat((total / reviewLength).toFixed(1));
              this.roundedRating = Math.round(this.totalRating * 2) / 2;
              this.hasHalfStar = this.roundedRating % 1 >= 0.5;
              this.totalReviewer = this.course.review.length;
            }
          }
        });
      }
    });
    this.checkIfAddedToWishlist();
  }

  isNewCourse(createdAt: string): boolean {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const daysSinceCreation = Math.floor(
      (currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24)
    );
    return daysSinceCreation <= 7;
  }

  isBestSeller(course: CoursesData): boolean {
    return course.review.length > 20 && this.totalRating > 4;
  }

  checkIfAddedToWishlist(): void {
    const wishlist = this.coursesService.getWishlist();
    if (this.course) {
      this.isAddedToWishlist = wishlist.includes(this.courseId.toString());
      console.log(wishlist);
    }
  }

  toggleWishlist(): void {
    if (this.isAddedToWishlist) {
      this.removeFromWishlist();
    } else {
      this.addToWishlist();
    }
  }

  addToWishlist(): void {
    if (this.course) {
      this.coursesService.addToWishlist(this.course?.id);
      this.checkIfAddedToWishlist();
    }
  }

  removeFromWishlist(): void {
    if (this.course) {
      this.coursesService.removeFromWishlist(this.course?.id);
      this.checkIfAddedToWishlist();
    }
  }
}
