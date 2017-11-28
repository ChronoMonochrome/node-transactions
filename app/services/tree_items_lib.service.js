angular.module('ngmkdev').factory('TreeItemsLibService', function(Restangular) {
    var service = {};

    service.pruneItem = function(tree, id) {
        for (var i = 0; i < tree.length; ++i) {
            var obj = tree[i];
            if (obj.id === id) {
                // splice out 1 element starting at position i
                tree.splice(i, 1);
                return true;
            }
            if (obj.children) {
                if (service.pruneItem(obj.children, id)) {
                    if (obj.children.length === 0) {
                        // delete children property when empty
                        delete obj.children;
                    }
                    return true;
                }
            }
        }
    }

    service.updateItemName = function(tree, id, name) {
        for (var i = 0; i < tree.length; ++i) {
            var obj = tree[i];
            if (obj.id === id) {
                //console.log("found: " + obj);
                tree[i].text = name;
                return true;
            }
            if (obj.children) {
                if (service.updateItemName(obj.children, id, name)) {
                    return true;
                }
            }
        }
    }

    service.addItem = function(tree, parent_id, element) {
        if (parent_id == 0 || parent_id == -1) {
            tree.push(element);
            return true;
        }

        for (var i = 0; i < tree.length; ++i) {
            var obj = tree[i];
            if (obj.id === parent_id) {
                //console.log("found: " + obj);
                //console.dir(tree);
                if (obj.children == undefined)
                    tree[i].children = [];

                tree[i].children.push(element);
                return true;
            }
            if (obj.children) {
                if (service.addItem(obj.children, parent_id, element)) {
                    return true;
                }
            }
        }
    }

    return service;
});
