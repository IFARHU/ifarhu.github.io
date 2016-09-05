---
layout: post
title: Cerrar sesión de Windows Server por consola
date: 2016-09-05
comments: true
archive: false
category: Tecnologia
author: rodney
---

Aveces nos pasa que al conectarnos por **Remote Desktop** a Windows Server (cualquier version), dejamos la sesion abierta por que se nos aya olvidado cerrar la sesión y cuando intentas conectar te aparece el mensaje `Servicios de Terminal Server ha sobrepasado el liminte de conexiones permitidas`, he aqui la solución.

> Estos comandos pueden ser ejecutados desde la consola de comandos de windows (cmd) o desde powershell (cualquier version).

> Se debe tomar en cuenta que los parametros deben de ser reemplazados por los que se necesitan.

  - comando para agragar o verificar la comunicacion con el equipo remoto

  - ~~~
    net use \\IP-SERVIDOR
    ~~~

    En caso de que necesite autenticación le debe salir algo asi:

    ~~~
    La contraseña o el nombre de usuario no es válido para \\IP-SERVIDOR.

    Escriba el nombre de usuario para "IP-SERVIDOR": <usuario administrador>
    Escriba la contraseña para IP-SERVIDOR: <contraseña>
    Se ha completado el comando correctamente.
    ~~~

  - comandos para consular las sesiones activas en el equipo remoto

  - ~~~
    query session /server:IP-SERVIDOR
    ~~~

    ó

  - ~~~
    qwinsta /server:IP-SERVIDOR
    ~~~

    Luego de escribo alguno de los 2 comandos le saldra una consulta parecida a esta:

    ~~~
     NOMBRE DE SESIÓN  NOMBRE DE USUARIO        ID  ESTADO    TIPO   DISPOSITIVO
     console                                     0  Conn    wdcon
     rdp-tcp                                 65536  Escuchar  rdpwd
     rdp-tcp#2         <usuario admin>           1  Activo  rdpwd
     rdp-tcp#8         <usuario X>               2  Activo  rdpwd
    ~~~
    
  - comando para cerrar la sesion que desea por medio del ID de la sesion
  - ~~~
    logoff ID /server:IP-SERVIDOR
    ~~~

Y listo!, con estos pasos básicos ya debes haber cerrado la sesión deseada.
Solo tienes que volver a intentar a entrar por Remote Desktop al windows server.