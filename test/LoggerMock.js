/**
 * Fake implementation of the Logger which does nothing when it logs.
 */
class FakeLogger {

  /**
   * @param {string} message
   */
  log(message) {
    // intentionally do nothing
  }

}

module.exports = {FakeLogger};
