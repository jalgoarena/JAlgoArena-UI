# opbeat-release-tracker

[![Build status](https://travis-ci.org/watson/opbeat-release-tracker.svg?branch=master)](https://travis-ci.org/watson/opbeat-release-tracker)

[![js-standard-style](https://raw.githubusercontent.com/feross/standard/master/badge.png)](https://github.com/feross/standard)

A simple module to track a release on Opbeat.

Please note that release tracking is [built
in](https://github.com/opbeat/opbeat-node#release-tracking) to the
official Opbeat node.js module.

## Installation

```
npm install opbeat-release-tracker
```

## Usage

The module exposes a single init function:

```js
var trackRelease = require('opbeat-release-tracker')({ ... })
```

The init function takes an optional options hash with the following
properties:

- `appId` - The Opbeat app id (falls back to the `OPBEAT_APP_ID`
  environment variable)
- `organizationId` - The Opbeat organization id (falls back to the
  `OPBEAT_ORGANIZATION_ID` environment variable)
- `secretToken` - The Opbeat secret token (falls back to the
  `OPBEAT_SECRET_ID` environment variable)
- `auto` - If `true` (default) opbeat-release-tracker will try to
  auto-detect the git rev and/or branch if not specifically given. Set
  to `false` to disable this behavior
- `cwd` - Directory where to auto-detect git rev or branch if those are
  not provided when tracking a release (falls back to `process.cwd()`)
- `userAgent` - Set if you wish to override the default HTTP User-Agent
  (this makes sense if you use the opbeat-release-tracker module as a
  submodule to another module)

The init function returns a release tracker function which can be called
to track a specific release:

```js
trackRelease([options][, callback])
```

The `options` object is optional but can be used to specify the
following properties:

- `rev` - Git commit hash of the release
- `branch` - Git branch of the deployed release
- `cwd` - Directory where to auto-detect git rev or branch if those are
  not provided (will override the `cwd` given upon initialization and
  fall back to `process.cwd()` if neither is provided)
- `status` - Either `completed` (default) or `machine-completed`
- `machine` - Name of the machine where the release was deployed (only
  valid if `status` is set to `machine-completed`)

The `callback` function is optional and will be called once the release
have been tracked. If an error occurred while tracking the release the
callback will be called with the Error object as the first argument.
Note that if an error occurres and no callback have been provided the
error is **not** thrown.

For more information about the Opbeat release API, check out [the
official API
documentation](https://opbeat.com/docs/api/intake/v1/#release-tracking).

## License

MIT
