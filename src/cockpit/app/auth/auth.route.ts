/** @ngInject */
export function routerConfig($stateProvider: angular.ui.IStateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/auth/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'app/auth/register/register.html',
      controller: 'RegisterController',
      controllerAs: 'vm'
    })
    .state('forgotPassword', {
      url: '/forgot-password',
      templateUrl: 'app/auth/forgotPassword/forgotPassword.html',
      controller: 'ForgotPasswordController',
      controllerAs: 'vm'
    })
  ;
}
