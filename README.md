# ATLAS — Étape 02 · Village & personnages

**Préversion technique indépendante** du site `cloelb.github.io/atlas/`. Ne pas remplacer le dépôt en production avant validation.

## Ce qui fonctionne dans le code
- Village illustré plein écran, déplacement au toucher/clic et aux touches directionnelles ou WASD ; caméra qui suit un personnage SVG original.
- Accès par les sentiers à la Maison de la Maire, à la maison, au Pavillon et à la Bibliothèque.
- Maison de la Maire : Cap et trois Missions publiques de Cloé ; chaque étape est présentée comme une intention, jamais une réussite inventée.
- Studio : sélection **Fille / Garçon**, 5 teintes de peau, 7 couleurs de cheveux, 5 coiffures, 5 tenues de départ et accessoires ; aperçu immédiatement mis à jour ; mise à jour du personnage du Village lors de l'enregistrement.
- Partie personnelle **sur l'appareil seulement** : Cap, Missions libres, Étapes, validation, XP idempotents, Carnet, catalogue de quatre objets ; le foulard débloqué s'équipe automatiquement.
- Site statique : compatible avec GitHub Pages, sans commande de compilation ni secret API.

## Ce qui est simplifié / provisoire
- **Illustration du Village issue d'une image de conception, avec des étiquettes peintes dans le visuel** : elle sert uniquement de référence visuelle. Les vrais éléments cliquables, l'avatar et la logique de scène sont ajoutés séparément. L'image de fond devra être reconstruite en assets de jeu indépendants.
- Déplacements vers des points prédéfinis, sans collisions physiques ni sprites d'animation complets ; le personnage est vectoriel, pas encore un ensemble de sprites professionnels dessinés sous plusieurs angles.
- La Carte est une vue symbolique simplifiée. Les intérieurs sont esquissés.
- Pas encore de Supabase, comptes, images de Carnet, vraie personnalisation/placement de meubles, saisons variables, sauvegarde entre appareils, moteur Phaser ni sécurité multi-utilisateur.
- Les XP sont uniquement une démonstration locale sans validation serveur ; ne pas les utiliser comme économie publique réelle.

## Publication temporaire pour validation
1. Décompresser l'archive.
2. Créer un **nouveau dépôt GitHub** nommé `atlas-preview` pour conserver `atlas` intact.
3. Importer **le contenu** de `ATLAS-etape-02`, et non le dossier contenant ce contenu. `index.html`, `styles.css`, `src/`, `assets/` doivent être à la racine.
4. Settings → Pages → Deploy from a branch → main → /(root) → Save.
5. L'aperçu sera disponible sous `https://cloelb.github.io/atlas-preview/` une fois publié. La publication n'a pas été réalisée depuis cette conversation.

## Test local
Comme le projet utilise des modules JavaScript, utilisez un serveur statique (ou GitHub Pages). Exemple avec Python installé : `python3 -m http.server 8000` dans le dossier du site, puis `http://localhost:8000/`.

Test de la logique métier et des avatars (Node.js 22+) : `node docs/test-modules.mjs`.

## Sécurité et confidentialité
N'entrez **pas de données sensibles** : tout est enregistré dans `localStorage`, sans compte ni sauvegarde distante. Éviter d'inviter le grand public à créer des Atlas sur cette préversion. Rien n'est envoyé volontairement à un backend ; le chargement des fichiers du site est assuré par l'hébergeur. Le contenu public de Cloé ne contient pas d'accomplissement inventé. Aucune clé Supabase n'est intégrée.

## Suite technique
1. Remplacer la peinture d'ambiance par de véritables assets composables du Village, supprimer toute étiquette intégrée à l'image.
2. Dessiner des sprites séparés fille/garçon avec vêtements interchangeables, animations 4/8 directions et état d'âge par Chapitres.
3. Intégrer Phaser + React/TypeScript lorsque la direction du gameplay et des assets est finalisée.
4. Concevoir le modèle de données normalisé, Supabase Auth et RLS avant le lancement de comptes publics.
5. Tester sur de vrais téléphones Safari iPhone et Chrome Android ; tester le parcours complet et l'accessibilité avant toute publication large.
