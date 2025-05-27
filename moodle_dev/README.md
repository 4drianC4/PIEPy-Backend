# En caso de que el moodle no se vea en el localhost:8080

## ingresar al contenedor

- docker exec -it moodle_dev-moodle-1 bash

## editar el archivo

- /opt/bitnami/apache/conf/httpd.conf

# cambiar los campos Listen, DocumentRoot y <Directory>

- Listen 80
- DocumentRoot "/opt/bitnami/moodle"
- <Directory> "/opt/bitnami/moodle"

# reiniciar los contenedores

- docker restart moodle_dev-mariadb-1
- docker restart moodle_deb-moodle-1

#####################################################

# Instalar Plugin

- Ir a Site administration/Plugins/Install Plugin
- Arrastrar el plugin local_local.zip
- Continuar todos los ajustes que se pide

#####################################################

# Crear un curso

- Vamos a la ruta: Site administration/Courses/Manage courses and categories/ Add a new course

# Generar Token

- Acceder a: Site administration/ Web services/ Manage tokens
