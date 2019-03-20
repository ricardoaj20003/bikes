require('dotenv').config();
const config = require('./base'),
      wordList = ['a', 'abajo', 'abandonar', 'abrir', 'absoluta', 'absoluto', 'abuelo', 'acabar', 'acaso', 'acciones',
'acción', 'aceptar', 'acercar', 'acompañar', 'acordar', 'actitud', 'actividad', 'acto', 'actual', 'actuar',
'acudir', 'acuerdo', 'adelante', 'además', 'adquirir', 'advertir', 'afectar', 'afirmar', 'agua', 'ahora',
'ahí', 'aire', 'al', 'alcanzar', 'alejar', 'alemana', 'alemán', 'algo', 'alguien', 'alguna',
'alguno', 'algún', 'allá', 'allí', 'alma', 'alta', 'alto', 'altura', 'amar', 'ambas',
'ambos', 'americana', 'americano', 'amiga', 'amigo', 'amor', 'amplia', 'amplio', 'andar', 'animal',
'ante', 'anterior', 'antigua', 'antiguo', 'anunciar', 'análisis', 'aparecer', 'apenas', 'aplicar', 'apoyar',
'aprender', 'aprovechar', 'aquel', 'aquella', 'aquello', 'aquí', 'arma', 'arriba', 'arte', 'asegurar',
'aspecto', 'asunto', 'así', 'atenciones', 'atención', 'atreverse', 'atrás', 'aumentar', 'aun', 'aunque',
'autor', 'autora', 'autoridad', 'auténtica', 'auténtico', 'avanzar', 'ayer', 'ayuda', 'ayudar', 'azul',
'añadir', 'año', 'aún', 'baja', 'bajar', 'barrio', 'base', 'bastante', 'bastar', 'beber',
'bien', 'blanca', 'blanco', 'boca', 'brazo', 'buen', 'buscar', 'caballo', 'caber', 'cabeza',
'cabo', 'cada', 'cadena', 'caer', 'calle', 'cama', 'cambiar', 'cambio', 'caminar', 'camino',
'campaña', 'campo', 'cantar', 'cantidad', 'capaces', 'capacidad', 'capaz', 'capital', 'cara', 'caracteres',
'carne', 'carrera', 'carta', 'carácter', 'casa', 'casar', 'casi', 'caso', 'catalán', 'causa',
'celebrar', 'central', 'centro', 'cerebro', 'cerrar', 'chica', 'chico', 'cielo', 'ciencia', 'ciento',
'científica', 'científico', 'cierta', 'cierto', 'cinco', 'cine', 'circunstancia', 'ciudad', 'ciudadana', 'ciudadano',
'civil', 'clara', 'claro', 'clase', 'coche', 'coger', 'colocar', 'color', 'comentar', 'comenzar',
'comer', 'como', 'compañera', 'compañero', 'compañía', 'completo', 'comprar', 'comprender', 'comprobar', 'comunes',
'comunicaciones', 'comunicación', 'común', 'con', 'concepto', 'conciencia', 'concreto', 'condición', 'condisiones', 'conducir',
'conjunto', 'conocer', 'conocimiento', 'consecuencia', 'conseguir', 'conservar', 'considerar', 'consistir', 'constante', 'constituir',
'construir', 'contacto', 'contar', 'contemplar', 'contener', 'contestar', 'continuar', 'contra', 'contrario', 'control',
'controlar', 'convencer', 'conversación', 'convertir', 'corazón', 'correr', 'corresponder', 'corriente', 'cortar', 'cosa',
'costumbre', 'crear', 'crecer', 'creer', 'crisis', 'cruzar', 'cuadro', 'cual', 'cualquier', 'cuando',
'cuanto', 'cuarta', 'cuarto', 'cuatro', 'cubrir', 'cuenta', 'cuerpo', 'cuestiones', 'cuestión', 'cultura',
'cultural', 'cumplir', 'cuya', 'cuyo', 'cuál', 'cuánto', 'célula', 'cómo', 'dar', 'dato',
'de', 'deber', 'decidir', 'decir', 'decisión', 'declarar', 'dedicar', 'dedo', 'defender', 'defensa',
'definir', 'definitivo', 'dejar', 'del', 'demasiado', 'democracia', 'demostrar', 'demás', 'depender', 'derecha',
'derecho', 'desaparecer', 'desarrollar', 'desarrollo', 'desconocer', 'descubrir', 'desde', 'desear', 'deseo', 'despertar',
'después', 'destino', 'detener', 'determinar', 'diaria', 'diario', 'diez', 'diferencia', 'diferente', 'dificultad',
'difícil', 'dinero', 'dios', 'diosa', 'dirección', 'directo', 'director', 'directora', 'dirigir', 'disponer',
'distancia', 'distinto', 'diverso', 'doble', 'doctor', 'doctora', 'dolor', 'don', 'donde', 'dormir',
'dos', 'duda', 'durante', 'duro', 'día', 'dónde', 'e', 'echar', 'económico', 'edad',
'efecto', 'ejemplo', 'ejército', 'el', 'elección', 'elegir', 'elemento', 'elevar', 'ella', 'empezar',
'empresa', 'en', 'encender', 'encima', 'encontrar', 'encuentro', 'energía', 'enfermedad', 'enfermo', 'enorme',
'enseñar', 'entender', 'enterar', 'entonces', 'entrada', 'entrar', 'entre', 'entregar', 'enviar', 'equipo',
'error', 'esa', 'escapar', 'escribir', 'escritor', 'escritora', 'escuchar', 'ese', 'esfuerzo', 'eso',
'espacio', 'espalda', 'españa', 'español', 'española', 'especial', 'especie', 'esperanza', 'esperar', 'espíritu',
'esta', 'establecer', 'estado', 'estar', 'este', 'esto', 'estrella', 'estructura', 'estudiar', 'estudio',
'etapa', 'europa', 'europea', 'europeo', 'evidente', 'evitar', 'exacta', 'exacto', 'exigir', 'existencia',
'existir', 'experiencia', 'explicar', 'expresión', 'extender', 'exterior', 'extranjera', 'extranjero', 'extraño', 'extremo',
'falta', 'faltar', 'familia', 'familiar', 'famoso', 'fenómeno', 'fiesta', 'figura', 'fijar', 'fin',
'final', 'flor', 'fondo', 'forma', 'formar', 'francesa', 'francia', 'francés', 'frase', 'frecuencia',
'frente', 'fría', 'frío', 'fuego', 'fuente', 'fuerte', 'fuerza', 'funcionar', 'función', 'fundamental',
'futuro', 'fácil', 'físico', 'fútbol', 'ganar', 'general', 'gente', 'gesto', 'gobierno', 'golpe',
'gracia', 'gran', 'grande', 'grave', 'gritar', 'grupo', 'guardar', 'guerra', 'gustar', 'gusto',
'haber', 'habitación', 'habitual', 'hablar', 'hacer', 'hacia', 'hallar', 'hasta', 'hecha', 'hecho',
'hermana', 'hermano', 'hermosa', 'hermoso', 'hija', 'hijo', 'historia', 'histórico', 'hombre', 'hombro',
'hora', 'hoy', 'humana', 'humano', 'idea', 'iglesia', 'igual', 'imagen', 'imaginar', 'impedir',
'imponer', 'importancia', 'importante', 'importar', 'imposible', 'imágenes', 'incluir', 'incluso', 'indicar', 'individuo',
'informaciones', 'información', 'informar', 'inglesa', 'inglés', 'iniciar', 'inmediata', 'inmediato', 'insistir', 'instante',
'intentar', 'interesar', 'intereses', 'interior', 'internacional', 'interés', 'introducir', 'ir', 'izquierda', 'jamás',
'jefa', 'jefe', 'joven', 'juego', 'jugador', 'jugar', 'juicio', 'junto', 'justo', 'labio',
'lado', 'lanzar', 'largo', 'lector', 'lectora', 'leer', 'lengua', 'lenguaje', 'lento', 'levantar',
'ley', 'libertad', 'libre', 'libro', 'limitar', 'literatura', 'llamar', 'llegar', 'llenar', 'lleno',
'llevar', 'llorar', 'lo', 'loca', 'loco', 'lograr', 'lucha', 'luego', 'lugar', 'luz',
'línea', 'madre', 'mal', 'mala', 'malo', 'mandar', 'manera', 'manifestar', 'mano', 'mantener',
'mar', 'marcar', 'marcha', 'marchar', 'marido', 'mas', 'masa', 'matar', 'materia', 'material',
'mayor', 'mayoría', 'mañana', 'media', 'mediante', 'medida', 'medio', 'mejor', 'memoria', 'menor',
'menos', 'menudo', 'mercado', 'merecer', 'mes', 'mesa', 'meter', 'metro', 'mi', 'miedo',
'miembro', 'mientras', 'mil', 'militar', 'millón', 'ministra', 'ministro', 'minuto', 'mirada', 'mirar',
'mis', 'mismo', 'mitad', 'modelo', 'moderna', 'moderno', 'modo', 'momento', 'moral', 'morir',
'mostrar', 'motivo', 'mover', 'movimiento', 'muchacha', 'muchacho', 'mucho', 'muerte', 'mujer', 'mujeres',
'mundial', 'mundo', 'muy', 'máquina', 'más', 'máximo', 'médica', 'médico', 'método', 'mí',
'mía', 'mínima', 'mínimo', 'mío', 'música', 'nacer', 'nacional', 'nada', 'nadie', 'natural',
'naturaleza', 'necesaria', 'necesario', 'necesidad', 'necesitar', 'negar', 'negocio', 'negra', 'negro', 'ni',
'ninguna', 'ninguno', 'ningún', 'nivel', 'niña', 'niño', 'no', 'noche', 'nombre', 'normal',
'norteamericana', 'norteamericano', 'notar', 'noticia', 'novela', 'nuestra', 'nuestro', 'nueva', 'nuevo', 'nunca',
'número', 'o', 'objetivo', 'objeto', 'obligar', 'obra', 'observar', 'obtener', 'ocasiones', 'ocasión',
'ocho', 'ocupar', 'ocurrir', 'oficial', 'ofrecer', 'ojo', 'olvidar', 'operación', 'opinión', 'origen',
'oro', 'orígenes', 'oscura', 'oscuro', 'otra', 'otro', 'oír', 'paciente', 'padre', 'pagar',
'palabra', 'papel', 'par', 'para', 'parar', 'parecer', 'pared', 'pareja', 'parte', 'participar',
'particular', 'partido', 'partir', 'pasa', 'pasado', 'pasar', 'paso', 'paz', 'país', 'países',
'pecho', 'pedir', 'peligro', 'pelo', 'película', 'pena', 'pensamiento', 'pensar', 'peor', 'pequeña',
'pequeño', 'perder', 'perfecto', 'periodista', 'periódica', 'periódico', 'permanecer', 'permitir', 'pero', 'perra',
'perro', 'persona', 'personaje', 'personal', 'pertenecer', 'pesar', 'peso', 'pie', 'piedra', 'piel',
'pierna', 'piso', 'placer', 'plan', 'plantear', 'plaza', 'pleno', 'poblaciones', 'población', 'pobre',
'poca', 'poco', 'poder', 'policía', 'política', 'político', 'poner', 'por', 'porque', 'poseer',
'posibilidad', 'posible', 'posiciones', 'posición', 'precio', 'precisa', 'preciso', 'preferir', 'pregunta', 'preguntar',
'prensa', 'preocupar', 'preparar', 'presencia', 'presentar', 'presente', 'presidente', 'pretender', 'primer', 'primera',
'primero', 'principal', 'principio', 'privar', 'probable', 'problema', 'proceso', 'producir', 'producto', 'profesional',
'profesor', 'profesora', 'profunda', 'profundo', 'programa', 'pronta', 'pronto', 'propia', 'propio', 'proponer',
'provocar', 'proyecto', 'prueba', 'práctico', 'próxima', 'próximo', 'publicar', 'pueblo', 'puerta', 'pues',
'puesto', 'punto', 'pura', 'puro', 'página', 'pública', 'público', 'que', 'quedar', 'querer',
'quien', 'quitar', 'quizá', 'quién', 'qué', 'radio', 'rato', 'razones', 'razón', 'real',
'realidad', 'realizar', 'recibir', 'reciente', 'recoger', 'reconocer', 'recordar', 'recorrer', 'recuerdo', 'recuperar',
'reducir', 'referir', 'regresar', 'relaciones', 'relación', 'religiosa', 'religioso', 'repetir', 'representar', 'resolver',
'responder', 'responsable', 'respuesta', 'resto', 'resultado', 'resultar', 'reuniones', 'reunir', 'reunión', 'revista',
'rey', 'reír', 'rica', 'rico', 'riesgo', 'rodear', 'roja', 'rojo', 'romper', 'ropa',
'rostro', 'rápida', 'rápido', 'régimen', 'río', 'saber', 'sacar', 'sala', 'salida', 'salir',
'sangre', 'secreta', 'secreto', 'sector', 'seguir', 'segundo', 'segura', 'seguridad', 'seguro', 'según',
'seis', 'semana', 'semejante', 'sensaciones', 'sensación', 'sentar', 'sentida', 'sentido', 'sentimiento', 'sentir',
'separar', 'ser', 'seria', 'serie', 'serio', 'servicio', 'servir', 'sexo', 'sexual', 'señalar',
'señor', 'señora', 'si', 'sido', 'siempre', 'siete', 'siglo', 'significar', 'siguiente', 'silencio',
'simple', 'sin', 'sino', 'sistema', 'sitio', 'situaciones', 'situación', 'situar', 'sobre', 'social',
'socialista', 'sociedad', 'sol', 'sola', 'solo', 'soluciones', 'solución', 'sombra', 'someter', 'sonar',
'sonreír', 'sonrisa', 'sorprender', 'sostener', 'su', 'subir', 'suceder', 'suelo', 'suerte', 'sueño',
'suficiente', 'sufrir', 'superar', 'superior', 'suponer', 'surgir', 'suya', 'suyo', 'sí', 'sólo',
'tal', 'también', 'tampoco', 'tan', 'tanta', 'tanto', 'tarde', 'tarea', 'televisiones', 'televisión',
'tema', 'temer', 'tender', 'tener', 'teoría', 'tercer', 'terminar', 'texto', 'tiempo', 'tierra',
'tipa', 'tipo', 'tirar', 'tocar', 'toda', 'todavía', 'todo', 'tomar', 'tono', 'total',
'trabajar', 'trabajo', 'traer', 'tras', 'tratar', 'tres', 'tu', 'técnica', 'técnico', 'término',
'tía', 'tío', 'título', 'un', 'una', 'unidad', 'unir', 'uno', 'usar', 'uso',
'usted', 'utilizar', 'vacía', 'vacío', 'valer', 'valor', 'varias', 'varios', 'veces', 'vecina',
'vecino', 'veinte', 'velocidad', 'vender', 'venir', 'ventana', 'ver', 'verano', 'verdad', 'verdadera',
'verdadero', 'verde', 'vestir', 'vez', 'viaje', 'vida', 'vieja', 'viejo', 'viento', 'violencia',
'vista', 'viva', 'vivir', 'vivo', 'voces', 'voluntad', 'volver', 'voz', 'vuelta', 'y',
'ya', 'yo', 'zona', 'árbol', 'él', 'época', 'ésta', 'éste', 'éxito', 'última',
'último', 'única', 'único'],
      nodemailer = require('nodemailer'),
      transporter = nodemailer.createTransport({
        host: 'mail.donmandon.mx',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
	 tls: {
	    rejectUnauthorized: false
	  }
      }),
      mailOptions = {
        from: process.env.EMAIL_FROM,
        subject: 'Codigo de conversacion'
      },
      bookshelf = require('bookshelf')(config.knex);

let ConversationCode = bookshelf.Model.extend({
  tableName: 'conversation_codes',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', (model, attrs, options) => {
      this.createCode();
    }, this);
  },
  roundsman: function(){
    let Roundsman = require('./roundsman').Roundsman;
    return this.belongsTo(Roundsman);
  },
  roundsmanObject: function(){
    return this.roundsman()
      .where({id: this.attributes.roundsman_id}).fetch();
  },
  createCode: function(){
    let cad = "";
    [1,2,3,4,5].forEach((i) => {
      var word = wordList[Math.floor(Math.random() * wordList.length)];
      cad = `${cad} ${word}`;
    });
    this.set('message', cad.trim());
    return this.roundsmanObject().then((roundsman) => {
        let email = roundsman.attributes.email;
        return this.sendCodeMail(email);
      });
  },
  setSenderId: function(senderID){
    return this.roundsmanObject().then((roundsman) => {
      return roundsman.save({senderID: senderID}, {patch: true})
        .then((roundsman) => {
          return 'Quedaste activado';
        });
    });
  },
  sendCodeMail: function(email){
    let html = `<h4>Codigo: ${this.attributes.message}</h4>`;
    mailOptions.to = email;
    mailOptions.html = html;
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err);
      else
        console.log(info);
    });
  }
});

module.exports = {
  ConversationCode : ConversationCode
};
