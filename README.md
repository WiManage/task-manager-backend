🚀 Test Technique : Task Manager Dashboard
Bienvenue sur le projet Task Manager. En tant que nouveau développeur sur ce MVP, ta mission est de stabiliser l'application. Actuellement, le projet est fonctionnel dans sa structure, mais plusieurs régressions et oublis bloquent la mise en production.

Ton objectif est de diagnostiquer et de corriger les 5 points de friction listés ci-dessous.

🛠 Dysfonctionnements Identifiés

1.  Symptôme : L'application NestJS crash immédiatement au démarrage avec une erreur d'authentification ou de timeout MongoDB.
    Contexte PM : Nous avons migré vers MongoDB Atlas pour la scalabilité, mais le serveur semble ne pas "voir" la base de données.
    URI Base de donnee : mongodb+srv://CheikhM:Mongo123@cluster0.e8pz3ms.mongodb.net/task-manager?retryWrites=true&w=majority

2.  Symptôme : L'accès à certaines routes de l'API renvoie systématiquement une erreur 403 Forbidden.

3.  Symptôme : Les utilisateurs signalent qu'il est impossible de faire glisser une tâche dans la colonne "Archivé". La tâche revient à sa place initiale comme si la zone était interdite.
    Contexte PM : C'est une fonctionnalité critique pour nettoyer le dashboard. Le drag-and-drop fonctionne pour les trois premières colonnes, mais la quatrième fait de la résistance.

4.  Symptôme : Lorsqu'un utilisateur clique sur "Supprimer une tâche" ou tente d'ajouter un commentaire, l'interface ne fait rien. Aucun message d'erreur ne s'affiche, mais rien ne se passe côté serveur.
    Contexte PM : On appelle ça des "Silent Failures". L'utilisateur a l'impression que le bouton est cassé.

5.  Symptôme : Le backend refuse de compiler à cause d'une erreur d'injection de dépendance (Dependency Injection error).
    Contexte PM : Suite à un dernier refactoring sur le module des Commentaires, le service ne semble plus être reconnu par le reste de l'application.

💡 Attentes
Qualité : Le code doit être propre et suivre les standards Angular 19 (Signals, Standalone si possible).

Backend : Les schémas Mongoose doivent rester cohérents.

Communication : Une fois corrigé, fournis un bref récapitulatif des corrections effectuées pour chaque point.

Bonne chance, on attend tes correctifs pour merger sur la branche main !
