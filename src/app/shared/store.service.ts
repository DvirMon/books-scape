import { Injectable, Signal } from '@angular/core';
import { Book } from '../books/books';
import { Store } from './store';
import { createInitialState } from './store.helpers';

export interface AppState {
  books: Book[],
  book: Book | null
}

@Injectable({
  providedIn: 'root'
})
export class StoreService extends Store<AppState> {


  public selectBooks: Signal<Book[]> = this.select('books');

  constructor() {
    super(createInitialState())
  }
}
