import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from 'src/app/books/books.service';
import { BookCardComponent } from 'src/app/books/book-card/book-card.component';
import { Book } from 'src/app/books/books';
import { AppState, StoreService } from 'src/app/shared/store.service';
import { SearchInputComponent, SearchResultsData } from 'src/app/search-input/search-input.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookCardComponent, SearchInputComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  booksService: BooksService = inject(BooksService);
  storeService: StoreService = inject(StoreService);


  public readonly books: Signal<Book[]>
  protected readonly initialValue: Signal<string>;
  protected readonly booksLoaded: Signal<boolean>;
  protected readonly searchResultsData: Signal<SearchResultsData>

  constructor() {
    this.books = this.storeService.selectBooks;
    this.initialValue = this.storeService.selectSearchTerm;
    this.booksLoaded = this.storeService.selectBooksLoaded;
    this.searchResultsData = this.storeService.selectSearchData
  }

  onTermChanged(value: string): void {
    if (!this.booksLoaded() || this.initialValue() !== value) {
      this.booksService.getBooks(value).subscribe((books) => this.storeService.update({ books, searchTerm: value }));
    }

  }

  onAddToCart(book: Book): void {

    this.storeService.update((state: AppState) => {
      return {
        ...state,
        cart: [...state.cart, book]
      }
    })

  }

}
