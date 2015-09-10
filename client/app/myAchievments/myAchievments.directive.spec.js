'use strict';

describe('Directive: myAchievments', function () {

  // load the directive's module and view
  beforeEach(module('yoprojApp'));
  beforeEach(module('app/myAchievments/myAchievments.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-achievments></my-achievments>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the myAchievments directive');
  }));
});