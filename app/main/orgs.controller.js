angular.module("ngmkdev").controller('OrgsController',
    function( /*$scope, */ OrgsStore) {
        var vm = this;

        vm.menuItems = [{
                "href": "#/dashboard.html",
                "text": "Dashboard"
            },
            {
                "href": "javascript:;",
                "text": "AngularJS Features",
                "subItems": [
                    {
                        "href": "#/ui_bootstrap.html",
                        "text": " UI Bootstrap 11 (nested)",
                        "subItems": [
                            {
                                "href": "#/ui_bootstrap.html",
                                "text": " UI Bootstrap 11 (nested)",
                                "subItems": [{
                                        "href": "#/ui_bootstrap.html",
                                        "text": " Nested UI Bootstrap"
                                    }
                                ]
                            },
                        ]
                    },
                ]
            }
        ];


        vm.addOrg = function() {
            OrgsStore.addOrg(vm.newOrg).then(function(org) {
                vm.orgs.push(Org);
            });
            vm.resetOrg();
        }

        vm.setSelected = function(selected) {
            vm.selected = selected;
        }

        vm.removeOrg = function(selected, tIdx) {
            OrgsStore.removeOrg(selected, tIdx).then(function() {
                vm.orgs.splice(tIdx, 1);
            });
        }

        vm.resetOrg = function() {
            vm.newOrg = {
                name: "fullName",
                shortName: "shortName",
                description: null
            }
        }

        //vm.orgs = OrgsStore.loadOrgs();
        //vm.resetOrg();
    });
