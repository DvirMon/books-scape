import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from 'src/app/books/books.service';
import { BookCardComponent } from 'src/app/books/book-card/book-card.component';
import { Book } from 'src/app/books/books';
import { StoreService } from 'src/app/shared/store.service';
import { SearchInputComponent } from 'src/app/search-input/search-input.component';

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

  constructor() {
    this.books = this.storeService.selectBooks

  }

  onTermChanged(event : string) {
    this.booksService.getBooks(event).subscribe((books) => this.storeService.update({ books }))
  }

}
