# Importer les modules nécessaires # networkx et pyplot
import networkx as nx
from matplotlib import pyplot
# -----------------------------------------------------

G=nx.Graph()  # créer un nouveau graphe

G.add_node("Alice")  # Ajouter un noeud "Alice"

G.add_nodes_from(["Bob", "Caleb"])  # Ajouter deux noeuds "Bob" et "Caleb"

G.remove_node("Alice")  # Supprimer le noeud "Alice"

G.remove_nodes_from(["Bob", "Caleb"])  # Supprimer les noeuds "Bob" et "Caleb"

# Ajout des arêtes
G.add_edge("Bob","Dorian")
G.add_edge("Dorian","Alice")
G.add_edge("Dorian","Caleb")
# ----------------

# Ajout de deux arêtes :
G.add_edges_from(([("Alice", "Bob"), ("Alice", "Caleb")]))

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