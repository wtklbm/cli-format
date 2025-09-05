#!/usr/bin/env bash

# shellcheck disable=SC2155,SC2207

basedir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)/.."

export NODE_PATH="$(npm root -g)"

# 提取模块名并转换为 Bash 数组
PLUGINS=($(node < <(sed 's/\.map(v => require\.resolve(v))//g' "$basedir/.prettierrc.js" && echo "console.log(module.exports.plugins.join(' '))")))

echo "正在安装插件：${PLUGINS[*]} ..."

npm i -g prettier "${PLUGINS[@]}"
