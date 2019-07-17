const fs = require("fs");
const BASE_DIRECTORY = __dirname + "/../storage/";

/**
 * Manages data stored in a specific files (specified when constructing a 
 * StorageManager). Simple abstraction on top of literally just reading JSON
 * files. 
 * 
 * @class
 */
class StorageManager {

  /**
   * @param {string} filename filename wherein to store/read data
   */
  constructor(filename) {
    this.filename = filename + ".json";
    this.data = {};

    this.ensureStorage();

    try{
      let data = fs.readFileSync(BASE_DIRECTORY + this.filename);

      this.dataRecieved(data.toString());
    } catch(e) {
      // do nothing
    }
  }

  /**
   * Makes sure that the storage/ directory exists before writing to it.
   */
  ensureStorage() {
    if (!fs.existsSync(BASE_DIRECTORY)){
      fs.mkdirSync(BASE_DIRECTORY);
    }
  }

  /**
   * Called automatically when we successfully recieved data from the file 
   * system.
   * 
   * @param {string} rawData the raw data as a JSON string
   */
  dataRecieved(rawData) {
    this.data = JSON.parse(rawData);
  }

  /**
   * Writes out the data to the file in JSON format.
   */
  write() {
    const jsonData = JSON.stringify(this.data);

    fs.writeFileSync(BASE_DIRECTORY + this.filename, jsonData, {flag: "w"});
  }

  /**
   * Sets a specific key to a specific value (can be retrieved later with the 
   * get() method).
   * 
   * @param {string} key the key used to retrieve the value later
   * 
   * @param {mixed} value the value to store; can be anything that can be 
   * turned into JSON
   */
  set(key, value) {
    this.data[key] = value;

    // we want to write anytime a new value is set because we don't know 
    // when the app will shutdown (by default)
    this.write();
  }

  /**
   * Retrieves a specific value by its key, or `undefined` if there's nothing 
   * with that key.
   * 
   * @param {string} key the key for the value to retrieve
   */
  get(key) {
    return this.data[key];
  }

  /**
   * Destroys any value if it is paired with the given key. 
   * 
   * @param {string} key the key for the value to delete
   */
  destroy(key) {
    if(this.data[key]) {
      delete this.data[key];
    }
  }

}

module.exports = StorageManager;
