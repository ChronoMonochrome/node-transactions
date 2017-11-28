Integer = {
    type: 'integer',
    size: 8
};

module.exports = function(orm, db) {
    var Survey = db.define('survey', {
        id: {
            type: 'serial',
            key: true
        },
        name: String,
    }, {
        methods: {
            serialize: function() {
                return {
                    id: this.id,
                    name: this.name,
                };
            },
        }
    });

    var ParameterGroup = db.define('parameterGroup', {
        id: {
            type: 'serial',
            key: true
        },
        survey_id: Integer,
        name: String
    }, {
        methods: {
            serialize: function() {
                return {
                    id: this.id,
                    survey_id: this.survey_id,
                    name: this.name,
                };
            },
        }
    });

    var ParameterForm = db.define('parameterForm', {
        id: {
            type: 'serial',
            key: true
        },
        form: String,
    }, {
        methods: {
            serialize: function() {
                return {
                    id: this.id,
                    form: this.form,
                };
            },
        }
    });

    var ParameterType = db.define('parameterType', {
        id: {
            type: 'serial',
            key: true
        },
        type: String,
    }, {
        methods: {
            serialize: function() {
                return {
                    id: this.id,
                    type: this.type,
                };
            },
        }
    });

    var Parameter = db.define('parameter', {
        id: {
            type: 'serial',
            key: true
        },
        name: String,
        type_id: Integer,
        form_id: Integer,
        group_id: Integer,
        survey_id: Integer
    }, {
        methods: {
            serialize: function() {
                return {
                    id: this.id,
                    name: this.name,
                    type_id: this.type_id,
                    form_id: this.form_id,
                    group_id: this.group_id,
                    survey_id: this.survey_id
                };
            },
        }
    });

    var ParameterData = db.define('parameterData', {
        id: {
            type: 'serial',
            key: true
        },
        parameter_id: Integer,
        parameter_value: String
    }, {
        methods: {
            serialize: function() {
                return {
                    id: this.id,
                    parameter_id: this.parameter_id,
                    parameter_value: this.parameter_value
                };
            },
        }
    });

    ParameterData.hasOne("parameter", Parameter);
    Parameter.hasOne("type", ParameterType);
    Parameter.hasOne("form", ParameterForm);
    Parameter.hasOne("group", ParameterGroup);
    Parameter.hasOne("survey", Survey);

    ParameterGroup.hasOne("survey", Survey);

    // add the table to the database
    db.sync(function(err) {
        if (err) throw err;
    });
}