app= (function (){
    var blueprintAct = null;

    var _funcModify = function (variable) {
        if(variable != null){
            var arreglo = variable.map(function(blueprint){
                return {key:blueprint.name, value:blueprint.points.length}
            })
            $("#tabla tbody").empty();
            arreglo.map(function(blueprint){
                var temporal = '<tr><td id="nombreActor">'+blueprint.key+'</td><td id="puntos">'+blueprint.value+'</td><td type="button" onclick="app.drawPlan(\''+blueprint.key+'\'),app.funListener()">Open</td></tr>';
                $("#tabla tbody").append(temporal);
            })

            var valorTotal = arreglo.reduce(function(total, valor){
                return total.value + valor.value;
            })
            document.getElementById("autorLabel").innerHTML = authorP;
            document.getElementById("puntosLabel").innerHTML = valorTotal;
        }
    };
    var _funcDraw = function (vari) {
        if (vari) {
            blueprintAct = vari;
            var lastx = null;
            var lasty = null;
            var actx = null;
            var acty = null;
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.clearRect(0, 0, 400, 400);
            ctx.beginPath();

            vari.points.map(function (prue){
                if (lastx == null) {
                    lastx = prue.x;
                    lasty = prue.y;
                } else {
                    actx = prue.x;
                    acty = prue.y;
                    ctx.moveTo(lastx, lasty);
                    ctx.lineTo(actx, acty);
                    ctx.stroke();
                    lastx = actx;
                    lasty = acty;
                }
            });
        }
    };
    var memoriaTemporal = null;
    _funcListener = function () {
        memoriaTemporal = [];
        var lastx = null;
        var lasty = null;
        var actx = null;
        var acty = null;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        c.addEventListener("click", function (evt) {
            mousePos = getMousePos(c, evt);
            var pareja = [mousePos.x,mousePos.y];
            memoriaTemporal.push(pareja);
            if (lastx == null) {
                lastx = mousePos.x;
                lasty = mousePos.y;
            } else {
                actx = mousePos.x;
                acty = mousePos.y;
                ctx.moveTo(lastx, lasty);
                ctx.lineTo(actx, acty);
                ctx.stroke();
                lastx = actx;
                lasty = acty;
            }
        }, false);
    };
    var saveBlueprint = function () {
        var arreglo = [];
        blueprintAct.points.map(function (value) {
            arreglo.push(value);
            alert(arreglo);
        });
        memoriaTemporal.map(function (valor) {
            valor 
            arreglo.push(valor);
            alert(arreglo);
        });
        blueprintAct.points = arreglo;
    }



    var putBlueprint = function(){
        if (blueprintAct != null){
            $.ajax({
                url: "/blueprints/"+blueprintAct.author+"/"+blueprintAct.name,
                type: 'PUT',
                data: JSON.stringify(blueprintAct),
                contentType: "application/json"
            });
        }
        else {
            alert("Entroooo Elseeeee");
        }
    }


    var responseAll = null;
    var blueprintsA = function(){
        allBlueprints=$.get("http://localhost:8080/blueprints");
        allBlueprints.then(
            function (data) {
                responseAll = data;
            },
            function () {
                alert("$.get failed!");
            }
        );
        return responseAll;
    };



    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return{
             x: evt.clientX - rect.left,
             y: evt.clientY - rect.top
        };
    }

    return {
        allBlueprints:blueprintsA,
            plansAuthor: function () {
                authorP = document.getElementById("autor").value;
                apimok.getBlueprintsByAuthor(authorP,_funcModify);

            },

            drawPlan: function(name) {
                author = document.getElementById("autor").value;
                obra = name;

                apimok.getBlueprintsByNameAndAuthor(author,obra,_funcDraw);
            },
            funListener: _funcListener,
        inserte: saveBlueprint
        };
})();
