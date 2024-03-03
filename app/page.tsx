export default function Home() {
  function mensajeConEnlaces(texto) {
    if (!texto) return []; // Verifica si texto es undefined
    const regex = /(\(([^)]+)\)|https?:\/\/\S+)/g;
    return texto
      .split('\n\n') // Dividir por dos saltos de línea para identificar párrafos
      .map((parrafo) => {
        return parrafo
          .split('. ')
          .map((oracion, index) => {
            return index < parrafo.split('. ').length - 1
              ? oracion + '. '
              : oracion;
          })
          .join('. '); // Reunir oraciones nuevamente
      })
      .map((parrafo) => {
        return parrafo
          .split('\n')
          .map((linea) => {
            return linea.includes('**') // Convertir texto entre '**' en negrita
              ? linea.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              : linea;
          })
          .join('<br>'); // Reemplazar saltos de línea con <br> para HTML
      })
      .map((parrafo, index, array) => {
        return index < array.length - 1 ? parrafo + '<br><br>' : parrafo;
      }) // Agregar espacio sin texto después de cada párrafo
      .map((parte) => {
        return parte.replace(regex, (match, contenido) => {
          if (contenido.startsWith('http')) {
            const enlaceNombre = contenido.replace(/(^\w+:|^)\/\//, '');
            return `<a href="${contenido}" target="_blank" class="text-blue-700">${enlaceNombre}</a>`;
          } else {
            return `<a href="${contenido}" target="_blank" class="text-blue-700">${contenido}</a>`;
          }
        });
      });
  }

  const mensaje = {
    text: '¡Hola! Buenas tardes.\n' +
      '\n' +
      'Soy el **asistente** virtual de Complejo Unquehue.\n' +
      '\n' +
      '😊 Para conocer los precios del camping por día, te invito a visitar el siguiente enlace donde podrás obtener toda la información y realizar tu reserva: https://complejounquehue.campeak.app/camping.\n' +
      '\n' +
      '¡Esperamos verte pronto por aquí! 🏕️'
  };

  const mensajeConEnlacesHTML = mensajeConEnlaces(mensaje.text);

  return (
    <div>
      {mensajeConEnlacesHTML.map((parte, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: parte }} />
      ))}
    </div>
  );
}
