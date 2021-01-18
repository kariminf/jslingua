class Info {
  constructor(langCode) {
    //ISO639-2/5 code: ara, eng, jpn, etc.
    this.code = langCode;

    //arabic, english, japanese
    this.name = "";

    this.origName = "";

    //writing direction: ltr (left to right)
    this.dir = "ltr"; //most are ltr

    //Words order (Subject, Object, Verb): svo, sov, vso, osv, ovs, vos
    this.wordOrder = "svo";//most are svo

    //language family:
    this.family = "";

    //language branch:
    this.branch = "";
  }

  /**
   * Get the name of the language
   *
   * @method getName
   * @public
   * @memberof Info
   * @return {String}  the language name: arabic, english, japanese, etc.
   */
  getName() {
    return this.name;
  }

  /**
   * Get the name of the language in its own writing system
   *
   * @method getOrigName
   * @public
   * @memberof Info
   * @return {String}  the language original name: عربية, english, 日本語, etc.
   */
  getOrigName() {
    return this.origName;
  }

  /**
   * Get the code of the language
   *
   * @method getCode
   * @public
   * @memberof Info
   * @return {String}  The language ISO639-2 code: "ara", "jpn", "eng", etc.
   */
  getCode() {
    return this.code;
  }

  /**
   * Get the family of the language
   *
   * @method getFamily
   * @public
   * @memberof Info
   * @return {String}  The language family: Afro-asiatic, Japonic, etc.
   */
  getFamily() {
    return this.family;
  }

  /**
   * Get the branch of the language, if any
   *
   * @method getBranch
   * @public
   * @memberof Info
   * @return {String}  The language branch: semitic, etc.
   */
  getBranch() {
    return this.branch;
  }

  /**
   * Get the direction of writing of the language: ltr or rtl
   *
   * @method getDir
   * @public
   * @memberof Info
   * @return {String}  The language direction: left to right (ltr) or right to left (rtl)
   */
  getDir() {
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
   * @method getWordOrder
   * @public
   * @memberof Info
   * @return {String}  The words order in the language
   */
  getWordOrder() {
    return this.wordOrder;
  }

}
