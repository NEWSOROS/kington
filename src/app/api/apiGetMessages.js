'use strict';

import freetonProvider from "@/app/api/freetonProvider";
import freeton from "freeton";
import abiKington from "@/app/api/abi/kington.json";
import {hexToNumber, hexToString} from "web3-utils";

export default () => {
  return new Promise((resolve, reject) => {
    const contract = new freeton.Contract(
      abiKington.networks['2'].address,
      abiKington.abi,
      freetonProvider()
    );

    contract.functions.getMessages().then(messages => {
      const result = [];
      for (let [id, msg] of Object.entries(messages.value0)) {
        try {
          result.push({
            id,
            balance: hexToNumber(msg.balance) / 1e9,
            message: hexToString('0x' + msg.message),
            count: hexToNumber(msg.count) || 1,
            lastPayAt: hexToNumber(msg.lastPayAt)
          })
        } catch (e) {
          console.error(e);
        }
      }

      resolve(result);
    }).catch(reject);
  });
};
