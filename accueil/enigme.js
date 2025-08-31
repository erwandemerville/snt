var trans = {
    France: "France",
    France2: "france",
    OpenKey: "a1674daf25f54056a7c8047ca1742c22",
    AlgoKey: "8b85377ef90e71e2d5096d015d1ecad8",
    MapKey:
        "eyJraWQiOiIySDU4SEtDNDhUIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiI3M1cyRzNMTDY0IiwiaWF0IjoxNzIzMzcxNTU1LCJvcmlnaW4iOiIqLmNvb3Jkb25uZWVzLWdwcy5mciJ9.Y4fT7NajAEW3Jr0v2FH-Ku6BNkysSB-iLY7crkQYRq4zJFDvpJhPpB5NWSuh-nBGWR_80j3OV1huhpbeNAmNlQ",
    AlgoApp: "plJ14NII6Y3C",
    ElevationKey: "hc2962-wQ54R8e9agp9247hljNBNCg",
    AutocompleteTrigger: 21,
    AutoCountLimit: 100,
    InvalidCoordinatesShort: "Coordonnées non valides",
    Locale: "fr",
    InvalidCoordinates: "Coordonnées non valides ou problème de connexion",
    DefaultLat: 48.862725,
    DefaultLng: 2.287592,
    DefaultHeading: 134,
    DefaultPitch: 8,
    DefaultSvZoom: 1,
    DefaultZoom: 14,
    DefaultAddress: "Paris",
    Geolocation: "Géolocalisation :",
    Latitude: "Latitude :",
    Longitude: "Longitude :",
    GetAltitude: "Obtenir l'altitude",
    NoResolvedAddress: "Pas d'adresse correspondant à ces coordonnées",
    GeolocationError: "Erreur de géolocalisation",
    GeocodingError: "Échec du geocoding ",
    Altitude: "Altitude : ",
    Meters: " mètres",
    NoResult: "Aucun résultat",
    ElevationFailure: "Échec de la recherche d'altitude ",
    SetOrigin: "Choisir comme point de départ",
    Origin: "Point de départ : ",
    NewOrigin: "Ce lieu est votre nouveau point de départ.",
    SetDestination: "Choisir comme destination",
    Destination: "Destination : ",
    NewDest: "Ce lieu est votre nouvelle destination.",
    Address: "Adresse : ",
    Bicycling: "À vélo",
    Transit: "En transport en commun",
    Walking: "À pied",
    Driving: "En voiture",
    Kilometer: "Kilomètre",
    Mile: "Mile",
    Avoid: "Éviter",
    DirectionsError: "Erreur de calcul ou itinéraire invalide.",
    North: "N",
    South: "S",
    East: "E",
    West: "O",
    Type: "type",
    Lat: "latitude",
    Lng: "longitude",
    Dd: "DD",
    Dms: "DMS",
    CheckMapDelay: 7e3,
};
mapkit.init({
    authorizationCallback: function (done) {
        done(trans.MapKey);
    },
    language: "fr",
});
var elem = document.getElementById("map_canvas");
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    $("#open_full_screen").css("display", "none");
    $("#close_full_screen").css("display", "block");
}
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    $("#open_full_screen").css("display", "block");
    $("#close_full_screen").css("display", "none");
}
var map;
var geocoder;
var autocomplete;
var annotation = null;
var fromPlace = 0;
var locationFromPlace;
var addressFromPlace;
var addressLength = 0;
var placeName = "";
var defaultLatLng = new mapkit.Coordinate(trans.DefaultLat, trans.DefaultLng);
var mapLoaded = 0;
var autoCount = 0;
var geoloc = 0;
var geolocLat = 0;
var geolocLng = 0;
var geolocAddr = "";
var autocompleteLoaded = 0;
var badQueries = [];
var scrollStatus = 0;
var CALLOUT_OFFSET = new DOMPoint(0, 10);
var landmarkAnnotationCallout = {
    calloutElementForAnnotation: function (annotation) {
        return calloutForLandmarkAnnotation(annotation);
    },
    calloutAnchorOffsetForAnnotation: function (annotation, element) {
        return CALLOUT_OFFSET;
    },
};
function calloutForLandmarkAnnotation(annotation) {
    var div = document.createElement("div");
    div.className = "landmark";
    var closerspan = document.createElement("span");
    closerspan.setAttribute("aria-hidden", true);
    closerspan.textContent = "×";
    var closer = document.createElement("button");
    closer.className = "close pull-right";
    closer.setAttribute("aria-label", "Close");
    closer.setAttribute("type", "button");
    closer.appendChild(closerspan);
    div.appendChild(closer);
    var title = div.appendChild(document.createElement("h1"));
    title.textContent = annotation.address;
    title.id = "iwtitle";
    var section = div.appendChild(document.createElement("section"));
    var info_window = section.appendChild(document.createElement("div"));
    info_window.className = "info_window";
    info_window.id = "iwcontent";
    info_window.innerHTML = infowindowContent(annotation.address, annotation.lat, annotation.lng);
    return div;
}
$("body").on("click", ".close", function (e) {
    annotation.selected = false;
});
function isGoodQuery(query) {
    var goodQuery = true;
    for (var i = 0; i < badQueries.length; i++) {
        if (query.startsWith(badQueries[i])) goodQuery = false;
    }
    return goodQuery;
}
function hasNoNumbers(t) {
    return !/\d/.test(t);
}
function myFocus(el) {
    el.focus();
    var valLength = el.value.length;
    valLength = valLength * 2;
    el.setSelectionRange(valLength, valLength);
    return false;
}
function updateAll(text1, text2, lat, lng) {
    var infoText = "<strong>" + text1 + '</strong> <span id="geocodedAddress">' + text2 + "</span>";
    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lng;
    document.getElementById("latlong").value = lat + "," + lng;
    document.getElementById("address").value = text2;
    annotation.address = text2;
    annotation.lat = lat;
    annotation.lng = lng;
    annotation.selected = false;
    annotation.selected = true;
    ddversdms();
    bookUp(text2, lat, lng);
}
function myReverseGeocode(latToGeocode, lngToGeocode, intro) {
    latToGeocode = parseFloat(latToGeocode);
    lngToGeocode = parseFloat(lngToGeocode);
    if (latToGeocode >= -90 && latToGeocode <= 90 && lngToGeocode >= -180 && lngToGeocode <= 180) {
        $.ajax({
            type: "GET",
            url: "https://api.opencagedata.com/geocode/v1/json?q=" + latToGeocode + "+" + lngToGeocode + "&key=" + trans.OpenKey + "&no_annotations=1&language=" + trans.Locale,
            dataType: "json",
            success: function (data) {
                if (data.status.code == 200) {
                    if (data.total_results >= 1) {
                        if (intro == -1) geolocAddr = data.results[0].formatted;
                        updateAll(intro, data.results[0].formatted, latToGeocode, lngToGeocode);
                    } else {
                        if (intro == -1) geolocAddr = trans.NoResolvedAddress;
                        updateAll(intro, trans.NoResolvedAddress, latToGeocode, lngToGeocode);
                    }
                } else {
                    if (intro == -1) geolocAddr = trans.GeocodingError;
                    updateAll(intro, trans.InvalidCoordinates, latToGeocode, lngToGeocode);
                }
            },
            error: function (xhr, err) {
                updateAll(trans.Geolocation, trans.InvalidCoordinates, latToGeocode, lngToGeocode);
            },
        }).always(function () {
            if (intro == -1) initializeMap();
        });
        return false;
    } else alert(trans.InvalidCoordinatesShort);
}
function myForwardGeocode(addr) {
    $.ajax({
        type: "GET",
        url: "https://api.opencagedata.com/geocode/v1/json?q=" + encodeURIComponent(addr) + "&key=" + trans.OpenKey + "&no_annotations=1&language=" + trans.Locale,
        dataType: "json",
        success: function (data) {
            if (data.status.code == 200) {
                if (data.total_results >= 1) {
                    var latres = data.results[0].geometry.lat;
                    var lngres = data.results[0].geometry.lng;
                    var pos = new mapkit.Coordinate(latres, lngres);
                    map.setCenterAnimated(pos);
                    annotation.coordinate = pos;
                    updateAll("", data.results[0].formatted, latres, lngres);
                } else {
                    alert(trans.GeolocationError);
                }
            } else {
                alert(trans.GeolocationError);
            }
        },
        error: function (xhr, err) {
            alert(trans.GeolocationError);
        },
    }).always(function () {});
    return false;
}
function initialize() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                geoloc = 1;
                geolocLat = position.coords.latitude;
                geolocLng = position.coords.longitude;
                $("#statusinfo").removeClass("bg-orange").addClass("bg-green");
                $("#statusinfo").html("Géolocalisation on — Faire défiler la page pour afficher la carte");
                initializeMap();
            },
            function () {
                geoloc = 2;
                $("#statusinfo").removeClass("bg-orange").addClass("bg-green");
                $("#statusinfo").html("Géolocalisation off — Faire défiler la page pour afficher la carte");
                initializeMap();
            },
            { timeout: 5e3 }
        );
    } else {
        geoloc = 2;
        $("#statusinfo").removeClass("bg-orange").addClass("bg-green");
        $("#statusinfo").html("Géolocalisation off — Faire défiler la page pour afficher la carte");
        initializeMap();
    }
}
function initializeMap() {
    if (mapLoaded == 0 && appeared == 1 && geoloc != 0) {
        $("#statusinfo").remove();
        $("#open_full_screen").css("display", "block");
        var input = document.getElementById("address");
        if (geoloc == 1) {
            var pos = new mapkit.Coordinate(geolocLat, geolocLng);
            var span = new mapkit.CoordinateSpan(0.2, 0.2);
            var region = new mapkit.CoordinateRegion(pos, span);
            map = new mapkit.Map("map_canvas", { region: region });
            mapLoaded = 1;
            annotation = new mapkit.MarkerAnnotation(pos, { callout: landmarkAnnotationCallout, selected: true, color: "#f0603f" });
            annotation.address = "analyzing...";
            annotation.lat = pos.latitude;
            annotation.lng = pos.longitude;
            map.addAnnotation(annotation);
            myReverseGeocode(geolocLat, geolocLng, -1);
        } else {
            defaultMap();
        }
        map.addEventListener("scroll-start", function (event) {
            scrollStatus++;
        });
        map.addEventListener("single-tap", function (event) {
            codeLatLngfromclick(event);
        });
    }
}
function codeAddress() {
    var address = document.getElementById("address").value;
    if (fromPlace == 1) {
        map.setCenterAnimated(locationFromPlace);
        annotation.selected = false;
        annotation.coordinate = locationFromPlace;
        annotation.address = addressFromPlace;
        annotation.lat = locationFromPlace.latitude;
        annotation.lng = locationFromPlace.longitude;
        setTimeout(function () {
            annotation.selected = true;
        }, 500);
        document.getElementById("latitude").value = locationFromPlace.latitude;
        document.getElementById("longitude").value = locationFromPlace.longitude;
        document.getElementById("latlong").value = locationFromPlace.latitude + "," + locationFromPlace.longitude;
        document.getElementById("address").value = addressFromPlace;
        bookUp(addressFromPlace, locationFromPlace.latitude, locationFromPlace.longitude);
        ddversdms();
    } else {
        myForwardGeocode(address);
    }
}
function codeLatLng(origin) {
    var lat = parseFloat(document.getElementById("latitude").value) || 0;
    var lng = parseFloat(document.getElementById("longitude").value) || 0;
    if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        var latlng = new mapkit.Coordinate(lat, lng);
        if (origin == 1) ddversdms();
        document.getElementById("address").value = "finding address...";
        annotation.address = "finding address...";
        if (document.getElementById("iwtitle")) document.getElementById("iwtitle").innerHTML = "finding address...";
        map.setCenterAnimated(latlng);
        annotation.selected = false;
        annotation.coordinate = latlng;
        setTimeout(function () {
            annotation.selected = true;
        }, 500);
        myReverseGeocode(lat, lng, "");
        fromPlace = 0;
    } else alert(trans.InvalidCoordinatesShort);
}
function codeLatLngfromclick(event) {
    document.getElementById("address").value = "finding address...";
    annotation.address = "finding address...";
    if (document.getElementById("iwtitle")) document.getElementById("iwtitle").innerHTML = "finding address...";
    var domPoint = new DOMPoint(event.pointOnPage.x, event.pointOnPage.y);
    var coordinate = map.convertPointOnPageToCoordinate(domPoint);
    var lat = coordinate.latitude;
    var lng = coordinate.longitude;
    map.setCenterAnimated(coordinate);
    annotation.selected = false;
    annotation.coordinate = coordinate;
    setTimeout(function () {
        annotation.selected = true;
    }, 500);
    fromPlace = 0;
    myReverseGeocode(lat, lng, "");
}
function getElevation() {
    var elevationButton = document.getElementById("altitude");
    elevationButton.innerHTML = '<img src="' + loaderUrl + '"/>';
    $.ajax({
        type: "GET",
        url: "https://elevation-api.io/api/elevation?points=(" + annotation.coordinate.latitude + "," + annotation.coordinate.longitude + ")&resolution=90&key=" + trans.ElevationKey,
        dataType: "json",
        success: function (data) {
            if (data.elevations.length >= 1) {
                document.getElementById("altitude").innerHTML = "<strong>" + trans.Altitude + "</strong> " + Math.floor(data.elevations[0].elevation) + trans.Meters;
            } else {
                document.getElementById("altitude").innerHTML = trans.NoResult;
            }
        },
        error: function (xhr, err) {
            document.getElementById("altitude").innerHTML = trans.ElevationFailure;
        },
    });
}
function ddversdms() {
    var lat, lng, latdeg, latmin, latsec, lngdeg, lngmin, lngsec;
    lat = parseFloat(document.getElementById("latitude").value) || 0;
    lng = parseFloat(document.getElementById("longitude").value) || 0;
    if (lat >= 0) document.getElementById("nord").checked = true;
    if (lat < 0) document.getElementById("sud").checked = true;
    if (lng >= 0) document.getElementById("est").checked = true;
    if (lng < 0) document.getElementById("ouest").checked = true;
    lat = Math.abs(lat);
    lng = Math.abs(lng);
    latdeg = Math.floor(lat);
    latmin = Math.floor((lat - latdeg) * 60);
    latsec = Math.round((lat - latdeg - latmin / 60) * 1e3 * 3600) / 1e3;
    lngdeg = Math.floor(lng);
    lngmin = Math.floor((lng - lngdeg) * 60);
    lngsec = Math.floor((lng - lngdeg - lngmin / 60) * 1e3 * 3600) / 1e3;
    document.getElementById("latitude_degres").value = latdeg;
    document.getElementById("latitude_minutes").value = latmin;
    document.getElementById("latitude_secondes").value = latsec;
    document.getElementById("longitude_degres").value = lngdeg;
    document.getElementById("longitude_minutes").value = lngmin;
    document.getElementById("longitude_secondes").value = lngsec;
}
function dmsversdd() {
    var lat, lng, nordsud, estouest, latitude_degres, latitude_minutes, latitude_secondes, longitude_degres, longitude_minutes, longitude_secondes;
    if (document.getElementById("sud").checked) nordsud = -1;
    else nordsud = 1;
    if (document.getElementById("ouest").checked) estouest = -1;
    else estouest = 1;
    latitude_degres = parseFloat(document.getElementById("latitude_degres").value) || 0;
    latitude_minutes = parseFloat(document.getElementById("latitude_minutes").value) || 0;
    latitude_secondes = parseFloat(document.getElementById("latitude_secondes").value) || 0;
    longitude_degres = parseFloat(document.getElementById("longitude_degres").value) || 0;
    longitude_minutes = parseFloat(document.getElementById("longitude_minutes").value) || 0;
    longitude_secondes = parseFloat(document.getElementById("longitude_secondes").value) || 0;
    lat = nordsud * (latitude_degres + latitude_minutes / 60 + latitude_secondes / 3600);
    lng = estouest * (longitude_degres + longitude_minutes / 60 + longitude_secondes / 3600);
    document.getElementById("latitude").value = Math.round(lat * 1e7) / 1e7;
    document.getElementById("longitude").value = lng;
    setTimeout(codeLatLng(2), 1e3);
}
function infowindowContent(text, latres, lngres) {
    return (
        "<strong>" +
        trans.Latitude +
        "</strong> " +
        Math.round(latres * 1e6) / 1e6 +
        " | <strong>" +
        trans.Longitude +
        "</strong> " +
        Math.round(lngres * 1e6) / 1e6 +
        '<br/><br/><span id="altitude"><button type="button" class="btn btn-primary" onclick="getElevation()">' +
        trans.GetAltitude +
        "</button></span>" +
        bookmark()
    );
}
function defaultMap() {
    var span = new mapkit.CoordinateSpan(0.2, 0.2);
    var region = new mapkit.CoordinateRegion(defaultLatLng, span);
    map = new mapkit.Map("map_canvas", { region: region });
    mapLoaded = 1;
    bookUp(trans.DefaultAddress, trans.DefaultLat, trans.DefaultLng);
    annotation = new mapkit.MarkerAnnotation(defaultLatLng, { callout: landmarkAnnotationCallout, selected: true, color: "#f0603f" });
    annotation.address = trans.DefaultAddress;
    annotation.lat = trans.DefaultLat;
    annotation.lng = trans.DefaultLng;
    map.addAnnotation(annotation);
    document.getElementById("latitude").value = defaultLatLng.latitude;
    document.getElementById("longitude").value = defaultLatLng.longitude;
    document.getElementById("latlong").value = defaultLatLng.latitude + "," + defaultLatLng.longitude;
    document.getElementById("address").value = trans.DefaultAddress;
    ddversdms();
}
$(document).ready(function () {
    $("#address").keydown(function (e) {
        fromPlace = 0;
    });
    $("#map_canvas").appear();
    $("#address").blur(function (e) {
        setTimeout(function () {
            $("#results").hide();
        }, 100);
    });
    $(document.body).one("appear", "#map_canvas", function (e, $affected) {
        appeared = 1;
        initializeMap();
    });
    $("#address").keyup(function () {
        var newAddressLength = $("#address").val().length;
        if (newAddressLength > trans.AutocompleteTrigger) {
            autoCount++;
        }
        if (newAddressLength > addressLength && autoCount < trans.AutoCountLimit) {
            addressLength = newAddressLength;
            if (addressLength > trans.AutocompleteTrigger && isGoodQuery(this.value) && mapLoaded == 1) {
                var search = new mapkit.Search({});
                var addressVal = $("#address").val();
                search.autocomplete(addressVal, function (error, data) {
                    if (error) {
                        return;
                    }
                    $("#results").show();
                    var results = "";
                    if (data.results.length == 0) {
                        badQueries.push($("#address").val());
                    }
                    data.results.forEach(function (result) {
                        if (result.coordinate) {
                            results =
                                results +
                                '<div class="mapSearchResultsItem" data-title="' +
                                result.displayLines[0] +
                                '" data-latitude="' +
                                result.coordinate.latitude +
                                '" data-longitude="' +
                                result.coordinate.longitude +
                                '" data-address="' +
                                result.displayLines[0] +
                                ", " +
                                result.displayLines[1] +
                                '"><b>' +
                                result.displayLines[0] +
                                "</b> " +
                                result.displayLines[1] +
                                "</div>";
                        }
                    });
                    $("#results").html(results);
                    $(".mapSearchResultsItem").click(function () {
                        var latitude = $(this).data("latitude");
                        var longitude = $(this).data("longitude");
                        var title = $(this).data("title");
                        var address = $(this).data("address");
                        fromPlace = 1;
                        locationFromPlace = new mapkit.Coordinate(latitude, longitude);
                        addressFromPlace = address;
                        codeAddress();
                        $("#results").hide();
                    });
                });
            } else {
                $("#results").hide();
            }
        } else {
            addressLength = newAddressLength;
            $("#results").hide();
        }
    });
});