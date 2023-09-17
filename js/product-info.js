//Se genera un EventListenner para que al seleccionar la card haga varias funciones.
const cargarInfoProducto = (product, productCategoryName) => {
  //Se crean constantes para traer los elementos por su id del html
  const nombreProduct = document.getElementById("nombreProduct");
  const precioProduct = document.getElementById("precioProducto");
  const descripcionProducto = document.getElementById("descripcionProducto");
  const categoriaProducto = document.getElementById("categoriaProducto");
  const cantidadProducto = document.getElementById("cantidadProducto");
  const carruselProduct = document.getElementById("carruselProducto");

  //Pone la info del producto en el lugar correcto del html para verlos
  document.create;
  const nombreProductText = document.createTextNode(product.name);
  const precioProductText = document.createTextNode(
    product.cost + " " + product.currency
  );
  const descripcionProductoText = document.createTextNode(product.description);
  const categoriaProductoText = document.createTextNode(productCategoryName);
  const cantidadProductoText = document.createTextNode(product.soldCount);
  nombreProduct.appendChild(nombreProductText);
  precioProduct.appendChild(precioProductText);
  descripcionProducto.appendChild(descripcionProductoText);
  categoriaProducto.appendChild(categoriaProductoText);
  cantidadProducto.appendChild(cantidadProductoText);
  //Muestra las imagenes relacionadas con el producto (son 4 imagenes por producto por eso i=1; i<5)
    // Función para cambiar la imagen actual del carrusel
    let intervalo = false

    function cambiarImagenCarrusel() {
      let imagenActual = 1; // Inicialmente, muestra la primera imagen
  
      return function () {
        // Elimina todas las imágenes actuales del carrusel
        carruselProduct.innerHTML = '';
  
        // Crea una nueva imagen y la agrega al carrusel
        const nuevaImagen = document.createElement("img");
        nuevaImagen.classList.add("image-producto");
        nuevaImagen.classList.add("card-img-top");
        nuevaImagen.src = `/img/prod${product.id}_${imagenActual}.jpg`;
        carruselProduct.appendChild(nuevaImagen);
  
        // Incrementa las imagenes y al llegar a la última regresa a la 1ra
        imagenActual++;
        if (imagenActual > 4) {
          imagenActual = 1;
        }
      };
    }
  
    // Crea una función para cambiar la imagen
  
    const cambiarImagen = cambiarImagenCarrusel();
  
  
    // Intervalo para cambiar automáticamente la imagen cada 3.5 segundos
    if (!intervalo) {
      cambiarImagen();
      intervalo = true
    }
  
    setInterval(() => {
      cambiarImagen()
    }, 3500)
};

const cargarComentariosProducto = async (product) => {
  if (!product.id) return console.error("the product doesn't have an id");
  const baseCommentUrl = `https://raw.githubusercontent.com/JaPCeibal/emercado-api/main/products_comments/${product.id}.json`;
  const response = await fetch(baseCommentUrl);
  if (!response.ok)
    return console.error("Something went wrong when retrieving the comments");
    const comments = await response.json();

    comments.forEach((comment) => {

    const divComment = document.createElement("div");
    divComment.classList.add("wrapper-comentario");

    const comentarioHeader = document.createElement("p");
    comentarioHeader.classList.add("headerComentario");

    divComment.appendChild(comentarioHeader);

    const user = document.createElement("span");
    user.classList.add("user-comentario");
    
    const dateTime = document.createElement("span");
    dateTime.classList.add("date-time")
    
    const description = document.createElement("span");
    const userText = document.createTextNode(comment.user);
    const dateTimeText = document.createTextNode(comment.dateTime);
    const descriptionText = document.createTextNode(comment.description);
    const scoreStar = document.createElement("span");

    //Agregue barras para la separacion del user con las flechas y las estrellas
    //Barra1
    // const BarraSeparacion = document.createElement("span");
    // BarraSeparacion.innerHTML = " - "
    // dateTime.appendChild(BarraSeparacion);

    //Barra2
    const BarraSeparacion2 = document.createElement("span");
    BarraSeparacion2.innerHTML = ' '
    scoreStar.appendChild(BarraSeparacion2)
    
    //Logica para que aparezcan las estrellas 
    for (let i = 0; i < 5; i++) {
      if (i < comment.score) {
        const scoreStarText = document.createElement("span");  
        scoreStarText.innerHTML = '&#9733';
        scoreStarText.innerHTML = '&#9733';
        scoreStarText.classList.add("star-comment");
        scoreStar.appendChild(scoreStarText);
      } else {
        const scoreStarText = document.createElement("span");
        scoreStarText.innerHTML = '&#9734';
        scoreStarText.classList.add("star-comment");
        scoreStar.appendChild(scoreStarText);
      }
    }

    user.appendChild(userText);
    dateTime.appendChild(dateTimeText);
    description.appendChild(descriptionText);

    comentarioHeader.appendChild(user);
    comentarioHeader.appendChild(scoreStar);
    comentarioHeader.appendChild(dateTime);

    divComment.appendChild(descriptionText);

    document.getElementById("comentarios").appendChild(divComment);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  //Se crean const que traen info del localStorage(producto que se clickeo y su nombre de categoria)
  const product = JSON.parse(localStorage.getItem("productoClickeado"));
  const productCategoryName = localStorage.getItem("catName");
  cargarInfoProducto(product, productCategoryName);
  await cargarComentariosProducto(product);
});

