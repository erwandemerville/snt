# Cours - Les langages HTML et CSS

Voici un petit cours résumant les **principes de base** de la **création de pages web** avec le **langage de balisage *HTML*** (*Hypertext Markup Language*) et le **langage de feuilles de style *CSS*** (*Cascading Style Sheets*).

## Présentation

<figure markdown>
  ![HTML et CSS](images/html_css_rogne.png){ width="500" }
  <figcaption>Logos de HTML et CSS</figcaption>
</figure>

!!! abstract "Qu'est-ce que le *HTML* ?"
    L’*Hypertext Markup Language*, généralement abrégé **HTML**, est un **langage de balisage** utilisé pour **structurer** sémantiquement et **organiser le contenu des pages web**. **HTML** permet de créer des **documents interopérables** avec des équipements très variés de manière conforme aux exigences de l’accessibilité du **web**. Il permet d’inclure des **ressources multimédias**, dont des **images** et des **vidéos** (grâce à la dernière version d'**HTML**, **HTML5**), des **liens hypertextes**, des **formulaires de saisie**, des **boutons**... Il est souvent utilisé conjointement avec des **langages de programmation** (comme *JavaScript*) et des **formats de présentation** (*feuilles de style en cascade*, ou **CSS** pour *Cascading Style Sheets* en anglais).

    Lorsque vous **accédez à une page web**, votre **navigateur** (*Firefox*, *Google Chrome*, *Safari*, etc) envoie une **requête à un serveur**, puis ce serveur **répond en renvoyant du code HTML et CSS**, ainsi que d'autres ressources telles que des *scripts JavaScript*. Ces fichiers sont ensuite **interprétés** par le **navigateur**, permettant ainsi d'**afficher la page web**. 
    **HTML** n'est **pas un langage de programmation** (contrairement à *JavaScript* ou *Python* par exemple) : il n'inclue pas de concepts tels que les **conditions** ou les **boucles** par exemple. On parle plutôt d'un **langage de description**.

!!! abstract "Qu'est-ce que le *CSS* ?"
    Le *Cascading Style Sheets* (**CSS**) est un **langage de feuilles de style** utilisé pour **définir** la **présentation visuelle** des **documents HTML**. Il permet de **mettre en forme le contenu HTML** en **décrivant l'apparence des éléments** sur une **page web**. Contrairement à **HTML**, qui se concentre sur la **structure et le contenu**, **CSS** se concentre sur la **présentation et le style**.

    **CSS** fonctionne en associant des **règles de style** à des **éléments HTML**. Ces règles spécifient **comment chaque élément doit être affiché** sur la page. Par exemple, vous pouvez utiliser **CSS** pour **définir la couleur**, la **taille de la police**, la **disposition**, les **marges**, les **arrière-plans**, et d'autres **propriétés visuelles des éléments HTML**.

    Les **règles CSS** sont généralement définies dans un **fichier séparé** (une *feuille de style* dont l'extension est `.css`), mais elles peuvent également être **intégrées directement dans le document HTML**. Lorsqu'un **navigateur charge une page web**, il **interprète** le **HTML** pour comprendre la **structure du contenu**, puis **applique les règles CSS** pour **déterminer l'apparence visuelle** de **chaque élément**.

Pour résumer, il est **<u>essentiel</u>** de comprendre le **principe** de ==**séparation** entre la **structure du contenu HTML** et sa **présentation**== :

- le **==HTML==** est le **langage de description** (et de *balisage*) permettant de gérer la **structure** et le **contenu d'une page web**,
- le **==CSS==** permet de **mise en forme** du **contenu HTML** en décrivant l'**apparence de chaque élément**.

## La structure d'une page web

La **structure d'une page HTML** est généralement la suivante :

```html
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8" />
        <title>Le titre de la page</title>
    </head>

    <body>
     ICI LE CONTENU DE LA PAGE
    </body>
</html>
```

!!! success ""
    **HTML** est un **langage de balisage**. On rencontre **deux types de balises** :

    - Les **balises** constituées d'une balise **ouvrante** et d'une balise **fermante** comme `<html></html>` ou `<body></body>`. Entre la **balise ouvrante** et la **balise fermante**, on met du **contenu** qui peut comprendre d'**autres balises** ou du **texte**.
    - Les **balises auto-fermantes**, comme la balise `<meta />`. Une telle balise est **à la fois ouvrante et fermante**, elle ne contient pas de contenu. Toutefois, les **balises auto-fermantes** contiennent toujours des **<u>attributs</u>**. Par exemple, la balise `<meta charset="utf-8" />` contient l'attribut `charset`, qui permet d'indiquer l'**encodage des caractères** de la page (ici, on indique que la norme d'encodage `utf-8` est utilisée).

Si l'on reprend la structure ci-dessus, voici une petite explication des **balises** :

- L'élément `<html>` représente la **racine du document HTML**, et englobent toutes les autres balises. L'attribut `lang="fr"` permet d'indiquer que la **langue de la page** est le *français*.
- L'élément `<head>` indique des **informations générales** (métadonnées) sur le **document**, incluant son **titre** et des **liens** ou des **définitions vers des scripts** et **feuilles de style**.
- L'élément `<title>` indique le **titre de la page** (affiché à côté de l'îcone de la page).
- L'élément `<body>` contient **tout le contenu de la page**. Dans la suite du cours, on s'intéressera plus en détail à ce contenu.

## Le contenu d'une page web

!!! tip ""
    N'hésitez pas à **copier** / **coller** le **code** proposé dans cette section sur [jsfiddle](https://jsfiddle.net/){ target="_blank" } pour en observer le résultat.

À l'intérieur de la **balise ouvrante** `<body>` et de la **balise fermante** `</body>`, on met **tout le contenu de la page**.

### La balise `<h1>`

Les balises de `<h1>` à `<h6>` permettent de mettre des **titres plus ou moins importants**. Les titres `<h1>` sont les plus importants, suivis des titres `<h2>`, etc.

^^Exemple^^ :

```html
<h1>Mon super titre</h1>
```

Si l'on souhaite rajouter des **sous-titres** :

```html
<h1>Mon super titre</h1>
<h2>Mon sous-titre 1</h2>
<h2>Mon sous-titre 2</h2>
```

On peut utiliser une **même balise** autant de fois qu'on le souhaite.

### La balise `<p>`

Une autre balise essentielle est la balise `<p>`, qui permet de créer un **paragraphe**.

^^Exemple^^ en reprenant notre code précédent :

```html
<h1>Mon super titre</h1>
<h2>Mon sous-titre 1</h2>
<p>Ceci est un premier paragraphe.</p>
<h2>Mon sous-titre 2</h2>
```

Si l'on souhaite créer **plusieurs paragraphes**, on utilisera la balise `<p>` autant de fois que nécessaire :

```html
<h1>Mon super titre</h1>
<h2>Mon sous-titre 1</h2>
<p>Ceci est un premier paragraphe.</p>
<h2>Mon sous-titre 2</h2>
<p>Ceci est un second paragraphe.</p>
```

### La balise `<br />`

Si l'on souhaite faire un **retour à la ligne**, il ne suffit pas de faire un retour à la ligne dans le code **HTML** comme ceci :

```html
<h1>Mon super titre</h1>
<h2>Mon sous-titre 1</h2>
<p>Ceci est un premier paragraphe.
Une nouvelle ligne dans le paragraphe.</p>
<h2>Mon sous-titre 2</h2>
<p>Ceci est un second paragraphe.</p>
```

Cela aura pour effet de faire un **simple espace**.

Pour faire un **retour à la ligne**, on peut utiliser la ^^balise auto-fermante^^ `<br />` :

```html
<h1>Mon super titre</h1>
<h2>Mon sous-titre 1</h2>
<p>Ceci est un premier paragraphe.<br />
Une nouvelle ligne dans le paragraphe.</p>
<h2>Mon sous-titre 2</h2>
<p>Ceci est un second paragraphe.</p>
```

### Un lien hypertexte

Pour créer un **lien hypertexte**, on ici l'**élément** `<a>`. Par exemple, si l'on souhaite créer un lien vers [Google](https://google.fr/){ target="_blank" }, on écrire :

```html
<a href="https://google.fr/">google.com</a>
```

L'attribut `href` permet d'indiquer **l'adresse cible**, et le **contenu** placé entre les deux balise `<a>` et `</a>` deviendra alors **cliquable**. Si l'on **clique dessus**, on sera redirigé vers l'**adresse cible**.

Il est également possible d'ajouter un attribut `target="_blank"` pour indiquer que l'on souhaite **ouvrir la page dans un nouvel onglet** :

```html
<a href="https://google.fr/" target="_blank">google.com</a>
```

!!! danger ""
    Il est important de noter que l'**ordre des attributs n'a pas d'importance**, on aurait pu écrire :

    ```html
    <a target="_blank" href="https://google.fr/">google.fr</a>
    ```

Si l'on reprend notre code précédent :

```html
<h1>Mon super titre</h1>
<h2>Mon sous-titre 1</h2>
<p>Ceci est un premier paragraphe.<br />
Une nouvelle ligne dans le paragraphe.</p>
<h2>Mon sous-titre 2</h2>
<p>Ceci est un second paragraphe.<br />
<a href="https://google.fr/">Cliquez ici</a> pour accéder à Google.</p>
```

### Ajouter une image

On peut **ajouter une image** dans une **page web** à l'aide de la **balise auto-fermante** `<img />`, par exemple :

```html
<img src="https://upload.wikimedia.org/wikipedia/commons/0/07/Emperor_Penguin_Manchot_empereur.jpg" alt="Un manchot" />
```

L'**attribut** `src` indique la **source de l'image**, et l'**attribut** `alt` (*facultatif*) permet d'indiquer une **description textuelle**  de l'image, ce qui est très utile pour l'accessibilité (pour les personnes non-voyantes notamment).

Si l'on reprend notre code précédent en y ajoutant une **image de manchot** :

```html
<h1>Mon super titre</h1>
<h2>Mon sous-titre 1</h2>
<p>Ceci est un premier paragraphe.<br />
Voici un superbe manchot :<br />
<img src="https://upload.wikimedia.org/wikipedia/commons/0/07/Emperor_Penguin_Manchot_empereur.jpg" alt="Un manchot" /></p>
<h2>Mon sous-titre 2</h2>
<p>Ceci est un second paragraphe.<br />
<a href="https://google.fr/">Cliquez ici</a> pour accéder à Google.</p>
```

### Ajouter du style avec `CSS`