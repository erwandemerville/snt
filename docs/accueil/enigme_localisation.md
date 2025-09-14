---
hide:
  - navigation
  - toc
---

# Énigme - Localisation ([recharger page](enigme_localisation.md))

!!! abstract "Objectif"
    **==<u>Objectif</u>==** : identifier la **ville**, le **lieu exact** et l'**altitude** qui correspondent aux **coordonnées GPS** suivantes.
    
    <center style="font-size:1.3em">
    `49° 14' 15'' N, 2° 8' 35'' E`
    </center>

    Ces **coordonnées** se lisent :

    - « 49 *degrés*, 14 *minutes* et 15 *secondes* de ==**latitude**== **N**ord »,
    - « 2 *degrés*, 8 *minutes* et 35 *secondes* de ==**longitude**== **E**st ».

!!! question "Les coordonnées GPS, késako ?"
    Les **coordonnées GPS** (pour *Global Positioning System*) servent à **localiser un endroit n’importe où sur le globe** à l’aide d’un **système de ==latitude== et de ==longitude==**.

    La **==latitude==** mesure la **distance d'un point** par rapport à l’**équateur** vers le **nord** (***N***) ou le **sud** (***S***).  
    La **==longitude==** mesure la **distance d'un point** par rapport au **méridien de Greenwich** vers l’**est** (***E***) ou l’**ouest** (***O***).

    Ces **coordonnées** peuvent être **exprimées** sous la forme de ==***degrés décimaux***==, ou sous la forme de ==***degrés, minutes et secondes***== (***DMS***) comme c'est le cas ici.

!!! note "À faire"
    À partir des **coordonnées GPS** précédentes (`49° 14' 15'' N, 2° 8' 35'' E`), répondez ==**dans les champs**== aux **questions suivantes** :
    
    1. Comment s’appelle cette **ville** ?  
    Votre réponse : <input class="rep" type="text" />
    2. Pouvez-vous donner plus de **détails** sur le **lieu exact** ?  
    Votre réponse : <input class="rep" type="text" />
    3. Précisez l’**altitude** de ce lieu.  
    Votre réponse : <input class="rep" type="text" />
    4. Donner les **coordonnées GPS** en **décimal** de l'**adresse** `Tour Eiffel, Paris`.  
    Votre réponse : <input class="repl" type="text" placeholder="latitude" /> <input class="repl" type="text" placeholder="longitude" />

    ==**Pour réaliser cela, vous utiliserez le bloc [Conversion Adresse ↔ Coordonnées GPS](#conversion) ci-dessous.**==  
    Appelez l'enseignant lorsque vous avez terminé.

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
<style>
#map { height: 400px; }
.controls { padding: 1px 10px 10px 10px; background:rgb(242, 242, 242); }
input { margin: 5px; padding: 10px; }
input.addr { width: 700px; }
input[type="number"] { width: 80px; }
select { padding: 7px; }
body .controls div .md-button { margin: 5px; padding: 7px; }
label { font-weight: bold; }
#result { padding: 5px; font-size: 1.1em; text-align: center; }
.surl { background-color: rgb(254, 219, 178); }
.md-content article .admonition { font-size: 1em; }
table tr { font-size: 1.2em; }
.rep { border: 1px solid blue; background-color: rgb(244, 244, 244); width: 400px; }
.repl { border: 1px solid blue; background-color: rgb(244, 244, 244); width: 200px; }
</style>
<div class="controls">
  <h2 id="conversion"><center>Conversion Adresse ↔ Coordonnées GPS</center></h2>

  <div>
    <label>Adresse :</label>
    <input class="addr" type="text" id="addressInput" placeholder="Ex: 10 rue de Rivoli, Paris"/>
    <button class="md-button" onclick="addressToCoords()">Convertir en coordonnées GPS</button>
  </div>

  <div>
  <label>Latitude :</label>
  <input type="number" id="latDeg"> °
  <input type="number" id="latMin"> '
  <input type="number" id="latSec"> "
  <select id="latDir">
    <option value="N">N</option>
    <option value="S">S</option>
  </select>
  &nbsp;
  <label>Longitude :</label>
  <input type="number" id="lonDeg"> °
  <input type="number" id="lonMin"> '
  <input type="number" id="lonSec"> "
  <select id="lonDir">
    <option value="E">E</option>
    <option value="W">W</option>
  </select>
  <button class="md-button" onclick="dmsToAddress()">Convertir en adresse</button>
  </div>

  <p id="result"></p>

  <button class="md-button" onclick="getAltitude()">Obtenir altitude</button>
</div>

<div id="map"></div>

<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script>
  let map = L.map('map').setView([48.8566, 2.3522], 6); // Paris par défaut
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Initialiser latitude et longitude (contiendra des décimaux)
  let lat;
  let lon;

  // Initialiser le marqueur
  let marker;

  // Booléen indiquant si l'altitude peut être affichée
  let AffAlt = false;  // au départ, on ne peut pas l'afficher

  // Ajouter un marqueur
  function addMarker() {
    if (marker !== undefined) {
      marker.setLatLng([lat, lon]);  // Modifier la position du marqueur
    }
    else {
      marker = L.marker([lat, lon]).addTo(map);  // Créer le marqueur
    }
  }

  // Conversion décimal → DMS
  function toDMS(dec, type) {
    let deg = Math.floor(Math.abs(dec));
    let minFloat = (Math.abs(dec) - deg) * 60;
    let min = Math.floor(minFloat);
    let sec = ((minFloat - min) * 60).toFixed(2);
    let dir = "";
    if (type === "lat") dir = dec >= 0 ? "N" : "S";
    if (type === "lon") dir = dec >= 0 ? "E" : "W";
    return `${deg}° ${min}' ${sec}" ${dir}`;
  }

  // Adresse → Coordonnées
  function addressToCoords() {
    AffAlt = true;  // indiquer que l'altitude peut être affichée
    let address = document.getElementById("addressInput").value;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          lat = parseFloat(data[0].lat);
          lon = parseFloat(data[0].lon);
          addMarker()
          map.setView([lat, lon], 15);
          // Afficher les résultats
          document.getElementById("result").style.border = "1px solid rgb(30, 142, 207)";
          document.getElementById("result").innerHTML =
            `<b>Résultats</b> :<br />` +
            `<b>Adresse</b> → <span class="surl">${data[0].display_name}</span><br /><br />` +
            `<table>
            <tr>
                <th></th>
                <th>Latitude</th>
                <th>Longitude</th>
            </tr>
            <tr>
                <td>Décimal</td>
                <td><span class="surl">${lat}</span></td>
                <td><span class="surl">${lon}</span></td>
            </tr>
            <tr>
                <td>DMS</td>
                <td><span class="surl">${toDMS(lat, "lat")}</span></td>
                <td><span class="surl">${toDMS(lon, "lon")}</span></td>
            </tr>
            </table>`;
        } else {
          document.getElementById("result").innerText = "Adresse introuvable";
        }
      });
  }

  // Récupérer les valeurs saisies en DMS et faire un reverse geocoding
  function dmsToAddress() {
    AffAlt = true;  // indiquer que l'altitude peut être affichée

    lat = fromDMS(
      parseFloat(document.getElementById("latDeg").value || 0),
      parseFloat(document.getElementById("latMin").value || 0),
      parseFloat(document.getElementById("latSec").value || 0),
      document.getElementById("latDir").value
    );

    lon = fromDMS(
      parseFloat(document.getElementById("lonDeg").value || 0),
      parseFloat(document.getElementById("lonMin").value || 0),
      parseFloat(document.getElementById("lonSec").value || 0),
      document.getElementById("lonDir").value
    );

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.display_name) {
              addMarker()
              map.setView([lat, lon], 15);
              // Afficher les résultats
              document.getElementById("result").style.border = "1px solid rgb(30, 142, 207)";
              document.getElementById("result").innerHTML =
                `<b>Résultats</b> :<br />` +
                `<b>Adresse</b> → <span class="surl">${data.display_name}</span><br /><br />` +
                `<table>
                <tr>
                    <th></th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
                <tr>
                    <td>Décimal</td>
                    <td><span class="surl">${lat}</span></td>
                    <td><span class="surl">${lon}</span></td>
                </tr>
                <tr>
                    <td>DMS</td>
                    <td><span class="surl">${toDMS(lat, "lat")}</span></td>
                    <td><span class="surl">${toDMS(lon, "lon")}</span></td>
                </tr>
                </table>`;
            } else {
              document.getElementById("result").innerText = "Adresse introuvable";
            }
          });
  }

  // Conversion DMS → Décimal
  function fromDMS(deg, min, sec, dir) {
    let dec = Math.abs(deg) + (min/60) + (sec/3600);
    if (dir === "S" || dir === "W") dec = -dec;
    return dec;
  }

  // Bouton "Obtenir altitude"
  function getAltitude() {
    let introuvable = document.getElementById("result").innerText === "Adresse introuvable";
    if (AffAlt && !introuvable) {
      AffAlt = false;
      fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.results && data.results.length > 0) {
            let alt = data.results[0].elevation + " m";
            document.getElementById("result").innerHTML += `<br /><b>Altitude</b> : ${alt}`;
          } else {
            document.getElementById("result").innerHTML += `<br /><b>Altitude</b> : Non disponible`;
          }
        })
        .catch(() => {
          document.getElementById("result").innerHTML += `<br /><b>Altitude</b> : Erreur lors de la récupération`;
        });
    }
  }
</script>