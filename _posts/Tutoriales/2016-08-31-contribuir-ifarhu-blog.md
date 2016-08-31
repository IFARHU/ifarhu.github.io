---
layout: post
title: Como contribuir a un blog Jekyll
date: 2016-8-31
comments: true
archive: false
category: Tutoriales
author: angelo
---

Este tutorial asume que hayas [instalado correctamente jekyll ]({{site.url}}/posts/2016-07-22-primeros-pasos-jekyll.md)en tu ambiente correspondiente y adicionalmente tengas clonado el repositorio de [IFARHU - DTI Blog](https://github.com/IFARHU/ifarhu.github.io)

### Pasos para contribuir utilizando git y tu editor de texto de preferencia

1\. Crear un nuevo branch en el proyecto con algún nombre simbólico para la creación del nuevo archivo y cualquier modificación adicional que se requiera.

~~~
 git checkout -b IB_Creacion_Nuevo_Blog_Post_Tutorial
~~~

2\. Crear el `archivo.md`, en la ubicación deseada, el destino del archivo dependerá de que categoria quiera usar:

~~~
~/_posts/Tutoriales/..
~~~

o bien otra ubicación dependiendo de la categoria que se escogió.

~~~
~/_posts/Tecnologia/..
~~~

3\. Escoger el nombre del archivo según el formato que se muestre abajo.

~~~
~/_posts/Tutoriales/yyyy-mm-dd-titulo.md
~~~

4\. Incluir el Jekyll front matter particular del post.

~~~
layout: post
title: Como contribuir a un blog Jekyll
date: 2016-8-31
comments: true
archive: false
category: Tutoriales
author: angelo
~~~

- Si eres un autor nuevo, debes colocar tu nombre en el yaml file ubicado en `_data/authors.yml` de la siguiente forma:

~~~
username:
 name: nombre_completo
 correo: correo@provider.domain
~~~

- Es importante seguir el formato, ya que esto es la sintaxis particular de archivos yaml.

5\. Verificar que su post sea visible en el [index ]({{site.url}}/index).

6\. Al culminar, asegurarse que apareció correctamente el post creado en el index del sitio.

- Revision de cambios.

### Culminando los cambios efectuados con git

7\. Al Culimar todos los cambios necesarios, verifíquelos con `git status` en su terminal de **git bash**.

8\. debe apreciarse cambios no rastreados en su terminal de git.

~~~
_posts/Tutoriales/2016-08-31-contribuir-ifarhu-blog.md
~~~

9\. Adicione los cambios a su repositorio local con `git add _posts/Tutoriales/2016-08-31-contribuir-ifarhu-blog.md` o cualquier otro archivo que recuerda de ser agregado.

10\. Efectue el commit con `git commit -m "IB - Creacion de post nuevo, tutorial de subir nuevos posts de jekyll"`

11\. Publique sus cambios al respositorio remoto: `git push -u origin IB_Creacion_Nuevo_Blog_Post_Tutorial` o el nombre del branch respectivo.

12\. Luego  dirígase al repositorio de [IFARHU - DTI Blog](https://github.com/IFARHU/ifarhu.github.io)

13\. Crea un nuevo Pull Request