# !/usr/bin/python
#  -*- coding: UTF-8 -*-

import datetime
import json
import argparse
import sys
import os
import time
import urllib.parse
import urllib
import openpyxl
import json

today = time.strftime("%Y-%m-%d", time.localtime())

print(today)

new_list = []
with open("all.json", encoding='utf-8') as f:
    lines = f.readlines()
    alljson = ' '.join(lines).replace(' ', '').replace('\n', '')
    z = filter(lambda x: x, alljson.split("}"))
    for i in z:
        ii = i+'}'
        new_list.append(ii)
        y = json.loads(ii)
        print(y)
    # print(new_list)
