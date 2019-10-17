A package that offers functions to help with object comparison (same keys, same keys and values, same content, in A but not in B). Includes tests to show it works.

# Installation

```
$ npm install js-object-compare
```

# Usage

<br />
<div style="border: 1px solid black; padding: 10px; background-color: #ffdb99; color: black;">Objects are equal if: they contain the same key/value pairs. The order in which they appear does not matter.</div>
<br />

```javascript
const jsoc = require("js-object-compare");

const obj1 = { num: 1, block1: { num: 2 } };
const obj2 = { block1: { num: 2 }, num: 1 };
const obj3 = { num: 1, block1: {} };
const obj4 = { num: 1, char: "a", block1: { num: 3 } };

// returns true because both objects have the exact same fiels (it does not matter they are not in the same order).
console.log(jsoc.sameContent(obj1, obj2));
// returns an object with block1 stripped away, because the object, at that location, does not contain anything.
console.log(jsoc.clearEmpties(obj3));
// returns all key/value pairs that are the same in both objects.
console.log(jsoc.equalKeyValue(obj1, obj4));
// returns all keys that exist in both objects (values may be different because of that they are undefined in the resulting object).
console.log(jsoc.equalKey(obj1, obj4));
// returns all key/value pairs that are part of param1 but do not exist in param2 (values may be different).
console.log(jsoc.in_A_ButNotIn_B(obj4, obj1));
```
