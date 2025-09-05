## 安装

```bash
npm i
npm unlink . && npm link .
```

## 执行

```bash
node ./bin/format.js ./test/plugins --autocorrect
```

## 测试正确性

```bash
node ./scripts/test-format.js
```
