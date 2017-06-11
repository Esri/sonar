const _datasets = {
  "trash": {
    "url": "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Public_Service_WebMercator/MapServer/13",
    "distance": 1,
    "template": "Trash pickup is coming up on {DAY_}"
  },
  "crime": {
    "url": "https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/8",
    "distance": 200,
    "template": "The most recent crime was {OFFENSE}"
  },
  "anc": {
    "url": "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/1",
    "distance": 1,
    "template": "The ANC is {NAME}"
  },
  "bus stops": {
    "url": "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Transportation_WebMercator/MapServer/53",
    "distance": 200,
    "template": "The nearest stop is at {BSTP_MSG_TEXT}"
  },
  "notes": {
    "url": "https://services.arcgis.com/bkrWlSKcjUDFDtgw/ArcGIS/rest/services/SonarComments/FeatureServer/0",
    "distance": 200,
    "template": "The nearest notes is {Comments} at {Location}"
  }
}
//
// function get(dataset) {
//       return _datasets[dataset.toLowerCase()];
// }
// function list() {
//       return _datasets;
// }


module.exports = function datasets(dataset) {
  return _datasets[dataset.toLowerCase()]
}
