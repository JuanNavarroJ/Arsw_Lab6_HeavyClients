var author=null;//Author
var obra=null;//Obra
var pointsObra=[];//Arreglo de puntos.
var blueprints=null;//Listado de blueprints
app= (function (){
    var lista = function (variable) {
        if(variable != null){
            window.blueprints = variable;
            var diccionario = variable.map(function(bp){
                return {key:bp.name, value:bp.points.length}
            })
            $("#tabla tbody").empty();
            diccionario.map(function(bp){
                var temp = '<tr><td id="nombreActor">'+bp.key+'</td><td id="puntos">'+bp.value+'</td><td type="button" id="bottom" class="btn btn-info" onclick="app.draw(\''+bp.key+'\')">Open</td></tr>';
                $("#tabla tbody").append(temp);
            })
            var sumPoints = diccionario.reduce(function(total, valor){
                return total + valor.value;
            }, 0)
            $("#totalPoints > h3").text("Total user points: " + sumPoints);
        }
    };
    var pintar = function(variable) {
        $("#titlebp").text("Current blueprint: " + variable.name);
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        var anterior;
        variable.points.map(function(points) {
            if (!anterior) {
                anterior = points;
                ctx.moveTo(anterior.x, anterior.y);
            } else {
                ctx.lineTo(points.x, points.y);
                ctx.stroke();
            }
        });
    };

    var repaint = function(variable) {
        $("#titlebp").text("Current blueprint: " + obra);
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        var anterior;
        variable.map(function(points) {
            if (!anterior) {
                anterior = points;
                ctx.moveTo(anterior.x, anterior.y);
            } else {
                ctx.lineTo(points.x, points.y);
                ctx.stroke();
            }
        });
    };
    
    var getOffset = function(obj) {
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
    };

    var get = function(variable){
        if(variable != null){
            variable.map(function(bp){
                if(bp.name==obra){
                    window.pointsObra = bp.points;
                }
            })  
        }
    };

    var init = function(){
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        if (window.PointerEvent) {
            c.addEventListener("pointerdown", function(event) {
                var offset  = getOffset(c);
                var x = event.pageX-parseInt(offset.left,10);
                var y = event.pageY-parseInt(offset.top,10);
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(x, y, 5, 5);
                if(window.author!=null){
                    get(blueprints);
                    pointsObra.push({ x: x, y: y });
                    repaint(pointsObra);
                }                        
            });
        }
        else {
            c.addEventListener("mousedown", function(event){
            alert('mousedown at '+event.clientX+','+event.clientY); 
        });
        }
    };

    var save = function(){
        alert("Funciono")
        var plano = blueprints.filter(obj => {
            return obj.name === obra;
          })[0];
        apiclient.saveUpdate(window.obra, window.author, JSON.stringify(plano));
        apiclient.getBlueprintsByAuthor(window.author,lista);
    }
    return {
            prueba: function () {
                window.author = document.getElementById("fname").value;
                apiclient.getBlueprintsByAuthor(author,lista);
                //apimock.getBlueprintsByAuthor(author,lista);  //<--- Usando Apimock 
            },
            draw: function (bp) {
                window.author = document.getElementById("fname").value;
                window.obra = bp;
                apiclient.getBlueprintsByNameAndAuthor(obra,author,pintar);
                //apimock.getBlueprintsByNameAndAuthor(obra,author,pintar);  //<--- Usando Apimock 
            },
            init: function (){
                init();    
            },
            saveUpdate: function(){
                save();
            }
        };
})();