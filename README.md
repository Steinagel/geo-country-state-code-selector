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

## Problem

We need Country and Region Codes, when talking about public input components worldwide, sometimes you need to understand, or even guess user input. I know we can use masks and validators... yes... but this may lead the user to abandon the form submission and we had some idea of how the data could be prefixed, how the commas could come, etc.

## Solution

A lightweight library that could be used in different but standardized scenarios relating to more than 25 pages in more than 5 projects with similar inputs at that time.

With this library, you can get country and region codes.

This library is used alongside other libraries to get the code from addresses.

## Prerequisites

- node >=12

## Install

```sh
yarn add geo-country-state-code-selector
npm install geo-country-state-code-selector
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
GetPlaceCode.getPrefixedCountryCode("Federation of Brazil", "Federation of"); // BR

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
