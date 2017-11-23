module.exports = function(orm, db) {
        var Org = db.define('org', {
                id: {
                    type: 'serial',
                    key: true
                },
                user_id: {
                    type: 'serial'
                },
                parent_id: {
                    type: 'serial'
                },
                type_id: Number,
                form_id: Number,
                depth: Number,
                inn: String,
                name: String,
                shortname: String,
            };
        }
