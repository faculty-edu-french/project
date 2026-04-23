import json

blocks = [
    {
        "type": "objective",
        "content": "Objectif général : À la fin de la leçon « Faut-il donner des devoirs à l’école ? », l’apprenant sera capable de comprendre et de produire un texte écrit cohérent et structuré pour informer et convaincre."
    },
    {
        "type": "paragraph",
        "content": "À la fin de cette leçon, l’apprenant doit être capable de :"
    },
    {"type": "list_item", "content": "1. Déterminer les idées principales et secondaires d’un texte lu."},
    {"type": "list_item", "content": "2. Identifier les informations détaillées du texte."},
    {"type": "list_item", "content": "3. Résumer correctement un texte lu."},
    {"type": "list_item", "content": "4. Faire des comparaisons entre les problèmes contenus dans le texte et les problèmes semblables dans la vie quotidienne."},
    {"type": "list_item", "content": "5. Porter un jugement d’un texte lu à partir des critères pertinents."},
    {"type": "list_item", "content": "6. Employer des mots adéquats à la situation."},
    {"type": "list_item", "content": "7. Mettre en lien des connaissances antérieures au sujet visé."},
    {"type": "list_item", "content": "8. Argumenter son point de vue."},
    {"type": "list_item", "content": "9. Encourager les apprenants à relever les défis liés à l’apprentissage du français."},
    {"type": "list_item", "content": "10. Stimuler la motivation des apprenants à participer aux activités et à progresser en FLE."},
    {"type": "list_item", "content": "11. Amener les apprenants à profiter les difficultés comme des occasions d’apprentissage et de développement."},
    {
        "type": "phase",
        "content": "Phase 1 : Pré-action : (Activation des connaissances) (20 minutes)"
    },
    {
        "type": "header",
        "content": "I. Introduction et Motivation : (5 minutes)"
    },
    {
        "type": "instruction",
        "content": "Consigne : Observez les images suivantes, puis prédisez le thème de la leçon."
    },
    {
        "type": "image_group",
        "images": [
            "/images/m4_l3_img1.png",
            "/images/m4_l3_img2.png"
        ]
    },
    {
        "type": "paragraph",
        "content": "Répondez aux questions suivantes :"
    },
    {
        "type": "question",
        "content": "1. Que voyez-vous dans ces images ?"
    },
    {"type": "input", "content": ""},
    {
        "type": "question",
        "content": "2. Selon vous, quel est le thème de la leçon ?"
    },
    {"type": "input", "content": ""},
    {
        "type": "header",
        "content": "II. Lecture guidée du texte (15 minutes)"
    },
    {
        "type": "paragraph",
        "content": "Lisez le texte en entier en silence ou à voix basse et comprenez le sens global. (10 minutes)"
    },
    {
        "type": "phase",
        "content": "Phase 2 : Action (Compréhension approfondie) (60 minutes)"
    },
    {
        "type": "instruction",
        "content": "Consigne : Lisez le texte suivant, puis répondez aux questions"
    },
    {
        "type": "header",
        "content": "Faut-il donner des devoirs à l’école ?"
    },
    {
        "type": "paragraph",
        "content": "Personnellement, je n’ai jamais aimé faire mes devoirs à l’école. Je les faisais constamment à la dernière minute pendant les intercours et je les ai toujours considérés comme quelque chose de casse pied qui me faisait perdre mon temps. Je crois que le problème des devoirs, c’est que ça n’incite pas forcément à apprendre ni à comprendre ce qu’on a vu pendant un cours. Comme les élèves voient les devoirs comme quelque chose de contraignant, ça ne leur donne pas envie d’apprendre. Le problème, c’est qu’après, ils risquent d’associer l’école à un lieu désagréable qui leur donne des devoirs ennuyeux."
    },
    {
        "type": "paragraph",
        "content": "Mais d’un autre côté, les devoirs peuvent aussi avoir une certaine utilité. Ils permettent notamment de valider la compréhension des cours. En effet, parfois, c’est en faisant leurs devoirs que les élèves peuvent réaliser qu’il y avait des points du cours qu’ils n’avaient pas compris. Ce qu’ils n’auraient jamais remarqué si on ne leur avait rien donné à faire chez eux."
    },
    {
        "type": "paragraph",
        "content": "Alors, je suis partagé. Une part de moi pense que ça ne sert à rien. Après tout, beaucoup de pays ne donnent pas de devoir à la maison et les élèves s’en sortent très bien. Et une autre part de moi admet que c’est utile."
    },
    {
        "type": "paragraph",
        "content": "En tout cas, je ne pense pas qu’il faille donner trop de devoirs aux élèves, surtout s’ils ont déjà travaillé beaucoup d’heures dans la journée. Les devoirs à la maison ne doivent pas servir à remplacer les explications des professeurs. À mon sens, c’est pendant les cours que les élèves devraient retenir la majorité des cours."
    },
    {
        "type": "paragraph",
        "content": "Enfin, peut-être que certains élèves ont besoin de devoir pour apprendre, tandis que d’autres non. Mais ce serait injuste de donner des devoirs qu’à une partie des élèves, même si ce serait plus logique. Une autre solution serait de donner des devoirs facultatifs et d’encourager les élèves à les faire, en leur donnant une récompense, par exemple, s’ils les ont faits."
    },
    {
        "type": "link",
        "url": "https://anyfrench.com/lecture/faut-il-donner-des-devoirs-a-lecole/",
        "label": "📄 [Bientôt disponible] Article interactif"
    },
    {
        "type": "task",
        "content": "Micro-tâche 1 : (5 minutes)"
    },
    {
        "type": "instruction",
        "content": "Consigne : Quelle est l’idée principale de ce texte ?"
    },
    {
        "type": "info_box",
        "content": "🌟 Présentation du texte explicatif argumentatif:\nCe texte est explicatif-argumentatif, car il explique un phénomène (les devoirs) et présente des arguments pour et contre.\n🔎 Dans ce texte « Faut-il donner des devoirs à l’école », l’auteur :\n• Traite la question des devoirs à l’école et leur utilité pour les élèves.\n• Présente les arguments pour et contre les devoirs.\n• S’adresse à des lecteurs (élèves, enseignants, parents) pour les inviter à réfléchir sur le rôle des devoirs dans l’apprentissage."
    },
    {"type": "input", "content": ""},
    {
        "type": "header",
        "content": "Questions guidées (10 minutes) :"
    },
    {
        "type": "paragraph",
        "content": "Répondez aux questions suivantes :"
    },
    {
        "type": "question",
        "content": "1. Quels sont les deux arguments contre les devoirs selon l’auteur ?"
    },
    {"type": "input", "content": ""},
    {
        "type": "question",
        "content": "2. Quels sont deux avantages des devoirs mentionnés dans le texte ?"
    },
    {"type": "input", "content": ""},
    {
        "type": "question",
        "content": "3. Pourquoi l’auteur propose-t-il de donner des devoirs facultatifs avec une récompense ?"
    },
    {"type": "input", "content": ""},
    {
        "type": "question",
        "content": "4. Es-tu plutôt pour ou contre les devoirs à la maison ? Pourquoi ?"
    },
    {"type": "input", "content": ""},
    {
        "type": "task",
        "content": "Micro-tâches 2 : (5 minutes) En une seule phrase, écrivez de quoi parle le texte."
    },
    {"type": "input", "content": ""},
    {
        "type": "task",
        "content": "Micro tâche 3 : (5 minutes) : Relisez le texte et soulignez trois mots ou expressions importantes qui décrivent le problème des devoirs."
    },
    {"type": "input", "content": ""},
    {
        "type": "task",
        "content": "Micro-tâches 4 : (5 minutes) : Après avoir lu ce texte, indiquez un avantage et un inconvénient des devoirs à l’école, puis donnez votre opinion personnelle en une ou deux phrases."
    },
    {"type": "input", "content": ""},
    {
        "type": "task",
        "content": "Micro-tâches 5 : (5 minutes) :"
    },
    {
        "type": "instruction",
        "content": "Consigne : En petits groupes, discutez et proposez deux solutions pour rendre les devoirs plus intéressants et utiles pour les apprenants."
    },
    {"type": "input", "content": ""},
    {
        "type": "task",
        "content": "Micro-tâches 6 : (5 minutes) : Reformulez la phrase suivante ?"
    },
    {
        "type": "instruction",
        "content": "Consigne : Reformulez cette phrase en utilisant vos propres mots.\n« Le problème des devoirs, c’est que ça n’incite pas forcément à apprendre ni à comprendre ce qu’on a vu pendant un cours. »"
    },
    {"type": "input", "content": ""},
    {
        "type": "section_title",
        "content": "Structures à observer : (5 minutes)"
    },
    {
        "type": "grammar_card",
        "title": "Structure de comparison :",
        "examples": [
            "Pour mettre en relation différentes situations ou points de vue :",
            "• Comme les élèves voient les devoirs comme quelque chose de contraignant…",
            "• Après tout, beaucoup de pays ne donnent pas de devoirs…"
        ]
    },
    {
        "type": "grammar_card",
        "title": "Structure de suggestion / solution :",
        "examples": [
            "Pour proposer une solution à un problème :",
            "• Une autre solution serait de…",
            "• Il serait préférable de…",
            "• On pourrait…"
        ]
    },
    {
        "type": "grammar_card",
        "title": "Structure d’introduction / conclusion d’une idée :",
        "examples": [
            "Pour guider le lecteur et organiser le texte :",
            "• Le problème, c’est que…",
            "• Mais le problème est que…",
            "• Enfin…"
        ]
    },
    {
        "type": "task",
        "content": "Micro tâche 7 : (5 minutes) : Regardez cette vidéo pour bien comprendre qu’est-ce que signifie le covoit :"
    },
    {
        "type": "link",
        "url": "",
        "label": "🎥 [Vidéo bientôt disponible]"
    },
    {
        "type": "paragraph",
        "content": "Écrivez un court résumé de ce que vous avez compris de cette vidéo."
    },
    {"type": "input", "content": ""},
    {
        "type": "task",
        "content": "Micro-tâches 8 : Mini-production : (10 minutes) Résumez ce texte lu en trois phrases ?"
    },
    {"type": "input", "content": ""},
    {
        "type": "task",
        "content": "Micro-tâches 9 : Discussion en groupes : (10 minutes)"
    },
    {
        "type": "instruction",
        "content": "👉 Déroulement:\nTravaillez en petits groupes (3 à 4 étudiants). Discutez autour de la question suivante :\n👉 « Selon vous, comment pourrait-on rendre les devoirs à l’école plus utiles et efficace pour tous les élèves?\nChaque groupe propose des solutions réelles liées à ce phénomène."
    },
    {"type": "input", "content": ""},
    {
        "type": "phase",
        "content": "Phase 3 : Post-action (Tâche finale) Durée : 20 minutes"
    },
    {
        "type": "section_title",
        "content": "Tâche finale (avec modèle + aide lexicale)"
    },
    {
        "type": "instruction",
        "content": "📌 Consigne:\nVous participez à une discussion collective en classe sur les devoirs à la maison.\nAprès avoir lu le texte et échangé vos idées avec vos camarades, votre professeur vous demande de présenter votre opinion sur les devoirs et de proposer des idées pour les améliorer.\nÀ travers la discussion précédente, écrivez un texte de 5 à 7 phrases dans lequel vous :\n• Expliquez votre opinion sur les devoirs à la maison.\n• Donnez un avantage et un inconvénient des devoirs.\n• Proposez une solution ou une amélioration pour que les devoirs soient plus utiles et intéressants."
    },
    {"type": "input", "content": ""},
    {
        "type": "phase",
        "content": "Phase 4 : évaluation des produits des étudiants : Durée : 10 minutes"
    },
    {
        "type": "paragraph",
        "content": "Relisez votre produit écrit et identifiez vos erreurs (vocabulaire, grammaire, orthographe, organisation des idées), comparez avec vos collèges et corrigez son texte si nécessaire."
    },
    {"type": "input", "content": ""},
    {
        "type": "section_title",
        "content": "É- évaluation :"
    },
    {
        "type": "mcq",
        "id": "m4l3q1",
        "question": "1. D’après le texte, quel est le problème des devoirs ?",
        "options": [
            { "id": "a", "text": "Ils sont trop simples pour les élèves" },
            { "id": "b", "text": "Ils se font toujours pendant les intercours" },
            { "id": "c", "text": "Ils ne permettent pas forcément de comprendre un cours" },
            { "id": "d", "text": "Ils ne sont pas assez difficiles" }
        ],
        "correctAnswer": "c"
    },
    {
        "type": "mcq",
        "id": "m4l3q2",
        "question": "2. D’après le texte, comment les élèves peuvent percevoir l’école si on leur donne des devoirs ?",
        "options": [
            { "id": "a", "text": "Comme un endroit pour élever leur esprit" },
            { "id": "b", "text": "Comme un endroit désagréable" },
            { "id": "c", "text": "Comme une prison pour leur esprit" },
            { "id": "d", "text": "Comme un endroit fantastique" }
        ],
        "correctAnswer": "b"
    },
    {
        "type": "mcq",
        "id": "m4l3q3",
        "question": "3. Selon le texte, dans quels cas les devoirs peuvent être utiles ?",
        "options": [
            { "id": "a", "text": "Pour vérifier sa compréhension des cours" },
            { "id": "b", "text": "Pour remplacer les professeurs" },
            { "id": "c", "text": "Pour donner envie d'apprendre davantage" },
            { "id": "d", "text": "Pour comprendre les cours" }
        ],
        "correctAnswer": "a"
    },
    {
        "type": "mcq",
        "id": "m4l3q4",
        "question": "4. S’il fallait donner des devoirs, combien faudrait-il en donner ?",
        "options": [
            { "id": "a", "text": "Pas trop de devoirs" },
            { "id": "b", "text": "Davantage de devoirs" },
            { "id": "c", "text": "Une avalanche de devoirs" },
            { "id": "d", "text": "Beaucoup trop de devoirs" }
        ],
        "correctAnswer": "a"
    },
    {
        "type": "mcq",
        "id": "m4l3q5",
        "question": "5. Quelle alternative propose le narrateur ?",
        "options": [
            { "id": "a", "text": "Des travaux manuels" },
            { "id": "b", "text": "Des devoirs facultatifs" },
            { "id": "c", "text": "Aucun devoir" },
            { "id": "d", "text": "Punir les élèves qui ne font pas leur devoir" }
        ],
        "correctAnswer": "b"
    }
]

lesson_json = {
    "id": "m4_lecon3",
    "title": "Leçon 3 : Faut-il donner des devoirs à l’école ?",
    "blocks": blocks
}

with open("/home/george/Desktop/project/web-book/src/scratch_m4_l3.json", "w", encoding="utf-8") as f:
    json.dump(lesson_json, f, ensure_ascii=False, indent=2)
print("Done.")

