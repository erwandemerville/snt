??? quote "Sources"
    - [Pixees](https://pixees.fr/informatiquelycee/n_site/snt_rs_graphe.html){ target="_blank" }
    - [Académie de Nantes](https://www.pedagogie.ac-nantes.fr/enseignements-informatiques/enseignement/snt/modeliser-un-reseau-social-simple-1286909.kjsp?RH=1552662845945){ target="_blank" }

# Activité - Modéliser un réseau social

!!! info "Activité notée"
    Cette activité sera **notée** sur **10 points**. Une autre activité sera réalisée plus tard pour obtenir une note sur **20 points**. Répondez aux questions ci-dessous **sur une feuille** que vous me rendrez. N'oubliez pas de mettre votre nom, votre prénom et votre classe !

Voici un graphe illustrant un réseau social ayant 6 abonnés (A, B, C, D, E et F) tel que :

- A est ami avec B, C et D
- B est ami avec A et D
- C est ami avec A, E et D
- D est ami avec tous les autres abonnés
- E est ami avec C, D et F
- F est ami avec E et D

Les cercles sont appelés des **sommets** et les segments de droites des **arêtes**.

<figure markdown>
  ![Modélisation d'un réseau social](images/exemple_reseau.png){ width="80%" }
  <figcaption>Modélisation d'un réseau social</figcaption>
</figure>

!!! abstract "Vocabulaire"
    **<u>Chaîne</u>** : Dans un graphe, une **chaîne** reliant un sommet **x** à un sommet **y** est définie par une **suite finie d'arêtes consécutives**, reliant **x** à **y**.  
    <span style="color:green">Exemple : Dans le graphe donné ci-dessus, A-D-E-C est une chaîne de 3 arêtes</span>

    **<u>Distance entre 2 sommets</u>** : La distance entre deux sommets d'un graphe est le **nombre minimum d'arêtes** d'une **chaîne** allant de **l'un à l'autre**.  
    <span style="color:green">Exemple : La distance entre le sommet A et le sommet F est de 2 (chaîne A-D-F).</span>

    **<u>Écartement</u>** : L'**écartement** d'un sommet est la **distance maximale** existant entre **ce sommet** et **les autres sommets** du graphe.  
    <span style="color:green">Exemple : distance (A-B) = 1 ; distance (A-C) = 1 ; distance (A-D) = 1 ; distance (A-E) = 2 ; distance (A-F) = 2 ; nous pouvons donc dire que la distance maximale existant entre le sommet A et les autres sommets du graphe est de 2 (distance (A-E) et distance (A-F)). Nous pouvons donc dire que l'écartement de A est de 2.</span>

    **<u>Centre</u>** : On appelle **centre d'un graphe**, le **sommet d'écartement minimal** (le centre n'est pas nécessairement unique).  
    <span style="color:green">Exemple : Dans le graphe 1 tous les sommets ont un écartement de 2 à l'exception du sommet D qui a un écartement de 1, nous pouvons donc affirmer que le centre du graphe 1 est le sommet D.</span>

    **<u>Rayon</u>** : On appelle **rayon** d'un **graphe G**, l'**écartement** d'un **centre de G**.  
    <span style="color:green">Exemple : D a un écartement de 1, c'est le centre du graphe, nous pouvons donc dire que le rayon du graphe est de 1.</span>

    **<u>Diamètre</u>** : On appelle **diamètre** d'un **graphe G**, la **distance maximale** entre **deux sommets** du **graphe G**.  
    <span style="color:green">Exemple : Dans le graphe 1 la distance maximale entre 2 sommets est de 2, nous pouvons donc dire que le diamètre du graphe est de 2.</span>

!!! note "Exercice 1"
    1. En utilisant le graphe présenté précédemment, répondre aux consignes suivantes :
          1. Donner une **chaine** de ce graphe composée de **4 arêtes** et une **chaine** de **5 arêtes**.
          2. Déterminer la **distance** entre le sommet **C** et **B** et la **distance** entre le sommet **B** et **E**.
          3. Déterminer **l’écartement** de **D** ainsi que **l’écartement** de **E**.

!!! note "Exercice 2"
    Construire un **graphe** d’un **réseau social** à partir des informations suivantes :
    
    - Albert est ami avec Bryan et Edouard
    - Bryan est ami avec Albert et Charlotte
    - Charlotte est ami avec Bryan, Flavien et Daniel
    - Daniel est ami avec Charlotte, Flavien et Edouard
    - Edouard est ami avec Albert, Daniel et Flavien
    - Flavien est ami avec Charlotte, Daniel et Edouard

    (Vous pouvez utiliser des **lettres** de **A** à **D** si vous préférez.)

!!! note "Exercice 3"
    Déterminer **le** (ou **les**) **centre(s)** du **graphe ci-dessous**.  
    En déduire son **rayon** et son **diamètre**.

    ![Modélisation d'un graphe](images/exercice3_graphe.png)