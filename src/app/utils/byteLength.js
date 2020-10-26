'use strict';

export default message => {
  return new Blob([message]).size;
};
