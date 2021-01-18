import Info from "../info.js"

class JpnInfo extends Info {
  constructor(){
    super("jpn");
    this.name = "Japanese";
    this.origName = "日本語";
    //this.dir = "ltr";//already defined
    this.wordOrder = "sov";
    this.family = "Japonic";
  }
}

export default JpnInfo;
