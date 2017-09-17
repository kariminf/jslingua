# -*- coding: utf-8 -*-

from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

import sys, os
import nltk
from nltk.stem.isri import ISRIStemmer

case7p = [
"استبدلتموهم"
]

case7 = [
"فلنبلونهم"
]

if __name__ == "__main__":
    reload(sys)
    sys.setdefaultencoding('utf8')
    s = ISRIStemmer()
    nltk.data.path.append('/home/kariminf/Data/NLTK/')

    fout = open("isri_test.txt", "w")

    fout.write("it(\"Case of 7 chars\", function() {\n")
    for case in case7:
        print(case)
        fout.write("    expect(morpho.stem(\"" + case + "\")).to.eql(\"" + s.stem(case) + "\"));\n")
    fout.write("});\n")

    fout.write("it(\"Case of plus than 7 chars\", function() {\n")
    for case in case7p:
        print(case)
        fout.write("    expect(morpho.stem(\"" + case + "\")).to.eql(\"" + s.stem(case) + "\"));\n")
    fout.write("});\n")

    fout.close()
