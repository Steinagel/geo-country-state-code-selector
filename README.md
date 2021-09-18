<h1 align="center">Welcome to geo-country-state-code-selector 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/geo-country-state-code-selector" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/geo-country-state-code-selector.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Country and State Code simple selector

## Prerequisites

- node >=12

## Install

```sh
yarn install
```

## Run tests

```sh
yarn run test
```

## Usage

```js
import GetPlaceCode from "geo-country-state-code-selector";

// No need to use perfect parameter
GetPlaceCode.getRegionCode("São Paulo"); // SP
GetPlaceCode.getRegionCode(", sao paulo"); // SP

GetPlaceCode.getPrefixedRegionCode(", State of São Paulo", "state-of"); // SP
GetPlaceCode.getPrefixedRegionCode(", State of São Paulo", "State Of"); // SP

GetPlaceCode.getCountryCode("Brazil"); // BR
GetPlaceCode.getPrefixedCountryCode("Federation of Brazil", "Fedaration of"); // BR

GetPlaceCode.getRegionCodeByCountry("brazil", "sao paulo"); // SP
GetPlaceCode.getPrefixedRegionCodeByCountry(
	"republic of brazil",
	"region of sao paulo",
	"republic of",
	"region of"
); // SP
```

## Author

👤 **Steinagel**

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
