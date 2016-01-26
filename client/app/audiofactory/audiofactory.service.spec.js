'use strict';

describe('Service: audiofactory', function () {

  // load the service's module
  beforeEach(module('thomasApp'));

  // instantiate service
  var audiofactory;
  beforeEach(inject(function (_audiofactory_) {
    audiofactory = _audiofactory_;
  }));

  it('should do something', function () {
    expect(!!audiofactory).toBe(true);
  });

});
