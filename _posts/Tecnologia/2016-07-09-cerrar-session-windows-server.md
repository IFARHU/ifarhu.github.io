---
layout: post
title: Cerrar sesión de Windows Server por consola
date: 2016-09-05
comments: true
archive: false
category: Tecnologia
author: rodney
---

A veces nos pasa que al conectarnos por **Remote Desktop** a Windows Server (cualquier versión), dejamos la sesión abierta porque se nos ha olvidado cerrar la misma, y cuando intentamos conectarnos aparece el mensaje `Servicios de Terminal Server ha sobrepasado el liminte de conexiones permitidas`. Aquí explicaremos una solución para este problema.

Estos comandos pueden ser ejecutados desde la consola de comandos de windows (cmd) o desde powershell (cualquier version). Se debe tomar en cuenta que los parametros deben de ser reemplazados por los que se necesitan.


## Comando para agragar o verificar la comunicació con el Equipo Remoto

~~~
net use \\IP-SERVIDOR
~~~

En caso de que necesite autenticación le debe salir algo asi:

~~~
La contraseña o el nombre de usuario no es válido para \\IP-SERVIDOR.
Escriba el nombre de usuario para "IP-SERVIDOR": <usuario administrador>
Escriba la contraseña para IP-SERVIDOR: <contraseña>
Se ha completado el comando correctamente.
~~~

## Comandos para consular las sesiones activas en el equipo remoto

~~~
query session /server:IP-SERVIDOR
~~~

o también podemos utilizar

~~~
qwinsta /server:IP-SERVIDOR
~~~

Luego de escribir cualquiera de estos comandos, nos deberá aparecer una información similar a la siguiente:

~~~
NOMBRE DE SESIÓN  NOMBRE DE USUARIO        ID  ESTADO    TIPO   DISPOSITIVO
console                                     0  Conn    wdcon
rdp-tcp                                 65536  Escuchar  rdpwd
rdp-tcp#2         <usuario admin>           1  Activo  rdpwd
rdp-tcp#8         <usuario X>               2  Activo  rdpwd
~~~
    

## Comando para cerrar la sesión que desea, por medio del ID de la sesión

~~~
logoff ID /server:IP-SERVIDOR
~~~

Y listo!, con estos pasos básicos ya debes haber cerrado la sesión deseada.
Solo tienes que volver a intentar a entrar por Remote Desktop al windows server.
