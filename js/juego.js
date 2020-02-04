/* El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques. Gran parte de su implementacion esta hecha, pero hay espacios con el
texto COMPLETAR que deben completarse segun lo indique la consigna.

El objeto Juego contiene mucho codigo. Tomate tu tiempo para leerlo tranquilo
y entender que es lo que hace en cada una de sus partes. */

let Juego = {
  // Aca se configura el tamanio del canvas del juego
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  // Indica si el jugador gano
  ganador: false,

  obstaculosCarretera: [
    //piedra 1
    new Obstaculo("imagenes/valla_horizontal.png", 100, 125, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 130, 125, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 160, 125, 30, 30, 0),

    //piedra 2
    new Obstaculo("imagenes/valla_horizontal.png", 100, 50, 50, 50, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 150, 50, 50, 50, 0),

    //piedra 3

    new Obstaculo("imagenes/valla_horizontal.png", 265, 50, 50, 50, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 315, 50, 50, 50, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 345, 50, 50, 50, 0),

    //piedra 4

    new Obstaculo("imagenes/valla_horizontal.png", 570, 50, 60, 50, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 640, 50, 60, 50, 0),

    //piedra 5

    new Obstaculo("imagenes/valla_horizontal.png", 760, 50, 100, 50, 0),

    //piedra 6

    new Obstaculo("imagenes/valla_horizontal.png", 260, 180, 140, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 260, 135, 50, 50, 0),
    new Obstaculo("imagenes/valla_vertical.png", 260, 205, 50, 50, 0),

    //piedra 7
    new Obstaculo("imagenes/valla_vertical.png", 260, 290, 50, 80, 0),

    //piedra 8

    new Obstaculo("imagenes/valla_vertical.png", 160, 405, 50, 70, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 110, 395, 70, 30, 0),

    //piedra 9

    new Obstaculo("imagenes/valla_horizontal.png", 270, 397, 120, 30, 0),

    //piedra 10
    new Obstaculo("imagenes/valla_horizontal.png", 100, 505, 300, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 267, 460, 30, 70, 0),

    //piedra 11
    new Obstaculo("imagenes/valla_horizontal.png", 360, 452, 250, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 457, 462, 50, 60, 0),

    //piedra 12
    new Obstaculo("imagenes/valla_horizontal.png", 360, 342, 250, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 457, 355, 50, 60, 0),

    //piedra 13
    new Obstaculo("imagenes/valla_horizontal.png", 565, 505, 300, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 667, 455, 30, 70, 0),

    //piedra 14
    new Obstaculo("imagenes/valla_horizontal.png", 557, 397, 150, 30, 0),

    //piedra 15
    new Obstaculo("imagenes/valla_vertical.png", 667, 295, 30, 70, 0),

    //piedra 16
    new Obstaculo("imagenes/valla_vertical.png", 463, 20, 40, 80, 0),

    //piedra 17

    new Obstaculo("imagenes/valla_horizontal.png", 355, 125, 250, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 457, 130, 50, 70, 0),

    //piedra 18

    new Obstaculo("imagenes/valla_horizontal.png", 355, 294, 250, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 540, 230, 60, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 370, 230, 60, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 360, 250, 30, 50, 0),
    new Obstaculo("imagenes/valla_vertical.png", 580, 250, 30, 50, 0),

    //piedra 19

    new Obstaculo("imagenes/valla_vertical.png", 667, 135, 30, 120, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 575, 180, 120, 30, 0),

    //piedra 20
    new Obstaculo("imagenes/valla_horizontal.png", 770, 125, 100, 30, 0),

    //piedra 21
    new Obstaculo("imagenes/valla_vertical.png", 765, 405, 30, 70, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 770, 400, 90, 30, 0)
  ],
  /* Estos son los bordes con los que se puede chocar, por ejemplo, la vereda.
   Ya estan ubicados en sus lugares correspondientes. Ya aparecen en el mapa, ya
   que son invisibles. No tenes que preocuparte por ellos.*/
  bordes: [
    // Bordes de la pantalla

    new Obstaculo("imagenes/valla_horizontal.png", 70, 450, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 40, 450, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 10, 450, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 10, 410, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 10, 370, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 40, 345, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 70, 345, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 100, 345, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 130, 345, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 160, 345, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 175, 330, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 175, 300, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 150, 287, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 120, 287, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 90, 287, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 60, 287, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 30, 287, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 0, 287, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 0, 237, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 30, 237, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 60, 237, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 90, 237, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 120, 237, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 150, 237, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 175, 225, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 175, 195, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 30, 180, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 60, 180, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 90, 180, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 120, 180, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 150, 180, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 10, 160, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 10, 120, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 10, 80, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 10, 40, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 10, 10, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 50, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 90, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 10, 490, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 10, 530, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 30, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 70, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 110, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 150, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 900, 450, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 870, 450, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 925, 450, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 925, 410, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 925, 370, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 900, 345, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 870, 345, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 840, 345, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 810, 345, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 780, 345, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 760, 330, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 760, 300, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 780, 287, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 810, 287, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 840, 287, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 870, 287, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 900, 287, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 930, 287, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 930, 237, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 900, 237, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 870, 237, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 840, 237, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 810, 237, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 780, 237, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 760, 225, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 760, 195, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 780, 180, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 810, 180, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 840, 180, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 870, 180, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 900, 180, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 925, 160, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 925, 120, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 925, 80, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 925, 40, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 925, 10, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 900, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 860, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 925, 490, 30, 30, 0),
    new Obstaculo("imagenes/valla_vertical.png", 925, 530, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 800, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 840, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 880, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 915, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 750, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 700, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 650, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 600, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 550, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 500, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 450, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 400, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 350, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 300, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 250, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 200, 560, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 150, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 200, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 250, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 300, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 350, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 400, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 450, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 500, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 550, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 600, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 650, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 700, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 750, 0, 30, 30, 0),
    new Obstaculo("imagenes/valla_horizontal.png", 800, 0, 30, 30, 0)
  ],
  // Los enemigos se agregaran en este arreglo.
  enemigos: [
    new ZombieCaminante(
      "imagenes/zombie4.png",
      180,
      200,
      30,
      30,
      2,
      { desdeX: 0, hastaX: 450, desdeY: 200, hastaY: 200 },
      2
    ),
    new ZombieCaminante(
      "imagenes/zombie3.png",
      280,
      400,
      30,
      30,
      2,
      { desdeX: 80, hastaX: 850, desdeY: 400, hastaY: 400 },
      2
    ),
    new ZombieCaminante(
      "imagenes/zombie2.png",
      480,
      300,
      30,
      30,
      2,
      { desdeX: 200, hastaX: 850, desdeY: 250, hastaY: 250 },
      2
    ),
    new ZombieConductor(
      "imagenes/zombie1.png",
      678,
      450,
      30,
      30,
      2,
      {
        desdeX: 0,
        hastaX: 0,
        desdeY: 0,
        hastaY: 500
      },
      "v"
    )
  ]
};

/* Se cargan los recursos de las imagenes, para tener un facil acceso
a ellos. No hace falta comprender esta parte. Pero si queres agregar tus propies
imagenes tendras que poner su ruta en la lista para que pueda ser precargada como
todas las demas. */
Juego.iniciarRecursos = function() {
  Resources.load([
    "imagenes/mapa.png",
    "imagenes/mensaje_gameover.png",
    "imagenes/Splash.png",
    "imagenes/bache.png",
    "imagenes/tren_horizontal.png",
    "imagenes/tren_vertical.png",
    "imagenes/valla_horizontal.png",
    "imagenes/valla_vertical.png",
    "imagenes/zombie1.png",
    "imagenes/zombie2.png",
    "imagenes/zombie3.png",
    "imagenes/zombie4.png",
    "imagenes/auto_rojo_abajo.png",
    "imagenes/auto_rojo_arriba.png",
    "imagenes/auto_rojo_derecha.png",
    "imagenes/auto_rojo_izquierda.png",
    "imagenes/auto_verde_abajo.png",
    "imagenes/auto_verde_derecha.png",
    "imagenes/corazon.png"
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstaculos de la carretera
Juego.obstaculos = function() {
  return this.obstaculosCarretera.concat(this.bordes);
};

Juego.comenzar = function() {
  // Inicializar el canvas del juego
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  /* El bucle principal del juego se llamara continuamente para actualizar
  los movimientos y el pintado de la pantalla. Sera el encargado de calcular los
  ataques, colisiones, etc*/
  this.buclePrincipal();
};

Juego.buclePrincipal = function() {
  // Con update se actualiza la logica del juego, tanto ataques como movimientos
  this.update();
  // Funcion que dibuja por cada fotograma a los objetos en pantalla.
  this.dibujar();
  // Esto es una forma de llamar a la funcion Juego.buclePrincipal() repetidas veces
  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function() {
  this.calcularAtaques();
  this.moverEnemigos();
};
// Captura las teclas y si coincide con alguna de las flechas tiene que
// hacer que el jugador principal se mueva
Juego.capturarMovimiento = function(tecla) {
  let movX = 0;
  let movY = 0;
  let velocidad = this.jugador.velocidad;

  // El movimiento esta determinado por la velocidad del jugador
  if (tecla == "izq") {
    movX = -velocidad;
  }
  if (tecla == "arriba") {
    movY = -velocidad;
  }
  if (tecla == "der") {
    movX = velocidad;
  }
  if (tecla == "abajo") {
    movY = velocidad;
  }

  // Si se puede mover hacia esa posicion hay que hacer efectivo este movimiento
  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
    /* Aca tiene que estar la logica para mover al jugador invocando alguno
    de sus metodos  */
    this.jugador.mover(movX, movY);
  }
};

Juego.dibujar = function() {
  // Borrar el fotograma actual
  Dibujante.borrarAreaDeJuego();
  //Se pinta la imagen de fondo segun el estado del juego
  this.dibujarFondo();

  /* Aca hay que agregar la logica para poder dibujar al jugador principal
  utilizando al dibujante y los metodos que nos brinda.
  "Dibujante dibuja al jugador" */
  Dibujante.dibujarEntidad(this.jugador);

  /* Completar */

  // Se recorren los obstaculos de la carretera pintandolos

  // this.obstaculosCarretera.forEach(function(obstaculo) {
  //   Dibujante.dibujarEntidad(obstaculo);
  // });

  // this.bordes.forEach(function(obstaculo) {
  //   Dibujante.dibujarEntidad(obstaculo);
  // });

  // Se recorren los enemigos pintandolos
  this.enemigos.forEach(function(enemigo) {
    Dibujante.dibujarEntidad(enemigo);
    /* Completar */
  });

  // El dibujante dibuja las vidas del jugador
  let tamanio = this.anchoCanvas / this.vidasInicial;
  Dibujante.dibujarRectangulo("white", 0, 0, this.anchoCanvas, 8);
  for (let i = 0; i < this.jugador.vidas; i++) {
    let x = tamanio * i;
    Dibujante.dibujarRectangulo("red", x, 0, tamanio, 8);
  }
};

/* Recorre los enemigos haciendo que se muevan. De la misma forma que hicimos
un recorrido por los enemigos para dibujarlos en pantalla ahora habra que hacer
una funcionalidad similar pero para que se muevan.*/
Juego.moverEnemigos = function() {
  this.enemigos.forEach(function(enemigo) {
    enemigo.mover();
  });
};

/* Recorre los enemigos para ver cual esta colisionando con el jugador
Si colisiona empieza el ataque el zombie, si no, deja de atacar.
Para chequear las colisiones estudiar el metodo posicionValida. Alli
se ven las colisiones con los obstaculos. En este caso sera con los zombies. */
Juego.calcularAtaques = function() {
  this.enemigos.forEach(function(enemigo) {
    if (
      this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)
    ) {
      enemigo.comenzarAtaque(this.jugador);
    } else {
      enemigo.dejarDeAtacar(this.jugador);
    }
  }, this);
};

/* Aca se chequea si el jugador se peude mover a la posicion destino.
 Es decir, que no haya obstaculos que se interpongan. De ser asi, no podra moverse */
Juego.chequearColisiones = function(x, y) {
  let puedeMoverse = true;
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {
      obstaculo.chocar(this.jugador);
      puedeMoverse = false;
      Obstaculo.potencia = 0;
    }
  }, this);
  return puedeMoverse;
};

/* Este metodo chequea si los elementos 1 y 2 si cruzan en x e y
 x e y representan la coordenada a la cual se quiere mover el elemento2*/
Juego.intersecan = function(elemento1, elemento2, x, y) {
  let izquierda1 = elemento1.x;
  let derecha1 = izquierda1 + elemento1.ancho;
  let techo1 = elemento1.y;
  let piso1 = techo1 + elemento1.alto;
  let izquierda2 = x;
  let derecha2 = izquierda2 + elemento2.ancho;
  let techo2 = y;
  let piso2 = y + elemento2.alto;

  return (
    piso1 >= techo2 &&
    techo1 <= piso2 &&
    derecha1 >= izquierda2 &&
    izquierda1 <= derecha2
  );
};

Juego.dibujarFondo = function() {
  // Si se termino el juego hay que mostrar el mensaje de game over de fondo
  if (this.terminoJuego()) {
    Dibujante.dibujarImagen(
      "imagenes/mensaje_gameover.png",
      0,
      5,
      this.anchoCanvas,
      this.altoCanvas
    );
    document.getElementById("reiniciar").style.visibility = "visible";
  }

  // Si se gano el juego hay que mostrar el mensaje de ganoJuego de fondo
  else if (this.ganoJuego()) {
    Dibujante.dibujarImagen("imagenes/Splash.png", 190, 113, 500, 203);
    document.getElementById("reiniciar").style.visibility = "visible";
  } else {
    Dibujante.dibujarImagen(
      "imagenes/mapa.png",
      0,
      5,
      this.anchoCanvas,
      this.altoCanvas
    );
  }
};

Juego.terminoJuego = function() {
  return this.jugador.vidas <= 0;
};

/* Se gana el juego si se sobre pasa cierto altura y */
Juego.ganoJuego = function() {
  return this.jugador.y + this.jugador.alto > 1000;
};

Juego.iniciarRecursos();

// Activa las lecturas del teclado al presionar teclas
// Documentacion: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
document.addEventListener("keydown", function(e) {
  let allowedKeys = {
    37: "izq",
    38: "arriba",
    39: "der",
    40: "abajo"
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});
