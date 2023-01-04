#!/usr/bin/env python
# -*- coding: utf-8 -*-

#  Copyright 2023 Abdelkrime Aries <kariminfo0@gmail.com>
#
#  ---- AUTHORS ----
# 2023	Abdelkrime Aries <kariminfo0@gmail.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import re

ud_conllu_pattern = "(\d+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)"

def parse_ud_conllu_file(url):
    sents = []
    words = []
    with open(url, "r", encoding="utf8") as f:
        for line in f:
            m = re.match(ud_conllu_pattern, line)
            if m:
                if m.group(1) == "1":
                    words = []
                    sents.append(words)
                words.append(m.group(2))

    return sents


s = parse_ud_conllu_file("/home/kariminf/Research/UD.en/en_partut-ud-dev.conllu")

print(s)