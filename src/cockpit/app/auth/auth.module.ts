import { routerConfig } from './auth.route';
import { ForgotPasswordController } from './forgotPassword/forgotPassword.controller';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';

module muumeCockpitMaterial.main {
  'use strict';

  angular.module('muumeCockpitMaterial.auth',
    [])
    .controller('ForgotPasswordController', ForgotPasswordController)
    .controller('ForgotPasswordController', LoginController)
    .controller('ForgotPasswordController', RegisterController)
    .config(routerConfig)
  ;
}
