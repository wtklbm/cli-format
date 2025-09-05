#!/usr/bin/env node

const { spawn } = require("child_process");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// 测试文件配置
const testFiles = [
  "bin/format.js",
  // 可以在这里添加更多要测试的文件
];

// 测试结果存储
const benchmarkResults = {
  smallFile: {
    single: {},
    multiple: {},
    multipleRuns: {},
  },
  largeFile: {
    single: {},
    multiple: {},
    multipleRuns: {},
  },
};

// 初始化测试结果存储结构
function initializeBenchmarkResults() {
  testFiles.forEach((filePath) => {
    const fileName = path.basename(filePath, ".js");
    benchmarkResults.smallFile.single[fileName] = [];
    benchmarkResults.smallFile.multiple[fileName] = [];
    benchmarkResults.smallFile.multipleRuns[fileName] = [];
    benchmarkResults.largeFile.single[fileName] = [];
    benchmarkResults.largeFile.multiple[fileName] = [];
    benchmarkResults.largeFile.multipleRuns[fileName] = [];
  });
}

// 初始化结果存储
initializeBenchmarkResults();

// 创建小文件测试集
async function createSmallTestFiles() {
  const testDir = path.join(process.cwd(), "test-small-files");

  // 确保测试目录存在
  try {
    await fsPromises.mkdir(testDir, { recursive: true });
  } catch (error) {
    // 目录已存在，忽略错误
  }

  // 创建小测试文件
  const testFiles = [
    {
      name: "small1.json",
      content: `{"name":"test","age":30,"city":"New York"}`,
    },
    {
      name: "small2.js",
      content: `function test(a,b){if(a>b){return a}else{return b}}`,
    },
    {
      name: "small3.json",
      content: `{
    "users": [
        {"name": "Alice", "age": 30},
        {"name": "Bob", "age": 25}
    ]
}`,
    },
    {
      name: "small4.js",
      content: "const numbers=[1,2,3,4,5];const doubled=numbers.map(n=>n*2);",
    },
    {
      name: "small5.json",
      content: '{"array":[1,2,3],"object":{"value":"test"},"boolean":true}',
    },
  ];

  for (const file of testFiles) {
    const filePath = path.join(testDir, file.name);
    await fsPromises.writeFile(filePath, file.content, "utf8");
  }

  return testDir;
}

// 创建多个小文件测试集
async function createMultipleSmallTestFiles() {
  const testDir = path.join(process.cwd(), "test-multiple-small-files");

  // 确保测试目录存在
  try {
    await fsPromises.mkdir(testDir, { recursive: true });
  } catch (error) {
    // 目录已存在，忽略错误
  }

  // 创建更多小测试文件
  const testFiles = [];
  for (let i = 1; i <= 50; i++) {
    testFiles.push({
      name: `file${i}.js`,
      content: `// Test file ${i}\nconst test${i} = function() {\n  return ${i};\n};\nconsole.log(test${i}());`,
    });

    testFiles.push({
      name: `data${i}.json`,
      content: `{"id":${i},"name":"Test ${i}","value":${i * 10}}`,
    });
  }

  for (const file of testFiles) {
    const filePath = path.join(testDir, file.name);
    await fsPromises.writeFile(filePath, file.content, "utf8");
  }

  return testDir;
}

// 大文件路径
const largeFilePath = path.join(process.cwd(), "node_modules/tslib/tslib.js");

// 创建多个大文件测试集
async function createMultipleLargeTestFiles() {
  const testDir = path.join(process.cwd(), "test-multiple-large-files");

  // 确保测试目录存在
  try {
    await fsPromises.mkdir(testDir, { recursive: true });
  } catch (error) {
    // 目录已存在，忽略错误
  }

  // 复制大文件创建多个副本
  const sourceFile = largeFilePath;
  const numCopies = 5; // 创建5个大文件副本

  try {
    const sourceContent = await fsPromises.readFile(sourceFile, "utf8");

    for (let i = 1; i <= numCopies; i++) {
      const destPath = path.join(testDir, `largefile${i}.js`);
      await fsPromises.writeFile(destPath, sourceContent, "utf8");
    }
  } catch (error) {
    console.error("创建大文件副本失败:", error.message);
  }

  return testDir;
}

// 检查大文件是否存在
async function checkLargeFile() {
  try {
    const stats = await fsPromises.stat(largeFilePath);
    console.log(`✅ 找到大文件: ${largeFilePath}`);
    console.log(`📊 文件大小: ${(stats.size / 1024).toFixed(2)}KB`);
    return true;
  } catch (error) {
    console.error(`❌ 大文件不存在: ${largeFilePath}`);
    return false;
  }
}

// 备份大文件
async function backupLargeFile() {
  try {
    const backupPath = path.join(
      process.cwd(),
      "node_modules/tslib/tslib.js.backup",
    );
    await fsPromises.copyFile(largeFilePath, backupPath);
    console.log(`✅ 备份大文件到: ${backupPath}`);
    return backupPath;
  } catch (error) {
    console.error("❌ 备份大文件失败:", error.message);
    throw error;
  }
}

// 恢复大文件
async function restoreLargeFile(backupPath) {
  try {
    await fsPromises.copyFile(backupPath, largeFilePath);
  } catch (error) {
    console.error("❌ 恢复大文件失败:", error.message);
    throw error;
  }
}

// 清理测试文件
async function cleanupTestFiles(testDir) {
  try {
    await fsPromises.rm(testDir, { recursive: true, force: true });
  } catch (error) {
    console.error("清理测试文件失败:", error.message);
  }
}

// 运行格式化工具并测量时间
async function runFormatTool(toolPath, args = []) {
  return new Promise((resolve, reject) => {
    const startTime = process.hrtime.bigint();

    const child = spawn("node", [toolPath, ...args], {
      cwd: process.cwd(),
      stdio: ["pipe", "pipe", "pipe"],
    });

    let output = "";
    let error = "";

    child.stdout.on("data", (data) => {
      output += data.toString();
    });

    child.stderr.on("data", (data) => {
      error += data.toString();
    });

    child.on("close", (code) => {
      const endTime = process.hrtime.bigint();
      const executionTime = Number(endTime - startTime) / 1000000; // 转换为毫秒

      if (code !== 0) {
        reject(new Error(`进程退出码: ${code}, 错误: ${error}`));
      } else {
        resolve({
          executionTime,
          output,
          error,
        });
      }
    });

    child.on("error", (err) => {
      reject(err);
    });
  });
}

// 计算平均值和标准差
function calculateStats(values) {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const squareDiffs = values.map((value) => Math.pow(value - mean, 2));
  const variance =
    squareDiffs.reduce((sum, diff) => sum + diff, 0) / values.length;
  const stdDev = Math.sqrt(variance);

  return {
    mean,
    stdDev,
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

// 小文件单次格式化测试
async function testSmallFileSingle() {
  console.log("\n=== 小文件单次格式化测试 ===");

  const testDir = await createSmallTestFiles();
  console.log(`✅ 创建小测试文件在: ${testDir}`);

  const iterations = 10;

  try {
    for (let i = 0; i < iterations; i++) {
      console.log(`小文件单次测试 ${i + 1}/${iterations}...`);

      // 对每个测试文件进行测试
      for (const testFile of testFiles) {
        // 重新创建测试文件
        await createSmallTestFiles();

        // 运行测试
        const result = await runFormatTool(testFile, [testDir]);
        const fileName = path.basename(testFile, ".js");
        benchmarkResults.smallFile.single[fileName].push(result.executionTime);
      }
    }

    // 计算并显示统计信息
    console.log("\n=== 小文件单次格式化测试结果 ===");
    for (const testFile of testFiles) {
      const fileName = path.basename(testFile, ".js");
      const stats = calculateStats(benchmarkResults.smallFile.single[fileName]);
      console.log(
        `${testFile}: 平均 ${stats.mean.toFixed(2)}ms (标准差: ${stats.stdDev.toFixed(2)}ms)`,
      );
    }
  } finally {
    await cleanupTestFiles(testDir);
    console.log("✅ 清理小测试文件完成");
  }
}

// 多个小文件格式化测试
async function testSmallFileMultiple() {
  console.log("\n=== 多个小文件格式化测试 ===");

  const testDir = await createMultipleSmallTestFiles();
  console.log(`✅ 创建多个小测试文件在: ${testDir}`);

  const iterations = 10;

  try {
    for (let i = 0; i < iterations; i++) {
      console.log(`多个小文件测试 ${i + 1}/${iterations}...`);

      // 对每个测试文件进行测试
      for (const testFile of testFiles) {
        // 重新创建测试文件
        await createMultipleSmallTestFiles();

        // 运行测试
        const result = await runFormatTool(testFile, [testDir]);
        const fileName = path.basename(testFile, ".js");
        benchmarkResults.smallFile.multiple[fileName].push(
          result.executionTime,
        );
      }
    }

    // 计算并显示统计信息
    console.log("\n=== 多个小文件格式化测试结果 ===");
    for (const testFile of testFiles) {
      const fileName = path.basename(testFile, ".js");
      const stats = calculateStats(
        benchmarkResults.smallFile.multiple[fileName],
      );
      console.log(
        `${testFile}: 平均 ${stats.mean.toFixed(2)}ms (标准差: ${stats.stdDev.toFixed(2)}ms)`,
      );
    }
  } finally {
    await cleanupTestFiles(testDir);
    console.log("✅ 清理多个小测试文件完成");
  }
}

// 小文件多次运行测试
async function testSmallFileMultipleRuns() {
  console.log("\n=== 小文件多次运行测试 ===");

  const testDir = await createSmallTestFiles();
  console.log(`✅ 创建小测试文件在: ${testDir}`);

  const iterations = 5;
  const runsPerIteration = 10;

  try {
    for (let i = 0; i < iterations; i++) {
      console.log(`小文件多次运行测试 ${i + 1}/${iterations}...`);

      // 对每个测试文件进行测试
      for (const testFile of testFiles) {
        // 重新创建测试文件
        await createSmallTestFiles();

        // 多次运行测试
        const startTime = process.hrtime.bigint();
        for (let j = 0; j < runsPerIteration; j++) {
          await runFormatTool(testFile, [testDir]);
        }
        const endTime = process.hrtime.bigint();
        const executionTime = Number(endTime - startTime) / 1000000;
        const fileName = path.basename(testFile, ".js");
        benchmarkResults.smallFile.multipleRuns[fileName].push(executionTime);
      }
    }

    // 计算并显示统计信息
    console.log("\n=== 小文件多次运行测试结果 ===");
    for (const testFile of testFiles) {
      const fileName = path.basename(testFile, ".js");
      const stats = calculateStats(
        benchmarkResults.smallFile.multipleRuns[fileName],
      );
      const perRun = stats.mean / runsPerIteration;
      console.log(
        `${testFile}: 总平均 ${stats.mean.toFixed(2)}ms (每次平均 ${perRun.toFixed(2)}ms)`,
      );
    }
  } finally {
    await cleanupTestFiles(testDir);
    console.log("✅ 清理小测试文件完成");
  }
}

// 大文件单次格式化测试
async function testLargeFileSingle() {
  console.log("\n=== 大文件单次格式化测试 ===");

  // 检查大文件是否存在
  const fileExists = await checkLargeFile();
  if (!fileExists) {
    console.log("跳过大文件测试");
    return;
  }

  // 备份大文件
  const backupPath = await backupLargeFile();

  const iterations = 5;

  try {
    for (let i = 0; i < iterations; i++) {
      console.log(`大文件单次测试 ${i + 1}/${iterations}...`);

      // 对每个测试文件进行测试
      for (const testFile of testFiles) {
        // 恢复文件
        await restoreLargeFile(backupPath);

        // 运行测试
        const result = await runFormatTool(testFile, [largeFilePath]);
        const fileName = path.basename(testFile, ".js");
        benchmarkResults.largeFile.single[fileName].push(result.executionTime);
      }
    }

    // 计算并显示统计信息
    console.log("\n=== 大文件单次格式化测试结果 ===");
    for (const testFile of testFiles) {
      const fileName = path.basename(testFile, ".js");
      const stats = calculateStats(benchmarkResults.largeFile.single[fileName]);
      console.log(
        `${testFile}: 平均 ${stats.mean.toFixed(2)}ms (标准差: ${stats.stdDev.toFixed(2)}ms)`,
      );
    }
  } finally {
    await restoreLargeFile(backupPath);
    console.log("✅ 恢复大文件完成");
  }
}

// 多个大文件格式化测试
async function testLargeFileMultiple() {
  console.log("\n=== 多个大文件格式化测试 ===");

  // 检查大文件是否存在
  const fileExists = await checkLargeFile();
  if (!fileExists) {
    console.log("跳过大文件测试");
    return;
  }

  const testDir = await createMultipleLargeTestFiles();
  console.log(`✅ 创建多个大测试文件在: ${testDir}`);

  const iterations = 5;

  try {
    for (let i = 0; i < iterations; i++) {
      console.log(`多个大文件测试 ${i + 1}/${iterations}...`);

      // 对每个测试文件进行测试
      for (const testFile of testFiles) {
        // 重新创建测试文件
        await createMultipleLargeTestFiles();

        // 运行测试
        const result = await runFormatTool(testFile, [testDir]);
        const fileName = path.basename(testFile, ".js");
        benchmarkResults.largeFile.multiple[fileName].push(
          result.executionTime,
        );
      }
    }

    // 计算并显示统计信息
    console.log("\n=== 多个大文件格式化测试结果 ===");
    for (const testFile of testFiles) {
      const fileName = path.basename(testFile, ".js");
      const stats = calculateStats(
        benchmarkResults.largeFile.multiple[fileName],
      );
      console.log(
        `${testFile}: 平均 ${stats.mean.toFixed(2)}ms (标准差: ${stats.stdDev.toFixed(2)}ms)`,
      );
    }
  } finally {
    await cleanupTestFiles(testDir);
    console.log("✅ 清理多个大测试文件完成");
  }
}

// 大文件多次运行测试
async function testLargeFileMultipleRuns() {
  console.log("\n=== 大文件多次运行测试 ===");

  // 检查大文件是否存在
  const fileExists = await checkLargeFile();
  if (!fileExists) {
    console.log("跳过大文件测试");
    return;
  }

  // 备份大文件
  const backupPath = await backupLargeFile();

  const iterations = 3;
  const runsPerIteration = 5;

  try {
    for (let i = 0; i < iterations; i++) {
      console.log(`大文件多次运行测试 ${i + 1}/${iterations}...`);

      // 对每个测试文件进行测试
      for (const testFile of testFiles) {
        // 恢复文件
        await restoreLargeFile(backupPath);

        // 多次运行测试
        const startTime = process.hrtime.bigint();
        for (let j = 0; j < runsPerIteration; j++) {
          await runFormatTool(testFile, [largeFilePath]);
        }
        const endTime = process.hrtime.bigint();
        const executionTime = Number(endTime - startTime) / 1000000;
        const fileName = path.basename(testFile, ".js");
        benchmarkResults.largeFile.multipleRuns[fileName].push(executionTime);
      }
    }

    // 计算并显示统计信息
    console.log("\n=== 大文件多次运行测试结果 ===");
    for (const testFile of testFiles) {
      const fileName = path.basename(testFile, ".js");
      const stats = calculateStats(
        benchmarkResults.largeFile.multipleRuns[fileName],
      );
      const perRun = stats.mean / runsPerIteration;
      console.log(
        `${testFile}: 总平均 ${stats.mean.toFixed(2)}ms (每次平均 ${perRun.toFixed(2)}ms)`,
      );
    }
  } finally {
    await restoreLargeFile(backupPath);
    console.log("✅ 恢复大文件完成");
  }
}

// 将性能数据追加到markdown日志文件
async function appendPerformanceDataToLog() {
  const logFilePath = path.join(process.cwd(), "test", "benchmark.md");
  const timestamp = new Date().toISOString();

  // 准备markdown表格数据
  let markdownData = `| ${timestamp} |`;

  for (const testFile of testFiles) {
    const fileName = path.basename(testFile, ".js");

    // 小文件数据
    const smallSingleStats = calculateStats(
      benchmarkResults.smallFile.single[fileName],
    );
    const smallMultipleStats = calculateStats(
      benchmarkResults.smallFile.multiple[fileName],
    );
    const smallMultipleRunsStats = calculateStats(
      benchmarkResults.smallFile.multipleRuns[fileName],
    );

    // 大文件数据
    const largeSingleStats = calculateStats(
      benchmarkResults.largeFile.single[fileName],
    );
    const largeMultipleStats = calculateStats(
      benchmarkResults.largeFile.multiple[fileName],
    );
    const largeMultipleRunsStats = calculateStats(
      benchmarkResults.largeFile.multipleRuns[fileName],
    );

    markdownData += ` ${smallSingleStats.mean.toFixed(2)}ms |`;
    markdownData += ` ${smallMultipleStats.mean.toFixed(2)}ms |`;
    markdownData += ` ${(smallMultipleRunsStats.mean / 10).toFixed(2)}ms |`;
    markdownData += ` ${largeSingleStats.mean.toFixed(2)}ms |`;
    markdownData += ` ${largeMultipleStats.mean.toFixed(2)}ms |`;
    markdownData += ` ${(largeMultipleRunsStats.mean / 5).toFixed(2)}ms |`;
  }

  markdownData += "\n";

  try {
    // 检查文件是否存在，如果不存在则创建表头
    try {
      await fsPromises.access(logFilePath);
    } catch (error) {
      // 文件不存在，创建markdown表头
      const header = `# 性能基准测试数据

| 时间戳 | 小文件单次 | 小文件多个 | 小文件多次运行 | 大文件单次 | 大文件多个 | 大文件多次运行 |
|--------|------------|------------|----------------|------------|------------|----------------|
`;
      await fsPromises.writeFile(logFilePath, header, "utf8");
    }

    // 追加数据
    await fsPromises.appendFile(logFilePath, markdownData, "utf8");
    console.log(`✅ 性能数据已追加到: ${logFilePath}`);
  } catch (error) {
    console.error("❌ 写入性能数据日志失败:", error.message);
  }
}

// 生成综合性能分析报告
async function generatePerformanceReport() {
  console.log("\n\n=== 综合性能基准分析报告 ===\n");

  // Markdown表格表头
  console.log(
    "| 场景类型 | 单个小文件格式化 | 多个小文件格式化 | 小文件多次运行 |",
  );
  console.log(
    "|----------|------------------|------------------|----------------|",
  );

  // 小文件场景数据
  for (const testFile of testFiles) {
    const fileName = path.basename(testFile, ".js");

    // 单个小文件
    const singleStats = calculateStats(
      benchmarkResults.smallFile.single[fileName],
    );

    // 多个小文件
    const multipleStats = calculateStats(
      benchmarkResults.smallFile.multiple[fileName],
    );

    // 小文件多次运行
    const multipleRunsStats = calculateStats(
      benchmarkResults.smallFile.multipleRuns[fileName],
    );

    console.log(
      `| 小文件场景 | ${singleStats.mean.toFixed(2)}ms | ${multipleStats.mean.toFixed(2)}ms | ${(multipleRunsStats.mean / 10).toFixed(2)}ms |`,
    );
  }

  // 大文件场景表头
  console.log(
    "\n| 场景类型 | 单个大文件格式化 | 多个大文件格式化 | 大文件多次运行 |",
  );
  console.log(
    "|----------|------------------|------------------|----------------|",
  );

  // 大文件场景数据
  for (const testFile of testFiles) {
    const fileName = path.basename(testFile, ".js");

    // 单个大文件
    const singleStats = calculateStats(
      benchmarkResults.largeFile.single[fileName],
    );

    // 多个大文件
    const multipleStats = calculateStats(
      benchmarkResults.largeFile.multiple[fileName],
    );

    // 大文件多次运行
    const multipleRunsStats = calculateStats(
      benchmarkResults.largeFile.multipleRuns[fileName],
    );

    console.log(
      `| 大文件场景 | ${singleStats.mean.toFixed(2)}ms | ${multipleStats.mean.toFixed(2)}ms | ${(multipleRunsStats.mean / 5).toFixed(2)}ms |`,
    );
  }

  // 将性能数据追加到日志文件
  await appendPerformanceDataToLog();

  // 综合分析
  console.log("\n## 综合性能分析");

  // 如果只有一个测试文件，显示基本性能信息
  if (testFiles.length === 1) {
    console.log("\n### 单一工具性能分析");
    console.log(`当前测试工具: ${testFiles[0]}`);

    // 计算所有场景的平均性能
    const allResults = [];
    for (const category of ["single", "multiple", "multipleRuns"]) {
      for (const size of ["smallFile", "largeFile"]) {
        const fileName = path.basename(testFiles[0], ".js");
        allResults.push(...benchmarkResults[size][category][fileName]);
      }
    }

    const overallStats = calculateStats(allResults);
    console.log(
      `所有场景平均执行时间: ${overallStats.mean.toFixed(2)}ms (标准差: ${overallStats.stdDev.toFixed(2)}ms)`,
    );

    // 分析最快和最慢的场景
    let fastestScene = { name: "", time: Infinity };
    let slowestScene = { name: "", time: 0 };

    const sceneNames = {
      smallFile: "小文件",
      largeFile: "大文件",
      single: "单次",
      multiple: "多个",
      multipleRuns: "多次运行",
    };

    for (const size of ["smallFile", "largeFile"]) {
      for (const category of ["single", "multiple", "multipleRuns"]) {
        const fileName = path.basename(testFiles[0], ".js");
        const stats = calculateStats(
          benchmarkResults[size][category][fileName],
        );
        const avgTime = stats.mean;

        if (avgTime < fastestScene.time) {
          fastestScene = {
            name: `${sceneNames[size]}${sceneNames[category]}`,
            time: avgTime,
          };
        }

        if (avgTime > slowestScene.time) {
          slowestScene = {
            name: `${sceneNames[size]}${sceneNames[category]}`,
            time: avgTime,
          };
        }
      }
    }

    console.log(
      `最快场景: ${fastestScene.name} (${fastestScene.time.toFixed(2)}ms)`,
    );
    console.log(
      `最慢场景: ${slowestScene.name} (${slowestScene.time.toFixed(2)}ms)`,
    );

    // 性能稳定性分析
    const coefficientOfVariation =
      (overallStats.stdDev / overallStats.mean) * 100;
    if (coefficientOfVariation < 15) {
      console.log("✅ 工具性能表现稳定，在不同场景下性能差异较小");
    } else if (coefficientOfVariation < 30) {
      console.log("⚠️ 工具性能表现中等稳定，在某些场景下有较明显差异");
    } else {
      console.log("❌ 工具性能表现不稳定，在不同场景下性能差异较大");
    }

    console.log(`变异系数: ${coefficientOfVariation.toFixed(2)}%`);
  } else {
    console.log("\n### 多工具性能分析");
    console.log(`当前测试工具数量: ${testFiles.length}`);

    // 这里可以添加多工具比较的逻辑
    // 但由于当前只有一个测试文件，这部分暂时留空
  }
}

// 运行所有基准测试
async function runAllBenchmarks() {
  console.log("=== 全面格式化工具基准测试 ===");
  console.log(
    "测试包括: 小文件、多个小文件、多次比较，大文件、多个大文件、多次大文件比较\n",
  );

  try {
    // 小文件测试
    await testSmallFileSingle();
    await testSmallFileMultiple();
    await testSmallFileMultipleRuns();

    // 大文件测试
    await testLargeFileSingle();
    await testLargeFileMultiple();
    await testLargeFileMultipleRuns();

    // 生成综合报告
    await generatePerformanceReport();
  } catch (error) {
    console.error("基准测试失败:", error);
    process.exit(1);
  }
}

// 主函数
async function main() {
  try {
    await runAllBenchmarks();
  } catch (error) {
    console.error("全面基准测试失败:", error);
    process.exit(1);
  }
}

// 运行主函数
main();
