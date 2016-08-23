'use strict'

var util = require('util')
var zlib = require('zlib')
var test = require('tape')
var nock = require('nock')
var afterAll = require('after-all-results')
var git = require('./lib/git')
var ReleaseTracker = require('./')

// git regexes are not 100% - but better than nothing
var validRev = /^[\da-f]{40}$/
var validBranchName = /^(?!.*\/\.)(?!.*\.\.)(?!\/)(?!.*\/\/)(?!.*@\{)(?!.*\\)[^\040\177 ~^:?*[]+$/

test('git.rev', function (t) {
  git.rev(process.cwd(), function (err, rev) {
    t.error(err)
    t.equals(typeof rev, 'string')
    t.ok(validRev.test(rev), 'should be a valid rev')
    t.end()
  })
})

test('git.branch', function (t) {
  git.branch(process.cwd(), function (err, branch) {
    t.error(err)
    t.equals(typeof branch, 'string')
    t.ok(validBranchName.test(branch), 'should be a valid branch')
    t.end()
  })
})

test('init - no options', function (t) {
  t.throws(ReleaseTracker)
  t.end()
})

test('init - default options', function (t) {
  process.env.OPBEAT_APP_ID = 'test'
  process.env.OPBEAT_ORGANIZATION_ID = 'test'
  process.env.OPBEAT_SECRET_TOKEN = 'test'
  var tracker = ReleaseTracker()
  delete process.env.OPBEAT_APP_ID
  delete process.env.OPBEAT_ORGANIZATION_ID
  delete process.env.OPBEAT_SECRET_TOKEN
  t.equals(typeof tracker, 'function')
  t.equals(tracker.name, 'track')
  t.end()
})

test('init - custom options', function (t) {
  var tracker = ReleaseTracker({
    appId: 'test',
    organizationId: 'test',
    secretToken: 'test'
  })
  t.equals(typeof tracker, 'function')
  t.equals(tracker.name, 'track')
  t.end()
})

test('track - no options', function (t) {
  var next = afterAll(function (err, results) {
    t.error(err)

    var body = {
      rev: results[0],
      branch: results[1],
      status: 'completed'
    }

    zlib.deflate(JSON.stringify(body), function (err, buffer) {
      t.error(err)

      var scope = nock('https://intake.opbeat.com')
        .filteringRequestBody(function (body) {
          t.equal(body, buffer.toString('hex'))
          return 'ok'
        })
        .post('/api/v1/organizations/test-org-id/apps/test-app-id/releases/', 'ok')
        .reply(202)

      var tracker = ReleaseTracker({
        appId: 'test-app-id',
        organizationId: 'test-org-id',
        secretToken: 'test-token'
      })

      tracker(function (err) {
        scope.done()
        t.error(err)
        t.end()
      })
    })
  })

  var cwd = process.cwd()
  git.rev(cwd, next())
  git.branch(cwd, next())
})

test('track - custom rev', function (t) {
  var cwd = process.cwd()
  git.branch(cwd, function (err, branch) {
    t.error(err)

    var body = {
      rev: 'my-rev',
      branch: branch,
      status: 'completed'
    }

    zlib.deflate(JSON.stringify(body), function (err, buffer) {
      t.error(err)

      var scope = nock('https://intake.opbeat.com')
        .filteringRequestBody(function (body) {
          t.equal(body, buffer.toString('hex'))
          return 'ok'
        })
        .post('/api/v1/organizations/test-org-id/apps/test-app-id/releases/', 'ok')
        .reply(202)

      var tracker = ReleaseTracker({
        appId: 'test-app-id',
        organizationId: 'test-org-id',
        secretToken: 'test-token'
      })

      tracker({ rev: body.rev }, function (err) {
        scope.done()
        t.error(err)
        t.end()
      })
    })
  })
})

test('track - custom branch', function (t) {
  var cwd = process.cwd()
  git.rev(cwd, function (err, rev) {
    t.error(err)

    var body = {
      branch: 'my-branch',
      rev: rev,
      status: 'completed'
    }

    zlib.deflate(JSON.stringify(body), function (err, buffer) {
      t.error(err)

      var scope = nock('https://intake.opbeat.com')
        .filteringRequestBody(function (body) {
          t.equal(body, buffer.toString('hex'))
          return 'ok'
        })
        .post('/api/v1/organizations/test-org-id/apps/test-app-id/releases/', 'ok')
        .reply(202)

      var tracker = ReleaseTracker({
        appId: 'test-app-id',
        organizationId: 'test-org-id',
        secretToken: 'test-token'
      })

      tracker({ branch: body.branch }, function (err) {
        scope.done()
        t.error(err)
        t.end()
      })
    })
  })
})

test('track - custom everything', function (t) {
  var body = {
    branch: 'my-branch',
    rev: 'my-rev',
    status: 'machine-completed',
    machine: 'foo'
  }

  zlib.deflate(JSON.stringify(body), function (err, buffer) {
    t.error(err)

    var scope = nock('https://intake.opbeat.com')
      .filteringRequestBody(function (body) {
        t.equal(body, buffer.toString('hex'))
        return 'ok'
      })
      .post('/api/v1/organizations/test-org-id/apps/test-app-id/releases/', 'ok')
      .reply(202)

    var tracker = ReleaseTracker({
      appId: 'test-app-id',
      organizationId: 'test-org-id',
      secretToken: 'test-token'
    })

    tracker(body, function (err) {
      scope.done()
      t.error(err)
      t.end()
    })
  })
})

test('track - no auto', function (t) {
  var body = {
    rev: 'my-rev',
    status: 'completed'
  }

  zlib.deflate(JSON.stringify(body), function (err, buffer) {
    t.error(err)

    var scope = nock('https://intake.opbeat.com')
      .filteringRequestBody(function (body) {
        t.equal(body, buffer.toString('hex'))
        return 'ok'
      })
      .post('/api/v1/organizations/test-org-id/apps/test-app-id/releases/', 'ok')
      .reply(202)

    var tracker = ReleaseTracker({
      appId: 'test-app-id',
      organizationId: 'test-org-id',
      secretToken: 'test-token',
      auto: false
    })

    tracker({ rev: body.rev }, function (err) {
      scope.done()
      t.error(err)
      t.end()
    })
  })
})

test('track - no auto and no rev', function (t) {
  var tracker = ReleaseTracker({
    appId: 'test-app-id',
    organizationId: 'test-org-id',
    secretToken: 'test-token',
    auto: false
  })

  tracker(function (err) {
    t.ok(util.isError(err))
    t.equals(err.message, 'Required git revision not provided')
    t.end()
  })
})

test('track - http error', function (t) {
  var scope = nock('https://intake.opbeat.com')
    .filteringRequestBody(function () { return 'ok' })
    .post('/api/v1/organizations/test-org-id/apps/test-app-id/releases/', 'ok')
    .reply(500)

  var tracker = ReleaseTracker({
    appId: 'test-app-id',
    organizationId: 'test-org-id',
    secretToken: 'test-token'
  })

  tracker(function (err) {
    scope.done()
    t.ok(util.isError(err))
    t.equals(err.message, 'Unexpected Opbeat HTTP status code: 500')
    t.end()
  })
})

test('track - no callback and http error', function (t) {
  var scope = nock('https://intake.opbeat.com')
    .filteringRequestBody(function () { return 'ok' })
    .post('/api/v1/organizations/test-org-id/apps/test-app-id/releases/', 'ok')
    .reply(500)

  var tracker = ReleaseTracker({
    appId: 'test-app-id',
    organizationId: 'test-org-id',
    secretToken: 'test-token'
  })

  tracker()

  setTimeout(function () {
    scope.done()
    t.end()
  }, 100)
})
