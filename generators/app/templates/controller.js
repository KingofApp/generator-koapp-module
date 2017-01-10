(function() {
  'use strict';

  angular
    .module('<%= varPluginName %>', [])
    .controller('<%= varPluginName %>Controller', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', '$location'];

  function loadFunction($scope, structureService, $location) {
    // Register upper level modules
    structureService.registerModule($location, $scope, '<%= varPluginName %>');
    // --- Start <%= varPluginName %>Controller content ---
    console.info('Hi! from <%= varPluginName %>Controller');
    // --- End <%= varPluginName %>Controller content ---
  }
}());
