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

export function connectDevTools(initialState: any): ReduxDevToolsExtensionConnection | null {
  let devTools: ReduxDevToolsExtensionConnection | null = null;

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();
    devTools.init(initialState);
  }

  return devTools;
}

export function sendToDevTools(devTools: ReduxDevToolsExtensionConnection | null, action: any, state: any) {
  if (devTools) {
    devTools.send(action, state);
  }
}
