var apimock = (function () {

    var mockdata = [];

    mockdata["JhonConnor"] = [
        {
            author: "JhonConnor",
            name: "house",
            points: [
                {
                    x: 10,
                    y: 20
                },
                {
                    x: 15,
                    y: 25
                },
                {
                    x: 45,
                    y: 25
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "bike",
            points: [
                {
                    x: 30,
                    y: 35
                },
                {
                    x: 40,
                    y: 45
                }
            ]
        }
    ]

    mockdata['LexLuthor'] = [
        {
            author: 'LexLuthor',
            name: 'kryptonite',
            points: [
                {
                    x: 0,
                    y: 0
                },
                {
                    x: 50,
                    y: 50
                },
                {
                    x: 130,
                    y: 50
                }
            ]
        }
    ]

    mockdata['Sarah'] = [
        {
            author: 'Sarah',
            name: 'TheArsw',
            points: [
                {
                    x: 0,
                    y: 0
                },
                {
                    x: 50,
                    y: 50
                },
                {
                    x: 130,
                    y: 50
                },
                {
                    x: 130,
                    y: 0
                },
                {
                    x: 10,
                    y: 30
                }
            ]
        },
        {
            author: 'Sarah',
            name: 'TheX',
            points: [
                {
                    x: 0,
                    y: 0
                },
                {
                    x: 400,
                    y: 200
                },
                {
                    x: 400,
                    y: 0
                },
                {
                    x: 0,
                    y: 200
                },
            ]
        }
    ]

    return {
        getBlueprintsByAuthor: function(author, callback) {
            callback(mockdata[author]);
        },

        getBlueprintsByNameAndAuthor: function(name, author, callback) {
            blueprint = mockdata[author].find(function(blueprint) {
                return blueprint.name == name
            });
            callback(blueprint)
        }
    }

})();