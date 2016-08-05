export interface IHMenuNode {
  label?: string;
  name: string;
  icon?: string;
  hidden?: boolean;
  children?: IHMenuNode[];
}

export interface INode extends IHMenuNode {
  url?: string;
  abstract?: boolean;
  isResource?: boolean;
  parent?: INode;
  children?: INode[];
}

export interface IDlSidenavService {
  getHMenuNodes(): IHMenuNode[];
  getNodes();
}

/** @ngInject */
export class DlSidenavService {
  // private nodes: INode[] = [];
  private preparedNodes; // temporary
  private hMenuNodes: IHMenuNode[] = [];
  // private parentContextPath: string;

  constructor(private $stateProvider: angular.ui.IStateProvider) {
  }

  // provider's factory function
  public $get(): IDlSidenavService {
    return {
      getHMenuNodes: () => this.hMenuNodes,
      getNodes: () => this.preparedNodes // temporary
    };
  }
  //
  // public addNodes(nodes: INode[], parentModules: string[] = ['main'], contextPath: string = 'app/') {
  //   // prepare nodes - parse nodes and generate necessary child nodes
  //   this.preparedNodes = this.prepareNodes(nodes, parentModules, contextPath);
  //
  //   // attach prepared nodes to $stateProvider
  //   this.attachPreparedNodesToRouter(this.preparedNodes);
  //
  //   // prepare hmenu nodes - parse nodes and build the configuration needed for hmenu and attach it to hmenu
  //   this.prepareHMenuNodes(this.preparedNodes);
  // }
  //
  // private prepareNodes(nodes: INode[], parentModules: string[], contextPath: string) {
  //   if (angular.isArray(nodes) && nodes.length) {
  //     var preparedNodes = [], preparedNode, stateName, modules, hidden;
  //
  //     nodes.forEach((node: INode) => {
  //       modules = parentModules.concat(node.name);
  //       stateName = modules.join('.');
  //       hidden = node.hidden;
  //       preparedNode = {};
  //
  //       if (node.isResource) {
  //         preparedNode.abstract = true;
  //         preparedNode.template = '<ui-view></ui-view>';
  //         preparedNode.url = node.url || node.name;
  //         this.preparedResourceChildNodes(node);
  //         hidden = true;
  //       } else {
  //         preparedNode.label = node.label;
  //         preparedNode.url = node.url || node.name + '/';
  //       }
  //
  //       preparedNodes.push({
  //         name: stateName,
  //         config: preparedNode,
  //         hidden: hidden,
  //         children: this.prepareNodes(node.children, modules, contextPath)
  //       });
  //     });
  //
  //     return preparedNodes;
  //   } else {
  //     return null;
  //   }
  // }
  //
  // private prepareHMenuNodes(preparedNodes: any) {
  //   var hMenuNode;
  //   preparedNodes.forEach((preparedNode: any) => {
  //     if (!preparedNode.hidden) {
  //       hMenuNode = {};
  //       hMenuNode.name = preparedNode.name;
  //
  //       this.hMenuNodes.push(hMenuNode);
  //     }
  //   });
  // }
  //
  // private attachPreparedNodesToRouter(preparedNodes: any) {
  //   preparedNodes.forEach((preparedNode: any) => {
  //     this.$stateProvider.state(preparedNode.name, preparedNode.config);
  //
  //     if (angular.isArray(preparedNode.children) && preparedNode.children.length) {
  //       this.attachPreparedNodesToRouter(preparedNode.children);
  //     }
  //   });
  // }
  //
  // public injectStates(nodes: INode[], parentContextPath: string = 'app/') {
  //   this.parentContextPath = parentContextPath;
  //
  //   this.injectRoutes(this.nodes, ['main']);
  // }
  //
  // protected injectRoutes(nodes: INode[], parentContext: string[] = [], parent: INode = null) {
  //   var context: string[], stateConfig;
  //
  //   nodes.forEach((node: INode) => {
  //     if (parent) {
  //       node.parent = parent;
  //     }
  //
  //     context = parentContext.concat(node.name);
  //     stateConfig = {};
  //
  //       stateConfig.url = node.url || node.name + '/';
  //       //*
  //       stateConfig.template = this.makeTemplateName(node);
  //       /*/
  //        stateConfig.templateUrl = [].concat(this.parentContextPath, context.join('/'), '/', node.name, '.html').join('');
  //        stateConfig.controller = [node.name.charAt(0).toUpperCase(), node.name.substr(1), 'Controller'].join('');
  //        stateConfig.controllerAs = 'vm';
  //        //*/
  //
  //       this.$stateProvider.state(context.join('.'), stateConfig);
  //
  //     // node.urlState = context.join('.');
  //
  //     if (angular.isArray(node.children) && node.children.length) {
  //       this.injectRoutes(node.children, context, node);
  //     }
  //   });
  //
  // }
  //
  // private makeTemplateName(state: INode): string {
  //   var name = [];
  //
  //   do {
  //     name.unshift(state.label);
  //   } while (state = state.parent);
  //
  //   return name.join(' / ');
  // }
  //
  // private preparedResourceChildNodes(node: INode) {
  //   if (!angular.isArray(node.children)) {
  //     node.children = [];
  //   } else {
  //     fixUrlInResourceChildNodes(node.children);
  //   }
  //
  //   ['list', 'add', 'edit'].forEach((child: string) => {
  //     var index = indexInArray(node.children, child);
  //     if (index === -1) {
  //       var conf: INode = {
  //         name: child
  //       };
  //
  //       if (child === 'list') {
  //         conf.url = '/';
  //       } else {
  //         conf.url = '/' + child;
  //         conf.hidden = true;
  //       }
  //
  //       node.children.push(conf);
  //     }
  //   });
  //
  //   function indexInArray(arr: INode[], key: string) {
  //     return arr.map((el: any) => {
  //       return el.name;
  //     }).indexOf(key);
  //   }
  //
  //   function fixUrlInResourceChildNodes(nodes: INode[]) {
  //     nodes.forEach((node: INode) => {
  //       node.url = node.url || '/' + node.name;
  //       if (node.url.indexOf('/') !== 0) {
  //         node.url = '/' + node.url;
  //       }
  //     });
  //   }
  // }
}
