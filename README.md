# LAB5-ARSW

## Integrantes
- Juan David Navarro 
- Sarah Camila Vieda

## Parte 1 

1. Include within the Gradle dependencies (build.gradle) the 'webjars' of jQuery and Bootstrap (this allows you to have these JavaScript libraries locally when building the project):

    A continuación se agregaron las dependencias en el archivo build.gradle
    ![Capture](https://user-images.githubusercontent.com/48154086/75450555-0e89a400-593d-11ea-976c-5e75d7badbf9.PNG)
    
2. Create the directory where the JavaScript application will reside. As SpringBoot is being used, the path to put in the same static content (static Web pages, HTML5 / JS applications, etc.) is:

    Se creo el directorio static en el directorio resources  
    ![Capture1](https://user-images.githubusercontent.com/48154086/75450561-10ebfe00-593d-11ea-9bb4-4e29436c3b79.PNG)

3. Create, in the previous directory, the index.html page, only with the basics: title, field for author capture, 'Get blueprints' button, field where the name of the selected author will be displayed, the HTML table where it will be displayed the list of plans (with only the headings), and a field where the total points of the author's plans will be shown. Remember to associate identifiers with these components to facilitate your search through selectors.

    A continuación creamos un espacio de entrada en donde digitaremos el autor y un boton de "Get Blueprints" en donde se retornaran todos     los blueprints de acuerdo a un autor específico.
    ![Capture](https://user-images.githubusercontent.com/44879884/75451597-d2574300-593e-11ea-9f45-cfc7790dfd4e.PNG)

4. In the <head> element of the page, add the references to the jQuery, Bootstrap libraries and the Bootstrap style sheet.
    
    Se completó el index.html 
    
    ``` html
    <html>
    <head>
        <title>Blueprints</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <script src="/webjars/jquery/3.1.0/jquery.min.js"></script>
        <script src="/webjars/bootstrap/4.1.2/js/bootstrap.min.js"></script>
        <script src="js/apimock.js"></script>
        <script src="js/app.js"></script>
        <link rel="stylesheet"
          href="/webjars/bootstrap/4.1.2/css/bootstrap.min.css" />
    </head>

    <body>
        <form action="" method="get" id="form">
        <label for="fname">Author:</label>
        <input type="text" id="fname" name="fname">
        </form>

        <button type="submit" form="form" value="Submit">Get Blueprints</button>
    </body>
    </html>

    ```
    
5. Upload the application (mvn spring-boot: run), and rectify:
    - That the page is accessible from: http://localhost:8080/index.html
    - When you open the browser developer console, you should NOT receive 404 error messages (that is, the JavaScript libraries were loaded correctly).
    
    ![error](https://user-images.githubusercontent.com/44879884/75454564-9d99ba80-5943-11ea-9c7a-68c3d7638a44.PNG)
    
    
## Frontend Logic

1. Now, you will create a JavaScript Module that, as a controller, maintains the states and offers the operations required by the view. For this, consider the JavaScript Module pattern, and create a module in the static/js/app.js path.

    Creamos la clase app.js en la siguiente ruta static/js/

    ![Capture1](https://user-images.githubusercontent.com/44879884/75718146-6bb88900-5ca0-11ea-95c0-59e8e34887d7.PNG)

2. Copy the provided module (apimock.js) in the same path of the module created before. In this one add more planes (with more points) to the 'burned' authors in the code.

Agregamos la clase apimock.js en el paquete js.


``` java
    
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
                    x: 60,
                    y: 65
                },
                {
                    x: 70,
                    y: 75
                }
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
```
   
3. Add the import of the two new modules to the HTML page (after importing the jQuery and Bootstrap libraries):
``` html
    <script src="js/apimock.js"></script>
    <script src="js/app.js"></script>
```

4. Have the previously created module keep private:
    - The name of the selected author. 
    - The list of name and size of the plans of the selected author. That is, a list of objects, where each object will have two         properties: plan name, and number of points on the plane. Together with a public operation that allows changing the name of       the currently selected author.
    
    Se mantuvo privado el nombre del autor seleccionado y una lista de nombres con el tamaño de los planes por cada uno de los         autores.

5. Add to the module app.js a public operation that allows updating the list of plans, based on the name of its author (given as a parameter). To do this, said operation must invoke the getBlueprintsByAuthor operation of the provided apimock module, sending as a callback a function that:

    - Take the list of plans, and apply a map function that converts your elements to objects with only the name and number of points.
    
    ![Capture2](https://user-images.githubusercontent.com/44879884/75719858-850f0480-5ca3-11ea-8e1e-49a650aba24c.PNG)
    
    - On the resulting list, make another map, which takes each of these elements, and through jQuery add a  element (with the respective ) to the table created in point 4. Consider the jQuery selectors and tutorials available online. For now do not add buttons to the generated rows.
    
    ![Capture5](https://user-images.githubusercontent.com/44879884/75720093-dfa86080-5ca3-11ea-9c97-fa11f74271eb.PNG)
    
    ![Capture7](https://user-images.githubusercontent.com/44879884/75720227-1da58480-5ca4-11ea-82fa-149614bddafc.PNG)

    
    - On any of the two listings (the original, or the one transformed by map), apply a reduce that calculates the number of points. With this value, use jQuery to update the corresponding field within the DOM.
    
    ![Capture6](https://user-images.githubusercontent.com/44879884/75720095-e040f700-5ca3-11ea-980b-5e77aa08d467.PNG)
    
## Parte 2

   - To the page, add an element of type Canvas, with its respective identifier. Make your dimensions not too large to make room for the other components, but enough to be able to draw the plans.
   
   ``` html
    <canvas id="canvas" width="200" height="100" style="border:1px solid #000000;">
    </canvas>
   ```
   
   ![Capture1](https://user-images.githubusercontent.com/44879884/75790900-d10c8880-5d39-11ea-8b77-e0b139dc8278.PNG)
   
   - To the app.js module add an operation that, given the name of an author, and the name of one of its planes given as parameters, using the getBlueprintsByNameAndAuthor method of apimock.js and a callback function:
   
   ``` javascript
        draw: function (bp) {
            author = document.getElementById("fname").value;
            obra = bp;
            apimock.getBlueprintsByNameAndAuthor(obra,author,pintar);
        }
   ```
   
   - Verify that the application now, in addition to displaying the list of the plans of an author, allows you to select one of these and graph it. To do this, have the button generated with the click event associated with the operation done in the last column (sending the corresponding names as a parameter).
   
   ![Capture](https://user-images.githubusercontent.com/44879884/75896423-15188f80-5e05-11ea-87bb-020d89936cad.PNG)
   
   - Verify that the application now allows: consult the plans of an author and graph the one selected.
   
   ![Capture1](https://user-images.githubusercontent.com/44879884/75896686-70e31880-5e05-11ea-8fc2-eee1c76c0247.PNG)
   
   - Once the application works (front-end only), make a module (call it apiclient) that has the same operations of the apimock, but for the same use real data consulted from the REST API. For the above, review how to make GET requests with jQuery, and how the callback scheme is handled in this context.
   
       Se crea el siguiente modulo que por medio de la función jQuery.get() y usando el parámetro Url el cual consulta los blueprints que están en la url del api y usando el success cuando se obtienen datos correctamente, ejecutamos el callback correspondiente con los blueprints obtenidos en la solicitud.
   
   ``` javascript
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
   ```
   
   - Modify the app.js code so that it is possible to switch between the apimock and the apiclient with just one line of code.
   
        Para solicitar los blueprints dados por el api y no los dados por apimock únicamente cambiamos el llamado de los métodos a apimock por apiclient.
        
   ``` javascript
    return {
        prueba: function () {
            author = document.getElementById("fname").value;
            apiclient.getBlueprintsByAuthor(author,lista);
            //apimock.getBlueprintsByAuthor(author,lista);  <--- Usando Apimock 
        },
        draw: function (bp) {
            author = document.getElementById("fname").value;
            obra = bp;
            apiclient.getBlueprintsByNameAndAuthor(obra,author,pintar);
            //apimock.getBlueprintsByNameAndAuthor(obra,author,pintar);  <--- Usando Apimock 
        }
    };
   ```
   Ahora verificamos que la aplicación funcione con los datos dados en el api. 
   
   ![Capture2](https://user-images.githubusercontent.com/44879884/75908080-777a8b80-5e17-11ea-92f6-00e40a62077e.PNG)
   
   - Review the documentation and examples of Bootstrap styles (already included in the exercise), add the necessary elements to the page to make it more colorful, and closer to the mock given at the beginning of the statement.
   
   ![nice](https://user-images.githubusercontent.com/44879884/75917812-99c8d500-5e28-11ea-9a67-3d38ea85701c.PNG)


    
