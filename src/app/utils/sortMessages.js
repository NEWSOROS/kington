'use strict';

import {SORT_BY_LAST_UP} from "@/app/utils/consts";

export default (messages, sortType) => {
  return sortType === SORT_BY_LAST_UP
    ? messages.sort((msg1, msg2) => msg2.lastPayAt - msg1.lastPayAt)
    : messages.sort((msg1, msg2) => msg2.balance - msg1.balance);
};
