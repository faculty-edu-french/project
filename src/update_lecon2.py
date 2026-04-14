import json

with open('module2_refined.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

new_lecon2 = {
    "id": "m2_lecon2",
    "title": "Leçon 2 : L'absence familiale et ses effets",
    "blocks": [
        {
            "type": "objective",
            "content": "Objectif général : À la fin de la leçon « L'absence familiale et ses effets sur la vie quotidienne », l'apprenant sera capable de comprendre un texte explicatif et de produire un texte écrit cohérent et structuré pour informer et convaincre."
        },
        {"type": "paragraph", "content": "À la fin de cette leçon, l'apprenant doit être capable de :"},
        {"type": "list_item", "content": "Saisir le sens de mots selon le contexte."},
        {"type": "list_item", "content": "Dégager le sens implicite existant entre les lignes."},
        {"type": "list_item", "content": "Faire des inférences en établissant des liens entre les éléments d'un texte lu en justifiant son interprétation."},
        {"type": "list_item", "content": "Résumer correctement un texte lu."},
        {"type": "list_item", "content": "Orthographier correctement les mots."},
        {"type": "list_item", "content": "Fonctionner les règles de présentation du texte (introduction-développement - conclusion)."},
        {"type": "list_item", "content": "Enchaîner logiquement les idées."},
        {"type": "list_item", "content": "S'exprimer et se faire comprendre à l'écrit en organisant les idées."},
        {"type": "list_item", "content": "Utiliser l'humour pédagogique pour rendre l'apprentissage du FLE plus plaisant."},
        {"type": "list_item", "content": "Renforcer la confiance en soi des apprenants dans l'apprentissage du français."},
        {"type": "phase", "content": "Phase 1 : Pré-action : (Activation des connaissances) (20 minutes)"},
        {"type": "header", "content": "I. Introduction et Motivation : (5 minutes)"},
        {"type": "instruction", "content": "Consigne : Observez ce que vous voyez et prédisez le thème de la leçon."},
        {
            "type": "image_group",
            "images": [
                "/images/m2_lecon2_1.jpg",
                "/images/m2_lecon2_2.jpg",
                "/images/m2_lecon2_3.jpg"
            ]
        },
        {"type": "paragraph", "content": "Répondez aux questions suivantes :"},
        {"type": "paragraph", "content": "1. Que voyez-vous dans ces images ?"},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "paragraph", "content": "2. Selon vous, quel est le thème de la leçon ?"},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "task", "content": "Micro-tâche 1 : Identifiez l'idée générale du texte ?"},
        {"type": "instruction", "content": "Consigne : Selon les images ci-dessus, de quoi parle ce texte ?"},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "header", "content": "II. Lecture guidée du texte (15 minutes)"},
        {"type": "paragraph", "content": "Lisez le texte en entier en silence ou à voix basse et comprenez le sens global. (10 minutes)"},
        {"type": "phase", "content": "Phase 2 : Action (Compréhension approfondie) (60 minutes)"},
        {"type": "instruction", "content": "Consigne : Lisez le texte suivant, puis répondez aux questions."},
        {"type": "paragraph", "content": "L'absence familiale et ses effets sur la vie quotidienne."},
        {
            "type": "paragraph",
            "content": "La solitude est une réalité silencieuse qui touche de nombreuses personnes lorsque les familles vivent loin les unes des autres. Les raisons de cet éloignement sont variées : travail à l'étranger, études, migrations ou choix de vie. Quand les liens familiaux reposent surtout sur les appels et les messages, la relation change. La présence physique, les gestes simples et les discussions spontanées disparaissent peu à peu. Cette distance peut créer un sentiment de vide, surtout chez les personnes âgées ou celles qui vivent seules. Même entouré par la technologie, l'être humain peut ressentir un manque profond de relations humaines réelles."
        },
        {
            "type": "paragraph",
            "content": "Cette situation a souvent des conséquences sur l'équilibre émotionnel. La solitude prolongée peut provoquer de la tristesse, une perte de motivation et parfois un repli sur soi. Certaines personnes hésitent à parler de leur mal-être par peur de déranger ou par honte. Les fêtes, les anniversaires ou les moments difficiles renforcent ce sentiment d'absence familiale. Sans un soutien proche, il devient plus difficile de partager ses émotions ou de demander de l'aide. Les spécialistes expliquent que le lien social joue un rôle essentiel dans la santé mentale et le sentiment de sécurité."
        },
        {
            "type": "paragraph",
            "content": "Face à cette réalité, plusieurs solutions peuvent aider à réduire la solitude. Maintenir un contact régulier avec la famille, même à distance, reste important. Les associations, les activités culturelles et le bénévolat permettent aussi de créer de nouveaux liens sociaux. Certaines villes développent des espaces de rencontre pour rompre l'isolement, notamment pour les seniors. Ces initiatives montrent que la solidarité et l'attention aux autres peuvent compenser l'éloignement familial. La lutte contre la solitude passe par des actions simples, mais humaines, qui redonnent une place centrale au lien social."
        },
        {"type": "link", "content": "https://www.bien-ecrire.com", "url": "https://www.bien-ecrire.com", "label": "🔗 bien-ecrire.com"},
        {"type": "task", "content": "Micro-tâche 2 : (5 minutes) : Après la lecture du texte, déduisez le sens des mots suivants selon le contexte :"},
        {"type": "paragraph", "content": "éloignement – solitude – isolement – lien social – rompre l'isolement"},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "paragraph", "content": "Questions guidées (10 minutes) :"},
        {"type": "paragraph", "content": "Répondez aux questions suivantes :"},
        {"type": "paragraph", "content": "Choisissez la bonne réponse :"},
        {
            "type": "mcq",
            "id": "m2l2q1",
            "question": "1. Le thème principal du texte est :",
            "options": [
                {"id": "a", "text": "Les avantages de la technologie moderne."},
                {"id": "b", "text": "L'absence familiale et ses conséquences sur la vie quotidienne."},
                {"id": "c", "text": "Les loisirs des familles aujourd'hui."}
            ],
            "correctAnswer": "b"
        },
        {
            "type": "mcq",
            "id": "m2l2q2",
            "question": "2. Selon le texte, quelles sont les causes de l'éloignement familial ?",
            "options": [
                {"id": "a", "text": "Uniquement le travail à l'étranger."},
                {"id": "b", "text": "Le travail, les études, les migrations et les choix de vie."},
                {"id": "c", "text": "Les conflits familiaux."}
            ],
            "correctAnswer": "b"
        },
        {
            "type": "mcq",
            "id": "m2l2q3",
            "question": "3. Quand les liens familiaux reposent surtout sur les appels et les messages,",
            "options": [
                {"id": "a", "text": "La relation devient plus forte."},
                {"id": "b", "text": "La relation change."},
                {"id": "c", "text": "La relation disparaît totalement."}
            ],
            "correctAnswer": "b"
        },
        {
            "type": "mcq",
            "id": "m2l2q4",
            "question": "4. Selon le texte, quelles solutions peuvent aider à réduire le problème de la solitude ?",
            "options": [
                {"id": "a", "text": "Éviter tout contact avec les autres."},
                {"id": "b", "text": "Utiliser seulement la technologie."},
                {"id": "c", "text": "Maintenir le contact familial et participer à des activités sociales."}
            ],
            "correctAnswer": "c"
        },
        {
            "type": "mcq",
            "id": "m2l2q5",
            "question": "5. Quel est le message essentiel de ce texte ?",
            "options": [
                {"id": "a", "text": "La technologie peut remplacer le rôle de la famille."},
                {"id": "b", "text": "L'éloignement familial n'a aucun effet sur la vie quotidienne."},
                {"id": "c", "text": "Le lien social est très important et doit être renforcé malgré la distance familiale."}
            ],
            "correctAnswer": "c"
        },
        {
            "type": "info_box",
            "content": "🌟 Présentation du texte explicatif : Le texte explicatif est un type de texte qui vise à expliquer un phénomène, une situation ou une idée, afin d'aider le lecteur à mieux comprendre un sujet donné. Il répond généralement aux questions suivantes : Pourquoi ? Comment ? Quelles sont les causes et les conséquences ?\nCaractéristiques principales du texte explicatif :\n• Il présente des informations claires et précises.\n• Il utilise des connecteurs logiques : car, parce que, donc, ainsi, cependant, malgré, en effet.\n• Il explique les causes et les conséquences d'un phénomène.\n• Il peut proposer des exemples ou des solutions pour mieux comprendre la situation.\nDans ce texte « L'absence familiale et ses effets sur la vie quotidienne », l'auteur :\n• Explique les raisons de l'éloignement familial.\n• Décrit les conséquences de cette absence sur la vie émotionnelle.\n• Montre l'importance des liens sociaux pour la santé mentale.\n• Propose des solutions concrètes pour réduire les effets négatifs de la solitude."
        },
        {"type": "task", "content": "Micro-tâches 3 : (5 minutes) déterminez l'idée principale du texte puis relevez deux idées secondaires qui la développent."},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "task", "content": "Micro tâche 4 : (5 minutes) : Quel est le rôle de la technologie dans les relations familiales ?"},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "task", "content": "Micro-tâches 5 : (5 minutes) : Pourquoi la solitude est-elle très difficile pour les personnes âgées selon le texte ? Justifiez votre réponse."},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "task", "content": "Micro-tâches 6 : (10 minutes) : Résumez le texte en 3 ou 4 phrases en utilisant vos propres vocabulaires ?"},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "task", "content": "Micro-tâches 7 : (5 minutes) : Reformulez la phrase suivante ?"},
        {"type": "instruction", "content": "Consigne : Reformulez cette phrase en utilisant vos propres mots."},
        {"type": "paragraph", "content": "« Certaines personnes hésitent à parler de leur mal-être par peur de déranger ou par honte. »"},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "task", "content": "Micro-tâche 8 : (5 minutes) : Regardez cette vidéo pour bien comprendre qu'est-ce que signifie le covit :"},
        {"type": "link", "content": "https://youtube.com/shorts/JtbORiJ0MKk?si=HVuC219g7Di89X94", "url": "https://youtube.com/shorts/JtbORiJ0MKk?si=HVuC219g7Di89X94", "label": "🎬 Regarder la vidéo"},
        {"type": "paragraph", "content": "Écrivez un court résumé de ce que vous avez compris de cette vidéo."},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "section_title", "content": "📐 Structures à observer", "icon": "fa-cogs"},
        {
            "type": "grammar_card",
            "title": "Exprimer la cause d'après le texte :",
            "structure": "Lorsque + verbe | En raison de + nom | Par + nom",
            "examples": [
                "• La solitude est une réalité silencieuse lorsque les familles vivent loin les unes des autres.",
                "• Notamment en raison de l'absence familiale.",
                "• Certaines personnes hésitent à parler de leur mal-être par peur de déranger."
            ]
        },
        {
            "type": "grammar_card",
            "title": "Exprimer la conséquence d'après ce texte :",
            "structure": "Peut / peuvent + infinitif | Devient / deviennent + adjectif",
            "examples": [
                "• Cette distance peut créer un sentiment de vide.",
                "• La solitude prolongée peut provoquer de la tristesse.",
                "• Il devient plus difficile de partager ses émotions."
            ]
        },
        {
            "type": "grammar_card",
            "title": "Exprimer l'opposition d'après ce texte :",
            "structure": "Même si / même + participe | Cependant",
            "examples": [
                "• Même entouré par la technologie, l'être humain peut ressentir un manque profond…",
                "• Cependant, la vie sans soutien familial présente des difficultés."
            ]
        },
        {"type": "task", "content": "Micro-tâches 9 : (5 minutes) : Utilisez les connecteurs logiques."},
        {"type": "instruction", "content": "Consignes : Reliez les phrases avec : Cependant – Ainsi – En effet – De plus :"},
        {"type": "paragraph", "content": "1. La solitude peut provoquer de la tristesse. Elle affecte l'équilibre émotionnel."},
        {"type": "input", "content": ""},
        {"type": "paragraph", "content": "2. Les familles vivent loin. Les relations changent."},
        {"type": "input", "content": ""},
        {"type": "paragraph", "content": "3. Certaines personnes souffrent en silence. Elles ont peur de déranger."},
        {"type": "input", "content": ""},
        {"type": "paragraph", "content": "4. Des solutions existent. La solidarité peut réduire l'isolement."},
        {"type": "input", "content": ""},
        {"type": "task", "content": "Micro-tâches 10 : Discussion en groupes : 10 minutes"},
        {"type": "paragraph", "content": "Les étudiants discutent en petits groupes. Ils proposent des pratiques possibles pour réduire la solitude dans la famille de votre collègue de l'université."},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "phase", "content": "Phase 3 : Post-action (Tâche finale) : (20 minutes)"},
        {"type": "paragraph", "content": "Tâche finale (avec modèle + aide lexicale)"},
        {"type": "instruction", "content": "📌 Consigne: Vous êtes un conseiller social qui donne des conseils aux familles. Rédigez un texte de 6 à 8 lignes pour expliquer comment lutter contre la solitude et favoriser les liens sociaux entre les membres de la famille."},
        {"type": "paragraph", "content": "Ce texte doit contenir :"},
        {"type": "list_item", "content": "Une introduction sur le problème de la solitude et de l'éloignement familial."},
        {"type": "list_item", "content": "Des exemples de solutions pour réduire la solitude (contact avec la famille, activités sociales…)."},
        {"type": "list_item", "content": "Les bénéfices attendus pour la santé émotionnelle et les relations sociales."},
        {"type": "list_item", "content": "Une conclusion motivante incitant à agir et à créer du lien social."},
        {"type": "list_item", "content": "Banque de connecteurs : d'abord, ensuite, en plus, cependant, malgré tout, enfin…"},
        {"type": "list_item", "content": "Aide lexicale : solitude, lien social, relations humaines, contact familial, isolement, soutien, activités, bénévolat, rencontres…"},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "phase", "content": "Phase 4 : évaluation des produits des étudiants : Durée : 10 minutes"},
        {"type": "paragraph", "content": "Lisez votre produit écrit et identifiez vos erreurs (vocabulaire, grammaire, orthographe, organisation des idées), comparez avec vos collègues et corrigez son texte si nécessaire."},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "paragraph", "content": "É- évaluation :"},
        {"type": "paragraph", "content": "Répondez à ces questions :"},
        {"type": "paragraph", "content": "1) Que signifie « un sentiment de vide » dans le texte ?"},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "paragraph", "content": "2) Précisez deux effets négatifs de l'éloignement familial sur la vie quotidienne."},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "paragraph", "content": "3) Donnez deux solutions proposées dans le texte pour lutter contre la solitude."},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "paragraph", "content": "4) Expliquez avec vos mots pourquoi les fêtes ou anniversaires renforcent le sentiment d'absence familiale."},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""},
        {"type": "paragraph", "content": "5) Trouvez un (autre) titre qui reflète bien le texte ?"},
        {"type": "input", "content": ""},
        {"type": "paragraph", "content": "6) Donnez un exemple du texte qui montre que l'éloignement familial peut être difficile pour certaines catégories de personnes."},
        {"type": "input", "content": ""},
        {"type": "input", "content": ""}
    ]
}

# Replace lesson at index 1
data['lessons'][1] = new_lecon2

with open('module2_refined.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Done! Lesson 2 replaced successfully.")
print(f"New lesson has {len(new_lecon2['blocks'])} blocks")
