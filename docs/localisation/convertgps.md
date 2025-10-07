---
hide:
  - navigation
  - toc
---

# Convertisseur adresse ↔ coordonnées GPS

Utilisez cet outil pour trouver des **coordonnées GPS** à partir d'une **adresse** ou inversement, pour **localiser un lieu** ou encore pour **déterminer une altitude**.

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
table tr { font-size: 1.0em; }
.rep { border: 1px solid blue; background-color: rgb(244, 244, 244); width: 400px; }
.repl { border: 1px solid blue; background-color: rgb(244, 244, 244); width: 200px; }
</style>
<div class="controls">
  <div>
    <label>Adresse :</label>
    <input class="addr" type="text" id="addressInput" placeholder="Ex: 10 rue de Rivoli, Paris"/>
    <button class="md-button" onclick="addressToCoords()">Convertir en coordonnées</button>
  </div>

  <div>
    <label>Latitude :</label>
    <input type="text" id="latInput" placeholder="48.8566"/>
    <label>Longitude :</label>
    <input type="text" id="lonInput" placeholder="2.3522"/>
    <button class="md-button" onclick="coordsToAddress()">Convertir en adresse</button>
  </div>

  <div>
  <label>Latitude :</label>
  <input type="number" id="latDeg" placeholder="48"> °
  <input type="number" id="latMin" placeholder="51"> '
  <input type="number" id="latSec" placeholder="29.99"> "
  <select id="latDir">
    <option value="N">N</option>
    <option value="S">S</option>
  </select>
  &nbsp;
  <label>Longitude :</label>
  <input type="number" id="lonDeg" placeholder="2"> °
  <input type="number" id="lonMin" placeholder="21"> '
  <input type="number" id="lonSec" placeholder="0.12"> "
  <select id="lonDir">
    <option value="E">E</option>
    <option value="W">W</option>
  </select>
  <button class="md-button" onclick="dmsToAddress()">Convertir en adresse</button>
  </div>

  <p id="error"></p>

  <button id="btnAlt" class="md-button" onclick="getAltitude()">Obtenir altitude</button>
</div>

<div id="map"></div>

<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script>
  let map = L.map('map').setView([48.8566, 2.3522], 6); // Paris par défaut
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Déclarer latitude et longitude (contiendra des décimaux)
  let lat;
  let lon;
  let nbc = 5;  // Nombre de chiffres après la virgule

  // Déclarer addresse
  let address;

  // Déclarer le marqueur
  let marker;

  // Booléen indiquant si l'altitude peut être affichée
  let AffAlt = false;  // Au départ, on ne peut pas l'afficher

  // Ajouter un marqueur
  function addMarker() {
    if (marker !== undefined) {
      marker.setLatLng([lat, lon]);  // Modifier la position du marqueur
    }
    else {
      marker = L.marker([lat, lon]).addTo(map);  // Créer le marqueur
    }
  }

  // Activer affichage altitude
  function enableAlt() {
    AffAlt = true;
    document.getElementById("btnAlt").style.display = "";  // Disparition du bouton
  }

  // Désactiver affichage altitude
  function disableAlt() {
    AffAlt = false;
    document.getElementById("btnAlt").style.display = "none";  // Disparition du bouton
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

  // Géolocalisation utilisateur
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      enableAlt();  // Activer l'affichage de l'altitude
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;

      map.setView([lat, lon], 15);
      addMarker();

      // Remplir les champs Latitude / Longitude
      document.getElementById("latInput").value = lat.toFixed(nbc);
      document.getElementById("lonInput").value = lon.toFixed(nbc);

      // Remplir aussi les champs DMS
      fillDMSFields(lat, lon);

      // Reverse geocoding pour obtenir l’adresse
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(res => res.json())
        .then(data => {
          address = data.display_name || "Adresse introuvable";

          // Afficher les résultats
          if (address !== "Adresse introuvable") {
            updateMarkerPopup(
              address,
              lat,
              lon
            );
            document.getElementById("addressInput").value = address;
          } else {
            document.getElementById("error").innerText = "Adresse introuvable";
          }
        });
    });
  }

  // Adresse → Coordonnées
  function addressToCoords() {
    enableAlt();  // Activer l'affichage de l'altitude
    address = document.getElementById("addressInput").value;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          lat = parseFloat(data[0].lat);
          lon = parseFloat(data[0].lon);
          address = data[0].display_name;  // Récupérer l'addresse exacte
          addMarker()
          map.setView([lat, lon], 15);
          document.getElementById("latInput").value = lat.toFixed(nbc);
          document.getElementById("lonInput").value = lon.toFixed(nbc);
          // Remplir aussi les champs DMS
          fillDMSFields(lat, lon);
          // Afficher les résultats
          updateMarkerPopup(
            address,
            lat,
            lon
          );
        } else {
          document.getElementById("error").innerText = "Adresse introuvable";
        }
      });
  }

  // Coordonnées → Adresse
  function coordsToAddress() {
    enableAlt();  // Activer l'affichage de l'altitude
    lat = parseFloat(document.getElementById("latInput").value);
    lon = parseFloat(document.getElementById("lonInput").value);
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then(res => res.json())
      .then(data => {
        address = data.display_name;
        if (data && address) {
          addMarker();
          map.setView([lat, lon], 15);
          // Remplir le champ addresse
          document.getElementById("addressInput").value = address;
          // Remplir aussi les champs DMS
          fillDMSFields(lat, lon);
          // Afficher les résultats
          updateMarkerPopup(
            address,
            lat,
            lon
          );
        } else {
          document.getElementById("error").innerText = "Adresse introuvable";
        }
      });
  }

  // Récupérer les valeurs saisies en DMS et faire un reverse geocoding
  function dmsToAddress() {
    enableAlt();  // Activer l'affichage de l'altitude
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
            address = data.display_name;
            if (data && address) {
              addMarker();
              map.setView([lat, lon], 15);
              // Mettre à jour les champs adresse et lat lon décimaux
              document.getElementById("addressInput").value = address;
              document.getElementById("latInput").value = lat.toFixed(nbc);
              document.getElementById("lonInput").value = lon.toFixed(nbc);
              // Afficher les résultats
              updateMarkerPopup(
                address,
                lat,
                lon
              );
            } else {
              document.getElementById("error").innerText = "Adresse introuvable";
            }
          });
  }

  // Conversion DMS → Décimal
  function fromDMS(deg, min, sec, dir) {
    let dec = Math.abs(deg) + (min/60) + (sec/3600);
    if (dir === "S" || dir === "W") dec = -dec;
    return dec;
  }

  // Remplit les champs DMS à partir d'une latitude/longitude décimale
  function fillDMSFields(lat, lon) {
    function decToParts(dec, type) {
      let deg = Math.floor(Math.abs(dec));
      let minFloat = (Math.abs(dec) - deg) * 60;
      let min = Math.floor(minFloat);
      let sec = ((minFloat - min) * 60).toFixed(2);
      let dir = "";
      if (type === "lat") dir = dec >= 0 ? "N" : "S";
      if (type === "lon") dir = dec >= 0 ? "E" : "W";
      return {deg, min, sec, dir};
    }

    let latParts = decToParts(lat, "lat");
    let lonParts = decToParts(lon, "lon");

    document.getElementById("latDeg").value = latParts.deg;
    document.getElementById("latMin").value = latParts.min;
    document.getElementById("latSec").value = latParts.sec;
    document.getElementById("latDir").value = latParts.dir;

    document.getElementById("lonDeg").value = lonParts.deg;
    document.getElementById("lonMin").value = lonParts.min;
    document.getElementById("lonSec").value = lonParts.sec;
    document.getElementById("lonDir").value = lonParts.dir;
  }

  // Affichage du popup de résultats
  function updateMarkerPopup(address, lat, lon, alt = null) {
    let popupContent =
      `<b>Adresse</b> : ${address}<br /><br />
      <table>
        <tr><th></th><th>Latitude</th><th>Longitude</th></tr>
        <tr>
          <td>DD</td>
          <td>${lat.toFixed(nbc)}</td>
          <td>${lon.toFixed(nbc)}</td>
        </tr>
        <tr>
          <td>DMS</td>
          <td>${toDMS(lat, "lat")}</td>
          <td>${toDMS(lon, "lon")}</td>
        </tr>
      </table>`;

    // Si l'on a demandé l'affichage de l'altitude
    if (alt !== null) {
      popupContent += `<br /><b>Altitude</b> : ${alt}`;
    }

    marker.bindPopup(popupContent, { maxWidth : 400 }).openPopup();
  }

  // Bouton "Obtenir altitude"
  function getAltitude() {
    let introuvable = document.getElementById("error").innerText === "Adresse introuvable";
    if (AffAlt && !introuvable) {
      disableAlt();  // Désactiver affichage de l'altitude
      fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.results && data.results.length > 0) {
            let alt = data.results[0].elevation + " m";
            updateMarkerPopup(address, lat, lon, alt);
          } else {
            updateMarkerPopup(address, lat, lon, "Non disponible");
          }
        })
        .catch(() => {
          updateMarkerPopup(address, lat, lon, "Altitude non récupérable");
        });
    }
  }
</script>