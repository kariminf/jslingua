/**
 * Information module
 * @module info
 */

/**
 * A class which affords some information about a language
 * @hideconstructor
 */
class Info {
  //ISO639-2/5 code: ara, eng, jpn, etc.
  static code = "";

  //arabic, english, japanese
  static name = "";

  static origName = "";

  //writing direction: ltr (left to right)
  static dir = "ltr"; //most are ltr

  //Words order (Subject, Object, Verb): svo, sov, vso, osv, ovs, vos
  static wordOrder = "svo";//most are svo

  //language family:
  static family = "";

  //language branch:
  static branch = "";

  /**
   * Get the name of the language
   *
   * @public
   * @static
   * @return {String}  the language name: arabic, english, japanese, etc.
   */
  static getName() {
    return this.name;
  }

  /**
   * Get the name of the language in its own writing system
   *
   * @public
   * @static
   * @return {String}  the language original name: عربية, english, 日本語, etc.
   */
  static getOrigName() {
    return this.origName;
  }

  /**
   * Get the code of the language
   *
   * @public
   * @static
   * @return {String}  The language ISO639-2 code: "ara", "jpn", "eng", etc.
   */
  static getCode() {
    return this.code;
  }

  /**
   * Get the family of the language
   *
   * @public
   * @static
   * @return {String}  The language family: Afro-asiatic, Japonic, etc.
   */
  static getFamily() {
    return this.family;
  }

  /**
   * Get the branch of the language, if any
   *
   * @public
   * @static
   * @return {String}  The language branch: semitic, etc.
   */
  static getBranch() {
    return this.branch;
  }

  /**
   * Get the direction of writing of the language: ltr or rtl
   *
   * @public
   * @static
   * @return {String}  The language direction: left to right (ltr) or right to left (rtl)
   */
  static getDir() {
    return this.dir;
  }

  /**
   * Get the words order:
   * <ul>
   * <li>s: Subject</li>
   * <li>v: Verb</li>
   * <li>o: Object</li>
   * </ul>
   * For example, English is "svo"
   *
   * @public
   * @static
   * @return {String}  The words order in the language
   */
  static getWordOrder() {
    return this.wordOrder;
  }

}

export default Info;
