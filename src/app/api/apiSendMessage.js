'use strict';

import freetonProvider from "@/app/api/freetonProvider";
import freeton from "freeton";
import abiOrder from "@/app/api/abi/order.json";
import abiKington from "@/app/api/abi/kington.json";

export default (amount, message) => {
  return new Promise((resolve, reject) => {
    const provider = freetonProvider();
    const signer = provider.getSigner();

    const options = {
      initAmount: (amount * 1e9).toString(),
      initParams: {}
    };

    const contractFactory = new freeton.ContractFactory(
      abiOrder.abi,
      abiOrder.imageBase64,
      signer,
      options
    );

    const constructorParams = {
      destinationAddress: abiKington.networks['2'].address,
      message: freeton.utils.stringToHex(message),
    };

    contractFactory.deploy(constructorParams).then(contract => {
      return contract.getDeployProcessing()
        .wait()
        .then(() => {
          console.log('deployed');
          resolve(contract.getDeployProcessing().txid);
        })
    }).catch(reject);
  });
};
