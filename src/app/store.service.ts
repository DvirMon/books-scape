import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { Book } from './books/books';

export interface AppState {
  books: Book[],
  book: Book | null
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private state: WritableSignal<AppState> = signal({ books: [], book: null })

  public selectBooks : Signal<Book[]> = this.select('books');

  constructor() { }


  public select<K extends keyof AppState>(key: K): Signal<AppState[K]> {
    return computed(() => {
      const state = this.state();
      return state[key];
    });
}
  public update(param: Partial<AppState>): void;
  public update(param: (state: AppState) => Partial<AppState>): void;
  public update(param: Partial<AppState> | ((state: AppState) => Partial<AppState>)): void {
    if (typeof param === 'function') {
      this.state.update((state) => { return { ...state, ...param(state) } });
    } else {
      this.state.update((state) => { return { ...state, ...param } });
    }
  }
}
