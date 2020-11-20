'use strict';

var _ = require('lodash'),
   os = require('os');

module.exports = function (grunt) {
  var hostname = os.hostname().replace(/[ ]/gi, '').replace('.local', '').toLowerCase();

  // Load in the acceptance test configs
  var acceptConfig = grunt.file.readJSON('test/accept/config.json');
  if (grunt.file.exists('test/accept/private-config.json')) {
    acceptConfig = _.defaults(grunt.file.readJSON('test/accept/private-config.json'), acceptConfig);
  }

  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt, {
    data: {
      // If provided, clients equal to or less than
      // this version will be locked out of the server
      familyLockoutVersion: '1.0.2',
      facilityLockoutVersion: '0.0.1',

      // Mobile app configs
      familyConfig: { 'version': '1.0.4' }, // grunt.file.readJSON('client/family/etc/config/config.json'),
      facilityConfig: { 'version': '1.1.5' }, // grunt.file.readJSON('client/facility/etc/config/config.json'),

      // Acceptance test config
      acceptConfig: acceptConfig,

      // Bower components used by both web and mobile (i.e., non-CDN)
      bowerCommon: [
        'bower_components/angularLocalStorage/src/angularLocalStorage.js',
        'bower_components/angular-extend-promises/angular-extend-promises-without-lodash.js',
        'bower_components/angular-filereader/angular-filereader.js',
        'node_modules/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.js',
        'bower_components/angular-validation-match/dist/angular-input-match.js',
        'bower_components/lodash/dist/lodash.js',
        'bower_components/log4javascript/js/log4javascript_production.js',
        'bower_components/moment/moment.js',
        'bower_components/moment-timezone/builds/moment-timezone-with-data.js',
        'bower_components/ng-debounce/angular-debounce.js',
        'bower_components/pluralize/pluralize.js',
        'bower_components/pubnub-angular/dist/pubnub-angular.js',
        'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
        'bower_components/rrule/lib/rrule.js',
        'bower_components/rrule/lib/nlp.js',
        'bower_components/underscore.string/lib/underscore.string.js',
        'bower_components/zxcvbn/dist/zxcvbn.js'
      ],

      // Bower components used only by mobile
      bowerMobile: [
        'bower_components/ionic/release/js/ionic.js',
        'bower_components/ionic/release/js/ionic-angular.js',
        'bower_components/ionic-datepicker/dist/ionic-datepicker.js',
        'bower_components/ionic-timepicker/dist/ionic-timepicker.js',
        'bower_components/stacktrace-js/stacktrace.js',
        'bower_components/blueimp-load-image/js/load-image.all.min.js',
        'bower_components/semver/semver.browser.js'
      ],

      // Bower components used only by web
      bowerWeb: [
        'bower_components/jQuery-contextMenu/dist/jquery.contextMenu.min.js',
        'bower_components/ng-ckeditor/ng-ckeditor.js',
        'bower_components/nghandsontable/dist/ngHandsontable.js',
        'bower_components/pdfmake/build/pdfmake.js',
        'bower_components/pdfmake/build/vfs_fonts.js',
        'bower_components/ics.js/ics.deps.min.js'
      ],

      // Bower components used by mobile but served by CDN for web (i.e., CDN)
      bowerCDN: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/tooltipster/dist/js/tooltipster.bundle.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-jwt/dist/angular-jwt.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
        'bower_components/ckeditor/ckeditor.js',
        'bower_components/ckeditor/vendor/promise.js',
        'bower_components/d3/d3.js',
        'bower_components/pubnub/web/pubnub.js',
        'bower_components/spectrum/spectrum.js'
      ],

      // Bower components only for karma testing
      bowerUnitTest: [
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/sinonjs/sinon.js',
        'bower_components/tooltipster/dist/js/tooltipster.bundle.js',
        'bower_components/uri.js/src/URI.min.js',
        'bower_components/es5-shim/es5-shim.js',
        'bower_components/fullcalendar/dist/fullcalendar.js',
        'bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
        'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
        'bower_components/select2/select2.js',
        'bower_components/datatables/media/js/jquery.dataTables.min.js',
        'bower_components/datatables-buttons/js/dataTables.buttons.js',
        'bower_components/datatables-fixedColumns/js/dataTables.fixedColumns.js',
        'bower_components/url-search-params/index.js'
      ],

      // Build configuration
      buildSettings: {
        urlMap: {
          'https://www.sagelyweb.com': { color: 'white' },
          'http://www.sagelyweb.com':  { color: 'white', decoration: 'line-through' },
          'https://sagely-staging.goonies3.com/': { color: '#fff59d' },
          'http://sagely-staging.goonies3.com/': { color: '#fff59d', decoration: 'line-through' },
          'http://10.8.205.102:3000': { color: 'purple' },
          'http://10.8.205.167:3000': { color: 'orange' },
          'http://10.8.205.147:3000': { color: 'brown' },
          'http://10.8.205.157:3000': { color: 'hotpink' },
          'http://10.8.205.161:3000': { color: 'red' },
          'http://10.8.205.171:3000': { color: 'blue' }
        },
        development: {
          apiUrl: 'http://54.151.182.209:7111/',
          staticUrl: 'http://54.151.182.209:3000/',
          assetUrl: 'http://s3-us-west-2.amazonaws.com/assets.sagelyweb.com/',
          queryUrl: 'http://localhost:7311/',
          slideshowUrl: 'http://localhost:7112/',
          cookieDomain: 'localhost',
          triggerStream: 'development',
          supportEmail: hostname + '_support@gosagely.com',
          pubnub: {
            subscribeKey: 'sub-c-81c1977e-15ff-11e5-b66b-02ee2ddab7fe'
          },
          pushwoosh: {
            applicationId: '4B65F-86D51',
            gcmId: '951504048312'
          },
          analytics: {
            web: {
              gaCode: 'UA-57333309-1'
            },
            facility: {
              gaCode: 'UA-57333309-3'
            },
            family: {
              gaCode: 'UA-57333309-4'
            },
            signage: {
              gaCode: ''
            }
          }
        },
        staging: {
          apiUrl: 'https://sagely-api.goonies3.com/',
          assetUrl: 'https://s3-us-west-2.amazonaws.com/assets.sagelyweb.com/',
          staticUrl: 'https://sagely-staging-static.goonies3.com/',
          queryUrl: 'https://sagely-query.goonies3.com/',
          slideshowUrl: 'http://sagely-sign.goonies3.com/index.html',
          cookieDomain: '.goonies3.com',
          triggerStream: 'development',
          supportEmail: 'staging_support@gosagely.com',
          pubnub: {
            subscribeKey: 'sub-c-81c1977e-15ff-11e5-b66b-02ee2ddab7fe'
          },
          pushwoosh: {
            applicationId: '4B65F-86D51',
            gcmId: '951504048312'
          },
          analytics: {
            web: {
              gaCode: 'UA-57333309-1',
              woopraDomain: 'realapp-staging.goonies3.com'
            },
            facility: {
              gaCode: 'UA-57333309-3',
              woopraDomain: 'realapp-staging.goonies3.com'
            },
            family: {
              gaCode: 'UA-57333309-4',
              woopraDomain: 'realapp-staging.goonies3.com'
            },
            signage: {
              gaCode: 'UA-57333309-4',
              woopraDomain: 'realapp-staging.goonies3.com'
            }
          }
        },
        production: {
          apiUrl: 'https://api.sagelyweb.com/',
          assetUrl: 'https://s3-us-west-2.amazonaws.com/assets.sagelyweb.com/',
          staticUrl: 'https://static.sagelyweb.com/',
          queryUrl: 'https://rds.sagelyweb.com/',
          slideshowUrl: 'http://sign.sagelyweb.com/index.html',
          cookieDomain: '.sagelyweb.com',
          triggerStream: 'production',
          supportEmail: 'support@gosagely.com',
          pubnub: {
            subscribeKey: 'sub-c-33d4a8ca-1600-11e5-9808-02ee2ddab7fe'
          },
          pushwoosh: {
            applicationId: 'CD62B-2C97E',
            gcmId: '951504048312'
          },
          analytics: {
            web: {
              gaCode: 'UA-57329710-1',
              woopraDomain: 'sagelyweb.com'
            },
            facility: {
              gaCode: 'UA-57329710-3',
              woopraDomain: 'sagelyweb.com'
            },
            family: {
              gaCode: 'UA-57329710-4',
              woopraDomain: 'sagelyweb.com'
            },
            signage: {
              gaCode: '',
              woopraDomain: 'sagelyweb.com'
            }
          }
        }
      },

      // Get a URL mapping function to go up directories
      upDirectory: function (count) {
        count = count || 1;
        return function (value) {
          return _.times(count, function () { return '../'; }).join('') + value;
        };
      },

      OpsWorksStackName: 'prod.sagelyweb.com',
      OpsWorksAppName: 'Sagely',
      StagingOpsWorksStackName: 'Sagely-Staging',
      StagingOpsWorksAppName: 'Sagely Staging',
      StagingJenkinsJob: 'Sagely-Test'
    }
  });

  // custom tasks
  grunt.loadTasks('grunt/tasks');
};
