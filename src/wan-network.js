(function () {
'use strict';

  var App = angular.module('ado.wan-network', [
    'ado.save-config-btn',
    'ado.wan-network.tpls'
  ]);

  App.component('adoWanNetwork', {
    bindings: {
      device: '<'
    },
    controller: 'AdoWanNetworkCtrl',
    templateUrl: './wan-network.html'
  });

  App.controller('AdoWanNetworkCtrl', [
    'adoConfigService',
    function AdoWanNetworkCtrl(adoConfigService) {

      var $ctrl = this;

      $ctrl.$onInit = function () {

        $ctrl.device = $ctrl.device || {};

        adoConfigService.get({id: $ctrl.device.id})
          .then(function (res) {
            $ctrl.config = angular.copy(res.data);
            $ctrl.settings = res.data;
          });

      };

    }
  ]);

})();
