import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Book } from './books';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly API_URL = 'https://www.googleapis.com/books/v1/volumes';
  private readonly MAX_RESULTS : number = 10
  private readonly BOOKS_API_KEY = 'AIzaSyAZSKuvnFiV9QTXM7NI6HgwpBp4m8rzSuM'

  constructor(
    private http: HttpClient
  ) { }

  // function to fetch books from Google Books API
  public getBooks(query?: string): Observable<Book[]> {
    return this.http.get<any>(`${this.API_URL}?q=intitle:${query}&langRestrict=en&maxResults=${this.MAX_RESULTS}&key=${this.BOOKS_API_KEY}`).pipe(
      map((res => res.items.filter((book: any) => book.volumeInfo.language === 'en'))),
        map(items =>
          items.map((book: any) => this.transformBookData(book.volumeInfo))
          .filter((book: Book) => book.imageLinks != null)),

          )


  }

  // RxJS operator function to transform book data
  private transformBookData(volumeInfo: any): Book {
    return {
      id: volumeInfo.id,
      title: volumeInfo.title,
      authors: volumeInfo.authors || [],
      description: volumeInfo.description,
      publishedDate: volumeInfo.publishedDate,
      imageLinks: volumeInfo.imageLinks,
      categories : volumeInfo.categories
    };
  }
}
