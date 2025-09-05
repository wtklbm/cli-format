#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pluginsDir = path.join(__dirname, '..', 'test', 'plugins');

// 获取所有插件目录
function getPluginDirectories() {
    return fs
        .readdirSync(pluginsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

// 获取源文件路径
function getSourceFile(pluginDir) {
    const dirPath = path.join(pluginsDir, pluginDir);

    // 特殊处理 package.json
    if (pluginDir === 'json') {
        const packageJsonPath = path.join(dirPath, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            return packageJsonPath;
        }
    }

    // 查找 source.xxx 文件
    const files = fs.readdirSync(dirPath);
    const sourceFile = files.find(file => file.startsWith('source.'));

    if (sourceFile) {
        return path.join(dirPath, sourceFile);
    }

    return null;
}

// 获取格式化文件路径
function getFormattedFile(pluginDir, sourceFile) {
    const dirPath = path.join(pluginsDir, pluginDir);
    const sourceExt = path.extname(sourceFile);
    const formattedFileName = `formated${sourceExt}`;
    return path.join(dirPath, formattedFileName);
}

// 格式化文件
function formatFile(filePath) {
    try {
        // 备份原始文件
        const backupPath = `${filePath}.backup`;
        fs.copyFileSync(filePath, backupPath);

        // 执行格式化
        execSync(
            `node ${path.join(__dirname, '..', 'bin', 'format.js')} "${filePath}" --autocorrect`,
            {
                stdio: 'pipe',
                cwd: process.cwd()
            }
        );

        // 读取格式化后的内容
        const formattedContent = fs.readFileSync(filePath, 'utf8');

        // 恢复原始文件
        fs.copyFileSync(backupPath, filePath);
        fs.unlinkSync(backupPath);

        return formattedContent;
    } catch (error) {
        console.error(`格式化文件 ${filePath} 时出错:`, error.message);
        return null;
    }
}

// 比较文件内容
function compareFiles(actualContent, expectedFilePath) {
    if (!fs.existsSync(expectedFilePath)) {
        return false;
    }

    const expectedContent = fs.readFileSync(expectedFilePath, 'utf8');

    // 如果预期文件为空，则认为格式化失败
    if (expectedContent.trim() === '') {
        return false;
    }

    return actualContent.trim() === expectedContent.trim();
}

// 显示文件差异
function showFileDifference(actualContent, expectedFilePath, pluginDir) {
    if (!fs.existsSync(expectedFilePath)) {
        console.log(`  预期文件不存在：${expectedFilePath}`);
        return;
    }

    const expectedContent = fs.readFileSync(expectedFilePath, 'utf8');

    if (expectedContent.trim() === '') {
        console.log(`  预期文件为空，但格式化后的文件有内容`);
        console.log(`  格式化后的文件内容预览:`);
        console.log(`  --- 开始 ---`);
        console.log(
            actualContent.substring(0, 200) +
                (actualContent.length > 200 ? '...' : '')
        );
        console.log(`  --- 结束 ---`);
    } else {
        console.log(`  文件内容不匹配`);
        console.log(`  预期文件大小：${expectedContent.length} 字符`);
        console.log(`  实际文件大小：${actualContent.length} 字符`);
    }
}

// 主函数
function main() {
    const pluginDirs = getPluginDirectories();
    let failedTests = [];

    for (const pluginDir of pluginDirs) {
        const sourceFile = getSourceFile(pluginDir);
        if (!sourceFile) {
            continue;
        }

        const formattedFile = getFormattedFile(pluginDir, sourceFile);
        console.log(`正在格式化：${path.basename(sourceFile)}`);

        // 格式化文件
        const formattedContent = formatFile(sourceFile);
        if (!formattedContent) {
            console.log(`${pluginDir}: 格式化失败`);
            failedTests.push(pluginDir);
            continue;
        }

        // 比较结果
        const isMatch = compareFiles(formattedContent, formattedFile);

        if (!isMatch) {
            console.log(`${pluginDir}: 格式化结果不正确`);
            showFileDifference(formattedContent, formattedFile, pluginDir);
            console.log('');
            failedTests.push(pluginDir);
        }
    }

    // 输出总结
    if (failedTests.length > 0) {
        console.log(`\n有 ${failedTests.length} 个文件没有被成功格式化:`);
        failedTests.forEach(plugin => {
            console.log(`  - ${plugin}`);
        });
        process.exit(1);
    }
}

main();
