/**
 * This file will automatically set the path in the Source\Assemblies\Common\Constants\Roblox.Common.Constants\Directories.ts, to disable this, add this to the top of the file Assemblies\Constants\Directories.ts
 * '// !DISABLE-AUTO-SELECT-DIR'
 * It should instert this automatically the first time.
 */

const fs = require('fs');

(function () {
	try {
		const dir = __dirname.split('\\').join('/');
		const fileName = `${__dirname}/Source/Assemblies/Common/Constants/Roblox.Common.Constants/Directories.ts`;
		if (!fs.existsSync(fileName)) {
			fs.writeFileSync(
				fileName,
				`// THIS FILE WAS AUTOMATICALLY GENERATED, DO NOT EDIT\r\n// !DISABLE-AUTO-SELECT-DIR\r\nexport const __baseDirName = '${dir}';\r\nexport const __sslDirName = __baseDirName + '/SSL';\r\n`,
			);
			return;
		}
		let contents = fs.readFileSync(fileName, { encoding: 'utf-8' });
		if (contents.includes('// !DISABLE-AUTO-SELECT-DIR')) {
			console.log(
				`The file ./Source/Assemblies/Common/Constants/Roblox.Common.Constants/Directories.ts was forced to not select the current directory. Most likely because it's already been generated.`,
			);
			return;
		}
		const data = contents.match(/(["'])(?:(?=(\\?))\2.)*?\1/i);
		contents = contents.replace(data[0], `'${dir}'`);
		contents = `// THIS FILE WAS AUTOMATICALLY GENERATED, DO NOT EDIT\r\n// !DISABLE-AUTO-SELECT-DIR\r\n${contents}`;
		fs.writeFileSync(fileName, contents);
	} catch (e) {}
})();
