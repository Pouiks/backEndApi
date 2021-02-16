# Cahier des charges Meet My Pet


## Présentation du projet

<p> Meet My Pet est une plateforme qui met en relation les maîtres de chiens. Vous avez l'habitude de promener votre chien dans votre quartier, dans un parc et vous aimeriez que votre chien puisse retrouver ses amis, et pourquoi pas en profiter pour prendre le temps de se connaître. </p>

## Principal cheminement client : besoins et objectifs

- Je suis le maître de Nooky, un border collie mâle de 4 ans. Je rejoins très souvent d'autres maîtres de chien dans mon quartier dans le parc proche de chez moi.
Malheureusement je ne sais jamais à quelle heure ses copains sortent et quand il va pouvoir se dépenser. Et je l'avoue, j'aime bien me retrouver avec ces gens autour de notre même hobbie : voir nos chiens s'éclater. Grâce à cette appli, je prend mon téléphone, j'annonce aux personnes qui sont inscrites au sein du groupe de chien qu'ils pourront m'y retrouver ainsi que mon chien s'ils le veulent.

- Un membre du groupe auquel j'appartiens va promener son chien, je l'ai follow, je reçois une notification pour me prévenir qu'il sera bientôt à l'endroit de rendez vous habituel.

- Je viens d'arriver dans ma nouvelle ville, et je ne connais pas les endroits où les gens promènent leurs chien habituellement... Grâce à Meet My Pet, je peux grâce à la carte intéractive, visualiser les groupes de personnes se retrouvant dans ma ville et les intégrer en un clic.


## Public visé

Tout les propriétaires d'animaux


## MVP - Fonctionnalités principales

- __Création de groupe__
  Je souhaite créer un groupe pour rassembler plusieurs utilisateurs. Chacun pourra y adhérer une fois qu'il sera connecté sur le site. Chaque groupe aura sa messagerie.

- __Localisation__ (leaFlet)
  Grâce à l'API leaFlet je peux voir ma position sur une carte, et voir autour de moi les différents groupes qui ont été créés.
  
- __Points de rencontre__ (marker)
  J'utilise les markers mis à disposition par la carte interactive pour choisir le groupe auquel je veux adhérer. Je peux consulter les principales informations en cliquant sur le marker, et voir apparaître via une modale des infos.

- __Création de compte__
  Je crée un compte afin d'avoir accès aux fonctionnalités du site. Je ne peux pas intégrer de groupe sans être membre.

- __Espace administrateur__
  Je souhaite pouvoir supprimer manuellement un utilisateur sans passer forcément par l'interface de commande pour ajouter / modifier / supprimer quelque chose dans la BDD (utilisateur, groupe).

__Liens utiles__ :

LeaFlet: https://leafletjs.com/reference-1.7.1.html

React-LeaFlet : https://react-leaflet.js.org/

Google API placeComplete : https://developers.google.com/places/web-service/autocomplete

Socket Io getStarted / doc : https://socket.io/get-started/chat/

Socket Io cheatSheets : https://socket.io/docs/emit-cheatsheet/

Semantic UI react : https://react.semantic-ui.com/

API Dogs : https://dog.ceo/dog-api/breeds-list


## Choix des technologies BackEND

 - PostgreSQL
 - Sqitch (à partir de la V2)
 - ExpressJS
 - NodeJS
 - JOI / JS doc
 - Redis

 - AWS
 

## Choix des technologies FrontEnd

 - ReactJs
 - Redux
 - Google API placeComplete
 - LeaFlet API localisation
 - Socket io
 - SaSS
 - Axios
 

## Présent dans la base de données

 - USER : first_name, city, address, email, password, latitude, longitude
 - ANIMAL: name, specie, age, sex, description, breed, size, image, user_id
 - GROUP : name, latitude, longitude, city, address, city, country, description, created_by
 - MESSAGE : content, send_at, send_to, send_by


## Navigateurs compatibles

Tous navigateurs dans la mesure du possible. 
Possibles problèmes de compatibilité avec IE 9.


## __Pistes de réflexion__ 

- Utiliser des filtres pour pouvoir trouver un chien ( selon certains critères comme la taille, race, caractère)
- Pouvoir envoyer un Message privé à un utilisateur ( réfléchir à la possibilité de bloquer / signaler un utilisateur)
- Groupes actifs / inactifs : ajouter des voyants vert / jaune / rouge en fonction de l'activité du groupe. 
-> Groupe qui se supprimerait automatiquement au bout d'un certain temps d'inactivité
- Ajout d’un deuxième animal pour un utilisateur. Création d’un table intermédiaire entre user et dog.
- Ajout d’un blog
- Idée de logo :

![image](./images/ideeLogo.png)
![image](./images/previewLogo.png)


## Rôles de la team

- Iris : Lead dev Back
- Sofiane : Lead dev Front
- Virgile : Product Owner
- Théo : SCRUM Master

Les rôles sont susceptibles de changer au besoin.
