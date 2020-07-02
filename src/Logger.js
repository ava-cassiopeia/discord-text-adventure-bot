/**
 * Simple wrapper around native console.log in order to make it test-able.
 */
class Logger {

  /**
   * @param {string} message
   */
  log(message) {
    console.log(message);
  }

}

module.exports = Logger;
