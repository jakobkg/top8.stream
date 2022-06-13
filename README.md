<div align="center">
  <h1>top8.stream</h1>
  <p>
    Bracket stream graphics for everyone
  </p>
</div>

## Usage
This site creates a visualization of any bracket from start.gg, given the "group ID" of the bracket. The group ID is part of the URL of the bracket on start.gg, and is easy to find! Once you have the phase ID of the bracket you'd like a graphic of, simply add it to the end of the link to this site to get a stream friendly graphic!

NOTE: top8.stream only retrieves data from the start.gg when the page is first loaded, so when using top8.stream as a browser source in OBS it's recommended to turn "Refresh browser when scene becomes active" on in the properties of the browser source to ensure you're always showing the most recent available bracket

URL format: 
```
https://top8.stream/[ID]/[options]
```

As an example, this is the link to the top 8 of Ultimate Singles at Genesis 6: `https://www.start.gg/tournament/genesis-6/event/smash-for-switch-singles/brackets/500501/865127`. The group ID is the last part of the bracket URL, in this case `865127`. Adding this to the top8.stream link gives https://top8.stream/865127, which should look something like this:

`https://top8.stream/865127`
![An image of the Genesis 6 Ultimate Singles Top 8 bracket, shown on top8.stream](https://user-images.githubusercontent.com/25484353/173239654-e3f9026e-f27b-4523-8ecf-f10fc7f68008.png)


### Options
top8.stream supports a few options to change what part of the bracket is shown, and what the page looks like.

The currently available options are:

- `winners`
	+ Shows only the winners side of bracket
	+ `w` is a valid shorthand
- `losers`
	+ Shows only the losers side of bracket
	+ `l` is a valid shorthand
- `notext`
	+ Hides the round names from the bracket

Using the options above, we can add `notext` to the end of the URL to remove the round names:

`https://top8.stream/865127/notext`
![An image of the Genesis 6 Ultimate Singles Top 8 bracket without the round names, shown on top8.stream](https://user-images.githubusercontent.com/25484353/173239681-2693e6f7-ad31-485f-ad77-eeed7b0fb237.png)


We can also look at the winners side only by adding `w` or `winners`, or look at the losers side by adding `l` or `losers`

`https://top8.stream/865127/losers`
![An image of the Genesis 6 Ultimate Singles Top 8 losers bracket, shown on top8.stream](https://user-images.githubusercontent.com/25484353/173239702-ea341a34-490d-4960-be60-725b53e083e2.png)


The options can also be combined!

`https://top8.stream/865127/w/notext`<br />
![An image of the Genesis 6 Ultimate Singles Top 8 winners bracket without round names, shown on top8.stream](https://user-images.githubusercontent.com/25484353/173239723-17b5f980-db12-4019-b29d-17f1d9588cef.png)


All of these are perfect to add to your OBS stream as a browser source, simply set the URL and you have a bracket graphic ready to display to your viewers when there's a lull in the action!

![An image of the Genesis 6 Ultimate Singles Top 8 losers bracket, shown on top8.stream as a browser source in OBS](https://user-images.githubusercontent.com/25484353/173239735-6ecdc3e4-4456-42fa-a144-4abd67a05b26.png)


## Customization

When using top8.stream as part of your streams, it's important to be able to make the bracket graphic fit with the rest of your style and profile! While I have tried to provide a pretty nice default look, every colour in the graphic, and a few other elements, are customizable in OBS by using the "Custom CSS" setting in the properties of a browser source.

The default style uses the following style parameters, and you can simply copy this entire style into your OBS browser source and start changing them to make the graphic fit in with the style of your broadcast!

```css
:root {
  --page-background: #f2f2f2;
  --bracket-background: #4b4b4bcd;

  --name-container-background: #222222;
  --score-container-background: #2f2f2f;
  --winner-score-background: #d97754;

  --name-score-separator: #202020;

  --name-text: #ebebeb;
  --score-text: #bebebe;
  --winner-score-text: #333333;
  --round-text: #ebebeb;

  --connector-line: #ebebeb;
  --line-thickness: 2px;
}
```


Go crazy!

![top8.stream as an OBS browser source, with some gaudy customizations applied](https://user-images.githubusercontent.com/25484353/173239751-04c858d2-b662-4d01-9507-f2010880a537.png)


### Supported bracket types

In addition to double elimination brackets as seen above, top8.stream also supports single elimination brackets:

![An 8 player single elimination bracket as shown on top8.stream](https://user-images.githubusercontent.com/25484353/173351183-7d37832e-b22c-4ea6-a489-efbe16bfde60.png)

When showing a single elimination bracket, the `winners` and `losers` options are ignored if provided

Round robins and swiss brackets are not yet supported

## Development

This project is built using Vue and Typescript, with Vite as the build server and packaging and ESLint for code formatting. While I have tried to keep the dependencies to a minimum, these tools have quite a few dependencies themselves. At the time of writing, `npm audit` reports no known vulnerabilities.

To communicate with the start.gg API without compromising an API key, this project uses an API proxy. By default it points to an instance of [my start.gg API proxy](https://github.com/jakobkg/startgg-api-proxy), which is easy to set up if you'd prefer to run your own instance of the proxy to mitigate the risk of rate limiting or throttling.

### Project Setup

```sh
git clone https://github.com/jakobkg/top8.stream.git
cd top8.stream
npm install
```

### Compile and Run Hot-Reload Development Server

```sh
npm run dev
```

### Type-Check and Compile for Production

```sh
npm run build
```
This project compiles into a single static page that can be used offline, or hosted for cheap/free using solutions like Github Pages, Cloudflare Pages and other static site hosts.

### Format/Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
