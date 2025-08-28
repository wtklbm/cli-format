#!/usr/bin/env node
const { spawn } = require('child_process');

// 获取命令行参数（排除前两个元素：node 路径和脚本路径）
let args = process.argv.slice(2);

// 如果没有传递路径参数，则默认格式化当前目录
if (args.length === 0) {
  args = ['.'];
}

// 显示将要格式化的路径
//console.log(`Formatting: ${args.join(' ')}`);

// 使用 npx 执行 prettier 命令
const child = spawn('npx', ['prettier', '--write', ...args], {
  stdio: 'inherit',  // 继承父进程的输入输出
  cwd: process.cwd() // 使用当前工作目录
});

// 当子进程退出时，以相同的退出码退出当前进程
child.on('exit', code => process.exit(code));
