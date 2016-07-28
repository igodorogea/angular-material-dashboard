import { IDlStateConfig, IDlSidenavService } from './sidenav.service';

/** @ngInject */
export function dlSidenavMenu(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {
      states: '='
    },
    template: `
        <div ng-repeat="state in states">
            <md-list-item ui-sref="{{state.urlState}}" ui-sref-active="active">
                <md-icon>{{state.icon}}</md-icon>
                <span flex>{{state.label}}</span>
            </md-list-item>
    
            <dl-sidenav-menu states="state.children"></dl-sidenav-menu>
        </div>
    `
  };
}

/** @ngInject */
export function dlSidenav(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    template: `
      <md-list flex>
          <dl-sidenav-menu states="vm.states"></dl-sidenav-menu>
      </md-list>
    `,
    controller: SidenavController,
    controllerAs: 'vm'
  };
}


/** @ngInject */
export class SidenavController {
  public states: IDlStateConfig[];

  constructor(DlSidenavService: IDlSidenavService) {
    this.states = DlSidenavService.getStates();
  }
}
