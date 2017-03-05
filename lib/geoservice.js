var request = require('request-promise')
var qs = require('querystring')
const portalUrl = "https://www.arcgis.com/sharing/rest/";

function buildLayer(name, fields) {
  return {
    "adminLayerInfo": {
      "geometryField": {
        "name": "Shape",
        "srid": 4326
      }
    },
    "name": name,
    "type": "Feature Layer",
    "displayField": "",
    "description": "",
    "copyrightText": "",
    "defaultVisibility": true,
    "relationships": [

    ],
    "isDataVersioned": false,
    "supportsRollbackOnFailureParameter": true,
    "supportsAdvancedQueries": true,
    "geometryType": "esriGeometryPoint",
    "minScale": 0,
    "maxScale": 0,
    "extent": {
      "type": "extent",
      "xmin": -8591193.021457616,
      "ymin": 4686637.938322677,
      "xmax": -8560023.564035526,
      "ymax": 4726686.262985074,
      "spatialReference": {
        "wkid": 102100
      }
    },
    "drawingInfo": {
      "transparency": 0,
      "labelingInfo": null,
      "renderer": {
        "type": "simple",
        "symbol": {
          "color": [
            20,
            158,
            206,
            130
          ],
          "size": 18,
          "angle": 0,
          "xoffset": 0,
          "yoffset": 0,
          "type": "esriSMS",
          "style": "esriSMSCircle",
          "outline": {
            "color": [
              255,
              255,
              255,
              220
            ],
            "width": 2.25,
            "type": "esriSLS",
            "style": "esriSLSSolid"
          }
        }
      }
    },
    "allowGeometryUpdates": true,
    "hasAttachments": true,
    "htmlPopupType": "esriServerHTMLPopupTypenull",
    "hasM": false,
    "hasZ": false,
    "objectIdField": "OBJECTID",
    "globalIdField": "",
    "typeIdField": "",
    "fields": fields,
    "indexes": [

    ],
    "types": [

    ],
    "templates": [
      {
        "name": "New Feature",
        "description": "",
        "drawingTool": "esriFeatureEditToolPoint",
        "prototype": {
          "attributes": {
            "Name": null,
            "Integer": 0,
            "Date": "2016-12-22T02:34:51.768Z"
          }
        }
      }
    ],
    "supportedQueryFormats": "JSON",
    "hasStaticData": false,
    "maxRecordCount": 1000,
    "capabilities": "Query,Editing,Create,Update,Delete"
  }
}

function createService(inputs) {
  var path = "content/users/"+inputs.username+"/createService";
  var params = {
    "outputType": "featureService",
    "createParameters": JSON.stringify({'name':name}),
    "f":"json",
    "token": inputs.token
  }
  // returns
  // { encodedServiceURL: 'http://services.arcgis.com/{org_key}/arcgis/rest/services/SonarTest/FeatureServer',
  // itemId: 'ba3e6b4b66e4429680f02758259',
  // name: 'SonarTest',
  // serviceItemId: 'ba3e6b4b66e4429680f02758259',
  // serviceurl: 'http://services.arcgis.com/{org_key}/arcgis/rest/services/SonarTest/FeatureServer',
  // size: -1,
  // success: true,
  // type: 'Feature Service',
  // isView: false }
  return request({ method: 'post', qs: params, uri: portalUrl + path, json: true});
}

// Convert Service URL into Service Admin URL
// from: http://services.arcgis.com/{org_key}/arcgis/rest/services/{ServiceName}/FeatureServer
// into: http://services.arcgis.com/{org_key}/arcgis/rest/admin/services/{ServiceName}/FeatureServer/addToDefinition
function getServiceAdminUrl(serviceUrl) {
  return serviceUrl.replace(/rest\/services/, 'rest/admin/services')

}
function createLayer(inputs) {
  var url = getServiceAdminUrl(inputs.serviceUrl);
  var params = {
    "async": "false",
    "f":"json",
    "token": inputs.token
  }
  var fields = [{
    "name": "OBJECTID",
    "alias": "OBJECTID",
    "type": "esriFieldTypeOID",
    "sqlType": "sqlTypeOther",
    "nullable": false,
    "editable": false,
    "domain": null,
    "defaultValue": null
  },{
    "name": "ExampleSField",
    "alias": "An Example String Field",
    "nullable": true,
    "editable": true,
    "domain": null,
    "defaultValue": null,
    "type": "esriFieldTypeString",
    "sqlType": "sqlTypeNVarchar",
    "length": 256
  },{
    "name": "ExampleDField",
    "alias": "An Example Double Field",
    "nullable": true,
    "editable": true,
    "domain": null,
    "defaultValue": null,
    "type": "esriFieldTypeDouble",
    "sqlType": "sqlTypeNVarchar",
    "length": 256
  }]
  var layerDefinition = buildLayer(inputs.name, fields)
  params.addToDefinition = JSON.stringify({layers: [layerDefinition]});

  console.log("createLayer url", url)
  console.log("createLayer", params)
  return request({ method: 'post', qs: params, uri: url, json: true});

}

function create(inputs) {
  return createService.then(function(serviceResponse) {
    inputs.serviceUrl = serviceResponse.serviceUrl;
    return createLayer(inputs)
  })
}

function query(url, geometry, distance) {
  var params = {
    "outFields": "*",
    "geometryType":"esriGeometryPoint",
    "geometry": geometry,
    "inSR":4326,
    "f": "json",
    "distance": distance,
    "units": "esriSRUnit_Meter"
    };
  return request({ method: 'get', url:url + "/query?" + qs.stringify(params), json: true});
}

function metadata(url) {
  var params = { "f": "json" };
  return request({ method: 'get', qs: params, url:url, json: true});
}

// layerUrl
// token
// adds
function modifyFeatures(inputs) {
 var params = {
   "f": "json",
   "token": inputs.token
 };
 if(inputs.layerUrl !== undefined) {
   inputs.serviceUrl = inputs.layerUrl.replace(/Server\/[\d+]/,'Server')
 }
 var url = inputs.serviceUrl + '/applyEdits';
 var edits = inputs.edits
 edits.id = "0"
 params.edits = JSON.stringify([edits])

 console.log("modifyFeatures url", url)
 console.log("modifyFeatures", params)

 return request({ method: 'post', qs: params, uri: url, json: true});
}

module.exports = {create, query, modifyFeatures, metadata, createService, createLayer}
