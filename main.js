import { csvJSON, hasLongLat } from './utils.js';

const link = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQok_7qkTOSyttT1Syl9xvKAt9bxtoksY7GSR__EE_Kb3abJIIrl2eAk6JBQE1k0w4FazZyg3WRVDXU/pub?gid=1387217632&single=true&output=tsv';
const map = L.map('map').setView([32, 35], 10);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
                    .addTo(map);

$(document).ready(function () {
    $.get(link,
        function (data) {
            var activistData = csvJSON(data);
            var filtered = activistData.filter(hasLongLat);
            var featGroup = new L.FeatureGroup();
            
            for (var pointIndex in filtered) {
                var point = filtered[pointIndex];
                var lat = point.latitude, lon = point.longitude;
                var html = '<span> <h4>' + point['Date'] + ' : ' + point['Activity Type'] + '</h4>'
                    + 'Community: ' + point['Community name'] + ' long: ' + lon + ' lat: ' + lat + ' </span>';

                var marker = L.marker([lat, lon]);
                
                marker.bindPopup(html);

                featGroup.addLayer(marker);
                
            }

            featGroup.addTo(map);
            
            map.fitBounds(featGroup.getBounds());
        }
    )
}); 