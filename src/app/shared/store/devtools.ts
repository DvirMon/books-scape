import { EnhancerOptions } from 'redux-devtools-extension';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: {
      connect(options?: EnhancerOptions): ReduxDevToolsExtensionConnection;
    };
  }
}

interface ReduxDevToolsExtensionConnection {
  init(state?: any): void;
  send(action: any, state?: any): void;
  subscribe(listener: (message: any) => void): void;
  unsubscribe(): void;
}

export class DevTools {
  protected readonly devTools: ReduxDevToolsExtensionConnection | null = null;
  private readonly options: any

  constructor(initialState: any, options: any) {

    this.options = options

    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      this.devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();
      this.devTools.send(`${this.options.name} - @init`, initialState); // sending a custom action
    }
  }

  protected sendToDevTools(value: string, state: any) {
    if (this.devTools) {
      const action = `${this.options.name} - ` + value
      this.devTools.send(action, state);
    }
  }
}
