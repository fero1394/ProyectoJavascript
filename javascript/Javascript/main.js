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





(function(){
    self.Ball = function(x,y,radius,board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;

        board.ball = this;
        this.kind = "circle";
    }
})();





(function(){  // constructor de la barra
    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);  //accedo a board luego accedo a bars y le añado todas las inicializaciones con this
        this.kind = "rectangle";    //para que el canvas sepa en donde quiero dibujar las cosas
        this.speed = 5; // velocidad de las barras
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
        clean: function(){
            this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },
        draw: function(){
            for (var i = this.board.elements.length -1; i>= 0; i--){
                var el = this.board.elements[i];

                draw(this.ctx,el);
            };
        },

        play: function(){

            this.clean();
            this.draw();
    }
    }

    function draw(ctx,element){
        
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                    break;
                case "circle":
                    ctx.arc(element.x,element.y,element.radius,0,7);
                    ctx.fill();
                    ctx.closePath();
                    break;
            }
    
    }
    
})();

    var board = new Board(800,400);       
    var bar = new Bar(20,100,40,100,board);
    var bar_2 = new Bar(735,100,40,100,board); 
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas,board);
    var ball = new Ball(350,100,10,board);


document.addEventListener("keydown",function(ev){
    ev.preventDefault();
    
    if(ev.keyCode == 38){
        bar.up();
    }
    else if(ev.keyCode ==40){
        bar.down();
    }
    else if(ev.keyCode ==87){
        bar_2.up();
    }
    else if(ev.keyCode ==83){
        bar_2.down();
    }

    
});

self.addEventListener("load",controller);


window.requestAnimationFrame(controller);

function controller(){  
    board_view.play();

    window.requestAnimationFrame(controller);

}