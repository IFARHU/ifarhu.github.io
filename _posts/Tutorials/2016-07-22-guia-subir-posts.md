---
layout: post
title: Creando un blog utilizando Jekyll
date: 2016-7-21
comments: true
archive: false
category: Tutorials
author: angelo
---

### Arrancando un proyecto Jekyll en entornos Ubuntu o Homestead

Clonar el proyecto de [IFARHU - Blog](git@gitlab.ifarhu.gob.pa:a.marucci/ifarhu-blog.git).

~~~
git clone git@gitlab.ifarhu.gob.pa:a.marucci/ifarhu-blog.git
~~~

Dirigirse al root de su sistema.

~~~
cd
~~~

Utilizaremos rbenv para instalar ruby a nuestro proyecto, Copie los siguientes comandos en su terminal.

~~~
git clone https://github.com/rbenv/rbenv.git ~/.rbenv

echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc

echo 'eval "$(rbenv init -)"' >> ~/.bashrc

exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc

exec $SHELL

rbenv install 2.3.1

rbenv global 2.3.1

ruby -v

gem install jekyll
~~~

Volver a la raiz del proyecto Blog.

~~~
cd ../path/to/blog
~~~

Instalar el gem bundler.

~~~
gem install bundler`
~~~

Levantar el servicio de Jekyll.

~~~
jekyll Serve
~~~

Si se desea cambiar el host del jekyll puede usar el siguiente codigo.

~~~
jekyll serve --host=192.168.10.10
~~~

En caso que Jekyll no hace la compilación de archivos con cambios, puede utilizar.

~~~
jekyll serve --host=192.168.10.10 --force_polling
~~~

<hr>
### Tips
Recuerde que puede bajar el servicio jekyll en cualquier momento con los siguientes comandos:

~~~
cmd + c
~~~

Para usuarios Windows o Ubuntu

~~~
ctrl + c
~~~

Normalmente se baja el servicio jekyll cuando se requiere que se actualize alguna configuración colocada en el en *_config.yml*. 
