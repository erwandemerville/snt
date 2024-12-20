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

## Le contenu d'une page web

!!! success ""
    **HTML** est un **langage de balisage**. On rencontre **deux types de balises** :

    - Les **balises** constituées d'une balise **ouvrante** et d'une balise **fermante** comme `<h1></h1>` ou `<p></p>`. Entre la **balise ouvrante** et la **balise fermante**, on met du **contenu** qui peut comprendre d'**autres balises** ou du **texte**.
    - Les **balises auto-fermantes**, comme la balise `<br />`. Une telle balise est **à la fois ouvrante et fermante**, elle ne contient pas de contenu. Toutefois, les **balises auto-fermantes** peuvent contenir des **<u>attributs</u>**. Par exemple, la balise `<img src="..." />` contient l'attribut `src`, qui permet d'**indiquer le lien de l'image** à intégrer.

!!! tip ""
    N'hésitez pas à **copier** / **coller** le **code** proposé dans cette section sur [codepen](https://codepen.io/pen){ target="_blank" } pour en observer le résultat.

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

### Mettre du texte en gras

Si l'on souhaite mettre du **texte en gras**, il existe dans l'absolu l'élément `<strong>` permettant d'indiquer du contenu comme étant **important**. Cela aura pour effet d'**afficher ce contenu en gras**.

!!! warning "`<strong>` vs `<b>`"
    Il existe également l'élément `<b>` permettant de **mettre en gras** du contenu. Il est important de noter que `<strong>` a une signification **logique**, et permet d'indiquer du contenu comme étant **important**, on peut s'en servir pour **indiquer des mots-clé** par exemple.

    L'élément `<b>` quant-à-lui a pour unique but de **mettre en gras** du contenu.

!!! danger ""
    Toutefois, il est important de noter qu'il est préférable de bien séparer le **contenu**, géré avec le langage *HTML*, de la **mise en forme**, géré avec le langage *CSS*.

    Utiliser la balise `<b>` pour **mettre en gras** un contenu n'est pas forcément une très bonne pratique, bien que cela puisse dépanner.

Si l'on souhaite mettre les mots `"paragraphe"` du **premier paragraphe** en gras :

```html
<h1>Mon super titre</h1>
<h2>Mon sous-titre 1</h2>
<p>Ceci est un premier <b>paragraphe</b>.<br />
Une nouvelle ligne dans le <b>paragraphe</b>.</p>
<h2>Mon sous-titre 2</h2>
<p>Ceci est un second paragraphe.</p>
```

!!! quote "L'élément `<i>`"
    Il existe également les balises `<i></i>` permettant de **mettre du contenu en italique**.

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
<p>Ceci est un premier <b>paragraphe</b>.<br />
Une nouvelle ligne dans le <b>paragraphe</b>.</p>
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
<p>Ceci est un premier <b>paragraphe</b>.<br />
Voici un superbe image de manchot :<br />
<img src="https://upload.wikimedia.org/wikipedia/commons/0/07/Emperor_Penguin_Manchot_empereur.jpg" alt="Un manchot" /></p>
<h2>Mon sous-titre 2</h2>
<p>Ceci est un second paragraphe.<br />
<a href="https://google.fr/">Cliquez ici</a> pour accéder à Google.</p>
```

## Ajouter du style avec `CSS`

Le **CSS** s'utilise en *parallèle* avec le **HTML**.

Reprenons notre code précédent :

```html
<h1>Mon super titre</h1>
<h2>Mon sous-titre 1</h2>
<p>Ceci est un premier <b>paragraphe</b>.<br />
Voici un superbe image de manchot :<br />
<img src="https://upload.wikimedia.org/wikipedia/commons/0/07/Emperor_Penguin_Manchot_empereur.jpg" alt="Un manchot" /></p>
<h2>Mon sous-titre 2</h2>
<p>Ceci est un second paragraphe.<br />
<a href="https://google.fr/">Cliquez ici</a> pour accéder à Google.</p>
```

### Modifier la couleur du texte

On souhaite **mettre en vert** le mot `"paragraphe"` du premier paragraphe.

On constate que ce mot est contenu dans les **balises** `<b></b>`.  
Ainsi, pour **mettre en vert** ce mot, on va pouvoir ajouter le *CSS* suivant :

```css
b {
    color: green;
}
```

`color` est l'une des nombreuses **propriétés CSS** qui existent.  
Vous n'avez bien sûr pas à toutes les connaître.

### Modifier la couleur de fond

On souhaite maintenant mettre le **titre principal** en **blanc sur fond noir**.  
Ce **titre** est entre les balises `<h1></h1>`, on va donc pouvoir écrire :

```css
h1 {
    color: white;
    background-color: black;
}
```

`background-color` permet de définir la **couleur de fond** d'un élément.

### Modifier la police d'écriture

On souhaite définir la **police** du **titre principal** en `Verdana` :

```css
h1 {
    color: white;
    background-color: black;
    font-family: Verdana;
}
```

On a ajouté le **propriété** `font-family` dans notre *CSS*. On pourrait ajouter **autant d'attributs que l'on voudrait** pour une même balise.

### Mettre en gras / en italique

Plutôt que d'utiliser les éléments `<b>` et `<i>` pour mettre en **gras** et en *italique*, on peut utiliser la **propriété CSS** `font-weight`.

Si l'on souhaite mettre **tous nos paragraphes** en **gras** :

```css
p {
    font-weight: bold;
}
```

ou en *italique* :

```css
p {
    font-weight: italic;
}
```

### Les classes et identifiants

Il y a un problème : comment faire pour attribuer un **style différent** à nos **deux paragraphes** ?  
En effet, si l'on définit le style comme ci-dessus, cela s'applique à tous les paragraphes.

Pour définir un style différent sur nos deux paragraphes, on peut leur attribut un **identifiant différent** :

```html
<h1>Mon super titre</h1>
<h2>Mon sous-titre 1</h2>
<p id="par1">Ceci est un premier <b>paragraphe</b>.<br />
Voici un superbe image de manchot :<br />
<img src="https://upload.wikimedia.org/wikipedia/commons/0/07/Emperor_Penguin_Manchot_empereur.jpg" alt="Un manchot" /></p>
<h2>Mon sous-titre 2</h2>
<p id="par2">Ceci est un second paragraphe.<br />
<a href="https://google.fr/">Cliquez ici</a> pour accéder à Google.</p>
```

L'attribut `id` permet d'associer un **identifiant à une balise**.  
Ainsi, pour mettre **le premier paragraphe en gras** et **souligner le deuxième paragraphe** par exemple, on pourra écrire en *CSS* :

```css
#par1 {
    font-weight: bold;
}

#par2 {
    text-decoration: underline;
}
```

On aurait également pu, au lieu d'utiliser des **identifiants**, associer une **classe** différente à nos deux paragraphes :

```html
<h1>Mon super titre</h1>
<h2>Mon sous-titre 1</h2>
<p class="par1">Ceci est un premier <b>paragraphe</b>.<br />
Voici un superbe image de manchot :<br />
<img src="https://upload.wikimedia.org/wikipedia/commons/0/07/Emperor_Penguin_Manchot_empereur.jpg" alt="Un manchot" /></p>
<h2>Mon sous-titre 2</h2>
<p class="par2">Ceci est un second paragraphe.<br />
<a href="https://google.fr/">Cliquez ici</a> pour accéder à Google.</p>
```

L'attribut `class` permet d'associer une **classe à une balise**.  
Ainsi, pour mettre **le premier paragraphe en gras** et **souligner le deuxième paragraphe** par exemple, on pourra écrire en *CSS* :

```css
.par1 {
    font-weight: bold;
}

.par2 {
    text-decoration: underline;
}
```

!!! warning "Différence classe et identifiant"
    La principale différence entre **classe** et **identifiant** est qu'==un même identifiant ne peut pas être associé à plusieurs balises, à l'inverse des classes==.

    Par ailleurs, au niveau du **CSS**, les **classes** seront précédées d'un `.` tandis que les **identifiants** seront précédés d'un `#`.

### La balise `<span>`

L'élement HTML `<span>` n'a aucun effet en soi, mais peut être utilisé pour **associer un style** à un **contenu**.

Par exemple :

```html
<p>Je veux écrire un mot en <span class="bleu">bleu</span></p>
```

Les balises `<span></span>` n'auront aucun effet en soi, mais si on ajoute dans le *CSS* :

```css
.bleu {
    color: blue;
}
```

Le **mot** `"bleu"` s'affichera alors maintenant avec **en couleur bleue**.  
Les balises `<span>` n'ont d'intérêt que si on leur associe une **classe** ou un **identifiant**, de manière à pouvoir définir un **style** particulier au **contenu** qui est compris entre la *balise ouvrante* `<span>` et la *balise fermante* `</span>`.

### La balise `<div>`

L'élément `<div>` fonctionne avec le même principe que l'élément `<span>` évoqué précédemment, mais permet de **créer des blocs**, là où l'élément `<span>` est utilisé pour ajouter un style **dans une ligne**.

Ces **blocs** peuvent eux-mêmes contenir d'**autres balises** ainsi que du **texte**, par exemple :

```html
<div id="section1">
    <h2>Introduction</h2>
    <p>Les manchots sont des oiseaux marins fascinants qui habitent principalement dans l'hémisphère sud.</p>
</div>
```

Si on souhaite par exemple **créer une bordure noire de 1px** autour de ce **bloc**, et mettre la **couleur de fond** en **gris**, on pourra ajouter ceci au *CSS* :

```css
#section1 {
    border: 1px solid black;
    background-color: gray;
}
```

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

Si l'on reprend la structure ci-dessus, voici une petite explication des **balises** :

- L'élément `<html>` représente la **racine du document HTML**, et englobent toutes les autres balises. L'attribut `lang="fr"` permet d'indiquer que la **langue de la page** est le *français*.
- L'élément `<head>` indique des **informations générales** (métadonnées) sur le **document**, incluant son **titre** et des **liens** ou des **définitions vers des scripts** et **feuilles de style**.
- L'élément `<title>` indique le **titre de la page** (affiché à côté de l'îcone de la page).
- L'élément `<body>` contient **tout le contenu de la page**.

## Exercice de révisions

!!! note "Exercice d'entraînement"
    Sur [codepen](https://codepen.io/pen){ target="_blank" }, essayez de **reproduire** la **page web suivante** :

    ![](images/capture_page.png)

!!! tip "Partie HTML corrigée"
    Cliquez sur le lien ci-dessous pour accéder à un codepen contenant le code HTML complet :

    <center style="font-size:1.3em">
    [Cliquez ici pour accéder au codepen](https://codepen.io/erwandemerville/pen/JoPoZyp)
    </center>