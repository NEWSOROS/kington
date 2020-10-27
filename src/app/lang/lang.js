'use strict';

import moment from "moment";

export default {
  emptySubmitMessage: 'Message can\'t be empty.',
  longSubmitMessage: 'Too long message.',
  lastUp: 'Last up',

  formatMessageDate: timestamp => {
    if (timestamp > 0) {
      return moment.unix(timestamp).format('LLLL');
    }

    return 'the message has not been published yet';
  },

  extensionError(text) {
    return `Extension error: ${text}`
  },

  appError(text) {
    return `Application error: ${text}`
  },
}
