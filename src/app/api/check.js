'use strict';

import freetonProvider from "@/app/api/freetonProvider";

export default {
  async isInstalled() {
    return new Promise(resolve => resolve(!!window.freeton));
  },

  async getNetworkId() {
    return new Promise(resolve => {
      try {
        const provider = freetonProvider();
        provider.getNetwork().then(network => resolve(network.id));
      } catch (e) {
        resolve(-1);
      }
    })
  }
}
