import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import captureWebsite from 'capture-website';
// import captureWebsite from './capture-website';
// const captureWebsite = require('./capture-website');

const writeFile = promisify(fs.writeFile);

export interface Options {
	readonly delay?: number;
	readonly crop?: boolean;
	readonly css?: string;
	readonly filename?: string;
	readonly selector?: string;
	readonly hide?: readonly string[];
	readonly scale?: number;
	readonly format?: string;
	readonly headers?: { [key: string]: string };
	readonly transparent?: boolean;
}

export type Screenshot = Buffer & { filename: string };

const pageres = async (url: string, dest: string, height: number, width: number, options?: Options) => {
	if (!(typeof dest === 'string' && dest.length > 0)) {
		throw new TypeError('Directory required');
	}
	if (!(typeof url === 'string' && url.length > 0)) {
		throw new TypeError('URL required');
	}

	if (!height || !width) {
		throw new TypeError('Height and width are required');
	}

	const create = async (): Promise<Screenshot> => {
		const basename = url.replace(/[/:\\<>:"/\|?*]/g, '!');

		const type = options.format === 'jpg' ? 'jpeg' : 'png';

		const finalOptions: any = {
			width: Number(width),
			height: Number(height),
			delay: options.delay,
			fullPage: !options.crop,
			styles: options.css && [options.css],
			element: options.selector,
			hideElements: options.hide,
			scaleFactor: options.scale === undefined ? 1 : options.scale,
			type,
			headers: options.headers,
			filename: options.filename || ''
		};

		const screenshot = await captureWebsite.buffer(url, finalOptions) as any;
		screenshot.filename = finalOptions.filename !== '' ? `${finalOptions.filename}.${type}` : `${Date.now()}${basename}.${type}`;
		return screenshot;
	}

	const save = async (screenshot: Screenshot): Promise<void> => {
		if (!fs.existsSync(dest)) {
			fs.mkdirSync(dest);
		}
		const newdest = path.join(dest, screenshot.filename);
		await writeFile(newdest, screenshot);
	}

	const screenshot = await create();
	await save(screenshot);
	return screenshot;
}

// For CommonJS default export support
module.exports = pageres;
module.exports.default = pageres;
