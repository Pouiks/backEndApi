# Heroku database for Dev

## State

- Sqitch deploy OK au 22/10 ( via `yarn initialDeloyDb` )
```
Déploiement des changements vers origin
  + create_tables ............. ok
  + checks .................... ok
  + functions/insert_animal ... ok
  + functions/insert_group .... ok 
  + functions/insert_user ..... ok
  + functions/insert_message .. ok
  + functions/update_animal ... ok
  + functions/update_group .... ok
  + functions/update_user ..... ok
```
- Provisionement en données (20ROWS/ table) OK au 22/10 ( cf . `./mock_data/seedingV2` )

<br>

- UPDATE DU 23/10 : toutes les fonctions ci-dessus, marquée 'ok' ne le sont en faite pas (sauf une). Il reste à les coder.

## Comment se connecter à la base de données ?

1. Solution PG Admin :
```
1. Télécharger l'application (https://www.pgadmin.org/)

2. A gauche : dans "Servers" > clique droit > Create > Server

3. Une pop-up s'affiche :
- Name : ce que voulez
- Connect now : coché 

4. Onglet connection :
- Host name / address : ec2-52-30-161-203.eu-west-1.compute.amazonaws.com
- Port : 5432
- Maintenance database : dh4d2mem19cm6
- Username : uganvnxtsalzdc
- Password : 78d119172a7ef907f3c5a5fda1353044f8cbbda56a940b19d2525752afcda31d
- /!\ Cocher "Save password ?"

5. Onglet SSL
- SSL mode : Require

6. Onglet Advanced :
- DB restriction : dh4d2mem19cm6

7. Save

Ensuite vous pourez y accèder en cliquant sur le nom que vous lui avez donnée.
Une fois sur "dh4d2mem19cm6" cliquez sur l'icone "Query Tool" : vous pouvez effectuer des requêtes SQL (SELECT, UPDATE, etc...) direcement dans l'encart prévu. Pour la valider, appuyer sur le boutton/icone "execute/refresh(F5)"
```

2. Solution CLI : <br>
    2.1 : Télécharger le client heroku CLI <br>
    2.2 : Depuis la CLI : `heroku pg:psql postgresql-octagonal-96791 --app meetmypetapo` <br><br>
>NB: à vérifier, étant donné que l'accès par cette méthode est peut-être/sans doutes réstreint à mon compte personnel


## Comment communiquer avec la BDD ?

1. Solution URI :
`postgres://uganvnxtsalzdc:78d119172a7ef907f3c5a5fda1353044f8cbbda56a940b19d2525752afcda31d@ec2-52-30-161-203.eu-west-1.compute.amazonaws.com:5432/dh4d2mem19cm6`

2. Utiliser un parser d'URI/URL pour extraire chaque "composant" du lien (cf. url-parse pax exemple). Une URI se décompose tel quel `postgres://user:password@host:port/database`

