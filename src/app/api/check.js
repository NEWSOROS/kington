'use strict';

import freetonProvider from "@/app/api/freetonProvider";
import semver from 'semver';

export default {
  async isInstalled() {
    return new Promise(resolve => {
      if (!window.freeton) {
        resolve(false);
      }

      const provider = freetonProvider();

      provider.getVersion().then(data => {
        const currentVersion = data.version || '0.0.0';
        resolve(semver.satisfies(currentVersion, '>=0.2.1'));
      }).catch(() => {
        resolve(false);
      });
    });
  },

  async getNetworkId() {
    return new Promise(resolve => {
      const provider = freetonProvider();

      provider.getNetwork()
        .then(network => resolve(network.id))
        .catch(() => resolve(-1))
    })
  }
}
