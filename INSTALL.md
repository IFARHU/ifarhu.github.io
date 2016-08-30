# Arrancando el proyecto en entornos Ubuntu o Homestead

```shell
git clone git@github.com:IFARHU/IFARHU.git
```

Utilizaremos rbenv para instalar ruby a nuestro proyecto. Copie los siguientes comandos en su terminal.

```shell
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

cd ../path/to/blog

gem install bundler

jekyll serve
```

Si se desea cambiar el host del jekyll puede usar el siguiente codigo.

```shell
jekyll serve --host=192.168.10.10
```

En caso que Jekyll no hace la compilación de archivos con cambios, puede utilizar.

```shell
jekyll serve --host=192.168.10.10 --force_polling
```

# Licenciamiento

Basado en el template de Jekyll [Wangana](https://github.com/iamnii/wangana)
