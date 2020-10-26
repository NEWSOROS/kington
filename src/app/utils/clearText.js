'use strict';

export default text => {
  return text.replace(/[\r\n\s]+/g, ' ').trim();
}
