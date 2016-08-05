import { MyService } from './my.service';

describe('My tests', () => {
  var myServiceProvider: MyService;
  var myService;
  var state: angular.ui.IStateService;
  var configs = {
    default: {
      node: [{name: 'test'}],
      state: {
        url: 'test/',
        name: 'main.test',
        controller: 'TestController',
        controllerAs: 'vm',
        templateUrl: 'app/main/test/test.html'
      }
    }
  };

  beforeEach(angular.mock.module('IgDashboard'));

  beforeEach(function () {
    angular.mock.module(function (MyServiceProvider: MyService, $stateProvider: angular.ui.IStateProvider) {
      myServiceProvider = MyServiceProvider;

      $stateProvider.state('main', {
        url: '/'
      });
    });
  });

  beforeEach(inject((_MyService_: any, _$state_: angular.ui.IStateService) => {
    myService = _MyService_;
    state = _$state_;
  }));

  it('should create a default state', () => {
    myServiceProvider.addNodesConfig(configs.default.node);
    expect(configs.default.state).toEqual(state.get('main.test'));
  });
});
