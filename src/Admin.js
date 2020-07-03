/**
 * Manages the bot admin and keeps track of who that is.
 */
class Admin {

  /**
   * @param {import('discord.js').Client} client
   * @param {import('../utility/StorageManager')} storageManager
   * @param {import('./Logger')} logger
   */
  constructor(client, storageManager, logger) {
    this.client = client;
    this.storageManager = storageManager;
    this.logger = logger;
    /** @type {import('discord.js').User?} */
    this.adminUser = null;
    this.code = "";

    this.loadUserFromStorage();
  }

  async loadUserFromStorage() {
    const userID = this.storageManager.get("admin.userid");

    if (!userID) {
      this.logger.log("Did not find admin user in storage.");
      return;
    }

    let user = null;
    
    try {
      user = await this.client.users.fetch(userID);
    } catch (e) {
      this.logger.log("Failed to load user from storage:");
      this.logger.log(e);
      return;
    }

    this.adminUser = user;
  }

  /**
   * @return {boolean}
   */
  hasAdminUser() {
    return this.adminUser !== null;
  }

  /**
   * @param {import('discord.js').User} user
   * @return {boolean}
   */
  isAdminUser(user) {
    return user.id === this.adminUser.id;
  }

  /**
   * @param {import('discord.js').User} user
   */
  setAdminUser(user) {
    this.adminUser = user;
    this.storageManager.set("admin.userid", this.adminUser.id);
  }

  /**
   * The auth mechanism for this bot means that the user that wants to become
   * the admin must specify a special auth key. This method parses the message,
   * extracting the key, compares it to the correct key, and sets the admin user
   * if so.
   * Message format is expected to be: "$admin supersecretkey1234"
   * @throws {Error} Throws a Discord-message friendly error if the incorrect
   * key is specified, or the message format is incorrect.
   * @param {import('discord.js').Message} message
   */
  setAdminUserFromMessage(message) {
    if (this.hasAdminUser() && this.isAdminUser(message.author)) {
      throw new Error("You are already the admin!");
    }

    let code = "";

    try {
      code = message.cleanContent.split(" ")[1];
    } catch (e) {
      this.logger.log("Error parsing $admin message:");
      this.logger.log(e);
      throw new Error(
        "Could not parse your admin message. It should be in the format "
        + "`$admin supersecretkey1234`. The key may not contain spaces.");
    }

    if (code !== this.code) {
      throw new Error(
        "The code you entered does not match the correct admin code.");
    }

    this.setAdminUser(message.author);
  }

}

module.exports = Admin;
