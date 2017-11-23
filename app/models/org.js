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
                type: Number,
                name: String,
                shortname: String,
                password: String,
            };
        }