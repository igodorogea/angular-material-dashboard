import { DlSidenavService } from '../components/dashboard-layout/components/sidenav/sidenav.service';

/** @ngInject */
export function routerConfig($stateProvider: angular.ui.IStateProvider, DlSidenavServiceProvider: DlSidenavService) {
  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'app/main/main.html',
    controller: 'MainController',
    controllerAs: 'main'
  });

  let statesConfig = [
    {
      label: 'Dashboard',
      name: 'dashboard',
      icon: 'home'
    },
    {
      label: 'Account',
      name: 'account',
      icon: 'face',
      children: [
        {
          label: 'Personal data',
          name: 'personal'
        }
      ]
    },
    {
      label: 'Notification',
      name: 'notification',
      icon: ''
    },
  ];

  DlSidenavServiceProvider.injectStates(statesConfig);
}
