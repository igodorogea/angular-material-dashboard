/** @ngInject */
export function dashboardLayout(): angular.IDirective {

  return {
    restrict: 'E',
    transclude: {
      'logo': 'dlLogo',
      'sidenav': '?dlSideMenu',
      'header': '?dlHeaderBar'
    },
    template: `
        <md-sidenav
            class="md-sidenav-left md-whiteframe-z2"
            md-component-id="left"
            md-is-locked-open="$mdMedia('gt-sm')">
        
            <md-toolbar>
                <div class="md-toolbar-tools" ng-transclude="logo"></div>
            </md-toolbar>
        
            <md-content layout-padding ng-transclude="sidenav">
                <dl-sidenav></dl-sidenav>
            </md-content>
        </md-sidenav>
        
        <div layout="column" tabIndex="-1" role="main" flex>
            <header ng-transclude="header">
                <dl-header></dl-header>
            </header>
        
            <md-content md-scroll-y layout="column" flex>
                <div layout-padding flex="noshrink">
                    <div ui-view=""></div>
                </div>
            </md-content>
        </div>
    `
  };
}
