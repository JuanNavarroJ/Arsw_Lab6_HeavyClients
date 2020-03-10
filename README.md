# LAB6-ARSW-HeavyClients

## Integrantes
- Juan David Navarro 
- Sarah Camila Vieda

## Part 1

- Add to the canvas of the page an event handler that allows you to capture the 'clicks' made, either through the mouse, or through a touch screen. For this, consider this example of the use of events of type PointerEvent (not yet supported by all browsers) for this purpose. Remember that unlike the previous example (where the JS code is embedded in the view), it is expected to have the initialization of the event handlers correctly modularized, as shown in this codepen.

    Función init la cual permite realizar puntos sobre el canvas ya creado.
    
    ``` javascript
    init: function (){
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        if (window.PointerEvent) {
            c.addEventListener("pointerdown", function(event) {
            var offset  = getOffset(c);
            var x = event.pageX-parseInt(offset.left,10);
            var y = event.pageY-parseInt(offset.top,10);
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(x, y, 5, 5);
            });
        }
        else {
            c.addEventListener("mousedown", function(event){
            alert('mousedown at '+event.clientX+','+event.clientY); 
        });
        }   
    }
   ```
   
   Función getOffset la cual permite calcular la diferencia entre la pantalla del computador y el canvas para obtener unas coordenadas correctas.
   
   ``` javascript
    function getOffset(obj) {
        var offsetLeft = 0;
        var offsetTop = 0;
        do {
          if (!isNaN(obj.offsetLeft)) {
              offsetLeft += obj.offsetLeft;
          }
          if (!isNaN(obj.offsetTop)) {
              offsetTop += obj.offsetTop;
          }   
        } while(obj = obj.offsetParent );
        return {left: offsetLeft, top: offsetTop};
    } 
   ```
   
   onload="app.init()" Es usado para que apenas cree el body del html llame a la función init del JavaScript.
   
   ``` html
    <body onload="app.init()">
   ```
   
   

- Add what is needed in your modules so that when new points are captured on the open canvas (if a canvas has not been selected, nothing should be done):

    - The point is added at the end of the sequence of points on the current canvas (only in the application memory, NOT EVEN IN THE API!). 

    - The drawing is repainted. 

- Add the Save/Update button. Respecting the client's current module architecture, do that by pressing the button:

    - Perform PUT action, with the updated plan, in its corresponding REST resource. 

    - Perform GET action to the resource /blueprints, to get back all the plans made. 

    - The total points of the user are recalculated. 

    For the above, keep in mind:

    - jQuery has no functions for PUT or DELETE requests, so it is necessary to 'configure' them manually through its API for AJAX. For example, to make a PUT request to a resource / resource:
    
    - For this note that the 'data' property of the object sent to $.ajax must be a jSON object (in text format). If the data you want to send is a JavaScript object, you can convert it to jSON with:
    
    - As in this case there are three operations based on callbacks, and that they need to be performed in a specific order, consider how to use JavaScript promises using any of the available examples.
    
- Add the 'Create new blueprint' button, so that when pressed:

    - The current canvas is deleted. 

    - The name of the new 'blueprint' is requested (you decide how to do it). 

    - This option should change the way the 'save / update' option works, because in this case, when pressed the first time you should (also, using promises):

    - Post the resource / blueprints to create the new plan. GET to this same resource, to update the list of plans and the user's score. 

- Add the 'DELETE' button, so that (also with promises):

    - Delete the canvas. DELETE the corresponding resource. 

    - Make GET of the plans now available.
