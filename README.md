Javascript Game: Korg's Adventure
========
###### Web 2.0 - Master 1 IFI, Université Nice Sophia-Antipolis - 2017/2018

Le joueur contrôle le petit bonhomme appelé Korg et le but du jeu c'est passer de niveau en collectant toutes les monnaies sans se fait tuer par les ennemis.

## Caractéristiques du jeu
#### Joueur:
* Il peut se déplacer à gauche et à droite.
* Il peut sauter et faire de double sautes aussi.
* Il possède trois vies par niveau.
* Il perd de vie lorsqu'il collisionne avec un ennemi ou il tombe dans un trou.

#### Ennemis:
* Ils se déplacent horizontalement d'un côté à l'autre dans une distance fixe.
* Ils possèdent deux vies.
* Ils perdent de vie lorsque le joueur saut dessus eux.

#### Niveaux:
* Un niveau est passé lorsque le joueur collecte toutes les monnaies et a au moins une vie.
* Un niveau est perdu lorsque le joueur n'a plus de vie.
  
## Points forts
#### Gestion des niveaux: 
* Chaque niveau contient diffèrent plateformes, ennemis et monnaies.
* Tous les niveaux sont définis dans un fichier JSON qui permet de décrire plusieurs caractéristiques de chaque élément comme par exemple, la position sur x et y, les dimensions, le type, etc.

#### Images:
Utilisation de Spritesheet pour le jouer, les ennemis et les monnaies, car il permet d'avoir une animation plus fluide.

#### Musique:
* Utilisation de la libraire Howler.js pour mieux gérer les diffèrent sons.
* Le jeu contient les sons suivants:
  * Musique de fond.
  * Son pour collision jouer-ennemis et joueur-monnaie.
  * Son pour sauter et pour tomber dans trou.
  * Son pour game over et son de feu d'artifice pour niveau réussi.  

#### Moteur de jeu:
On est parti du TP et on a développé le reste sauf la gestion de spritesheet et la simulation d'explosion avec des particules (qui est utilisé comme les feux d'artifice pour le niveau réussi) qui ont été pris du cours et adapté. 

## Difficultés rencontrées
L'utilisation de Spritesheets est très avantageuse, mais on a rencontré de difficultés au moment de la détection des collisions entre le joueur et les ennemis/monnaies.

## Points à améliorer
* Les collisions entre le joueur et les ennemis.
* Créer une meilleure architecture pour les ennemis. Utiliser le patron de conception Factory par exemple.
* Plus de navigation dans le jeu comme bouton pour retourner à l'écran de start ou bouton pour recommencer le niveau actuel.

## Idées supplémentaires
* Faire clignote le joueur et l'ennemi quand il y a une collision pour le montrer de façon visuelle aussi et pas seulement sonore.
* Créer des plateformes qui se bougent ou avec obstacles comme de feu par exemple.

## Auteurs
* Andreina Wilhelm
* Andrei Zabolotnîi
