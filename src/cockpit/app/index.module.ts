/// <reference path="../../../typings/main.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

declare var moment: moment.MomentStatic;

module muumeCockpitMaterial {
  'use strict';

  angular.module('muumeCockpitMaterial',
    [
      'ngAnimate',
      'ngCookies',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ui.router',
      'ngMaterial',
      'toastr',
      'IgDashboard',
      'muumeCockpitMaterial.main',
      // 'muumeCockpitMaterial.auth',
    ])
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock);
}
