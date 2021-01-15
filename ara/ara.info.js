import Info from "../info.js"

class AraInfo extends Info {
  constructor(){
    super("ara");
    this.name = "Arabic";
    this.origName = "عربية";
    this.dir = "rtl";
    this.wordOrder = "vso";
    this.family = "Afro-Asiatic";
    this.branch = "Semitic";
  }
}
