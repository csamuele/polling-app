#!/bin/bash

bin/kc.sh import --file realm.json

exec "$@"