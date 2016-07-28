import { MainController } from './main.controller';
import { routerConfig } from './main.route';
import { DashboardController } from './dashboard/dashboard.controller';

module muumeCockpitMaterial.main {
  'use strict';

  angular.module('muumeCockpitMaterial.main',
    [])
    .controller('MainController', MainController)
    .controller('DashboardController', DashboardController)
    .config(routerConfig)
  ;
}
