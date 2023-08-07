import { Signal, WritableSignal, computed, effect, signal } from "@angular/core";
import { createInitialState } from "./store.helpers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

export class Store<T> {

  private state: WritableSignal<T>;
  private devTools: any;

  constructor(initialState: T) {
    this.state = signal(initialState);

    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      this.devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();

      this.devTools.init(initialState);
    }
  }


  public select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => {
      const state = this.state();
      return state[key];
    });
  }

  public update(param: Partial<T>): void;
  public update(param: (state: T) => Partial<T>): void;
  public update(param: Partial<T> | ((state: T) => Partial<T>)): void {
    if (typeof param === 'function') {
      this.state.update((state) => { return { ...state, ...param(state) } });
    } else {
      this.state.update((state) => { return { ...state, ...param } });
    }

    if (this.devTools) {
      this.devTools.send('UPDATE_STATE', this.state());
    }
  }
}
