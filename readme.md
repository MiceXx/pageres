# pageres

Forked from https://github.com/sindresorhus/pageres

## Install

```
$ npm install pageres
```

Note to Linux users: If you get a "No usable sandbox!" error, you need to enable [system sandboxing](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#setting-up-chrome-linux-sandbox).


## Usage

```js
const Pageres = require('pageres');

(async () => {
	await new Pageres({delay: 2})
		.src('https://github.com/sindresorhus/pageres', ['480x320', '1024x768', 'iphone 5s'], {crop: true})
		.src('https://sindresorhus.com', ['1280x1024', '1920x1080'])
		.src('data:text/html,<h1>Awesome!</h1>', ['1024x768'])
		.dest(__dirname)
		.run();
})();
```

## API

### Pageres([options])

#### options

Type: `object`

##### delay

Type: `number` *(Seconds)*<br>
Default: `0`

Delay capturing the screenshot.

Useful when the site does things after load that you want to capture.

##### timeout

Type: `number` *(Seconds)*<br>
Default: `60`

Number of seconds after which the request is aborted.

##### crop

Type: `boolean`<br>
Default: `false`

Crop to the set height.

##### css

Type: `string`

Apply custom CSS to the webpage. Specify some CSS or the path to a CSS file.

##### script

Type: `string`

Apply custom JavaScript to the webpage. Specify some JavaScript or the path to a file.

##### cookies

Type: `Array<string | object>`

A string with the same format as a [browser cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) or [an object](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagesetcookiecookies).

Tip: Go to the website you want a cookie for and [copy-paste it from DevTools](https://stackoverflow.com/a/24961735/64949).

##### filename

Type: `string`

Define a customized filename using [Lo-Dash templates](https://lodash.com/docs#template).<br>
For example `<%= date %> - <%= url %>-<%= size %><%= crop %>`.

Available variables:

- `url`: The URL in [slugified](https://github.com/sindresorhus/filenamify-url) form, eg. `http://yeoman.io/blog/` becomes `yeoman.io!blog`
- `size`: Specified size, eg. `1024x1000`
- `width`: Width of the specified size, eg. `1024`
- `height`: Height of the specified size, eg. `1000`
- `crop`: Outputs `-cropped` when the crop option is true
- `date`: The current date (YYYY-MM-DD), eg. 2015-05-18
- `time`: The current time (HH-mm-ss), eg. 21-15-11

##### incrementalName

Type: `boolean`<br>
Default: `false`

When a file exists, append an incremental number.

##### selector

Type: `string`

Capture a specific DOM element matching a CSS selector.

##### hide

Type: `string[]`

Hide an array of DOM elements matching CSS selectors.

##### username

Type: `string`

Username for authenticating with HTTP auth.

##### password

Type: `string`

Password for authenticating with HTTP auth.

##### scale

Type: `number`<br>
Default: `1`

Scale webpage `n` times.

##### format

Type: `string`<br>
Default: `png`<br>
Values: `png` `jpg`

Image format.

##### userAgent

Type: `string`

Custom user agent.

##### headers

Type: `object`

Custom HTTP request headers.

##### transparent

Type: `boolean`<br>
Default: `false`

Set background color to `transparent` instead of `white` if no background is set.

### pageres.src(url, sizes, [options])

Add a page to screenshot.

#### url

*Required*<br>
Type: `string`

URL or local path to the website you want to screenshot. You can also use a data URI.

#### sizes

*Required*<br>
Type: `string[]`

Use a `<width>x<height>` notation or a keyword.

A keyword is a version of a device from [this list](http://viewportsizes.com).
You can also pass in the `w3counter` keyword to use the ten most popular
resolutions from [w3counter](http://www.w3counter.com/globalstats.php).

#### options

Type: `object`

Options set here will take precedence over the ones set in the constructor.

### pageres.dest(directory)

Set the destination directory.

#### directory

Type: `string`

### pageres.run()

Run pageres. Returns `Promise<Buffer[]>`.


## Task runners

Check out [grunt-pageres](https://github.com/sindresorhus/grunt-pageres) if you're using Grunt.

For Gulp and Broccoli, just use the API directly. No need for a wrapper plugin.


## Built with Pageres

- [Break Shot](https://github.com/victorferraz/break-shot) - Desktop app for capturing screenshots of responsive websites.


## Related

- [capture-website](https://github.com/sindresorhus/capture-website) - A different take on screenshotting websites
