# geo-country-state-code-selector

Use this to get the code of countries or regions around the world.

## Install

```
$ npm install geo-country-state-code-selector
```

## Usage

```js
import GetPlaceCode from "geo-country-state-code-selector";

// SP
GetPlaceCode.getRegionCode("São Paulo");
// SP
GetPlaceCode.getRegionCode("State of São Paulo", "State of");

// DL
GetPlaceCode.getRegionCode("New Delhi", "NEW");
// DL
GetPlaceCode.getRegionCodeByCountry("India", "New Delhi", "", "new");

// BR
GetPlaceCode.getCountryCode("Brazil");
// IN
GetPlaceCode.getCountryCode("Country: INdïa", "Country: ");
```
