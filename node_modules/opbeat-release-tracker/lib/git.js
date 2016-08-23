'use strict'

var exec = require('child_process').exec

var cmd = function (cmd, dir, cb) {
  exec(cmd, { cwd: dir }, function (err, stdout, stderr) {
    if (err) return cb(err)
    cb(null, stdout.toString().trim())
  })
}

exports.rev = function (dir, cb) {
  cmd('git rev-parse HEAD', dir, cb)
}

exports.branch = function (dir, cb) {
  cmd('git rev-parse --abbrev-ref HEAD', dir, cb)
}
