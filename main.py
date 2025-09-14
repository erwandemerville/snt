import yaml

def define_env(env):
    # Charger le fichier exercices.yml
    with open("exercices.yml", "r", encoding="utf-8") as f:
        exercices = yaml.safe_load(f)

    # Injecter dans l'environnement des macros
    env.variables["exercices"] = exercices