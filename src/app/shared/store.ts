import { Signal, WritableSignal, computed, signal } from "@angular/core";

export class Store<T> {

  private state: WritableSignal<T>;

  constructor(initialState :  T) {
    this.state = signal(initialState);
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
  }
}
