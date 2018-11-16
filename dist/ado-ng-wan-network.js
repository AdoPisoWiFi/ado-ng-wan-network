angular.module('ado.wan-network.tpls', []).run(['$templateCache', function($templateCache) {$templateCache.put('./wan-network.html','\n<div class="input-demo checkbox-demo padd-bottom">\n  <label class="checkbox-inline custom-checkbox nowrap">\n    <input type="checkbox" name="active" ng-model="$ctrl.settings.wan_interface.dynamic">\n    <span>\n      Use Dynamic IP Address (DHCP)\n    </span>\n  </label>\n</div>\n\n<div>\n  <save-config-btn config="{wan_interface: {dynamic: $ctrl.settings.wan_interface.dynamic}}" device="$ctrl.device" ng-show="$ctrl.config.wan_interface.dynamic != $ctrl.settings.wan_interface.dynamic && $ctrl.settings.wan_interface.dynamic">Save Changes</save-config-btn>\n</div>\n\n<form name="wanForm">\n\n  <div>\n\n    <hr>\n    <p>Configure Static IP Address</p>\n\n    <div class="form-group" ng-class="{\'has-error\': wanForm.ip.$invalid}">\n      <label>IP Address</label>\n      <input ng-disabled="$ctrl.settings.wan_interface.dynamic" class="form-control" name="ip" ng-model="$ctrl.settings.wan_interface.ip" required ng-pattern="/\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b/">\n    </div>\n\n    <div  class="form-group" ng-class="{\'has-error\': wanForm.netmask.$invalid}">\n      <label>Netmask</label>\n      <input ng-disabled="$ctrl.settings.wan_interface.dynamic" class="form-control" name="netmask" ng-model="$ctrl.settings.wan_interface.netmask" required ng-pattern="/\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b/">\n    </div>\n\n    <!--<div class="form-group" ng-class="{\'has-error\': wanForm.broadcast.$invalid}">-->\n    <!--  <label>Broadcast Address</label>-->\n    <!--  <input class="form-control" name="broadcast" ng-model="settings.wan_interface.broadcast" required ng-pattern="/\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b/">-->\n    <!--</div>-->\n\n    <div class="form-group" ng-class="{\'has-error\': wanForm.gateway.$invalid}">\n      <label>Default Gateway</label>\n      <input class="form-control" name="gateway" ng-disabled="$ctrl.settings.wan_interface.dynamic" ng-model="$ctrl.settings.wan_interface.gateway" required ng-pattern="/\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b/">\n    </div>\n\n    <save-config-btn device="$ctrl.device" config="{wan_interface: {dynamic: $ctrl.settings.wan_interface.dynamic, ip: $ctrl.settings.wan_interface.ip, netmask: $ctrl.settings.wan_interface.netmask, gateway: $ctrl.settings.wan_interface.gateway}}" ng-disabled="wanForm.$invalid">Save Changes</save-config-btn>\n\n  </div>\n</form>\n\n\n');}]);
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
