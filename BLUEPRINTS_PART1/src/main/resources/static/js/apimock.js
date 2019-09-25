var apimok = (function () {

    var mockdata = [];

        mockdata["JhonConnor"] = [
        {
            author: "JhonConnor",
            name: "house",
            points: [
                {
                    x: 50,
                    y: 2
                },
                {
                    x: 100,
                    y: 50
                },
                {
                    x: 200,
                    y: 200
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "gear",
            points: [
                {
                    x: 30,
                    y: 35
                },
                {
                    x: 40,
                    y: 45
                },
                {
                    x: 200,
                    y: 200
                }
            ]
        }
    ];

    return {
        getBlueprintsByAuthor:function(name, callback) {
            callback(
                mockdata[name]
            )
        },
        getBlueprintsByNameAndAuthor:function(autor,obra,callback){
            callback(
                mockdata[author].map((function (variable) {
                        if( variable.name == obra){
                            return variable.points;
                        }
                    })
                )
            );
        }
    }

})();


