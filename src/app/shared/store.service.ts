import { Injectable, Signal } from '@angular/core';
import { Book } from '../books/books';
import { Store } from './store/store';
import { withStoreConfiguration } from './store/store.helpers';

export interface AppState {
  searchTerm  : string
  books: Book[],
  book: Book | null
}

export function createInitialState(): AppState {
  return {
    searchTerm : 'Angular',
    books: [],
    book: null
  }
}


@Injectable({
  providedIn: 'root'
})
export class StoreService extends Store<AppState> {

  public selectBooks: Signal<Book[]> = this.select('books');
  public selectSearchTerm: Signal<string> = this.select('searchTerm');

  constructor() {
    super(createInitialState(), withStoreConfiguration({name : 'App Store'}))
  }
}
