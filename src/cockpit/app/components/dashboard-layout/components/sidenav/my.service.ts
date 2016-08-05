import IState = angular.ui.IState;
export interface INodeConfig {
  label?: string;
  name: string;
  icon?: string;
  url?: string;
  controller?: any;
  controllerAs?: string;
  template?: string;
  templateUrl?: string;
  isResource?: boolean;
  children?: INodeConfig[];
}

/** @ngInject */
export class MyService {
  public something = 'abc';

  constructor(private $stateProvider: angular.ui.IStateProvider) {
  }

  // provider's factory function
  public $get() {
    return {};
  }

  public addNodesConfig(nodesConfig: INodeConfig[], parentModule: string[] = ['main']) {
    nodesConfig.forEach((nodeConfig: INodeConfig) => {
      var name = parentModule.join('.') + '.' + nodeConfig.name;
      var config: IState = {};

      config.url = nodeConfig.url || nodeConfig.name + '/';

      if (nodeConfig.controller !== false) {
        config.controller = nodeConfig.controller || [nodeConfig.name.charAt(0).toUpperCase(), nodeConfig.name.substr(1), 'Controller'].join('');
        config.controllerAs = nodeConfig.controllerAs || 'vm';
      }

      if (nodeConfig.template) {
        config.template = nodeConfig.template;
      }

      config.templateUrl = nodeConfig.templateUrl || 'app/' + parentModule.join('/') + '/' + nodeConfig.name + '/' + nodeConfig.name + '.html';

      this.$stateProvider.state(name, config);
    });
  }
}
