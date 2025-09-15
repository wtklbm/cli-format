/** @type {import('prettier').Config} */
module.exports = {
    // 单行语句最大宽度
    printWidth: 80,

    // 代码缩进的宽度
    tabWidth: 4,

    // `tab` 还是空格
    useTabs: false,

    // 添加语句末尾的分号
    semi: true,

    // 单引号还是双引号
    singleQuote: true,

    // 在 `JSX` 中使用单引号
    jsxSingleQuote: false,

    // 尾随逗号
    trailingComma: 'none',

    // 对象的大括号左右添加空格
    bracketSpacing: true,

    // 只有一个参数的箭头函数是否包裹小括号
    arrowParens: 'avoid',

    // 缩进 `Vue` 的 `script` 和 `style` 标签
    vueIndentScriptAndStyle: false,

    // `as-needed`  - 仅在需要时在对象属性周围添加引号。
    // `consistent` - 如果对象中至少有一个属性需要用引号引起来，请用所有引号引起来。
    // `preserve`   - 尊重对象属性中引号的输入使用。
    quoteProps: 'as-needed',

    // `HTML` 文件的全局空格敏感度
    // `css`    - 遵守 CSS `display` 属性的默认值
    // `strict` - 空白被认为是敏感的
    // `ignore` - 空白被认为是不敏感的
    htmlWhitespaceSensitivity: 'css',

    // 行结束符
    //
    // `auto` - 维持现有的行尾 (通过查看第一行后的内容对一个文件中的混合值进行归一化)
    // `lf`   - 仅 `\n` 换行，在 `Linux` 和 `macOS` 以及 `git repos` 内部通用
    // `crlf` - 回车符 + 换行符 (`\r\n`)，在 Windows 上很常见
    // `cr`   - 仅回车符 (\r)，很少使用
    endOfLine: 'lf',

    // 插件 (后加载的插件会覆盖前面的实现)
    // https://www.npmjs.com/search?q=prettier-plugin
    // 模块找不到的问题：https://github.com/prettier/prettier/issues/15085#issuecomment-2315743688
    plugins: [
        // OXC 解析器 - 高性能 JavaScript/TypeScript 解析器 (与其他插件冲突)
        // https://github.com/prettier/prettier/tree/main/packages/plugin-oxc
        //'@prettier/plugin-oxc',

        // JSON 处理插件 - 放在最前面以确保正确处理 JSON 文件
        // https://github.com/Gudahtt/prettier-plugin-sort-json
        'prettier-plugin-sort-json',

        // 多行数组格式化插件 - 在 JavaScript 处理插件之后
        // https://github.com/electrovir/prettier-plugin-multiline-arrays
        'prettier-plugin-multiline-arrays',

        // 导入排序插件 - 在 JavaScript 处理插件之前，确保导入语句正确排序
        // https://github.com/ianvs/prettier-plugin-sort-imports
        '@ianvs/prettier-plugin-sort-imports',

        // JS 嵌入语言插件 - 处理模板字符串中的嵌入语言
        // https://github.com/Sec-ant/prettier-plugin-embed
        'prettier-plugin-embed',

        // package.json 专用插件 - 在 JSON 插件之后，确保 package.json 得到特殊处理
        // https://github.com/matzkoh/prettier-plugin-packagejson
        'prettier-plugin-packagejson',

        // JSDoc 格式化插件 - 在 JavaScript 处理插件之后
        // https://github.com/hosseinmd/prettier-plugin-jsdoc
        'prettier-plugin-jsdoc',

        // Tailwind CSS 类排序插件 - 特定于 CSS/HTML
        // https://github.com/tailwindlabs/prettier-plugin-tailwindcss
        'prettier-plugin-tailwindcss',

        // XML 格式化插件 - 特定于 XML 文件
        // https://github.com/prettier/plugin-xml
        '@prettier/plugin-xml',

        // Shell 脚本格式化插件 - 特定于 Shell 脚本
        // https://github.com/un-ts/prettier/blob/master/packages/sh
        'prettier-plugin-sh',

        // TOML 格式化插件 - 特定于 TOML 文件
        // https://github.com/un-ts/prettier/blob/master/packages/toml
        'prettier-plugin-toml',

        // INI 格式化插件 - 特定于 INI 文件
        // https://github.com/kddnewton/prettier-plugin-ini
        'prettier-plugin-ini',

        // SQL 格式化插件 - 特定于 SQL 文件
        // https://github.com/un-ts/prettier/blob/master/packages/sql
        'prettier-plugin-sql'

        // 自动纠错插件 - 放在最后，避免与其他插件冲突
        // 注意：此插件可能存在兼容性问题，如遇到问题可禁用
        // https://github.com/un-ts/prettier/blob/master/packages/autocorrect
        //'prettier-plugin-autocorrect'
    ].map(m => require.resolve(m)),

    // 控制导入顺序和格式的主要方法 importOrder 是字符串格式的正则表达式集合，以及一些可以使用的"特殊情况"字符串
    /** @type {import('@ianvs/prettier-plugin-sort-imports').PluginConfig.importOrder} */
    importOrder: [
        '',
        '<BUILT_IN_MODULES>',
        '',
        '^[a-zA-Z0-9_$]+$',
        '',
        '^[a-zA-Z0-9_$]+/',
        '',
        '<THIRD_PARTY_MODULES>',
        '',
        '^@(?:src|app|packages|assets|public|core|base|common|config|database|utils?|server|api|ui)(?:/|$)',
        '',
        '^(?:[.]{2}/){8}[.]{2}$',
        '^(?:[.]{2}/){9}',
        '',
        '^(?:[.]{2}/){7}[.]{2}$',
        '^(?:[.]{2}/){8}',
        '',
        '^(?:[.]{2}/){6}[.]{2}$',
        '^(?:[.]{2}/){7}',
        '',
        '^(?:[.]{2}/){5}[.]{2}$',
        '^(?:[.]{2}/){6}',
        '',
        '^(?:[.]{2}/){4}[.]{2}$',
        '^(?:[.]{2}/){5}',
        '',
        '^(?:[.]{2}/){3}[.]{2}$',
        '^(?:[.]{2}/){4}',
        '',
        '^(?:[.]{2}/){2}[.]{2}$',
        '^(?:[.]{2}/){3}',
        '',
        '^[.]{2}/[.]{2}$',
        '^(?:[.]{2}/){2}',
        '',
        '^[.]{2}$',
        '^[.]{2}/',
        '',
        '^[.]$',
        '^[.]/'
    ],

    // babel 解析器的插件集合。该插件将此列表传递给 babel 解析器，因此它可以理解正在格式化的文件中使用的语法
    // 该插件使用 prettier 本身来确定它需要使用的解析器，但如果失败，您可以使用此字段来强制使用插件的 babel 解析器需求
    // https://github.com/IanVS/prettier-plugin-sort-imports?tab=readme-ov-file#importorderparserplugins
    /** @type {import('@ianvs/prettier-plugin-sort-imports').PluginConfig.importOrderParserPlugins} */
    //importOrderParserPlugins: ['typescript', 'jsx'],

    // 使用 TypeScript 时，某些导入语法只能在较新版本的 TypeScript 中使用
    // 如果您想启用混合类型和值导入等现代功能，请将此选项设置为项目中使用的 TypeScript 的 semver 版本字符串
    // https://github.com/IanVS/prettier-plugin-sort-imports?tab=readme-ov-file#importordertypescriptversion
    /** @type {import('@ianvs/prettier-plugin-sort-imports').PluginConfig.importOrderTypeScriptVersion} */
    //importOrderTypeScriptVersion: '5.0.0',

    // https://github.com/hosseinmd/prettier-plugin-jsdoc
    tsdoc: true,

    // https://github.com/Gudahtt/prettier-plugin-sort-json
    jsonRecursiveSort: true,

    // https://github.com/prettier/plugin-xml
    xmlQuoteAttributes: 'double',
    xmlSelfClosingSpace: false,
    xmlSortAttributesByKey: true,
    xmlWhitespaceSensitivity: 'preserve'
};
