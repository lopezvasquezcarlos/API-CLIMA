window.addEventListener('load', ()=> {
  //LONGITUD
    let lon
  //LATITUD
    let lat

    //REFERENCIAMOS LOS ID DE LAS CAJAS DEL CONTENEDOR DEL HTML AL JS
    let temperaturaValor = document.getElementById('temperatura-valor')  
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
    
    let ubicacion = document.getElementById('ubicacion')  
    let iconoAnimado = document.getElementById('icono-animado') 

    let vientoVelocidad = document.getElementById('viento-velocidad') 


    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition( posicion => {
           
           lon = posicion.coords.longitude
           lat = posicion.coords.latitude
          
           //ubicación por ciudad
           //LLAMADO A API
           //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
           const url = `https://api.openweathermap.org/data/2.5/weather?q=Tijuana&lang=es&units=metric&appid=e18f29bd4598337f6c91384172eb79f2`
  //RETORNAMOS LA RESPUESTA DEL API  EN FORMATO JSON|         
  //hacemos la referencia  a la URL EN EL FETCH
           fetch(url)
           
            .then( response => { return response.json()})
            .then( data => {
                
                //SE ASIGNA A UNA VARIABLE "TEMP", REDONDEAMOS LA VARIABLE
                let temp = Math.round(data.main.temp)

                //MOSTRAR EN EL html: temperatura
                temperaturaValor.textContent = `${temp} ° C`

                //descripcion del clima, usamos la variable DESC
                let desc = data.weather[0].description

                //le gaegamos la descripcion del clima a la varieble, usamos el metodo ".toUpperCase()" para mostrar en Mayus.
                temperaturaDescripcion.textContent = desc.toUpperCase()

                //ASIGNAMOS EL DATO DEL NAME "CIUDAD" AL ubicacion.textContent
                ubicacion.textContent = data.name

                //OBRTENEMOS LA "VELOCIDAD DEL VIENTO" Y SE LO ASIGNAMOS A LA VARIABLE " vientoVelocidad.textContent"
                vientoVelocidad.textContent = `${data.wind.speed} m/s`
                
               
                //para iconos dinámicos, OBTENEMOS LOS ICONOS 
                //IMPRIMIMOS LA RESPUESTA DEL API, RESPECTO AL CLIMA
                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                  //USAMOS EL  case para mostrar los iconos correspondientes de acuerdo al clima
                  //NOMBRRE DEL CASE VA DE ACUERDO A LOS NOMBRES QUE USA LA API
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  }

            })
            //CAPTURAMOS LOS ERRORES
            .catch( error => {
                console.log(error)
            })
       })
          
    }
})