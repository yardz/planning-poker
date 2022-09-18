const getStdin = require("get-stdin");



function parse(input) {
	return JSON.parse(input);
}
function generate(data) {
	return JSON.stringify(data, null, 2);
}

function merge(key1, rule1, key2, rule2) {
	let defaultKey1;
	for (const key in rule1) {
		if (key.match(/^\$/)) {
			if (defaultKey1 == undefined) {
				defaultKey1 = key;
			} else {
				throw new Error("Duplicate default key");
			}
		}
	}
	let defaultKey2;
	for (const key in rule2) {
		if (key.match(/^\$/)) {
			if (defaultKey2 == undefined) {
				defaultKey2 = key;
			} else {
				throw new Error("Duplicate default key");
			}
		}
	}
	const newData = {};
	for (const key in rule1) {
		if (key in rule2) {
			if (key.match(/^\./)) {
				if (rule1[key] == "true") {
					newData[key] = (rule2[key]).replace(key2, key1);
				} else {
					newData[key] =
						"(" +
						rule1[key] +
						" || " +
						(rule2[key]).replace(key2, key1) +
						")";
				}
			} else if (key.match(/^\$/)) {
				newData[key] = merge(key, rule1[key], key, rule2[key]);
			} else {
				newData[key] = merge(key, rule1[key], key, rule2[key]);
			}
		}
	}
	for (const key in rule1) {
		if (!(key in rule2)) {
			if (key.match(/^\./)) {
				newData[key] = rule1[key];
			} else if (key.match(/^\$/)) {
				newData[key] = rule1[key];
			} else {
				if (defaultKey2 == undefined) {
					newData[key] = rule1[key];
				} else {
					newData[key] = merge(
						key,
						rule1[key],
						defaultKey2,
						rule2[defaultKey2]
					);
				}
			}
		}
	}
	for (const key in rule2) {
		if (!(key in rule1)) {
			if (key.match(/^\./)) {
				newData[key] = (rule2[key]).replace(key2, key1);
			} else if (key.match(/^\$/)) {
				newData[key] = rule2[key];
			} else {
				if (defaultKey1 == undefined) {
					newData[key] = rule2[key];
				} else {
					newData[key] = merge(
						key,
						rule2[key],
						defaultKey1,
						rule1[defaultKey1]
					);
				}
			}
		}
	}
	return rewrite(newData);
}

function rewrite(data) {
	const newData = {};
	let defaultKey;
	for (const key in data) {
		const value = data[key];
		if (key.match(/^\./)) {
			newData[key] = value;
		} else if (key.match(/^\$/)) {
			if (defaultKey == undefined) {
				newData[key] = rewrite(value);
				defaultKey = key;
			} else {
				const rule1 = newData[defaultKey];
				const rule2 = rewrite(value);
				if (key.match(/^\$key\d+/)) {
					newData[defaultKey] = merge(defaultKey, rule1, key, rule2);
				} else {
					delete newData[defaultKey];
					newData[key] = merge(key, rule2, defaultKey, rule1);
					defaultKey = key;
				}
			}
		} else {
			newData[key] = rewrite(value);
		}
	}
	return newData;
}

(async () => {
	try {
		const source = await getStdin();
		if (!source) throw new Error("No input file");
		const data = parse(source);
		process.stdout.write(generate(rewrite(data)));
	} catch (e) {
		process.stderr.write(e.message + "\n");
		process.exit(1);
	}
})();
