# Bitdash-Player of bitmovin for Angular

[![GitHub version](https://badge.fury.io/gh/movingimage24%2Fmi-angular-bitdash-player.svg)](http://badge.fury.io/gh/movingimage24%2Fmi-angular-bitdash-player)
[![npm version](https://img.shields.io/npm/v/mi-angular-bitdash-player.svg)](https://www.npmjs.com/package/mi-angular-bitdash-player)
[![npm downloads](https://img.shields.io/npm/dm/mi-angular-bitdash-player.svg)](https://www.npmjs.com/package/mi-angular-bitdash-player)
[![Build Status](https://img.shields.io/travis/MovingImage24/mi-angular-bitdash-player.svg)](https://travis-ci.org/MovingImage24/mi-angular-bitdash-player)
[![Coverage Status](https://coveralls.io/repos/MovingImage24/mi-angular-bitdash-player/badge.svg?branch=master&service=github)](https://coveralls.io/github/MovingImage24/mi-angular-bitdash-player?branch=master)
[![dependency Status](https://david-dm.org/MovingImage24/mi-angular-bitdash-player/status.svg)](https://david-dm.org/MovingImage24/mi-angular-bitdash-player#info=dependencies)
[![devDependency Status](https://david-dm.org/MovingImage24/mi-angular-bitdash-player/dev-status.svg)](https://david-dm.org/MovingImage24/mi-angular-bitdash-player#info=devDependencies)
[![License](https://img.shields.io/github/license/MovingImage24/mi-angular-bitdash-player.svg)](https://github.com/MovingImage24/mi-angular-bitdash-player/blob/master/LICENSE)

> Bitdash-Player of bitmovin for AngularJS 1

A customizable Bitdash-Player for AngularJS apps. 


## Installation

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i mi-angular-bitdash-player --save
```


## Usage

... coming soon ...


## Tests

Trigger unit test with [npm](https://www.npmjs.com/)

```sh
$ npm run test
```


## Travis and npmjs

Every push will trigger a test run at travis-ci (node.js-versions: >= 7.0). 

... coming soon ...

In case of a tagged version and success (node.js 7.0) an automated pbulish to npmjs.org will be triggered by travis-ci.


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## update player-ui
1. clone `https://github.com/MattDoddsMI/bitmovin-player-ui` repository and build it
2. copy the content from `bitmovin-player-ui/src/ts` to `mi-angular-bitdash-player/lib/uimanager`
3. add `(window as any).bitmovin.playerui = playerui;` in `mi-angular-bitdash-player/lib/uimanager/main.ts`
4. run `npm run build`

## links
* [hive plugin documentation](https://media-players.hivestreaming.com/docs/bitmovin/docs/4.1.0/)

# License

This library is under the [MIT license](https://github.com/MovingImage24/mi-angular-bitdash-player/blob/master/LICENSE).