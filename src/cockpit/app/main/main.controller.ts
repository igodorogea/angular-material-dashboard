
import { IDlSidenavService } from '../components/dashboard-layout/components/sidenav/sidenav.service';
/** @ngInject */
export class MainController {
  public nodes;
  public states;

  constructor(DlSidenavService: IDlSidenavService, $state: angular.ui.IStateService) {
    this.nodes = DlSidenavService.getNodes();
    this.states = $state.get();
  }
}
