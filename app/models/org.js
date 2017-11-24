Integer = {type: 'integer', size: 8};

module.exports = function(orm, db) {
        var Org = db.define('org', {
                id: {
                    type: 'serial',
                    key: true
                },
                user_id: Integer,
                parent_id: Integer,
                type_id: Integer,
                form_id: Integer,
                depth: Integer,
                inn: String,
                name: String,
                shortname: String,
            },
            {
              methods: {
                 serialize: function () {
                   return {
                          id       : this.id,
                          text     : this.name,
                          parent_id: this.parent_id
                   };
                 }
               }
            });

            // add the table to the database
            db.sync(function(err) {
                if (err) throw err;
            });
        }
