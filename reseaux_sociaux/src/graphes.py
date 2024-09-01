# Importer les modules nécessaires # networkx et pyplot
import networkx as nx
from matplotlib import pyplot
# -----------------------------------------------------

G=nx.Graph()  # créer un nouveau graphe

# Ajout des sommets
G.add_node("Alice")  # Ajouter un noeud "Alice"
G.add_node("Bob")  # Ajouter un noeud "Bob"
G.add_node("Caleb")  # Ajouter un noeud "Caleb"

# Ajout des arêtes
G.add_edge("Bob","Dorian")  # Ajout d'une arête entre "Bob" et "Dorian"
G.add_edge("Dorian","Alice")  # Ajout d'une arête entre "Dorian" et "Alice"
G.add_edge("Dorian","Caleb")  # Ajout d'une arête entre "Dorian" et "Caleb"
G.add_edge("Alice","Bob")  # Ajout d'une arête entre "Alice" et "Bob"
G.add_edge("Alice","Caleb")  # Ajout d'une arête entre "Alice" et "Caleb"
# ----------------

# Afficher des informations sur ce graphe :
print(f"Nombre de sommets : {G.number_of_nodes()}")
print(f"Nombre d'arêtes : {G.number_of_edges()}")
print(f"Centre du graphe : {nx.center(G)}")
print(f"Diamètre du graphe : {nx.diameter(G)}")
# -----------------------------------------

# Dessiner le graphe
nx.draw(G, with_labels=True, font_weight='bold')
pyplot.show()
# ------------------