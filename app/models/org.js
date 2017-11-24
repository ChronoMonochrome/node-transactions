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
/*                   var comments;

                   if (this.comments) {
                     comments = this.comments.map(function (c) { return c.serialize(); });
                   } else {
                     comments = [];
                   }
*/
/*
                   return {
                     id        : this.id,
                     title     : this.title,
                     body      : this.body,
                     createdAt : moment(this.createdAt).fromNow(),
                     comments  : comments
                   };
*/
                   return {
                          id  : this.id,
                          text: this.name
                   };
                 }
               }
            });

            // add the table to the database
            db.sync(function(err) {
                if (err) throw err;
            });
        }
