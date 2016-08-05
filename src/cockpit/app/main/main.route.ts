import { DlSidenavService } from '../components/dashboard-layout/components/sidenav/sidenav.service';

/** @ngInject */
export function routerConfig($stateProvider: angular.ui.IStateProvider, DlSidenavServiceProvider: DlSidenavService) {
  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'app/main/main.html',
    controller: 'MainController',
    controllerAs: 'main'
  });

  // let nodes = [
  //   {
  //     label: 'Resource',
  //     name: 'resource',
  //     isResource: true
  //   },
  //   {
  //     label: 'Parent 1',
  //     name: 'parent1',
  //     children: [
  //       {
  //         label: 'Child 1',
  //         name: 'child1'
  //       },
  //       {
  //         label: 'Child 2',
  //         name: 'child2',
  //         children: [
  //           {
  //             label: 'Grandchild 1',
  //             name: 'grandchild1'
  //           },
  //           {
  //             label: 'Grandchild 2',
  //             name: 'grandchild2',
  //             hiddenInMenu: true
  //           }
  //         ]
  //       },
  //       {
  //         label: 'Child 3',
  //         name: 'child3'
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Resource parent',
  //     name: 'resourceparent',
  //     isResource: true,
  //     children: [
  //       {
  //         label: 'Child 1',
  //         name: 'child1'
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Resource custom',
  //     name: 'resourcecustom',
  //     isResource: true,
  //     children: [
  //       {
  //         label: 'Add',
  //         name: 'add'
  //       }
  //     ]
  //   },
  // ];
  //
  // DlSidenavServiceProvider.addNodes(nodes, ['main']);
}
