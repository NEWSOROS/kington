'use strict';

import anchorme from "anchorme";
import xss from 'xss';

export default message => {
  return xss(
    anchorme({
      input: message,
      options: {
        attributes: {
          target: '_blank'
        },
      }
    })
  );
};
