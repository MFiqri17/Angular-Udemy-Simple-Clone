import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

export interface CoursesData {
  createdAt: string;
  name: string;
  image: string;
  description: string;
  author: string;
  excercise: string;
  article: string;
  downloadable: string;
  review: {
    user: string;
    rating: number;
  }[];
  hours: string;
  price: string;
  id: string;
}

@Component({
  selector: 'app-card-component',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './card-component.component.html',
})
export class CardComponentComponent implements OnInit {
  @Input() Courses!: CoursesData;

  totalRating: number = 0;
  roundedRating: number = 0;
  hasHalfStar: boolean = false;
  totalReviewer: number = 0;

  getRange(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }

  ngOnInit(): void {
    if (this.Courses.review.length > 0) {
      const total = this.Courses.review.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      this.totalRating = parseFloat(
        (total / this.Courses.review.length).toFixed(1)
      );
      this.roundedRating = Math.round(this.totalRating * 2) / 2;
      this.hasHalfStar = this.roundedRating % 1 >= 0.5;
      this.totalReviewer = this.Courses.review.length;
    }
  }
}
