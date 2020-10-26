'use strict';

import moment from "moment";

export default {
  emptySubmitMessage: "Message can't be empty.",
  longSubmitMessage: "Too long message.",
  formatMessageDate: timestamp => {
    if (timestamp > 0) {
      const date = moment.unix(timestamp).format('MMMM Do YYYY \\a\\t h:mm');

      return `last up on ${date}`;
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
