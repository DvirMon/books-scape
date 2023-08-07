import { Signal, WritableSignal, computed, signal } from "@angular/core";
import { connectDevTools, sendToDevTools } from "./devtools";



export class Store<T> {

  private state: WritableSignal<T>;
  private devTools: any;

  constructor(initialState: T) {
    this.state = signal(initialState);
    this.devTools = connectDevTools(initialState);

  }

  public select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.state()[key]);
  }

  public update(param: Partial<T> | ((state: T) => Partial<T>)): void {
    this.state.update((state) => {
      const newState = typeof param === 'function' ? param(state) : param;
      return { ...state, ...newState };
    });

    sendToDevTools(this.devTools, 'UPDATE_STATE', this.state());
  }
}
