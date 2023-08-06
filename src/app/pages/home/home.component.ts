import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from 'src/app/books/books.component';
import { BooksService } from 'src/app/books/books.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BooksComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  booksService : BooksService = inject(BooksService);

  books$ = this.booksService.fetchBooks()

}
