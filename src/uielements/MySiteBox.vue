<template>
    <div class="box hospital-box">
        <article class="media">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img src="/myassets/images/common/hospital.png" alt="Image">
                </figure>
            </div>
            <div class="media-content">
                <div class="content hospital-name">
                    <h4>
                        <a @click.prevent="updateMapData(hospitalInfo)">
                            {{ hospitalInfo.properties.name }}
                        </a>&nbsp&nbsp&nbsp
                      <button v-on:click="selectSite()" style="color: #a7292e">详细</button>
                    </h4>
                    <p><strong>地区:</strong>{{ hospitalInfo.properties.city }}{{ hospitalInfo.properties.district }}</p>
                    <p class="tooltip"><strong>地址:</strong>{{ hospitalInfo.properties.address | addressFilter }}
                        <span class="tooltiptext tooltip-top"
                              v-if="hospitalInfo.properties.address.length > 12">
                            {{ hospitalInfo.properties.address }}
                        </span>
                    </p>
                    <p><strong>状态:</strong>{{ hospitalInfo.properties.phone | phoneFilter}}</p>

                </div>
            </div>
        </article>
    </div>
<!--  <div class="box hospital-box">-->
<!--    <article class="media">-->
<!--      <div class="media-left">-->
<!--&lt;!&ndash;        <figure class="image is-64x64">&ndash;&gt;-->
<!--&lt;!&ndash;          <img src="/myassets/images/common/hospital.png" alt="Image">&ndash;&gt;-->
<!--&lt;!&ndash;        </figure>&ndash;&gt;-->
<!--      </div>-->
<!--      <div class="media-content">-->
<!--        <div class="content hospital-name">-->
<!--          <h4>-->
<!--            <a @click.prevent="updateMapData(hospitalInfo)">-->
<!--              {{ hospitalInfo.properties.name }}-->
<!--            </a>&nbsp&nbsp&nbsp-->
<!--            <button v-on:click="selectSite()" style="color: #a7292e">详细</button>-->
<!--          </h4>-->
<!--          <p><strong>地区:</strong>{{ hospitalInfo.properties.city }}{{ hospitalInfo.properties.district }}</p>-->
<!--          <p class="tooltip"><strong>地址:</strong>{{ hospitalInfo.properties.address | addressFilter }}-->
<!--            <span class="tooltiptext tooltip-top"-->
<!--                  v-if="hospitalInfo.properties.address.length > 12">-->
<!--                            {{ hospitalInfo.properties.address }}-->
<!--                        </span>-->
<!--          </p>-->
<!--          <p><strong>电话:</strong>{{ hospitalInfo.properties.phone | phoneFilter}}</p>-->

<!--        </div>-->
<!--      </div>-->
<!--    </article>-->
<!--  </div>-->
</template>

<script>
    import Vue from 'vue'

    Vue.filter('addressFilter', (value) => {
        let max_length = 12;
        if (typeof value === 'string') {
            if(value.length > max_length) {
                return value.substring(0, max_length) + ' ...';
            }
        }
        return value;
    });

    Vue.filter('phoneFilter', (value) => {
        if(value === "") {
            return 'N/A';
        }
        return value.split(';')[0];
    });

    export default  {
        props: [ 'hospitalInfo' ],
        methods: {
          selectSite(){
            // console.debug(this.hospitalInfo)
            this.$store.dispatch('site/setSite',{id:this.hospitalInfo.properties.id,name:this.hospitalInfo.properties.name}).catch((err)=>{
              console.info('向store提交site失败')
            })
          },
            updateMapData(data) {
                // update map data, need geojson format
                let map_data = {
                    type: 'FeatureCollection',
                    features: []
                }
                map_data.features.push(data);
                this.$bus.$emit('map-data-update', map_data);
            }
        }
    }
</script>

<style>
    .hospital-box {
        padding: 10px 5px;
        border-radius: 1px;
    }

    .hospital-box:not(:last-child) {
        margin-bottom: 15px;
    }

    .hospital-box .content p {
        margin-bottom: 2px;
        font-size: 12px;
    }
    .hospital-box .content strong {
        color: #69707a;
        margin-right: 10px;
    }

    .hospital-box i {
        color: #C64742;
    }

    .hospital-box .content h4 {
        margin-bottom: 10px;
    }

    .hospital-name h4 {
        font-size: 14px;
        font-weight: 700;
    }

    .hospital-name a {
        color: #222324;
    }

    .hospital-name a:not(.button):visited {
        color: #222324;
    }

    .hospital-name a:not(.button) {
        border-bottom: none;
    }

    /* http://www.w3schools.com/css/css_tooltip.asp */
    .tooltip {
        display: inline-block;
        position: relative;
        /*cursor: zoom-in;*/
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        position: absolute;
        width: 200px;
        background-color: #42afe3;
        color: #fff;
        text-align: center;
        padding: 5px;
        border-radius: 1px;
        z-index: 1;
        opacity: 0;
        font-size: 14px;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 0.9;
        transition-delay: 0.8s;
    }

    .tooltip-top {
        bottom: 125%;
        left: 50%;
        margin-left: -100px;
    }

    .tooltip-top::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #42afe3 transparent transparent transparent;
    }

</style>
