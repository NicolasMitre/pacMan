/* El objeto jugador es un objeto literal que se encuentra incompleto.
 Solo tiene asignadas algunas de sus propiedades y ningun metodo */
var Jugador = {
  /* el sprite contiene la ruta de la imagen
   */
  sprite: "imagenes/auto_rojo_abajo.png",
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 5,
  mover: function(nuevaX, nuevaY) {
    if (nuevaX > 0) {
      this.ancho = 30;
      this.alto = 15;
      this.sprite = "imagenes/auto_rojo_derecha.png";
    } else if (nuevaY > 0) {
      this.ancho = 15;
      this.alto = 30;
      this.sprite = "imagenes/auto_rojo_abajo.png";
    } else if (nuevaX < 0) {
      this.ancho = 30;
      this.alto = 15;
      this.sprite = "imagenes/auto_rojo_izquierda.png";
    } else if (nuevaY < 0) {
      this.ancho = 15;
      this.alto = 30;
      this.sprite = "imagenes/auto_rojo_arriba.png";
    }

    this.x += nuevaX;
    this.y += nuevaY;
  },
  perderVidas: function(cantVidas) {
    this.vidas -= cantVidas;
    console.log(this.vidas);
  }
  // Hay que agregar lo que falte al jugador: movimientos, perdida de vidas,
  // y todo lo que haga falta para que cumpla con sus responsabilidades
};
