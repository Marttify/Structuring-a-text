export default function Home() {
  function mensajeConEnlaces(texto) {
    const regex = /\(([^)]+)\)/g;
    return texto
      .split('\n')
      .map((parrafo) => {
        return parrafo.split('. ').map((oracion, index) => {
          return index < parrafo.split('. ').length - 1
            ? oracion + '. '
            : oracion;
        });
      })
      .flat()
      .map((parte, index) => {
        return parte.match(regex)
          ? parte.replace(regex, (match, contenido) => {
              if (contenido.startsWith('http')) {
                return `<a href="${contenido}" target="_blank">${contenido}</a>`;
              } else {
                return match;
              }
            })
          : parte;
      });
  }

  const mensaje =
    '¡Hola! Buenas tardes. Soy el asistente virtual de Complejo Unquehue. 😊 Para conocer los precios del camping por día, te invito a visitar el siguiente enlace donde podrás obtener toda la información y realizar tu reserva: (https://complejounquehue.campeak.app/camping). ¡Esperamos verte pronto por aquí! 🏕️';

  const mensajeConEnlacesHTML = mensajeConEnlaces(mensaje);

  return (
    <div>
      {mensajeConEnlacesHTML.map((parte, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: parte }} />
      ))}
    </div>
  );
}
