apiclient = (function() {
    return {
        getBlueprintsByAuthor: function(author, callback) {
            jQuery.get({
                url: "http://localhost:8080/blueprints/" + author,
                success: function (blueprints) {
                    callback(blueprints);
                },
            });
        },
        getBlueprintsByNameAndAuthor: function(obra, author, callback) {
            jQuery.get({
                url: "http://localhost:8080/blueprints/"+author+"/"+obra,
                success: function (blueprints) {
                    callback(blueprints);
                },
            });
        }
    };
})();