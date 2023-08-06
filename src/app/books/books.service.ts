import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap, map } from 'rxjs';

export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  publishedDate: string;
  imageLinks: ImageLinks,
}

export interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly API_URL = 'https://www.googleapis.com/books/v1/volumes';
  private readonly BOOKS_API_KEY = 'AIzaSyAZSKuvnFiV9QTXM7NI6HgwpBp4m8rzSuM'

  constructor(
    private http: HttpClient
  ) { }

  // function to fetch books from Google Books API
  public fetchBooks(query?: string): Observable<Book[]> {
    return this.http.get<any>(`${this.API_URL}?q=intitle:${query}&key=${this.BOOKS_API_KEY}`).pipe(
      // RxJS operator to process the array of book items
      map(res => res.items.map((book: any) => this.transformBookData(book.volumeInfo)))
      // map(res => res.items[0])

    );
  }

  // RxJS operator function to transform book data
  private transformBookData(volumeInfo: any): Book {
    return {
      id: volumeInfo.id,
      title: volumeInfo.title,
      authors: volumeInfo.authors || [],
      description: volumeInfo.description,
      publishedDate: volumeInfo.publishedDate,
      imageLinks : volumeInfo.imageLinks,
      // categories : volumeInfo.categories
    };
  }
}
