import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from 'src/app/books/books.service';
import { BookCardComponent } from 'src/app/books/book-card/book-card.component';
import { Observable } from 'rxjs';
import { Book } from 'src/app/books/books';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  booksService : BooksService = inject(BooksService);

  books$ : Observable<Book[]> = this.booksService.getBooks("harry potter")

}
