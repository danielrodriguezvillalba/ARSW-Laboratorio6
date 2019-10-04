## ARSW-Laboratorio6

```
Nicolás Cárdenas Chaparro

Daniel Rodriguez Villalba
```
# Blueprint Management 4 - Heavy Clients

- Add to the canvas of the page an event handler that allows you to capture the 'clicks' made, either through the mouse, or through a touch screen. For this, consider this example of the use of events of type PointerEvent (not yet supported by all browsers) for this purpose. Remember that unlike the previous example (where the JS code is embedded in the view), it is expected to have the initialization of the event handlers correctly modularized, as shown in this codepen.

El codigo el cual realiza el listener del canvas es el siguiente, que a su vez se encarga de ir dibujando los puntos que se van obteniendo por medio del listener:
```
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
    }
```
- Add what is needed in your modules so that when new points are captured on the open canvas (if a canvas has not been selected, nothing should be done):
  - The point is added at the end of the sequence of points on the current canvas (only in the application memory, NOT EVEN IN THE API!). 
  - The drawing is repainted. 
- Add the Save/Update button. Respecting the client's current module architecture, do that by pressing the button:

  - Perform PUT action, with the updated plan, in its corresponding REST resource. 
  
  La correspondiente accion que realiza el PUT del plan:
  ```
  var putBlueprint = function(){
        if (blueprintAct != null){
            $.ajax({
                url: "/blueprints/"+blueprintAct.author+"/"+blueprintAct.name,
                type: 'PUT',
                data: JSON.stringify(blueprintAct),
                contentType: "application/json"
            });
        }
    }
  ```
  
  - Perform GET action to the resource /blueprints, to get back all the plans made.
  La correspondiente accion que realiza el GET de todos los blueprints :
  ```
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
  ```
  - The total points of the user are recalculated. 
 
 Aqui esta la 
  
  - As in this case there are three operations based on callbacks, and that they need to be performed in a specific order, consider how to use JavaScript promises using any of the available examples.
- Add the 'Create new blueprint' button, so that when pressed:
  - The current canvas is deleted. 
  - The name of the new 'blueprint' is requested (you decide how to do it). 
  - This option should change the way the 'save / update' option works, because in this case, when pressed the first time you should (also, using promises):
Post the resource / blueprints to create the new plan. GET to this same resource, to update the list of plans and the user's score. 
- Add the 'DELETE' button, so that (also with promises):
  La correspondiente accion que realiza el DELETE del blueprint dado es la siguiente :
```
var deleteBlueprint = function(){
        var prom = $.ajax({
            url: "/blueprints/"+blueprintAct.author+"/"+blueprintAct.name,
            type: 'DELETE',
            contentType: "application/json"
        });

        prom.then(
            function(){
                console.info('Delete OK');
            },
            function(){
                console.info('Delete Fallo');
            }
        );

        return prom;
    }
```
Delete the canvas. DELETE the corresponding resource. 
Make GET of the plans now available.
