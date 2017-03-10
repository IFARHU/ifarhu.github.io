---
layout: post
title: ¿Un mes para desarrollar nueva aplicación para trámitar becas? ¡No hay problema!
date: 2017-03-10
comments: false
archive: false
category: Tecnologia
author: demostenes
---

El IFARHU tiene aproximadamente unos 600,000 estudiantes beneficiados con algún tipo de beca a nivel nacional, representando **aproximadamente el 75% de la población estudiantil de Panamá**. Estos estudiantes son tramitados mediante un sistema desarrollado por la Dirección de Tecnología Informática llamado "Administrador de Becas", desarrollado hace algunos años sobre tecnología prácticamente obsoleta.

El ciclo de los trámites de becas se renueva cada año y es enero el inicio de este ciclo. Noviembre, por temas de cierre fiscal, es el cierre del ciclo. Solo las tres primeras semanas de cada año, más de **100,000** nuevos estudiantes hacen su ingreso en los sistemas de becas, mediante el trámite oportuno de estos estudiantes.

Para ello, los tramitadores del IFARHU desarrollan, incansablemente, rondas de tramitación de beneficios, las cuales pueden durar hasta 12 horas de trabajo. Este trabajo tan arduo y fatigante, lleva que se cometan algunos errores como:

- Errores de captación en las cédulas, nombres, apellidos, etc.
- Errores de captación en los tipos de beneficio y montos.

Muchos de estos errores son atribuíbles a la capa 8 (el humano que los desarrolla) pero pueden ser sufragables mediante la incorporación de tecnología. Esto nos llevó a pensar que era totalmente necesario el desarrollo de una nueva capa para el trámite de los beneficios de becas en el IFARHU.

Pero hay dos problemas:

1. Por temas de periodo fiscal, no podríamos ejecutar nada hasta que el periodo actual cerrara (en noviembre), para no afectar los beneficios vigentes (como cancelar los que estén errados). Esto nos daba poco más de un mes: del 22 de noviembre hasta el 31 de diciembre, sacando los días libres del mes de diciembre.
1. Eran necesarias integraciones (por ejemplo, con Tribunal Electoral) para facilitar el flujo de tramitación.

## Entender el Producto Mínimo Viable (MVP)

No todo lo necesitamos para la primera versión, la cual debía salir inmediatamente iniciara el ciclo de trámites (primera semana de enero).

En el IFARHU, todo el personal de Desarrollo de Sistemas está entrenado en principios y metodologías ágiles de desarrollo, muchos de nosotros certificados. Antes de iniciar el proceso, de desarrollo es necesario comprender que entienden nuestros usuarios como valor para su producto.

> "Individios e interacciones sobre procesos y herramientas"
> — Agile Manifesto

Luego de las primeras sesiones con nuestros interesados, pudimos segregar el gran sistema de trámite en los siguientes módulos (épicas):

1. Módulo de Tramitación
1. Módulo de Seguimiento
1. Módulo de Actas / Resolución
1. Módulo de Carnet
1. Módulo de Administración
1. Módulo de Reportes

De todas estas épicas y gracias a la interacción con nuestros usuarios, entendimos que para el inicio del ciclo era necesario 80% del módulo funcional (Módulo de Tramitación), algunas historias del Módulo de Administración (Usuarios, etc.) y algunas otras del Módulo de Seguimiento. Esto fue descompuesto en alrededor de unas _36 historias de usuario_ distintas. Esto mayormente debido a que, de todas las acciones que se ejecutan al inicio del ciclo, el 98% son realmente referenciadas al trámite.

## Desarrollar una planificación inicial

Posteriormente, desarrollamos una planificación inicial y un plan inicial de entregas. Como teníamos aproximadamente unas 6 semanas de desarrollo, dividimos nuestros ciclos de desarrollo en 3 sprints de 2 semanas cada uno y un [Sprint 0](https://www.scrumalliance.org/community/articles/2013/september/what-is-sprint-zero) que debía ser ejecutado de inmediato.

Durante este Sprint 0:

- Escogimos las tecnologías que íbamos a utilizar. Por el tiempo y la necesidad de integración tuvimos que escoger ASP.NET MVC 5, que es la tecnología más familiar para los ingenieros.
- Desarrollamos el equipo que iba a encargarse del desarrollo (no solo de la parte de ingeniería, sino también de las pruebas, integración y documentación).
- Desarrollamos el _backlog_ inicial del producto.
- Nos encargamos que todos los miembros del equipo tuviesen un ambiente estable y listo para el desarrollo.

## Manos a la obra

En el Sprint 1, desarrollamos las principales funcionalidades esperadas por el usuario final, como aquellas relacionadas con el trámite y una integración completa con el Tribunal Electoral, lo que iba a eliminar en un 99.99% las inconsistencias de tramitación. Esto era sumamente importante para nuestro usuario final y se catalogó como una de las funcionalidades principales para el nuevo sistema.

En el IFARHU, poseemos una aplicación intermedia que se encarga de la consulta con el Tribunal Electoral que expone un API en JSON. Esta aplicación conocida como SIVIFARHU (Sistema de Verificación Interna IFARHU) realiza un ciclo similar al siguiente:

<img src="/assets/images/2017_03_10_sivifarhu.png" alt="" width="100%" />

Básicamente el sistema tiene tres fuentes de información y sigue un ciclo de la siguiente manera:

1. El API recibe el número de cédula que verifica primero en las instancias de [Redis](https://redis.io/) que tenemos disponibles.
1. Si no existe en el Redis, hace una consulta rápida a las Bases de Datos Relaciones donde se determina si esta cédula ya fue verificada con el Tribunal Electoral.
1. De lo contrario, hace la consulta al Tribunal Electoral y pide una "verificación" al usuario. Si el usuario da como "válida" la verificación, se almacena en Redis que subsecuentemente se almacena en la Base de Datos Relacional.

Ya que la consulta al Tribunal Electoral tiende a ser un poco lenta y la consulta a nuestra Bases de Datos puede estar un poco colapsada en estos momentos (hablando de que son cientos de usuarios ingresando cientos de miles de datos en pocas semanas), sopesamos un poco la carga utilizando esta forma, lo que nos lleva un tiempo de respuesta regularmente de unos pocos milisegundos.

> **Nota:** La información que se almacena **no es la proveniente del Tribunal Electoral**. El sistema hace una doble-validación con el usuario (además de utilizar algoritmos de distanciamiento entre palabras) y si el mismo valida que la misma es correcta, almacena que la persona con el beneficio consultado ya fue validado con el Tribunal Electoral. Esto almacena internamente un listado de beneficiarios ya verificados / validados.

A nivel del diseño no nos tuvimos que preocupar mucho. Todos los aplicativos del IFARHU utilizan un [Taboga](https://github.com/ifarhu/taboga), un sistema de templates que nos permite uniformidad en los diseños.

<img src="/assets/images/2017_03_10_ss1.png" alt="" width="100%" />

En el resto de los Sprints, nos concentramos en otras funcionalidades que eran necesarias para nuestra funcionalidad del ciclo inicial.

**En el Sprint 1 pudimos:**

- Realizar las integraciones con el Tribunal Electoral, lo que ahora reduciría notablemente el tiempo necesario para el trámite de un estudiante.
- Realizar las conexiones al Directorio Activo, como [SSO](https://en.wikipedia.org/wiki/Single_sign-on).
- Desarrollar el primer formulario de tramitación, el cual permitiese crear los primeros beneficios en el sistema.

**En el Sprint 2:**

- Desarrollar un módulo para la configuración de los beneficios, evitando el ingreso de datos errados en los montos.
- Desarrollar las pantallas y funcionalidades para el seguimiento de los estudiantes (modificar el estado actual del estudiante)

**En el Sprint 3:**

- Desarrollar las pantallas para la actualización de los estudiantes (como modificación de sus representantes legales, sus beneficios, etc).

## Entrenamiento

Debido al poco tiempo para el desarrollo e implementación de este nuevo sistema, no hubo tiempo para realizar entrenamientos formales para nuestros colaboradores. Es por ello que nuestra técnica fue mucho más simple:

1. Desarrollamos ciclos internos para validar la experiencia de usuario y la usabilidad de nuestros sistemas, corrigiendo errores y discordancias de inmediato.
1. Como utilizamos [Taboga](https://github.com/ifarhu/taboga), el aplicativo y su flujo es muy similar a otros aplicativos del IFARHU. Esto hace que el usuario instintivamente conozca que debe hacer. El mismo SIVIFARHU, usado diariamente para la validación de las generales del estudiante, tiene un diseño idéntico a este sistema.
1. Desarrollamos vídeo-tutoriales, los cuales fueron transmitidos por la Intranet del IFARHU. Adicionalmente se desarrollaron manuales, los cuales también fueron incluídos en el Wiki interno del IFARHU.
1. Se entrenó a nuestro Helpdesk sobe el uso del aplicativo, permitiéndoles dar respuestas a preguntas comunes.

<img src="/assets/images/2017_03_10_ss2.png" alt="" width="100%" />

## Resultados

Los resultados han sido positivos. De febrero a marzo hemos podido desarrollar los otros módulos según han sido necesarios y con esto, hemos ido entregando incrementalmente un sistema que, de forma tradicional, hubiese demorado cerca de 6 meses su construcción.

De igual forma, y gracias a la integración con otras partes operativas y entender el valor esperado, hemos podido desarrollar las funcionalidades principales esperadas por las partes interesadas, las cuales vieron una entrega continua de valor en todo momento.
