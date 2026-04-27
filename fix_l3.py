import json

with open("src/module1_refined.json", "r", encoding="utf-8") as f:
    data = json.load(f)

blocks = data["lessons"][2]["blocks"]
new_blocks = []

i = 0
while i < len(blocks):
    b = blocks[i]

    # 1. Remove the duplicated image (the big car image)
    if b.get("type") == "image" and b.get("content") == "/images/m1_lecon3.jpg":
        i += 1
        continue

    # 2. Fix the Grammar cards
    if b.get("type") == "header" and "Structures à observer" in b.get("content", ""):
        new_blocks.append(b)
        
        # Add all four grammar cards
        new_blocks.append({
            "type": "grammar_card",
            "title": "1. Exprimer l'utilité / l'avantage",
            "description": "",
            "structure": "Il permet de + infinitif",
            "examples": ["• Il permet de rouler moins cher et de réduire la pollution."]
        })
        new_blocks.append({
            "type": "grammar_card",
            "title": "2. Exprimer la négation",
            "description": "",
            "structure": "ne ... pas",
            "examples": ["• Ce n'est pas un service de transport professionnel."]
        })
        new_blocks.append({
            "type": "grammar_card",
            "title": "3. Exprimer l'opposition / la concession",
            "description": "",
            "structure": "mais / pourtant / malgré",
            "examples": [
                "• Mais il ne faut pas oublier les petits inconvénients.",
                "• Malgré ces petits problèmes, le covoiturage reste une solution responsable."
            ]
        })
        new_blocks.append({
            "type": "grammar_card",
            "title": "4. Exprimer la conséquence",
            "description": "",
            "structure": "ce qui + verbe",
            "examples": ["• Ce qui prouve que cette habitude entre dans le quotidien des Français."]
        })
        
        # Skip the existing grammar cards that were previously in the array
        i += 1
        while i < len(blocks) and blocks[i].get("type") == "grammar_card":
            i += 1
        continue
    
    # 3. Micro-tâche 10 and the mind map image
    if b.get("type") == "task" and "Micro-tâches 10" in b.get("content", ""):
        new_blocks.append(b)
        # Add the mind map image
        new_blocks.append({
            "type": "image",
            "url": "/images/m1_lecon3_3.png"
        })
        i += 1
        continue
    
    if b.get("type") == "paragraph" and "En observant cette carte mentale discutez" in b.get("content", ""):
        # Update paragraph to include the full text seen in the screenshot
        new_blocks.append({
            "type": "paragraph",
            "content": "En observant cette carte mentale discutez avec vos collèges sur les éléments essentiels du covoiturage comme les avantages, les inconvénients, les solutions et comment faire pour encourager ce pratique dans notre société."
        })
        i += 1
        continue
        
    new_blocks.append(b)
    i += 1

data["lessons"][2]["blocks"] = new_blocks

with open("src/module1_refined.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Updates applied.")
