/**
 * Rebuilds module2_refined.json lesson m2_lecon1 blocks to match the textbook order
 * (source: le livret de l'élève - Copy التعديل الاخير.txt, Module 2 Leçon 1).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const target = path.join(root, 'src', 'module2_refined.json');

const blocks = [
  {
    type: 'paragraph',
    content: 'Leçon : « 1 » La vie dans le passé : sans téléphone, sans Internet',
  },
  {
    type: 'objective',
    content:
      'Objectif général : À la fin de la leçon « la vie dans le passé », l’apprenant sera capable de comprendre un texte explicatif et de produire un texte écrit cohérent et structuré pour informer et convaincre.',
  },
  {
    type: 'paragraph',
    content: 'À la fin de cette leçon, l’apprenant doit être capable de :',
  },
  {
    type: 'list_item',
    content:
      '1. Prédire des hypothèses sur le thème d’un texte lu. 2. Identifier les informations détaillées du texte.',
  },
  {
    type: 'list_item',
    content:
      '3. Lier entre ses connaissances antérieures et les informations d’un texte lu.',
  },
  {
    type: 'list_item',
    content:
      '4. Analyser l’organisation d’un texte lu et interpréter son sens en s’appuyant sur des indices.',
  },
  { type: 'list_item', content: '5. Résumer correctement un texte lu.' },
  {
    type: 'list_item',
    content:
      '6. Reconnaitre les règles grammaticales dans un texte lu. 7. Argumenter son point de vue.',
  },
  {
    type: 'list_item',
    content:
      '8. Donner des exemples, en tant que possible sur le sujet du texte. 9. Conjuguer correctement des verbes dans le temps convenable.',
  },
  { type: 'list_item', content: '10. Orthographier correctement les mots.' },
  {
    type: 'list_item',
    content: '11. Employer le temps convenable d’après le type du texte.',
  },
  {
    type: 'list_item',
    content:
      '12. Mettre en œuvre des stratégies d’enseignement variées et motivantes afin de rendre le cours plus intéressant.',
  },
  {
    type: 'list_item',
    content:
      '13. Fournir une rétroaction constructive pour aider les apprenants à améliorer leurs apprentissages.',
  },
  {
    type: 'phase',
    content: 'Phase 1 : Pré-action : (Activation des connaissances) (20 minutes)',
  },
  {
    type: 'header',
    content: 'I. Introduction et Motivation : (5 minutes)',
  },
  {
    type: 'instruction',
    content:
      'Consigne : Observez ce que vous voyez et prédisez le thème de la leçon.',
  },
  {
    type: 'image',
    content: '/images/m2_lecon1.jpg',
    caption: 'Illustration de la leçon',
  },
  {
    type: 'paragraph',
    content: 'Répondez aux questions suivantes :',
  },
  {
    type: 'paragraph',
    content: '1. Que voyez-vous dans ces images ?',
  },
  { type: 'input', content: '' },
  {
    type: 'paragraph',
    content: '2. Selon vous, quel est le thème de la leçon ?',
  },
  { type: 'input', content: '' },
  {
    type: 'task',
    content: 'Micro-tâche 1 : Identifiez l’idée générale du texte',
  },
  {
    type: 'instruction',
    content: 'Consigne : De quoi parle ce texte ?',
  },
  { type: 'input', content: '' },
  {
    type: 'header',
    content: 'II. Lecture guidée du texte (15 minutes)',
  },
  {
    type: 'paragraph',
    content:
      'Lisez le texte en entier en silence ou à voix basse et comprenez le sens global. (10 minutes)',
  },
  {
    type: 'phase',
    content: 'Phase 2 : Action (Compréhension approfondie) (60 minutes)',
  },
  {
    type: 'instruction',
    content: 'Consigne : lisez le texte suivant, puis répondez aux questions.',
  },
  {
    type: 'paragraph',
    content: 'La vie dans le passé : sans téléphone, sans Internet',
  },
  {
    type: 'paragraph',
    content:
      'La vie dans le passé était très différente de celle que nous connaissons maintenant, notamment en raison de l’absence du téléphone portable et d’Internet. La communication se faisait principalement par lettres, par téléphone fixe ou lors de rencontres directes. Écrire une lettre demandait du temps et de la patience, car la réponse n’arrivait qu’après plusieurs jours. Les informations circulaient plus lentement, par les journaux, la radio ou la télévision. Cette situation obligeait les personnes à attendre et à mieux organiser leur quotidien.',
  },
  {
    type: 'paragraph',
    content:
      'Sans Internet, l’accès au savoir passait par les livres, les bibliothèques et les enseignants. Les recherches scolaires demandaient un véritable effort, car il fallait consulter plusieurs ouvrages pour trouver une information. Les loisirs étaient aussi différents : les gens passaient plus de temps à discuter, à lire ou à pratiquer des activités en plein air. Les relations humaines étaient souvent plus directes, car les échanges se faisaient en face à face. Cette vie favorisait parfois une meilleure concentration et une attention plus longue.',
  },
  {
    type: 'paragraph',
    content:
      'Cependant, la vie sans téléphone ni internet présentait aussi des limites. Les urgences étaient plus difficiles à gérer et le contact avec des personnes éloignées restait compliqué. Les démarches administratives prenaient plus de temps et certaines informations étaient difficiles à obtenir. Malgré ces contraintes, beaucoup de personnes gardent le souvenir d’une vie plus simple, rythmée par des échanges réels et une présence plus forte dans la vie quotidienne.',
  },
  {
    type: 'link',
    content: 'https://www.bien-ecrire.com',
    url: 'https://www.bien-ecrire.com',
  },
  {
    type: 'task',
    content:
      'Micro-tâche 2 : (5 minutes) Déterminez les activités des gens dans le passé ?',
  },
  {
    type: 'instruction',
    content: 'Consigne : Citez trois activités en utilisant vos propres mots.',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  {
    type: 'paragraph',
    content: 'Questions guidées (10 minutes) :',
  },
  {
    type: 'paragraph',
    content: '. Choisissez la bonne réponse :',
  },
  {
    type: 'mcq',
    id: 'm2l1q1',
    question: '1. Dans le passé, les gens vivaient ……………………………',
    options: [
      { id: 'a', text: 'Toujours connectés à Internet' },
      { id: 'b', text: 'Sans Internet' },
      { id: 'c', text: 'Devant les écrans' },
    ],
    correctAnswer: 'b',
  },
  {
    type: 'mcq',
    id: 'm2l1q2',
    question: '2. Les relations sociales étaient………………………………',
    options: [
      { id: 'a', text: 'Faibles' },
      { id: 'b', text: 'Virtuelles' },
      { id: 'c', text: 'Plus fortes' },
    ],
    correctAnswer: 'c',
  },
  {
    type: 'mcq',
    id: 'm2l1q3',
    question: '3. Les enfants passaient leur temps à……………………….',
    options: [
      { id: 'a', text: 'Jouer dehors' },
      { id: 'b', text: 'Regarder des vidéos en ligne' },
      { id: 'c', text: 'Utiliser les réseaux sociaux' },
    ],
    correctAnswer: 'a',
  },
  {
    type: 'mcq',
    id: 'm2l1q4',
    question:
      '4. Pour chercher des informations, les gens utilisaient surtout………………………………………………',
    options: [
      { id: 'a', text: 'Les réseaux sociaux' },
      { id: 'b', text: 'Internet' },
      { id: 'c', text: 'Les journaux et les livres' },
    ],
    correctAnswer: 'c',
  },
  {
    type: 'mcq',
    id: 'm2l1q5',
    question:
      '5. La vie dans le passé était considérée comme……………………………………………………',
    options: [
      { id: 'a', text: 'Plus rapide' },
      { id: 'b', text: 'Plus calme et plus simple' },
      { id: 'c', text: 'Plus stressante' },
    ],
    correctAnswer: 'b',
  },
  {
    type: 'task',
    content:
      'Micro-tâches 3 : (5 minutes) Trouvez les avantages de la vie sans Internet ?',
  },
  {
    type: 'instruction',
    content: 'Consigne : Trouvez trois points positifs mentionnés dans le texte.',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  {
    type: 'task',
    content:
      'Micro tâche 4 : (5 minutes) : Identifiez les inconvénients cités dans ce texte ?',
  },
  {
    type: 'instruction',
    content:
      'Consigne : Trouvez trois inconvénients de la vie sans Internet et téléphone portable.',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  {
    type: 'task',
    content:
      'Micro-tâches 5 : (5 minutes) : Comparez la vie dans le passé avec votre vie actuelle ?',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  {
    type: 'header',
    content: 'ENRICHISSANTES',
  },
  {
    type: 'paragraph',
    content: 'Des informations enrichissantes',
  },
  {
    type: 'paragraph',
    content:
      '🌟 Présentation du texte explicatif : Le texte explicatif est un type de texte qui a pour objectif d’expliquer un phénomène, une situation ou une idée pour aider le lecteur à mieux comprendre un sujet donné. Il répond généralement à des questions comme : Pourquoi ? Comment ? Quelles sont les causes et les conséquences ?',
  },
  {
    type: 'paragraph',
    content: 'Caractéristiques principales du texte explicatif :',
  },
  {
    type: 'list_item',
    content: '• Il présente des informations claires et précises.',
  },
  {
    type: 'list_item',
    content:
      '• Il utilise des connecteurs logiques tels que : car, parce que, donc, ainsi, cependant, malgré, en effet.',
  },
  {
    type: 'list_item',
    content:
      '• Il explique les causes et les conséquences d’un phénomène.',
  },
  {
    type: 'list_item',
    content:
      '• Il peut proposer des exemples pour faciliter la compréhension du phénomène.',
  },
  {
    type: 'paragraph',
    content:
      'Dans ce texte « La vie dans le passé : sans téléphone, sans Internet », l’auteur :',
  },
  {
    type: 'list_item',
    content: '• Décrit la manière de vivre et de communiquer dans le passé.',
  },
  {
    type: 'list_item',
    content:
      '• Explique comment les gens communiquaient avant l’apparition d’internet et du téléphone portable.',
  },
  {
    type: 'list_item',
    content:
      '• Aborde les avantages de cette vie (relations humaines directes, calme, concentration).',
  },
  {
    type: 'list_item',
    content:
      '• Clarifie ses idées par des exemples concrets, comme l’écriture de lettres ou la lecture des livres dans les bibliothèques.',
  },
  {
    type: 'task',
    content: 'Micro-tâches 6 : (5 minutes) : Conjuguez les verbes ?',
  },
  {
    type: 'instruction',
    content: 'Consigne : Mettez les verbes à l’imparfait.',
  },
  {
    type: 'paragraph',
    content: '1. La communication (se faire) par lettres.',
  },
  { type: 'input', content: '' },
  {
    type: 'paragraph',
    content: '2. Les gens (passer) plus de temps à discuter.',
  },
  { type: 'input', content: '' },
  {
    type: 'paragraph',
    content: '3. Les informations (circuler) lentement.',
  },
  { type: 'input', content: '' },
  {
    type: 'task',
    content: 'Micro-tâches 7 : (5 minutes) : Donnez des exemples ?',
  },
  {
    type: 'instruction',
    content:
      'Consigne : Donnez deux exemples montrant que la vie sans Internet demandait plus d’efforts.',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  {
    type: 'task',
    content: 'Micro-tâches 8 : (5 minutes) : Reformulez la phrase suivante ?',
  },
  {
    type: 'instruction',
    content: 'Consigne : Reformulez cette phrase en utilisant vos propres mots.',
  },
  {
    type: 'paragraph',
    content:
      '« Les informations circulaient plus lentement, par les journaux, la radio ou la télévision. »',
  },
  { type: 'input', content: '' },
  {
    type: 'task',
    content:
      'Micro-tâches 9 : Mini-production : (10 minutes) Résumez le texte en trois phrases ?',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  {
    type: 'paragraph',
    content: 'Structures à observer : (5 minutes)',
  },
  {
    type: 'paragraph',
    content:
      'Pour exprimer la description dans le passé : On utilise l’imparfait.',
  },
  {
    type: 'paragraph',
    content:
      'Sa structure : Sujet + verbe à l’imparfait : Exemples :',
  },
  {
    type: 'list_item',
    content: '• Dans le passé, les gens vivaient sans Internet.',
  },
  {
    type: 'list_item',
    content: '• Les enfants jouaient dehors tous les jours.',
  },
  {
    type: 'list_item',
    content: '• Les familles se réunissaient le soir.',
  },
  {
    type: 'paragraph',
    content: 'Pour exprimer les habitudes dans le passé :',
  },
  {
    type: 'paragraph',
    content: 'Imparfait + souvent / toujours / généralement',
  },
  {
    type: 'paragraph',
    content: 'Exemples :',
  },
  {
    type: 'list_item',
    content: '• Les gens communiquaient souvent face à face.',
  },
  {
    type: 'list_item',
    content: '• On lisait toujours des journaux en papier.',
  },
  {
    type: 'paragraph',
    content: 'Pour exprimer la négation dans le passé :',
  },
  {
    type: 'paragraph',
    content: 'Structure : ne + verbe à l’imparfait + pas / jamais',
  },
  {
    type: 'paragraph',
    content: 'Examples :',
  },
  {
    type: 'list_item',
    content: '• Les gens n’utilisaient pas Internet.',
  },
  {
    type: 'list_item',
    content: '• Ils ne passaient jamais des heures devant les écrans.',
  },
  {
    type: 'paragraph',
    content: 'Regardez cette vidéo :',
  },
  {
    type: 'video',
    content: '/videos/m2_lecon1.mp4',
  },
  {
    type: 'link',
    content: 'https://youtu.be/S2ZE4Rvbt0A?si=0Yizbbq6F8H384s4',
    url: 'https://youtu.be/S2ZE4Rvbt0A?si=0Yizbbq6F8H384s4',
  },
  {
    type: 'paragraph',
    content: 'Pour exprimer l’opposition entre le passé et le présent :',
  },
  {
    type: 'paragraph',
    content: 'Expressions : mais / aujourd’hui / alors qu’avant',
  },
  {
    type: 'paragraph',
    content: 'Exemples :',
  },
  {
    type: 'list_item',
    content:
      '• Avant, la vie était plus simple, mais elle était plus lente.',
  },
  {
    type: 'list_item',
    content:
      '• Aujourd’hui, tout est rapide, alors qu’avant, on prenait son temps.',
  },
  {
    type: 'paragraph',
    content: 'Pour exprimer la comparaison :',
  },
  {
    type: 'paragraph',
    content: 'Structures : plus… que / moins… que / contrairement à',
  },
  {
    type: 'paragraph',
    content: 'Examples :',
  },
  {
    type: 'list_item',
    content: '• La vie était plus calme qu’aujourd’hui.',
  },
  {
    type: 'list_item',
    content: '• Les relations étaient plus fortes qu’à notre époque.',
  },
  {
    type: 'list_item',
    content:
      '• Contrairement à aujourd’hui, les gens se parlaient directement.',
  },
  {
    type: 'paragraph',
    content: 'Pour exprimer la conséquence :',
  },
  {
    type: 'paragraph',
    content: 'Structures : donc / c’est pourquoi / ce qui',
  },
  {
    type: 'paragraph',
    content: 'Examples :',
  },
  {
    type: 'list_item',
    content:
      '• Les gens se rencontraient souvent, ce qui renforçait les liens sociaux.',
  },
  {
    type: 'list_item',
    content:
      '• Il n’y avait pas d’Internet, donc les activités étaient plus sociales.',
  },
  {
    type: 'task',
    content: 'Micro-tâches 11 : Discussion en groupes : 10 minutes',
  },
  {
    type: 'paragraph',
    content:
      'Quelles activités du passé pourraient être mises en place aujourd’hui dans notre vie ou à l’université ?',
  },
  { type: 'input', content: '' },
  {
    type: 'phase',
    content: 'Phase 3 : Post-action (Tâche finale) Durée (20 minutes) :',
  },
  {
    type: 'paragraph',
    content:
      '✓ Écrivez un court résumé de ce que vous avez compris de cette vidéo.',
  },
  {
    type: 'paragraph',
    content: 'Tâche finale (avec modèle + aide lexicale)',
  },
  {
    type: 'instruction',
    content:
      'Consigne : Chaque étudiant utilise les idées générées pendant la discussion :',
  },
  {
    type: 'paragraph',
    content:
      'Imaginez que vous êtes journaliste dans un magazine sur l’histoire et la vie quotidienne. Rédigez un article (8–10 lignes) comparant la vie dans le passé et la vie actuelle, en utilisant :',
  },
  {
    type: 'list_item',
    content: '• Les moyens de communication et d’accès à l’information.',
  },
  {
    type: 'list_item',
    content: '• Les loisirs et les relations sociales.',
  },
  {
    type: 'list_item',
    content: '• Les avantages et les inconvénients de la vie sans Internet.',
  },
  {
    type: 'list_item',
    content: '• Une conclusion personnelle ou une recommandation.',
  },
  {
    type: 'list_item',
    content:
      '• Connecteurs : avant, aujourd’hui, d’abord, ensuite, en plus, par exemple, mais, pourtant, enfin…',
  },
  {
    type: 'list_item',
    content:
      '• Aide lexicale : lettres, téléphone fixe, Internet, journaux, lecture, discussion, concentration, loisirs, rencontre, activité en plein air, patience, échange, rapide, moderne…',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  {
    type: 'phase',
    content:
      'Phase 4 : évaluation des produits des étudiants : Durée : 10 minutes',
  },
  {
    type: 'paragraph',
    content:
      'Lisez votre produit écrit et identifiez vos erreurs (vocabulaire, grammaire, orthographe, organisation des idées), comparez avec vos collègues et corrigez son texte si nécessaire.',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  {
    type: 'paragraph',
    content: 'É- évaluation :',
  },
  {
    type: 'paragraph',
    content: '1. Écrivez trois idées secondaires du texte ?',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  {
    type: 'paragraph',
    content:
      '2. Quels sont les avantages de la vie ni Internet ni téléphone ?',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  {
    type: 'paragraph',
    content:
      '3. Quelles étaient les difficultés de la vie sans internet ?',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  {
    type: 'paragraph',
    content: '4. Identifiez les mots clés du texte ?',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
  {
    type: 'paragraph',
    content: '5. Trouvez un (autre) titre qui reflète bien le texte ?',
  },
  { type: 'input', content: '' },
  { type: 'input', content: '' },
];

const data = JSON.parse(fs.readFileSync(target, 'utf8'));
const idx = data.lessons.findIndex((l) => l.id === 'm2_lecon1');
if (idx === -1) throw new Error('m2_lecon1 not found');
data.lessons[idx].blocks = blocks;
fs.writeFileSync(target, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Updated', target, '—', blocks.length, 'blocks');
