export interface INode {
  label: string;
  name: string;
  urlState?: string;
  url?: string;
  icon?: string;
  hiddenInMenu?: boolean;
  abstract?: boolean;
  isResource?: boolean;
  children?: INode[];
  parent?: INode;
}

export interface IDlSidenavService {
  getNodes(): INode[];
}

/** @ngInject */
export class DlSidenavService {
  private nodes: INode[] = [];
  private parentContextPath: string;

  constructor(private $stateProvider: angular.ui.IStateProvider) {
  }

  public injectStates(nodes: INode[], parentContextPath: string = 'app/') {
    this.nodes = this.nodes.concat(nodes);
    this.parentContextPath = parentContextPath;

    this.injectRoutes(this.nodes, ['main']);

    console.log(this.nodes);
  }

  protected injectRoutes(nodes: INode[], parentContext: string[] = [], parent: INode = null) {
    var context: string[], stateConfig;

    nodes.forEach((node: INode) => {
      if (parent) {
        node.parent = parent;
      }

      context = parentContext.concat(node.name);
      stateConfig = {};

      if (node.isResource) {
        // create abstract route
        this.$stateProvider.state(context.join('.'), {
          template: '<ui-view></ui-view>'
        });

        this.$stateProvider.state(context.join('.') + '.list', {
          url: node.name + '/',
          template: this.makeTemplateName(node) + ' / List',
          controller: [node.name.charAt(0).toUpperCase(), node.name.substr(1), 'List', 'Controller'].join('')
        });

        this.$stateProvider.state(context.join('.') + '.add', {
          url: node.name + '/add/',
          template: this.makeTemplateName(node) + ' / Add',
          controller: [node.name.charAt(0).toUpperCase(), node.name.substr(1), 'Add', 'Controller'].join('')
        });

        this.$stateProvider.state(context.join('.') + '.edit', {
          url: node.name + '/edit/',
          template: this.makeTemplateName(node) + ' / Edit',
          controller: [node.name.charAt(0).toUpperCase(), node.name.substr(1), 'Edit', 'Controller'].join('')
        });
      } else {
        stateConfig.url = node.url || node.name + '/';
        //*
        stateConfig.template = this.makeTemplateName(node);
        /*/
         stateConfig.templateUrl = [].concat(this.parentContextPath, context.join('/'), '/', node.name, '.html').join('');
         stateConfig.controller = [node.name.charAt(0).toUpperCase(), node.name.substr(1), 'Controller'].join('');
         stateConfig.controllerAs = 'vm';
         //*/

        this.$stateProvider.state(context.join('.'), stateConfig);
      }

      node.urlState = context.join('.');

      if (angular.isArray(node.children) && node.children.length) {
        this.injectRoutes(node.children, context, node);
      }
    });

  }

  private makeTemplateName(state: INode): string {
    var name = [];

    do {
      name.unshift(state.label);
    } while (state = state.parent);

    return name.join(' / ');
  }

  // provider's factory function
  public $get(): IDlSidenavService {
    return {
      getNodes: () => this.nodes
    };
  }
}
