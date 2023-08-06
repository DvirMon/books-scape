import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from 'src/app/books/books.service';
import { BookCardComponent } from 'src/app/books/book-card/book-card.component';
import { Book } from 'src/app/books/books';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  booksService: BooksService = inject(BooksService);
  storeService: StoreService = inject(StoreService);

  public readonly books: Signal<Book[]>

  constructor() {
    this.books = this.storeService.selectBooks

    this.booksService.getBooks().subscribe((books) => this.storeService.update({ books }))
  }

  termChanged() {

  }

}
