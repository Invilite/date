# @invilite/date
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/8449157170aa4b85bf9a2c9697c49fad)](https://www.codacy.com/gh/Invilite/date/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Invilite/date&amp;utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/54f496f7eafa0dbde44b/maintainability)](https://codeclimate.com/github/Invilite/date/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/invilite/date/badge.svg)](https://snyk.io/test/github/invilite/date)
[![Version](https://img.shields.io/badge/dynamic/json?color=brightgreen&label=version&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2FInvilite%2Fdate%2Fmaster%2Fpackage.json)](https://github.com/Invilite/date/blob/master/package.json)
[![License](https://img.shields.io/badge/license-GPL--3.0-blue)](https://github.com/Invilite/date/blob/master/LICENSE)

![Unit tests](https://github.com/invilite/date/actions/workflows/unit.js.yml/badge.svg?branch=master)

Extends native Date object by adding new methods.

## Highlights
- No overriding built-in methods
- No dependencies
- Focus on high performance
- TypeScript type definitions included

## Install
This is a Node.js module available through the npm registry.

Using npm:
```shell
$ npm install @invilite/date
```

Using bower:
```shell
$ bower install @invilite/date
```

Using yarn:
```shell
$ yarn add @invilite/date
```

## Usage

```typescript
import "@invilite/date";

const date = new Date();

// Outputs: 2022-04-08 14:30:00.0
console.log(date.format("YY-MM-D HH:mm:ss.S"));
```

## Methods

### format()
Return the formatted date string in the given format.

#### Syntax
```
format(format: string): string;
```

#### Example
```typescript
const date = new Date();
const formattedDate = date.format("YY-MM-D HH:mm:ss.S");
```

#### Accepted patterns:
| Pattern | Description                                              | Example |
|:-------:|----------------------------------------------------------|:-------:|
|    Y    | A two digit representation of a year                     |   22    |
|   YY    | A full numeric representation of a year                  |  2022   |
|    M    | Numeric representation of a month, without leading zeros |    3    |
|   MM    | Numeric representation of a month, with leading zeros    |   03    |
|    B    | Full month name                                          | January |
|    b    | Short month name                                         |   Jan   |
|    D    | Day of the month without leading zeros                   |    9    |
|   DD    | Day of the month, 2 digits with leading zeros            |   09    |
|    H    | 24-hour format of an hour without leading zeros          |   17    |
|   HH    | 24-hour format of an hour with leading zeros             |   17    |
|    h    | 12-hour format of an hour without leading zeros          |    9    |
|   hh    | 12-hour format of an hour with leading zeros             |   09    |
|    m    | Minutes without leading zeros                            |    5    |
|   mm    | Minutes with leading zeros                               |   05    |
|    s    | Seconds without leading zeros                            |    0    |
|   ss    | Seconds with leading zeros                               |   00    |
|    S    | Milliseconds without leading zeros                       |   34    |
|   SS    | Milliseconds with leading zeros                          |   034   |
|    a    | Lowercase Ante meridiem and Post meridiem                |   am    |
|    A    | Uppercase Ante meridiem and Post meridiem                |   AM    |
|    z    | Timezone offset in minutes                               |  -120   |
|    Z    | Timezone offset in standard format                       | +02:00  |

### toUnixTimestamp()
Get the seconds timestamp of the given date.

#### Syntax
```
toUnixTimestamp(): number;
```

#### Example
```typescript
const date = new Date();
const timestamp = date.toUnixTimestamp();
```

### addSeconds()
Add the specified number of seconds to the given date. Returns current object with the seconds added.

#### Syntax
```
addSeconds(seconds: number): Date;
```

#### Example
```typescript
const date = new Date();
date.addSeconds(600);
```

### diffFrom()
Get number of seconds, that represents time difference between two dates.

#### Syntax
```
diffFrom(date: Date | string = new Date()): number;
```

#### Example
```typescript
const date = new Date("2022-04-18 15:50:40");
const futureDate = new Date("2022-04-18 14:30:00");

console.log(date.diffFrom(futureDate));
// Outputs: 4840
```

### textDiffFrom()
Get formatted string (in English), that represents time difference between two dates.

#### Syntax
```
textDiffFrom(date: Date): string;
```

#### Example
```typescript
const date = new Date("2022-04-18 15:50:40");
const futureDate = new Date("2022-04-18 14:30:00");

console.log(date.textDiffFrom(futureDate));
// Outputs: '1 hour, 20 minutes, 40 seconds'
```

## Browser support
TBD

## License
Library is licensed under a [GNU General Public License v3.0](https://github.com/Invilite/date/blob/master/LICENSE)