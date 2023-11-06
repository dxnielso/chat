// Importamos el audio de los assets del proyecto
import click from '../assets/click.mp3'

// Funcion para reproducir el sonido
const clickSound = () => {
  let sound = new Audio(click)  // creamos objeto de tipo Audio y le pasamos el audio
  sound.play()  // reproducimos el audio
}

// Exportamos la funcion para poder utilizarla en los demas componentes
export default clickSound