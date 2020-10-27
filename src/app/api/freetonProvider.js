'use strict';

import freeton from "freeton";

let instance;

export default () => {
  if (instance) {
    return instance;
  }

  if (!window.freeton) {
    throw new Error('Please install and activate extraTON chrome extension!');
  }

  return instance = new freeton.providers.ExtensionProvider(window.freeton);
};
