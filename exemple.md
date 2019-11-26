# Contribuer au projet

(...)

## Le modèle de branches utilisé

(...)

## Les messages de commit Git

### Le modèle :
```
1 | type(subject): short description                                  
2 |
3 | Long description (what and why instead of how)
4 |
5 | [link to ticketing tool & Breaking changes]
```

**Ligne 1** : c'est le titre du commit qui pourra être utilisé pour lister de manière synthétique les modifications apportées au code source (cf. `git shortlog`), où :
- le `type` peut prendre les valeurs :
  - build : modification qui a un impact sur le process de build (dépendances, scopes, etc.)
  - ci : modification sur le code et / ou la configuration de l'intégration continue
  - docs : modification uniquement sur la documentation
  - feat : fonctionnalité
  - fix : correction de bug(s)
  - perf : correction de code uniquement pour améliorer les performances
  - refactor : modification de code hors fonctionnalité ou correction de bug
  - style : modification pour application de conventions de codage ou de formattage du code
  - test : ajout et / ou correction de tests
  - ...
- le `subject` indique la fonctionnalité impactée
- la `Short description` est la description courte sous la forme impérative de l'action menée sur le code source.

La longueur totale de la première ligne, constituant le titre du commit ne doit pas dépasser 50 caractères. Ne pas terminer le titre par un ".".

**Ligne 2** : Si le commit nécessite une description plus détaillée, cette dernière est séparée du titre (ligne 1) par une ligne vide.

**Ligne 3** : La description longue du changement opéré sur le code source, si besoin. Cette partie peut contenir autant de ligne que nécessaire. Elle doit se focaliser sur le *quoi* et le *pourquoi* plutôt que sur le *comment*. Chaque ligne de commentaire dans cette partie ne devra pas dépasser 72 caractères. 

**Ligne 4** : Si le message de commit prend en charge la résolution d'éléments tracés dans un outil de ticketing, une ligne vide est inséré avant référencement des tickets concernés par le commit.

**Ligne 5** : Elle contient les références vers les références des tickets traités dans le commit :
```
Closes #49853, #46293
```

Et si besoin les *Breaking changes* sur le code :
```
Avant :
(...)

Après :
(...)

Les modifications portent sur...
La méthode ... est donc annotée comme étant dépréciée et sera supprimée dans la prochaine version majeure.
