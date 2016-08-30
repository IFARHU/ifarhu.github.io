---
layout: post
title: Ambiente de Desarrollo - IFARHU
date: 2016-08-09
comments: true
archive: false
category: Tutoriales
author: rodney
---

En la DTI, intentamos crear ambientes de desarrollo que puedan ser replicados fácilmente entre los distintos colaboradores de los proyectos. Algunos de nuestros proyectos internos están basados en ASP.NET MVC 5, por lo que era necesario desarrollar un ambiente en Windows replicable para estos proyectos.

## Requerimentos

* Windows 7+ / Windows Server 2003+
* PowerShell v2+
* Editor de Texto como Visual Studio Code
* .NET Framework 4+ (the installation will attempt to install .NET 4.0 if you do not have it installed)

## Prerequisistos

Será necesario instalar chocolatey, chefdk, chef-client, Visual Studio Code y habilitar Hyper-V, para eso se deberá ejecutar como administrador el PowerShell `ProgramasNecesarios.ps1` que hará todas estas instalaciones por nosotros. Al final le pedirá que reinicie el equipo.

Ahora Ejecutar como administrador el PowerShell `ConfiguracionVM.ps1` el cual creará la red interna para la maquina virtual y agregara la maquina virtual.

### Instalación paso a paso desde PowerShell

#### Instalar Choco

~~~
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
~~~

#### Instalar Chef

~~~
choco install chefdk
choco install chef-client
~~~

#### Instalar Visual Studio Code

~~~
choco install visualstudiocode
~~~

#### Instalar driver kitchen-hyperv

~~~
chef gem install kitchen-hyperv
~~~

#### Habilitar la caracteristica de HyperV para windows

~~~
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
~~~

En esta estapa, debemos proceder a reiniciar el equipo.

#### Asegurarse que el modulo de HyperV esta habilitado para PowerShell

~~~
Get-Command –Module Hyper-V
~~~

#### Si no esta habilitado el HyperV

~~~
Import-Module ServerManager
Add-WindowsFeature RSAT-Hyper-V-Tools –IncludeAllSubFeature
~~~

#### Creación de Switch interno para la Maquina Virtual

~~~
New-VMSwitch -SwitchName "RedInterna" -SwitchType Internal
New-NetIPAddress -InterfaceAlias "vEthernet (RedInterna)" -IPAddress 192.168.0.1 -PrefixLength 24
~~~

#### Creación de la carpeta para la Maquina Virtual

~~~
mkdir C:\Hyper-V
~~~

#### Creación de una maquina virtual vacia a partir de un ISO de Windows Server 2012

~~~shell
$vm = New-VM -Name WindowsServer2012R2Core -MemoryStartupBytes 4GB -NewVHDPath "C:\Hyper-V\WindowsServer2012R2Core.vhdx" -NewVHDSizeBytes 40GB -Path "C:\Hyper-V" -SwitchName RedInterna
$vm | Add-VMDvdDrive -Path "\\10.252.164.126\Desarrollo de Sistemas\Software\Windows_Svr_Std_and_DataCtr_2012_R2_64Bit_English_-3_MLF_X19-53588.ISO"
$vm | Set-VM -AutomaticStartAction StartIfRunning -AutomaticStopAction ShutDown
$vm | Start-VM
~~~

De ser necesario, se debe cambiar el Path del ISO o copiarlo a su equipo local y cambiar la dirección.

#### Conectando a la maquina virtual

~~~
C:\Windows\System32\mmc.exe C:\Windows\System32\virtmgmt.msc
~~~

#### Instalación de Windows Server 2012 R2

* Instalar manualmente el sistema operativo del Windows Server 2012 R2.
* Escoger Windows Server 2012 R2 Standard (Server Core Installation).
* Escoger Custom: Install Windows Only (advanced).
* Las demas opciones escoger las predeterminadas.
* Al iniciar el sistema cambiarle el password de la cuenta *administrator*.
