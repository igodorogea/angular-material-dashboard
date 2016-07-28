/** @ngInject */
export function dlHeader(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {
      sidenavId: '@'
    },
    template: `
        <md-toolbar layout="row" layout-align="center center">
            <div class="md-toolbar-tools">
                <md-button class="md-icon-button" hide-gt-sm ng-click="vm.openSidenav()">
                    <md-icon>menu</md-icon>
                </md-button>
                <div layout="row" flex>
                    <h2 class="md-toolbar-item md-breadcrumb md-headline">
                        <span>Gulp Angular</span>
                    </h2>
                    <section flex></section>
                </div>
            </div>
        </md-toolbar>
    `,
    controller: DlHeaderController,
    controllerAs: 'vm',
    bindToController: true
  };
}

/** @ngInject */
export class DlHeaderController {
  public sidenavId: string;

  constructor(private $mdSidenav: angular.material.ISidenavService) {
  }

  openSidenav() {
    this.$mdSidenav(this.sidenavId).open();
  }
}
