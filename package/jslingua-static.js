import JsLingua from "../src/jslingua.mjs";
import "../src/info.mjs";
import "../src/lang.mjs";
import "../src/trans.mjs";
import "../src/morpho.mjs";
import AraInfo from "../src/ara/ara.info.mjs";
import AraLang from "../src/ara/ara.lang.mjs";
import AraTrans from "../src/ara/ara.trans.mjs";
import AraMorpho from "../src/ara/ara.morpho.mjs";
import EngInfo from "../src/eng/eng.info.mjs";
import EngLang from "../src/eng/eng.lang.mjs";
import EngTrans from "../src/eng/eng.trans.mjs";
import EngMorpho from "../src/eng/eng.morpho.mjs";
import FraInfo from "../src/fra/fra.info.mjs";
import FraLang from "../src/fra/fra.lang.mjs";
import FraTrans from "../src/fra/fra.trans.mjs";
import FraMorpho from "../src/fra/fra.morpho.mjs";
import JpnInfo from "../src/jpn/jpn.info.mjs";
import JpnLang from "../src/jpn/jpn.lang.mjs";
import JpnTrans from "../src/jpn/jpn.trans.mjs";
import JpnMorpho from "../src/jpn/jpn.morpho.mjs";

JsLingua.services = {
  "info": {
    "ara": AraInfo,
    "eng": EngInfo,
    "fra": FraInfo,
    "jpn": JpnInfo,
  },
  "lang": {
    "ara": AraLang,
    "eng": EngLang,
    "fra": FraLang,
    "jpn": JpnLang,
  },
  "trans": {
    "ara": AraTrans,
    "eng": EngTrans,
    "fra": FraTrans,
    "jpn": JpnTrans,
  },
  "morpho": {
    "ara": AraMorpho,
    "eng": EngMorpho,
    "fra": FraMorpho,
    "jpn": JpnMorpho,
  }
};

export default JsLingua;
