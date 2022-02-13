                                                // objetos : pizarron, barras, pelota
(function(){
    self.Board = function(width,height){  //esto es como declarar una clase     constructor. Self hace parte de window y window es un scope global
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype ={                                      //metodos de la clase retorna barras y pelota
        get elements(){                 //getter
            var elements = this.bars;
            elements.push(this.ball);
            return elements;
        }
    }
})();                                                                //() significa que es una funcion anonima se ejecuta asi misma


(function(){  // constructor de la barra
    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);  //accedo a board luego accedo a bars y le añado todas las inicializaciones con this
        this.kind = "rectangle";    //para que el canvas sepa en donde quiero dibujar las cosas
        this.speed = 10; // velocidad de las barras
    }

    self.Bar.prototype = { //metodos para programar los movimientos de las barras
        down: function(){
            this.y += this.speed;

        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: "+ this.x +" y: "+ this.y;
        }

    }

})();





(function(){                                                        //clase que se va a encargar del tablero
    self.BoardView = function(canvas,board){

        this.canvas = canvas;
        this.canvas.width = board.width;                            // PRIMERA VISTA
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");                          //esto es un contexto es el cual podemos dibujar en javascript
    }

    self.BoardView.prototype = {
        draw: function(){
            for (var i = this.board.elements.length -1; i>= 0; i--){
                var el = this.board.elements[i];

                draw(this.ctx,el);
            }
            }
    }

    function draw(ctx,element){
        if(element !== null && element.hasOwnProperty("kind")){
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.height)
                    break;

            }
        }    
    
    }

})();

    var board = new Board(800,400);       
    var bar = new Bar(20,100,40,100,board);
    var bar = new Bar(735,100,40,100,board); 
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas,board);

document.addEventListener("keydown",function(ev){
    console.log(ev.keyCode);
    if(ev.keyCode == 38){
        bar.up();
    }
    else if(ev.keyCode ==40){
        bar.down();
    }
});

self.addEventListener("load",main);

function main(){  
    console.log("hola mundo")                                                   //FUNCION PRINCIPAL DEL PROYECTO
                             //creo un objeto de la clase board que es tablero
    
    board_view.draw();

}