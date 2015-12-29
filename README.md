# Neon-bridge

[![npm](https://img.shields.io/npm/v/neon-bridge.svg)](https://www.npmjs.com/package/neon-bridge)

Automatically load [Neon](https://github.com/dherman/neon) modules.

# API

```javascript
var myNeonModule = require('neon-bridge').load();
```

You can override defaults by passing an optional options object to the `neon-bridge` module:

| Option    | Description   | Type     | Default                                                                  |
| --------- | ------------- | -------- | ------------------------------------------------------------------------ |
| root      | project root  | string   | nearest containing directory of caller with package.json or node_modules |
| name      | library name  | string   | parse($manifest).package.name                                            |
| manifest  | manifest path | path     | $root/Cargo.toml                                                         |

# License

MIT
