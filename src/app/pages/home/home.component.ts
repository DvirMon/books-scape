import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from 'src/app/books/books.service';
import { BookCardComponent } from 'src/app/books/book-card/book-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  booksService : BooksService = inject(BooksService);

  books$ = this.booksService.fetchBooks()

}
