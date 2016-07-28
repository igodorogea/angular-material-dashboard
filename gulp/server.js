'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var fs = require('fs');
var url = require("url");

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
   */

  var proxy = proxyMiddleware('/' + conf.paths.context, {
    target: 'https://beta.muume.com',
    changeOrigin: true,
    onError: function (err, req, res) {
      console.log('onError');
    },
    onProxyReq: function (proxyReq, req, res) {
      // console.log('onProxyReq', JSON.stringify(proxyRes.headers));
      if (req.headers && req.headers.referer) {
        req.headers.referer = req.headers.referer.replace('http://localhost:3000/' + conf.paths.context, 'https://beta.muume.com/' + conf.paths.context)
      }
    },
    onProxyRes: function (proxyRes, req, res) {
      // console.log('onProxyRes', JSON.stringify(proxyRes.headers));
      if (proxyRes.headers && proxyRes.headers.location) {
        proxyRes.headers.location = proxyRes.headers.location.replace('https://beta.muume.com', 'http://localhost:3000')
      }
    }
  });

  function fileExists(baseDir, request) {
    if (util.isArray(baseDir)) {
      baseDir.reverse();
      for (var i = 0, len = baseDir.length; i < len; i++) {
        var uri = url.parse(request.url).pathname,
          filename = path.join(process.cwd(), baseDir[i], uri),
          status,
          index = '/index.html';

        try {
          status = fs.statSync(filename);

          if (status.isDirectory()) {
            status = fs.statSync(filename + index);

            request.url += index;
          }

          return true;
        } catch (err) {
        }
      }
    }
    return false;
  }

  server.middleware = [
    function (request, response, next) {
      // debugger;

      // check if requested file exists locally
      if (fileExists(baseDir, request)) {
        // if exists call next()
        next();
      } else {
        // else call proxy()
        proxy(request, response, next);
      }
    }
  ];

  browserSync.instance = browserSync.init({
    startPath: conf.paths.context + '/',
    server: server,
    browser: browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});
