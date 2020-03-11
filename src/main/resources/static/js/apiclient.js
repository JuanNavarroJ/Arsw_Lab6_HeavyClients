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
        },
        saveUpdate : function(obra, author, blueprints){
            alert("Sera que hace algo")
            $.ajax({
                url: "/blueprints/"+author+"/"+obra,
                type: 'PUT',
                data: blueprints,
                contentType: "application/json"
            });
        },

        deleteBp : function(obra, author){
            alert("Sera que hace algo")
            $.ajax({
                url: "/blueprints/"+author+"/"+obra,
                type: 'DELETE',
                contentType: "application/json"
            });
        }

    };
})();