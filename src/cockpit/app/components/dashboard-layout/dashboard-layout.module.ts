/// <reference path="../../../../../typings/main.d.ts" />

import { config } from './dashboard-layout.config';
import { dashboardLayout } from './dashboard-layout.directive';
import { dlHeader } from './components/header/header.directive';
import { dlSidenav, dlSidenavMenu } from './components/sidenav/sidenav.directive';
import { DlSidenavService } from './components/sidenav/sidenav.service';

module IgDashboard {
  'use strict';

  angular.module('IgDashboard',
    [
      'ngAnimate',
      'ngCookies',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ui.router',
      'ngMaterial',
      'toastr'
    ])
    .directive('dashboardLayout', dashboardLayout)
    .directive('dlHeader', dlHeader)
    .directive('dlSidenav', dlSidenav)
    .directive('dlSidenavMenu', dlSidenavMenu)
    .provider('DlSidenavService', DlSidenavService)
    .config(config)
  ;
}
