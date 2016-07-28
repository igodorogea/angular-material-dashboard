export interface IDlStateConfig {
  label: string;
  name: string;
  urlState?: string;
  url?: string;
  icon?: string;
  children?: IDlStateConfig[];
}

export interface IDlSidenavService {
  getStates(): IDlStateConfig[];
}

/** @ngInject */
export class DlSidenavService {
  private statesConfig: IDlStateConfig[] = [];
  private parentContextPath: string;

  constructor(private $stateProvider: angular.ui.IStateProvider) {}

  public injectStates(states: IDlStateConfig[], parentContextPath: string = 'app/') {
    this.statesConfig = this.statesConfig.concat(states);
    this.parentContextPath = parentContextPath;

    this.injectRoutes(this.statesConfig, ['main']);
  }

  protected injectRoutes(states: IDlStateConfig[], parentContext: string[] = []) {
    var context: string[], stateConfig;

    states.forEach((state: IDlStateConfig) => {
      context = parentContext.concat(state.name);
      stateConfig = {
        url: state.url || state.name + '/',
        templateUrl: [].concat(this.parentContextPath, context.join('/'), '/', state.name, '.html').join(''),
        controller: [state.name.charAt(0).toUpperCase(), state.name.substr(1), 'Controller'].join(''),
        controllerAs: 'vm'
      };

      this.$stateProvider.state(context.join('.'), stateConfig);
      state.urlState = context.join('.');

      if (angular.isArray(state.children) && state.children.length) {
        this.injectRoutes(state.children, context);
      }
    });
  }

  // provider's factory function
  public $get(): IDlSidenavService {
    return {
      getStates: () => this.statesConfig
    };
  }
}
