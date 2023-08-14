import { Injectable } from '@angular/core';
import { CoursesData } from './sharedComponent/card-component/card-component.component';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private base_url = 'https://64d776192a017531bc134605.mockapi.io/api/v1/';
  private wishlistKey = 'wishlist';

  constructor() {}

  getSortedCoursesByPrice(order: 'asc' | 'desc'): Promise<CoursesData[]> {
    return this.getAllCourses().then((courses) => {
      return courses.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        if (order === 'asc') {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });
    });
  }

  async getAllCourses(): Promise<CoursesData[]> {
    const data = await fetch(`${this.base_url}/courses`);
    return (await data.json()) ?? [];
  }

  async getCourseById(id: string): Promise<CoursesData | undefined> {
    const data = await fetch(`${this.base_url}/courses/${id}`);
    return (await data.json()) ?? {};
  }

  addToWishlist(courseId: string): void {
    const wishlist = this.getWishlist();
    if (!wishlist.includes(courseId)) {
      wishlist.push(courseId);
      this.saveWishlist(wishlist);
    }
  }

  removeFromWishlist(courseId: string): void {
    const wishlist = this.getWishlist();
    const updatedWishlist = wishlist.filter((id) => id !== courseId);
    this.saveWishlist(updatedWishlist);
  }

  getWishlist(): string[] {
    const wishlistJson = localStorage.getItem(this.wishlistKey);
    return wishlistJson ? JSON.parse(wishlistJson) : [];
  }

  private saveWishlist(wishlist: string[]): void {
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
  }
}
