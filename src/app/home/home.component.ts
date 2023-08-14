import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonComponent } from '../sharedComponent/skeleton-component/skeleton-component.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {
  CardComponentComponent,
  CoursesData,
} from '../sharedComponent/card-component/card-component.component';
import { CoursesService } from '../courses.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    CardComponentComponent,
    SkeletonComponent,
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
  standalone: true,
})
export class HomeComponent implements OnInit {
  coursesData: CoursesData[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  sortOrder: 'asc' | 'desc' = 'asc';
  isLoading: boolean = false;

  constructor(private courseServices: CoursesService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.courseServices
      .getSortedCoursesByPrice(this.sortOrder)
      .then((sortedCourses) => {
        this.coursesData = sortedCourses;
        this.isLoading = false;
      })
      .catch((error) => {
        console.log('Error loading courses:', error);
        this.isLoading = false;
      });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadCourses();
  }

  nextPage() {
    this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.coursesData.length / this.itemsPerPage);
  }

  title = 'Home';
}
