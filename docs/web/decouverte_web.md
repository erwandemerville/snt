# Les langages HTML et CSS

Voici plusieurs **activités** pour approfondir votre maîtrise des langages HTML et CSS.  
N'hésitez pas à [lire le cours](cours_html_css.md){ target="_blank" } pour vous aider à réaliser ces activités.

## Activité 1 - « Détourner une page web »

Voici une première petite activité permettant d'avoir un premier aperçu de la structure d'une page web.

Naviguez vers la **page web** de **votre choix**.  
En faisant un *++"clic droit"++ :material-arrow-right: `"Inspecter"`* sur un **élément** en particulier de la page, ou en appuyant **au clavier** sur <span class="keys"><kbd class="key-control">Ctrl</kbd><span>+</span><kbd class="key-shift">Maj</kbd><span>+</span><kbd class="key-c">C</kbd></span>, ouvrez l'**inspecteur** de **code source**.

!!! note "À faire"
    Avec l'**inspecteur de code source** de **Firefox**, essayez de **modifier la page web** de manière à :

    - **changer** du **texte**,
    - **ajouter/modifier** au moins **une image** (pour remplacer une image, il faut remplacer le lien de l'image par le lien d'une nouvelle image),
    - **ajouter/modifier un** ou **plusieurs** **liens hyptertextes**,
    - créer un **décalage avec le propos initial** de la page, en y apportant éventuellement un aspect humoristique.

    Lorsque vous avez terminé, vous pouvez **enregistrer la page web** dans votre `H:\Travail` en cliquant sur les **trois barres** en *haut* à *droite* de la fenêtre puis sur **"Enregistrer sous"**.

    Vous pourrez alors revoir votre page web quand vous voulez !

## Activité 2 - Découverte du HTML et du CSS

Pour apprendre plus en détails les **bases** du **langage de description HTML** et du **langage de mise en forme CSS**, vous pouvez **télécharger**, **lire** et **compléter** le *document* ci-dessous :

<center>
[:material-cursor-default-click: Télécharger le document élève](documents/doc_web_eleve.odt){ target="_blank" }
</center>

Vous travaillerez dans un premier temps avec le site [jdfiddle.net](https://jsfiddle.net/){ target="_blank" }, un éditeur de HTML/CSS en ligne permettant d'appréhender facilement ces langages.

## Activité 3 - Créer un petit site web

!!! note "À réaliser - en groupes (binômes ou trinômes)"
    Par groupes de **2** ou de **3** (ou tout seul si vous préférez), réalisez un **petit site web** sur le **thème de votre choix** (un artiste, une oeuvre, un thème réel ou fictif... comme vous voulez !)  
    Vous utiliserez le logiciel ***Notepad++*** (qui a l'avantage d'afficher des couleurs, contrairement au bloc-notes classique).

    Voici un **exemple de site web** pour vous donner quelques idées (*dézippez-le* et ouvrez `index.html` dans votre navigateur préféré) :

    <center>
    [:material-cursor-default-click: Télécharger `exemple_site.zip`](documents/exemple_site.zip){ target="_blank" }
    </center>

    Voici les contraintes, votre site doit contenir :

    - au moins **deux pages HTML différentes**,
    - une **feuille de style** (fichier `.css`),
    - plusieurs **images**,
    - au moins **un lien hypertexte** (ça peut être un lien vers une autre page).

    N'hésitez pas à consulter toutes les ressources sur le **HTML** et le **CSS** que vous souhaitez sur [Google](https://google.fr/){ target="_blank" }, et à relire le [document](documents/doc_web_eleve.odt) de l'activité précédente ainsi que [ce résumé de cours](cours_html_css.md){ target="_blank" }, et amusez-vous !

    Vous pouvez également consulter le site [w3schools](https://www.w3schools.com/){ target="_blank" } qui contient de nombreuses ressource sur le *HTML* et le *CSS*.

    Pour vous aider, voici le code de la **structure de base d'une page web**, que vous pouvez directement **copier/coller** dans votre fichier *HTML* :

    ```html
    <!DOCTYPE html> 
    <html lang="fr"> 
        <head> 
            <title>Titre de votre site</title> 
            <meta charset="utf-8"> 
            <link rel="stylesheet" href="style.css" type="text/css"/>   
        </head> 
        <body> 
            <!-- À COMPLÉTER -->    
        </body>
    </html>
    ```
