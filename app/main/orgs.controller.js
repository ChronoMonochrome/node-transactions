angular.module("ngmkdev").controller('OrgsController',
    function( /*$scope, */ OrgsStore) {
        var vm = this;

        vm.menuItems = [{
                "isNavItem": true,
                "href": "#/dashboard.html",
                "text": "Dashboard"
            },
            {
                "isNavItem": true,
                "href": "javascript:;",
                "text": "AngularJS Features",
                "subItems": [{
                        "href": "#/ui_bootstrap.html",
                        "text": " UI Bootstrap"
                    },
                    {
                        "subItems": [{
                                "href": "#/ui_bootstrap.html",
                                "text": " Nested UI Bootstrap"
                            },

                        ]
                    },


                ]
            },
            {
                "isNavItem": true,
                "href": "javascript:;",
                "text": "jQuery Plugins",
                "subItems": [{
                        "href": "#/form-tools",
                        "text": " Form Tools"
                    },
                    {
                        "isNavItem": true,
                        "href": "javascript:;",
                        "text": " Datatables",
                        "subItems": [{
                                "href": "#/datatables/managed.html",
                                "text": " Managed Datatables"
                            },
                            {
                                "subItems": [{
                                        "href": "#/ui_bootstrap.html",
                                        "text": " Nested nested UI Bootstrap"
                                    },

                                ]
                            },

                        ]
                    }
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