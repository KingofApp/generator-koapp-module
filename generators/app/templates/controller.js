(function() {
  'use strict';

  angular
    .module('<%= varModuleName %>', [])
    .controller('<%= varModuleName %>Controller', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', '$location'];

  function loadFunction($scope, structureService, $location) {
    // Register upper level modules
    structureService.registerModule($location, $scope, '<%= varModuleName %>');
    // --- Start <%= varModuleName %>Controller content ---
    console.info("Hi! from <%= varModuleName %>Controller");
    // --- End <%= varModuleName %>Controller content ---
  }
}());
