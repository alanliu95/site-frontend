<template>
    <div id="site-map"></div>
</template>

<script>
    import Leaflet from 'leaflet'
    import markerClusterGroup from 'leaflet.markercluster'
    import mapProvider from '../../../utilities/leaflet.MapProviders.js'
    import easyButton from  '../../../utilities/leaflet.EasyButton.vue'

    // const MAP_IMAGE_PATH = "//cdn.bootcss.com/leaflet/1.0.0-rc.2/images/";
    //map icon img根路径
    const MAP_IMAGE_PATH = "/myassets/images/leaflet/";

    export default {
        // props: ['mapData'],
        data() {
            return {
                map: null,
                markers: null,
                geoJsonLayer: null,
                init_map_data: null,
                reset_btn: null,
                map_config: {
                    zoom: 4,
                    center: [37.5, 106],
                    minZoom: 3,
                    maxZoom: 18,
                    attribution: "",
                },
            };
        },

        mounted() {
            this.initMap();
            this.addMapLayer();
            this.addMapBtn();
          this.init_map_data = {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {
                  "name": "安顺阳光妇科医院",
                  "district": "西秀区",
                  "phone": "",
                  "province": "贵州省",
                  "id": "1",
                  "city": "安顺市",
                  "address": "中华北路与西水路交叉口路西"
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    "105.924767",
                    "26.251054"
                  ]
                }
              }]};
          this.updateMapData(this.init_map_data);
        },

        methods: {
            initMap() {
                // need set default L.Icon.Default.imagePath
                // L.Icon.Default.imagePath = MAP_IMAGE_PATH;

                this.map = L.map("site-map",{
                    center: this.map_config.center,
                    zoom: this.map_config.zoom,
                    minZoom: this.map_config.minZoom,
                    maxZoom: this.map_config.maxZoom,
                    // scrollWheelZoom: false,
                });

                this.map.on("zoomend", (event) => {
                    if(this.reset_btn && this.map.getZoom() !== this.map_config.zoom) {
                        this.reset_btn.enable();
                    }
                })
            },

            addMapLayer() {
                L.tileLayer.mapProvider('GaoDe.Normal.Map',
                    {attribution: this.map_config.attribution}).addTo(this.map);
            },

            addMapBtn() {
                // add rest button
                this.reset_btn = L.easyButton('fa-refresh', () => {
                    this.$bus.$emit('map-data-reset');
                });
                this.reset_btn.addTo(this.map);
                this.reset_btn.disable();
            },

            addClusterLayer(geoJsonData) {
                // clear pervious layer
                if(this.markers) {
                    this.markers.clearLayers();
                }

                this.markers = L.markerClusterGroup();

                this.geoJsonLayer = L.geoJson(geoJsonData, {
                    onEachFeature: this.onEachFeature
                });

                this.markers.addLayer(this.geoJsonLayer);
                this.markers.addTo(this.map);
            },

            onEachFeature(feature, layer) {
                // layer.bindPopup(feature.properties.name);
              var html="<a href=\"#/site/basic?from=leaflet\">"+feature.properties.name+"</a>"
              layer.bindPopup(html);
            },
            updateMapData(map_data) {
                if(map_data.features.length !== 0) {
                    this.addClusterLayer(map_data);
                    this.map.fitBounds(this.markers.getBounds());
                }
            },

        }
    }
</script>

<style>
    #site-map {
        width: 100%;
        height: 510px;
    }

    /* icon style */
    #site-map .easy-button-button {
        border: none;
        border-radius: 2px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-color: #fff;
    }
    #site-map .easy-button-button .fa {
        vertical-align: 0;
        font-size: 1.3em;
    }

    @media (max-width: 768px) {
        #site-map {
            height: 300px;
        }
    }
</style>
