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
                    y: 2
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
                    x: 100,
                    y: 100
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
                mockdata[autor].filter(prueb => {return prueb.name === obra;})[0]
            );
        }
    }

})();


