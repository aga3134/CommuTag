/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/development";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-statistic.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-statistic.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/util.js */ "./src/js/util.js");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _topbar_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./topbar.vue */ "./src/vue/topbar.vue");
/* harmony import */ var _statistic_graph_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./statistic-graph.vue */ "./src/vue/statistic-graph.vue");
/* harmony import */ var _statistic_map_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./statistic-map.vue */ "./src/vue/statistic-map.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  name: "dataset-statistic",
  components: {
    "topbar": _topbar_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    "statistic-graph": _statistic_graph_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    "statistic-map": _statistic_map_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  data: function () {
    return {
      tab: "graph",
      user: null,
      datasetID: null,
      info: null,
      imageArr: []
    };
  },
  created: function () {
    var param = _js_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].GetUrlParameter();
    this.datasetID = param.id;
    var hash = _js_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].GetUrlHash();
    if (hash.tab) this.tab = hash.tab;
    $.get("/user/info", function (result) {
      if (result.status != "ok") return;
      this.user = result.data;
    }.bind(this));
    $.get("/dataset/view-dataset?id=" + param.id, function (result) {
      if (result.status != "ok") return window.location.href = "/?message=" + encodeURIComponent("無法取得資料集資訊");
      this.info = result.data;

      if (this.info.enableGPS && !hash.tab) {
        this.tab = "map";
      }

      $.get("/dataset/list-image?all=1&dataset=" + param.id, function (result) {
        if (result.status != "ok") return window.location.href = "/?message=" + encodeURIComponent("無法取得影像資訊");
        this.imageArr = result.data;

        for (var i = 0; i < this.imageArr.length; i++) {
          var image = this.imageArr[i];
          image.url = "/static/upload/dataset/" + param.id + "/image/" + image._id + ".jpg";
        }

        this.InitTabContent();
      }.bind(this));
    }.bind(this));
  },
  methods: {
    GoToDataset: function () {
      window.location.href = "/dataset?id=" + this.datasetID;
    },
    InitTabContent: function () {
      Vue.nextTick(function () {
        window.location.hash = "#tab=" + this.tab;

        switch (this.tab) {
          case "graph":
            this.$refs.statisticGraph.SetGraphData(this.info, this.imageArr);
            break;

          case "map":
            this.$refs.statisticMap.SetGraphData(this.info, this.imageArr);
            break;
        }
      }.bind(this));
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info-filter.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-info-filter.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _location_select_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./location-select.vue */ "./src/vue/location-select.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "image-info-filter",
  props: {
    disableTag: Boolean,
    disableTime: Boolean,
    disableLocation: Boolean,
    disableRemark: Boolean,
    disableForm: Boolean,
    initFilter: Object
  },
  components: {
    "location-select": _location_select_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function () {
    return {
      dataset: null,
      imageArr: null,
      filter: {
        selectAll: true,
        tag: [],
        time: {
          min: null,
          max: null
        },
        loc: {
          enable: false,
          lat: null,
          lng: null,
          range: 50
        },
        remark: "",
        timeLimit: {
          min: null,
          max: null,
          rangeMin: 0,
          rangeMax: 0
        }
      },
      rangeTarget: null,
      filterArr: []
    };
  },
  mounted: function () {
    if (this.initFilter) {
      this.filter = Object.assign({}, this.initFilter);
    }

    Vue.nextTick(function () {
      this.UpdateRangeSelectMap();
    }.bind(this));
  },
  methods: {
    SetData: function (dataset, imageArr) {
      this.dataset = dataset;
      this.imageArr = imageArr;

      if (!this.initFilter) {
        this.InitTimeSelect();
        this.InitTagSelect();
      }

      Vue.nextTick(function () {
        this.UpdateFilterResult();
      }.bind(this));
    },
    InitTimeSelect: function () {
      if (this.disableTime) return;
      var s = spacetime.now();

      for (var i = 0; i < this.imageArr.length; i++) {
        var t = spacetime(this.imageArr[i].dataTime, s.timezone().name);

        if (!this.filter.timeLimit.min || this.filter.timeLimit.min.isAfter(t)) {
          this.filter.timeLimit.min = t.clone().last("day");
        }

        if (!this.filter.timeLimit.max || this.filter.timeLimit.max.isBefore(t)) {
          this.filter.timeLimit.max = t.clone().next("day");
        }
      }

      if (this.filter.timeLimit.min && this.filter.timeLimit.max) {
        this.filter.timeLimit.rangeMin = 0;
        this.filter.timeLimit.rangeMax = this.filter.timeLimit.min.diff(this.filter.timeLimit.max, "day") + 1;
        this.filter.time.min = this.filter.timeLimit.rangeMin;
        this.filter.time.max = this.filter.timeLimit.rangeMax;
      }
    },
    InitTagSelect: function () {
      if (this.disableTag) return;
      if (!this.dataset) return;
      this.filter.tag = [];
      this.filter.tag.push({
        name: "未標註",
        value: true
      });

      for (var i = 0; i < this.dataset.tagArr.length; i++) {
        var tag = this.dataset.tagArr[i];
        this.filter.tag.push({
          name: tag,
          value: true
        });
      }
    },
    ToggleTagSelectAll: function () {
      if (this.disableTag) return;

      for (var i = 0; i < this.filter.tag.length; i++) {
        var tagSelect = this.filter.tag[i];
        tagSelect.value = this.filter.selectAll;
      }

      this.UpdateFilterResult();
    },
    UpdateRangeSelectMap: function () {
      if (this.disableLocation) return;
      var locationSelect = this.$refs.locationSelect;
      locationSelect.range = this.filter.loc.range;

      if (this.filter.loc.enable) {
        if (!this.filter.loc.lat || !this.filter.loc.lng) {
          locationSelect.GetGPS();
        }

        locationSelect.SetRange(this.filter.loc.lat, this.filter.loc.lng, this.filter.loc.range);
      } else {
        locationSelect.RemoveMarker();
      }

      this.UpdateFilterResult();
    },

    UpdateLoc() {
      if (this.disableLocation) return;
      this.filter.loc.enable = true;
      var loc = this.$refs.locationSelect.loc;
      this.filter.loc.lat = loc.lat;
      this.filter.loc.lng = loc.lng;
      this.UpdateFilterResult();
    },

    UpdateFilterResult: function () {
      if (!this.imageArr) return;
      var filterArr = this.imageArr; //filter by tag

      if (!this.disableTag) {
        var tagHash = {};

        for (var i = 0; i < this.filter.tag.length; i++) {
          var tag = this.filter.tag[i];
          tagHash[tag.name] = tag.value;
        }

        filterArr = filterArr.filter(function (d) {
          if (!d.annotation) {
            return tagHash["未標註"];
          }

          switch (this.dataset.annotationType) {
            case "image":
              var tagArr = d.annotation.annotation;

              for (var i = 0; i < tagArr.length; i++) {
                var tag = tagArr[i];
                if (tagHash[tag.name] && tag.value == "true") return true;
              }

              break;

            case "bbox":
              var bboxArr = d.annotation.annotation;

              for (var i = 0; i < bboxArr.length; i++) {
                var tag = bboxArr[i].tag;
                if (tagHash[tag]) return true;
              }

              break;
          }

          return false;
        }.bind(this));
      } //filter by time range


      if (!this.disableTime) {
        var s = spacetime.now();
        filterArr = filterArr.filter(function (d) {
          var t = spacetime(d.dataTime, s.timezone().name);
          var min = this.filter.timeLimit.min.add(this.filter.time.min, "day");
          var max = this.filter.timeLimit.min.add(this.filter.time.max, "day");
          return t.isAfter(min) && t.isBefore(max);
        }.bind(this));
      } //filter by location range


      if (!this.disableLocation) {
        if (this.filter.loc.enable) {
          filterArr = filterArr.filter(function (d) {
            var loc = this.filter.loc;
            var range = loc.range / 111;
            var latDiff = d.lat - loc.lat;
            var lngDiff = d.lng - loc.lng;
            return latDiff * latDiff + lngDiff * lngDiff <= range * range;
          }.bind(this));
        }
      } //filter by remark


      if (!this.disableRemark) {
        filterArr = filterArr.filter(function (d) {
          if (this.filter.remark == "") return true;else if (!d.remark) return false;else return d.remark.indexOf(this.filter.remark) != -1;
        }.bind(this));
      }

      this.filterArr = filterArr;
      this.$emit("update");
    }
  },
  computed: {
    minTimeLabel: function () {
      if (this.disableTime) return "";
      if (!this.filter.timeLimit.min) return "";
      var day = this.filter.timeLimit.min.add(this.filter.time.min, "day");
      return day.unixFmt("yyyy-MM-dd");
    },
    maxTimeLabel: function () {
      if (this.disableTime) return "";
      if (!this.filter.timeLimit.min) return "";
      var day = this.filter.timeLimit.min.add(this.filter.time.max, "day");
      return day.unixFmt("yyyy-MM-dd");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/location-select.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/location-select.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "location-select",
  props: {
    mode: String
  },
  components: {},
  data: function () {
    return {
      loc: null,
      status: "",
      OnGPSReady: null,
      map: null,
      locMarker: null,
      rangeMarker: null,
      range: 10
    };
  },
  mounted: function () {
    this.InitMap();
  },
  methods: {
    InitMap: function () {
      this.map = L.map(this.$refs.map).setView([23.682094, 120.7764642], 7);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
        maxZoom: 18
      }).addTo(this.map);

      switch (this.mode) {
        case "selectLoc":
          this.map.on('click', function (event) {
            var pos = event.latlng;
            this.SetPosition(pos.lat, pos.lng);
          }.bind(this));
          break;

        case "selectRange":
          this.map.on('click', function (event) {
            var pos = event.latlng;
            this.SetRange(pos.lat, pos.lng, this.range);
          }.bind(this));
          break;
      }
    },
    SetPosition: function (lat, lng) {
      if (!lat || !lng) return;
      this.loc = {
        "lat": lat,
        "lng": lng
      };
      this.status = "座標: " + lat.toFixed(5) + " " + lng.toFixed(5);

      if (this.locMarker) {
        this.locMarker.setLatLng(this.loc, {
          draggable: this.mode == "selectLoc" ? true : false
        }).bindPopup(this.status).update();
      } else {
        this.locMarker = L.marker(this.loc, {
          draggable: this.mode == "selectLoc" ? true : false
        });
        this.locMarker.on('dragend', function (event) {
          var pos = this.locMarker.getLatLng();
          this.SetPosition(pos.lat, pos.lng);
        }.bind(this));
        this.locMarker.addTo(this.map);
      }

      this.$emit("change");
    },
    SetRange: function (lat, lng, range) {
      if (!lat || !lng) return;
      this.range = range;
      this.loc = {
        "lat": lat,
        "lng": lng
      };
      this.status = "座標: " + lat.toFixed(5) + " " + lng.toFixed(5);

      if (this.rangeMarker) {
        this.rangeMarker.setLatLng(this.loc);
        this.rangeMarker.setRadius(this.range * 1000);
      } else {
        this.rangeMarker = L.circle(this.loc, {
          weight: 1,
          color: "#ff0000",
          fillColor: "#ff3333",
          fillOpacity: 0.3,
          radius: this.range * 1000
        });
        this.rangeMarker.addTo(this.map);
      }

      if (this.locMarker) {
        this.locMarker.setLatLng(this.loc, {
          draggable: this.mode == "selectRange" ? true : false
        }).bindPopup(this.status).update();
      } else {
        this.locMarker = L.marker(this.loc, {
          draggable: this.mode == "selectRange" ? true : false
        });
        this.locMarker.on('drag', function (event) {
          var pos = event.target.getLatLng();
          this.rangeMarker.setLatLng(pos);
        }.bind(this));
        this.locMarker.on('dragend', function (event) {
          var pos = this.locMarker.getLatLng();
          this.rangeMarker.setLatLng(pos);
          this.loc = {
            "lat": pos.lat,
            "lng": pos.lng
          };
          this.$emit("change");
        }.bind(this));
        this.locMarker.addTo(this.map);
      }

      this.$emit("change");
    },
    GetGPS: function () {
      this.status = "無GPS-請點選位置"; //取得gps權限

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          switch (this.mode) {
            case "selectLoc":
              this.SetPosition(position.coords.latitude, position.coords.longitude);
              break;

            case "selectRange":
              this.SetRange(position.coords.latitude, position.coords.longitude, this.range);
              break;
          }

          if (this.OnGPSReady) this.OnGPSReady();
        }.bind(this), function (err) {
          this.status = "讀取GPS失敗-請點選位置";
        }.bind(this));
      } else {
        this.status = "瀏覽器不支援GPS-請點選位置";
      }
    },
    RemoveMarker: function () {
      if (this.locMarker) {
        this.map.removeLayer(this.locMarker);
        this.locMarker = null;
      }

      if (this.rangeMarker) {
        this.map.removeLayer(this.rangeMarker);
        this.rangeMarker = null;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-graph.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/statistic-graph.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/util.js */ "./src/js/util.js");
/* harmony import */ var _image_info_filter_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-info-filter.vue */ "./src/vue/image-info-filter.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "statistic-graph",
  props: {},
  components: {
    "image-info-filter": _image_info_filter_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function () {
    return {
      dataset: null,
      imageArr: [],
      tagFilter: {
        arr: [],
        open: false,
        filter: null
      },
      timelineFilter: {
        type: "time",
        arr: [],
        open: false,
        filter: null
      },
      typeOption: [{
        label: "時間分佈",
        value: "time"
      }, {
        label: "小時變化",
        value: "hour"
      }, {
        label: "月份變化",
        value: "month"
      }]
    };
  },
  mounted: function () {},
  methods: {
    SetGraphData: function (dataset, imageArr) {
      this.dataset = dataset;
      this.imageArr = imageArr;
      this.tagFilter.arr = imageArr;
      this.timelineFilter.arr = imageArr;
      Vue.nextTick(function () {
        this.UpdateGraph();
      }.bind(this));
    },
    UpdateTagFilterResult: function () {
      var ref = this.$refs.tagFilter;
      this.tagFilter.filter = ref.filter;
      this.tagFilter.arr = ref.filterArr;
      this.UpdateGraphTag();
    },
    UpdateTimelineFilterResult: function () {
      var ref = this.$refs.timelineFilter;
      this.timelineFilter.filter = Object.assign({
        "type": this.timelineFilter.type
      }, ref.filter);
      this.timelineFilter.arr = ref.filterArr;
      this.UpdateGraphTimeline();
    },
    UpdateGraph: function () {
      this.UpdateGraphTag();
      this.UpdateGraphTimeline();
      this.UpdateGraphUploadRank();
      this.UpdateGraphAgreeRate();
      this.UpdateGraphAnnotateRank();
      this.UpdateGraphVerifyRank();
    },
    UpdateGraphTag: function () {
      var filterArr = this.tagFilter.arr;
      var data = {};

      switch (this.dataset.annotationType) {
        case "image":
          for (var i = 0; i < filterArr.length; i++) {
            var d = filterArr[i];
            var tagArr = [];
            if (!d.annotation) tagArr = ["未標註"];else {
              for (var j = 0; j < d.annotation.annotation.length; j++) {
                var tag = d.annotation.annotation[j];
                if (tag.value == "true") tagArr.push(tag.name);
              }
            }

            for (var j = 0; j < tagArr.length; j++) {
              var tag = tagArr[j];

              if (!data[tag]) {
                data[tag] = {
                  name: tag,
                  value: 1
                };
              } else {
                data[tag].value++;
              }
            }
          }

          break;

        case "bbox":
          for (var i = 0; i < filterArr.length; i++) {
            var d = filterArr[i];
            var bboxArr = [];
            if (!d.annotation) bboxArr = [{
              tag: "未標註"
            }];else bboxArr = d.annotation.annotation;

            for (var j = 0; j < bboxArr.length; j++) {
              var tag = bboxArr[j].tag;

              if (!data[tag]) {
                data[tag] = {
                  name: tag,
                  value: 1
                };
              } else {
                data[tag].value++;
              }
            }
          }

          break;
      }

      var tagArr = Object.keys(data).sort(function (a, b) {
        return data[a].value - data[b].value;
      });

      if (tagArr.length == 0) {
        return Plotly.purge(this.$refs.tagRatio);
      }

      var trace = {
        values: tagArr.map(function (d) {
          return data[d].value;
        }),
        labels: tagArr,
        type: "pie"
      };
      var layout = {
        paper_bgcolor: 'rgba(250,250,250,1)',
        plot_bgcolor: 'rgba(250,250,250,1)',
        margin: {
          l: 40,
          r: 40,
          b: 40,
          t: 40
        }
      };
      Plotly.newPlot(this.$refs.tagRatio, [trace], layout, {
        displayModeBar: false
      });
    },
    UpdateGraphTimeline: function () {
      var filter = this.timelineFilter;
      var filterArr = this.timelineFilter.arr;
      var tz = spacetime().name;
      var data = {};
      var format = "";
      var axisX = {
        fixedrange: true
      };

      switch (filter.type) {
        case "time":
          format = "yyyy-MM-dd";
          axisX.tickformat = "%Y-%m-%d";
          break;

        case "hour":
          format = "HH";
          axisX.title = "小時變化";
          axisX.tickformat = ".0f";
          break;

        case "month":
          format = "MM";
          axisX.title = "月份變化";
          axisX.tickformat = ".0f";
          break;
      }

      switch (this.dataset.annotationType) {
        case "image":
          for (var i = 0; i < filterArr.length; i++) {
            var d = filterArr[i];
            var tagArr = [];
            if (!d.annotation) tagArr = ["未標註"];else {
              for (var j = 0; j < d.annotation.annotation.length; j++) {
                var tag = d.annotation.annotation[j];
                if (tag.value == "true") tagArr.push(tag.name);
              }
            }
            var t = spacetime(d.dataTime).goto(tz);
            var tStr = t.unixFmt(format);

            for (var j = 0; j < tagArr.length; j++) {
              var tag = tagArr[j];
              if (!data[tag]) data[tag] = {};

              if (!data[tag][tStr]) {
                data[tag][tStr] = {
                  key: tStr,
                  value: 1
                };
              } else {
                data[tag][tStr].value++;
              }
            }
          }

          break;

        case "bbox":
          for (var i = 0; i < filterArr.length; i++) {
            var d = filterArr[i];
            var bboxArr = [];
            if (!d.annotation) bboxArr = [{
              tag: "未標註"
            }];else bboxArr = d.annotation.annotation;
            var t = spacetime(d.dataTime).goto(tz);
            var tStr = t.unixFmt(format);

            for (var j = 0; j < bboxArr.length; j++) {
              var tag = bboxArr[j].tag;
              if (!data[tag]) data[tag] = {};

              if (!data[tag][tStr]) {
                data[tag][tStr] = {
                  key: tStr,
                  value: 1
                };
              } else {
                data[tag][tStr].value++;
              }
            }
          }

          break;
      } //fill zero to timestamp with no data


      var s = spacetime.now();
      var tMin, tMax;

      for (var i = 0; i < filterArr.length; i++) {
        var t = spacetime(filterArr[i].dataTime, s.timezone().name);

        if (!tMin || tMin.isAfter(t)) {
          tMin = t.clone().last("day");
        }

        if (!tMax || tMax.isBefore(t)) {
          tMax = t.clone().next("day");
        }
      }

      for (var tag in data) {
        switch (filter.type) {
          case "time":
            var day = tMin;

            while (day.isBefore(tMax)) {
              var key = day.unixFmt(format);

              if (!data[tag][key]) {
                data[tag][key] = {
                  key: key,
                  value: 0
                };
              }

              day = day.add(1, "day");
            }

            break;

          case "hour":
            for (var i = 0; i < 24; i++) {
              var key = _js_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].PadLeft(i, 2);

              if (!data[tag][key]) {
                data[tag][key] = {
                  key: key,
                  value: 0
                };
              }
            }

            break;

          case "month":
            for (var i = 1; i <= 12; i++) {
              var key = _js_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].PadLeft(i, 2);

              if (!data[tag][key]) {
                data[tag][key] = {
                  key: key,
                  value: 0
                };
              }
            }

            break;
        }
      }

      var tagArr = Object.keys(data);

      if (tagArr.length == 0) {
        return Plotly.purge(this.$refs.timeline);
      }

      var traceArr = [];

      for (var i = 0; i < tagArr.length; i++) {
        var tagData = data[tagArr[i]];
        var time = Object.keys(tagData).sort(function (a, b) {
          if (a < b) return -1;else if (a > b) return 1;else return 0;
        });
        var trace = {
          x: time,
          y: time.map(function (t) {
            return tagData[t].value;
          }),
          name: tagArr[i],
          type: "scatter"
        };
        traceArr.push(trace);
      }

      var layout = {
        hovermode: "closest",
        xaxis: axisX,
        yaxis: {
          fixedrange: true,
          title: "標籤數"
        },
        paper_bgcolor: 'rgba(250,250,250,1)',
        plot_bgcolor: 'rgba(250,250,250,1)',
        margin: {
          l: 60,
          r: 40,
          b: 60,
          t: 40
        }
      };
      Plotly.newPlot(this.$refs.timeline, traceArr, layout, {
        displayModeBar: false
      });
    },
    UpdateGraphAgreeRate: function () {
      var data = [];

      for (var i = 0; i <= 1; i += 0.1) {
        data.push({
          x: i,
          y: 0
        });
      }

      for (var i = 0; i < this.imageArr.length; i++) {
        var image = this.imageArr[i];

        if (image.verification.length > 0) {
          var rate = 0.0;

          for (var j = 0; j < image.verification.length; j++) {
            if (image.verification[j].agree == "1") {
              rate += 1;
            }
          }

          rate = rate / image.verification.length;
          var bin = parseInt(rate * 10);
          data[bin].y++;
        }
      }

      var trace = {
        type: "bar",
        x: data.map(function (d) {
          return d.x;
        }),
        y: data.map(function (d) {
          return d.y;
        })
      };
      var layout = {
        xaxis: {
          tickformat: '%',
          fixedrange: true,
          title: "認同率"
        },
        yaxis: {
          fixedrange: true,
          title: "影像數"
        },
        paper_bgcolor: 'rgba(250,250,250,1)',
        plot_bgcolor: 'rgba(250,250,250,1)',
        margin: {
          l: 80,
          r: 40,
          b: 80,
          t: 40
        }
      };
      Plotly.newPlot(this.$refs.agreeRate, [trace], layout, {
        displayModeBar: false
      });
    },
    UpdateGraphUploadRank: function () {
      var data = {};

      for (var i = 0; i < this.imageArr.length; i++) {
        var image = this.imageArr[i];
        if (!image.uploader || image.uploadFrom != "user") continue;

        if (!data[image.uploader]) {
          data[image.uploader] = {
            value: 1
          };
        } else {
          data[image.uploader].value++;
        }
      }

      var idArr = Object.keys(data).sort(function (a, b) {
        return data[a].value - data[b].value;
      }).slice(0, 10);
      $.get("/user/list-name?id=" + idArr.join(","), function (result) {
        if (result.status != "ok") return;

        for (var i = 0; i < result.data.length; i++) {
          var d = result.data[i];
          data[d._id].name = d.name;
        }

        var trace = {
          type: "bar",
          x: idArr.map(function (key) {
            return data[key].value;
          }),
          y: idArr.map(function (key) {
            return data[key].name;
          }),
          orientation: "h"
        };
        var layout = {
          xaxis: {
            fixedrange: true,
            title: "影像數"
          },
          yaxis: {
            fixedrange: true,
            title: ""
          },
          paper_bgcolor: 'rgba(250,250,250,1)',
          plot_bgcolor: 'rgba(250,250,250,1)',
          margin: {
            l: 80,
            r: 40,
            b: 80,
            t: 40
          }
        };
        Plotly.newPlot(this.$refs.uploadRank, [trace], layout, {
          displayModeBar: false
        });
      }.bind(this));
    },
    UpdateGraphAnnotateRank: function () {
      var data = {};

      for (var i = 0; i < this.imageArr.length; i++) {
        var image = this.imageArr[i];

        if (image.annotation) {
          var id = image.annotation.user;

          if (!data[id]) {
            data[id] = {
              value: 1
            };
          } else {
            data[id].value++;
          }
        }
      }

      var idArr = Object.keys(data).sort(function (a, b) {
        return data[a].value - data[b].value;
      }).slice(0, 10);
      $.get("/user/list-name?id=" + idArr.join(","), function (result) {
        if (result.status != "ok") return;

        for (var i = 0; i < result.data.length; i++) {
          var d = result.data[i];
          data[d._id].name = d.name;
        }

        var trace = {
          type: "bar",
          x: idArr.map(function (key) {
            return data[key].value;
          }),
          y: idArr.map(function (key) {
            return data[key].name;
          }),
          orientation: "h"
        };
        var layout = {
          xaxis: {
            fixedrange: true,
            title: "影像數"
          },
          yaxis: {
            fixedrange: true,
            title: ""
          },
          paper_bgcolor: 'rgba(250,250,250,1)',
          plot_bgcolor: 'rgba(250,250,250,1)',
          margin: {
            l: 80,
            r: 40,
            b: 80,
            t: 40
          }
        };
        Plotly.newPlot(this.$refs.annotateRank, [trace], layout, {
          displayModeBar: false
        });
      }.bind(this));
    },
    UpdateGraphVerifyRank: function () {
      var data = {};

      for (var i = 0; i < this.imageArr.length; i++) {
        var image = this.imageArr[i];

        if (image.verification.length > 0) {
          for (var j = 0; j < image.verification.length; j++) {
            var id = image.verification[j].user;

            if (!data[id]) {
              data[id] = {
                value: 1
              };
            } else {
              data[id].value++;
            }
          }
        }
      }

      var idArr = Object.keys(data).sort(function (a, b) {
        return data[a].value - data[b].value;
      }).slice(0, 10);
      $.get("/user/list-name?id=" + idArr.join(","), function (result) {
        if (result.status != "ok") return;

        for (var i = 0; i < result.data.length; i++) {
          var d = result.data[i];
          data[d._id].name = d.name;
        }

        var trace = {
          type: "bar",
          x: idArr.map(function (key) {
            return data[key].value;
          }),
          y: idArr.map(function (key) {
            return data[key].name;
          }),
          orientation: "h"
        };
        var layout = {
          xaxis: {
            fixedrange: true,
            title: "影像數"
          },
          yaxis: {
            fixedrange: true,
            title: ""
          },
          paper_bgcolor: 'rgba(250,250,250,1)',
          plot_bgcolor: 'rgba(250,250,250,1)',
          margin: {
            l: 80,
            r: 40,
            b: 80,
            t: 40
          }
        };
        Plotly.newPlot(this.$refs.verifyRank, [trace], layout, {
          displayModeBar: false
        });
      }.bind(this));
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-map.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/statistic-map.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_info_filter_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-info-filter.vue */ "./src/vue/image-info-filter.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "statistic-map",
  props: {},
  components: {
    "image-info-filter": _image_info_filter_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function () {
    return {
      openFilterPanel: false,
      markerGroup: null,
      dataset: null,
      imageArr: [],
      filterArr: [],
      curFilter: null
    };
  },
  created: function () {
    Vue.nextTick(function () {
      this.InitMap();
    }.bind(this));
  },
  methods: {
    InitMap: function () {
      this.map = L.map(this.$refs.map).setView([23.682094, 120.7764642], 7);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
        maxZoom: 18
      }).addTo(this.map);
      this.markerGroup = L.markerClusterGroup();
      this.map.addLayer(this.markerGroup);
    },
    SetGraphData: function (dataset, imageArr) {
      this.dataset = dataset;
      this.imageArr = imageArr;
      this.filterArr = imageArr;
      Vue.nextTick(function () {
        this.UpdateMap();
      }.bind(this));
    },
    OpenFilterPanel: function () {
      this.openFilterPanel = true;
      Vue.nextTick(function () {
        this.$refs.imageInfoFilter.SetData(this.dataset, this.imageArr);
      }.bind(this));
    },
    UpdateFilterResult: function () {
      var filter = this.$refs.imageInfoFilter;
      this.curFilter = filter.filter;
      this.filterArr = filter.filterArr;
      this.UpdateMap();
    },
    UpdateMap: function () {
      this.ClearMarker();
      var filterArr = this.filterArr;

      for (var i = 0; i < filterArr.length; i++) {
        var d = filterArr[i];
        if (!d.lat || !d.lng) continue;
        var tagInfo = "";

        if (!d.annotation) {
          tagInfo = "未標註";
        } else {
          switch (this.dataset.annotationType) {
            case "image":
              tagInfo = "";
              var tagArr = d.annotation.annotation;

              for (var j = 0; j < tagArr.length; j++) {
                var tag = tagArr[j];

                if (tag.value == "true") {
                  tagInfo += "#" + tag.name + " ";
                }
              }

              break;

            case "bbox":
              var bboxArr = d.annotation.annotation;
              var info = {};

              for (var j = 0; j < bboxArr.length; j++) {
                var tag = bboxArr[j].tag;
                if (!info[tag]) info[tag] = 1;else info[tag]++;
              }

              tagInfo = Object.keys(info).map(function (key) {
                return key + ":" + info[key];
              }).join("<br>");
              break;
          }
        }

        if (d.remark) tagInfo += "<pre>" + d.remark + "</pre>";
        var content = "";
        var tz = spacetime().name;
        var t = spacetime(d.dataTime).goto(tz);
        t = t.subtract(t.minute() % 10, "minute");

        switch (this.dataset.externalLink) {
          case "riverlog":
            var link = "https://riverlog.lass-net.org/";
            link += "#year=" + t.year();
            link += "&date=" + t.unixFmt("MM-dd");
            link += "&time=" + t.unixFmt("HH:mm");
            link += "&lat=" + d.lat;
            link += "&lng=" + d.lng;
            link += "&zoom=12";
            content += "<div class='popup-bt' onclick=\"window.open('" + link + "','_blank');\">前往山河事件簿</div>";
            break;

          case "purbao":
            var link = "https://purbao.lass-net.org/";
            link += "?year=" + t.year();
            link += "&date=" + t.unixFmt("M/d");
            link += "&lat=" + d.lat;
            link += "&lng=" + d.lng;
            link += "&zoom=12";
            content += "<div class='popup-bt'  onclick=\"window.open('" + link + "','_blank');\">前往紫豹在哪裡</div>";
            break;
        }

        content += "<img src='" + d.url + "' class='popup-image' />";
        content += "<div class='popup-info'>" + tagInfo + "</div>";
        var marker = L.marker({
          lat: d.lat,
          lng: d.lng
        }).bindPopup(content);
        this.markerGroup.addLayer(marker);
      }
    },
    ClearMarker: function () {
      this.markerGroup.clearLayers();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/topbar.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/topbar.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "topbar",
  props: {
    user: Object,
    "useMenu": Boolean
  },
  data: function () {
    return {
      title: "",
      logo: "/static/image/logo.png"
    };
  },
  created: function () {
    $.get("/site-info", function (result) {
      if (result.status != "ok") return;
      this.title = result.data.title;
      this.logo = result.data.logo;
    }.bind(this));
  },
  methods: {
    ToggleMenu: function () {
      this.$emit("toggleMenu");
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@charset \"UTF-8\";\nhtml, body {\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  background-color: #edffef; }\n\n* {\n  box-sizing: border-box;\n  font-family: \"微軟正黑體\", \"Microsoft JhengHei\"; }\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-statistic.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-statistic.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".dataset-statistic {\n  width: 100%;\n  height: 100%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info-filter.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-info-filter.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".image-info-filter {\n  width: 100%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/location-select.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/location-select.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".location-select {\n  width: 100%;\n}\n.location-select .map {\n    width: 100%;\n    height: 300px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-graph.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/statistic-graph.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".statistic-graph {\n  width: 100%;\n  height: 100%;\n}\n.statistic-graph .graph-container {\n    width: 100%;\n    height: 350px;\n    position: relative;\n}\n.statistic-graph .graph-container .graph {\n      width: 100%;\n      height: 100%;\n}\n.statistic-graph .graph-container .option-panel {\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      top: 0px;\n      left: 0px;\n      padding: 20px;\n      background-color: rgba(100, 100, 100, 0.8);\n      color: white;\n      overflow: auto;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-map.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/statistic-map.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".statistic-map {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.statistic-map .map {\n    width: 100%;\n    height: 100%;\n}\n.statistic-map .popup-image {\n    display: block;\n    width: 150px;\n    object-fit: contain;\n    border-radius: 3px;\n}\n.statistic-map .popup-info {\n    margin: 5px 0px;\n}\n.statistic-map .popup-bt {\n    display: inline-block;\n    margin: 5px 0px;\n    padding: 5px 10px;\n    background-color: #555555;\n    color: #ffffff;\n    border-radius: 3px;\n    cursor: pointer;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/topbar.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/topbar.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".topbar {\n  width: 100%;\n}\n.topbar a {\n    text-decoration: none;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    for (var i = 0; i < modules.length; i++) {
      var item = [].concat(modules[i]);

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-statistic.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-statistic.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-statistic.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-statistic.vue?vue&type=style&index=0&lang=scss&");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info-filter.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-info-filter.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./image-info-filter.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info-filter.vue?vue&type=style&index=0&lang=scss&");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/location-select.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/location-select.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./location-select.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/location-select.vue?vue&type=style&index=0&lang=scss&");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-graph.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/statistic-graph.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./statistic-graph.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-graph.vue?vue&type=style&index=0&lang=scss&");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-map.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/statistic-map.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./statistic-map.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-map.vue?vue&type=style&index=0&lang=scss&");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/topbar.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/topbar.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./topbar.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/topbar.vue?vue&type=style&index=0&lang=scss&");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = {};

function modulesToDom(moduleId, list, options) {
  for (var i = 0; i < list.length; i++) {
    var part = {
      css: list[i][1],
      media: list[i][2],
      sourceMap: list[i][3]
    };

    if (stylesInDom[moduleId][i]) {
      stylesInDom[moduleId][i](part);
    } else {
      stylesInDom[moduleId].push(addStyle(part, options));
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (moduleId, list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  moduleId = options.base ? moduleId + options.base : moduleId;
  list = list || [];

  if (!stylesInDom[moduleId]) {
    stylesInDom[moduleId] = [];
  }

  modulesToDom(moduleId, list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    if (!stylesInDom[moduleId]) {
      stylesInDom[moduleId] = [];
    }

    modulesToDom(moduleId, newList, options);

    for (var j = newList.length; j < stylesInDom[moduleId].length; j++) {
      stylesInDom[moduleId][j]();
    }

    stylesInDom[moduleId].length = newList.length;

    if (stylesInDom[moduleId].length === 0) {
      delete stylesInDom[moduleId];
    }
  };
};

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-statistic.vue?vue&type=template&id=20e466e9&lang=html&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-statistic.vue?vue&type=template&id=20e466e9&lang=html& ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "q-layout",
    {
      staticClass: "dataset-statistic bg-grey-1 shadow-2",
      attrs: { view: "lHh lpr lFf", container: "" }
    },
    [
      _c("q-header", [_c("topbar", { attrs: { user: _vm.user } })], 1),
      _vm._v(" "),
      _c(
        "q-page-container",
        [
          _c(
            "q-page",
            { staticClass: "bg-grey-1" },
            [
              _c(
                "q-tab-panels",
                {
                  staticClass: "absolute fit",
                  attrs: { animated: "" },
                  model: {
                    value: _vm.tab,
                    callback: function($$v) {
                      _vm.tab = $$v
                    },
                    expression: "tab"
                  }
                },
                [
                  _c(
                    "q-tab-panel",
                    { staticClass: "q-pa-none", attrs: { name: "graph" } },
                    [_c("statistic-graph", { ref: "statisticGraph" })],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "q-tab-panel",
                    { staticClass: "q-pa-none", attrs: { name: "map" } },
                    [_c("statistic-map", { ref: "statisticMap" })],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "q-footer",
        [
          _c(
            "q-tabs",
            {
              staticClass: "bg-grey-8 text-white",
              attrs: {
                "inline-label": "",
                align: "justify",
                "active-bg-color": "grey-7"
              },
              on: {
                input: function($event) {
                  return _vm.InitTabContent()
                }
              },
              model: {
                value: _vm.tab,
                callback: function($$v) {
                  _vm.tab = $$v
                },
                expression: "tab"
              }
            },
            [
              _c("q-tab", {
                attrs: { name: "graph", icon: "bar_chart", label: "統計圖" }
              }),
              _vm._v(" "),
              _vm.info && _vm.info.enableGPS
                ? _c("q-tab", {
                    attrs: { name: "map", icon: "place", label: "地圖" }
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("q-tab", {
                attrs: { name: "home", icon: "folder", label: "回資料集" },
                on: {
                  click: function($event) {
                    return _vm.GoToDataset()
                  }
                }
              })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info-filter.vue?vue&type=template&id=d7a6189a&lang=html&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-info-filter.vue?vue&type=template&id=d7a6189a&lang=html& ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "image-info-filter q-pa-sm" }, [
    !_vm.disableTag
      ? _c(
          "div",
          [
            _c("div", { staticClass: "text-h6" }, [_vm._v("標籤篩選")]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "row items-center" },
              [
                _c("q-checkbox", {
                  staticClass: "text-bold",
                  attrs: { label: "全選" },
                  on: {
                    input: function($event) {
                      return _vm.ToggleTagSelectAll()
                    }
                  },
                  model: {
                    value: _vm.filter.selectAll,
                    callback: function($$v) {
                      _vm.$set(_vm.filter, "selectAll", $$v)
                    },
                    expression: "filter.selectAll"
                  }
                }),
                _vm._v(" "),
                _vm._l(_vm.filter.tag, function(tag) {
                  return _c("q-checkbox", {
                    key: tag.name,
                    attrs: { label: tag.name },
                    on: {
                      input: function($event) {
                        return _vm.UpdateFilterResult()
                      }
                    },
                    model: {
                      value: tag.value,
                      callback: function($$v) {
                        _vm.$set(tag, "value", $$v)
                      },
                      expression: "tag.value"
                    }
                  })
                })
              ],
              2
            ),
            _vm._v(" "),
            _c("q-separator", { staticClass: "q-my-sm" })
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    !_vm.disableTime
      ? _c(
          "div",
          [
            _c("div", { staticClass: "text-h6 q-mb-lg" }, [_vm._v("時間篩選")]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "q-px-md" },
              [
                _c("q-range", {
                  attrs: {
                    min: _vm.filter.timeLimit.rangeMin,
                    max: _vm.filter.timeLimit.rangeMax,
                    step: 1,
                    "left-label-value": _vm.minTimeLabel,
                    "right-label-value": _vm.maxTimeLabel,
                    "left-label-color": "grey-8",
                    "right-label-color": "grey-8",
                    "label-always": ""
                  },
                  on: {
                    change: function($event) {
                      return _vm.UpdateFilterResult()
                    }
                  },
                  model: {
                    value: _vm.filter.time,
                    callback: function($$v) {
                      _vm.$set(_vm.filter, "time", $$v)
                    },
                    expression: "filter.time"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("q-separator", { staticClass: "q-my-sm" })
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    !_vm.disableLocation
      ? _c(
          "div",
          [
            _c("div", { staticClass: "text-h6" }, [_vm._v("地點篩選")]),
            _vm._v(" "),
            _c("q-toggle", {
              attrs: { "left-label": "", label: "啟用範圍篩選" },
              on: {
                input: function($event) {
                  return _vm.UpdateRangeSelectMap()
                }
              },
              model: {
                value: _vm.filter.loc.enable,
                callback: function($$v) {
                  _vm.$set(_vm.filter.loc, "enable", $$v)
                },
                expression: "filter.loc.enable"
              }
            }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "text-subtitle2" },
              [
                _vm._v("\n\t\t\t半徑(公里)\n\t\t\t"),
                _c("q-slider", {
                  attrs: { label: "", min: 10, max: 400 },
                  on: {
                    change: function($event) {
                      return _vm.UpdateRangeSelectMap()
                    }
                  },
                  model: {
                    value: _vm.filter.loc.range,
                    callback: function($$v) {
                      _vm.$set(_vm.filter.loc, "range", $$v)
                    },
                    expression: "filter.loc.range"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("location-select", {
              ref: "locationSelect",
              attrs: { mode: "selectRange" },
              on: {
                change: function($event) {
                  return _vm.UpdateLoc()
                }
              }
            }),
            _vm._v(" "),
            _vm.$refs.locationSelect
              ? _c("div", { staticClass: "text-center" }, [
                  _vm._v(_vm._s(_vm.$refs.locationSelect.status))
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("q-separator", { staticClass: "q-my-sm" })
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    !_vm.disableRemark
      ? _c(
          "div",
          [
            _c("div", { staticClass: "text-h6" }, [_vm._v("備註篩選")]),
            _vm._v(" "),
            _c("q-input", {
              staticClass: "q-ma-sm",
              attrs: { dense: "" },
              on: {
                input: function($event) {
                  return _vm.UpdateFilterResult()
                }
              },
              model: {
                value: _vm.filter.remark,
                callback: function($$v) {
                  _vm.$set(_vm.filter, "remark", $$v)
                },
                expression: "filter.remark"
              }
            }),
            _vm._v(" "),
            _c("q-separator", { staticClass: "q-my-sm" })
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/location-select.vue?vue&type=template&id=848c807c&lang=html&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/location-select.vue?vue&type=template&id=848c807c&lang=html& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "location-select" }, [
    _c("div", { ref: "map", staticClass: "map" })
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-graph.vue?vue&type=template&id=3ef471bf&lang=html&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/statistic-graph.vue?vue&type=template&id=3ef471bf&lang=html& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.dataset && _vm.imageArr
    ? _c("div", { staticClass: "statistic-graph" }, [
        _c("div", { staticClass: "row items-center q-col-gutter-md q-pa-md" }, [
          _c(
            "div",
            { staticClass: "col-12 col-sm-6 column" },
            [
              _c("div", { staticClass: "text-h6" }, [_vm._v("標註標籤比例")]),
              _vm._v(" "),
              _c("div", { staticClass: "graph-container bg-grey-1" }, [
                _c("div", { ref: "tagRatio", staticClass: "graph" }),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.tagFilter.open,
                        expression: "tagFilter.open"
                      }
                    ],
                    staticClass: "option-panel column"
                  },
                  [
                    _c("image-info-filter", {
                      ref: "tagFilter",
                      attrs: {
                        initFilter: _vm.tagFilter.filter,
                        disableTag: ""
                      },
                      on: {
                        update: function($event) {
                          return _vm.UpdateTagFilterResult()
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("q-space"),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "row justify-center" },
                      [
                        _c("q-btn", {
                          staticClass: "bg-grey-8",
                          attrs: { label: "確定" },
                          on: {
                            click: function($event) {
                              _vm.tagFilter.open = false
                            }
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("q-btn", {
                staticClass: "bg-grey-6 text-white q-my-sm",
                attrs: { dense: "", label: "篩選" },
                on: {
                  click: function($event) {
                    _vm.tagFilter.open = true
                  }
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-12 col-sm-6 column" },
            [
              _c("div", { staticClass: "text-h6" }, [_vm._v("資料時間分佈")]),
              _vm._v(" "),
              _c("div", { staticClass: "graph-container bg-grey-1" }, [
                _c("div", { ref: "timeline", staticClass: "graph" }),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.timelineFilter.open,
                        expression: "timelineFilter.open"
                      }
                    ],
                    staticClass: "option-panel column"
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "text-subtitle2" },
                      [
                        _vm._v("\n\t\t\t\t\t\t顯示類型\n\t\t\t\t\t\t"),
                        _c("q-select", {
                          attrs: {
                            dense: "",
                            dark: "",
                            color: "white",
                            options: _vm.typeOption,
                            "option-value": "value",
                            "option-label": "label",
                            "emit-value": "",
                            "map-options": ""
                          },
                          on: {
                            input: function($event) {
                              return _vm.UpdateGraphTimeline()
                            }
                          },
                          model: {
                            value: _vm.timelineFilter.type,
                            callback: function($$v) {
                              _vm.$set(_vm.timelineFilter, "type", $$v)
                            },
                            expression: "timelineFilter.type"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("image-info-filter", {
                      ref: "timelineFilter",
                      attrs: {
                        initFilter: _vm.timelineFilter.filter,
                        disableTag: ""
                      },
                      on: {
                        update: function($event) {
                          return _vm.UpdateTimelineFilterResult()
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("q-space"),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "row justify-center" },
                      [
                        _c("q-btn", {
                          staticClass: "bg-grey-8",
                          attrs: { label: "確定" },
                          on: {
                            click: function($event) {
                              _vm.timelineFilter.open = false
                            }
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("q-btn", {
                staticClass: "bg-grey-6 text-white q-my-sm",
                attrs: { dense: "", label: "篩選" },
                on: {
                  click: function($event) {
                    _vm.timelineFilter.open = true
                  }
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "col-12 col-sm-6" }, [
            _c("div", { staticClass: "text-h6" }, [_vm._v("驗證認同率分佈")]),
            _vm._v(" "),
            _c("div", { staticClass: "graph-container bg-grey-1" }, [
              _c("div", { ref: "agreeRate", staticClass: "graph" })
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-12 col-sm-6" }, [
            _c("div", { staticClass: "text-h6" }, [_vm._v("上傳排行榜")]),
            _vm._v(" "),
            _c("div", { staticClass: "graph-container bg-grey-1" }, [
              _c("div", { ref: "uploadRank", staticClass: "graph" })
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-12 col-sm-6" }, [
            _c("div", { staticClass: "text-h6" }, [_vm._v("標註排行榜")]),
            _vm._v(" "),
            _c("div", { staticClass: "graph-container bg-grey-1" }, [
              _c("div", { ref: "annotateRank", staticClass: "graph" })
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-12 col-sm-6" }, [
            _c("div", { staticClass: "text-h6" }, [_vm._v("驗證排行榜")]),
            _vm._v(" "),
            _c("div", { staticClass: "graph-container bg-grey-1" }, [
              _c("div", { ref: "verifyRank", staticClass: "graph" })
            ])
          ])
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-map.vue?vue&type=template&id=6a4bfde6&lang=html&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/statistic-map.vue?vue&type=template&id=6a4bfde6&lang=html& ***!
  \**********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "statistic-map" },
    [
      _c("div", { ref: "map", staticClass: "map" }),
      _vm._v(" "),
      _c(
        "q-page-sticky",
        {
          staticClass: "z-top",
          attrs: { position: "bottom-left", offset: [18, 18] }
        },
        [
          _c(
            "q-btn",
            {
              staticClass: "bg-primary text-white",
              attrs: {
                flat: "",
                round: "",
                size: "md",
                icon: "insert_chart",
                disable: _vm.dataset == null || _vm.imageArr.length == 0
              },
              on: {
                click: function($event) {
                  return _vm.OpenFilterPanel()
                }
              }
            },
            [
              _c("q-tooltip", { attrs: { "content-class": "bg-primary" } }, [
                _vm._v("資料篩選")
              ])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "q-dialog",
        {
          model: {
            value: _vm.openFilterPanel,
            callback: function($$v) {
              _vm.openFilterPanel = $$v
            },
            expression: "openFilterPanel"
          }
        },
        [
          _c(
            "q-card",
            { staticClass: "full-width q-px-md" },
            [
              _c(
                "q-card-section",
                { staticClass: "column" },
                [
                  _c("image-info-filter", {
                    ref: "imageInfoFilter",
                    attrs: { initFilter: _vm.curFilter },
                    on: {
                      update: function($event) {
                        return _vm.UpdateFilterResult()
                      }
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "q-card-actions",
                { attrs: { align: "center" } },
                [
                  _c("q-btn", {
                    attrs: { flat: "", label: "確定" },
                    on: {
                      click: function($event) {
                        _vm.openFilterPanel = false
                      }
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/topbar.vue?vue&type=template&id=4d7f6460&lang=html&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/topbar.vue?vue&type=template&id=4d7f6460&lang=html& ***!
  \***************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "topbar bg-grey-8 text-white" },
    [
      _c(
        "q-toolbar",
        { staticClass: "q-px-md", attrs: { square: "" } },
        [
          _vm.useMenu
            ? _c("q-btn", {
                attrs: { flat: "", round: "", icon: "menu" },
                on: {
                  click: function($event) {
                    return _vm.ToggleMenu()
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "a",
            { attrs: { href: "/" } },
            [
              _c(
                "q-btn",
                { attrs: { flat: "", "no-caps": "" } },
                [
                  _c("q-avatar", { attrs: { size: "md", square: "" } }, [
                    _c("img", { attrs: { src: _vm.logo } })
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "gt-xs q-px-md text-white text-h5 inline" },
                    [_vm._v(_vm._s(_vm.title))]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("q-space"),
          _vm._v(" "),
          !_vm.user
            ? _c(
                "q-item",
                { attrs: { clickable: "", tag: "a", href: "/login" } },
                [
                  _c("q-icon", { attrs: { size: "md", name: "account_box" } }),
                  _vm._v(" "),
                  _c(
                    "q-item-section",
                    [
                      _c("q-item-label", { staticClass: "text-h6" }, [
                        _vm._v("登入")
                      ])
                    ],
                    1
                  )
                ],
                1
              )
            : _c(
                "q-item",
                { attrs: { clickable: "", tag: "a", href: "/account" } },
                [
                  _c("q-avatar", { attrs: { size: "lg" } }, [
                    _c("img", {
                      staticStyle: { "object-fit": "cover" },
                      attrs: { src: _vm.user.icon }
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "q-item-section",
                    { staticClass: "q-px-sm" },
                    [
                      _c("q-item-label", { staticClass: "text-h6" }, [
                        _vm._v(_vm._s(_vm.user.name))
                      ])
                    ],
                    1
                  )
                ],
                1
              )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./src/js/statistic.js":
/*!*****************************!*\
  !*** ./src/js/statistic.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_dataset_statistic_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vue/dataset-statistic.vue */ "./src/vue/dataset-statistic.vue");

new Vue({
  el: "#statisticApp",
  components: {
    "dataset-statistic": _vue_dataset_statistic_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var GetUrlParameter = function () {
  var queryStr = window.location.search.substring(1);
  var paramArr = queryStr.split('&');
  var result = {};

  for (var i = 0; i < paramArr.length; i++) {
    var param = paramArr[i].split('=');
    result[param[0]] = param[1];
  }

  return result;
};

var GetUrlHash = function () {
  var queryStr = window.location.hash.substr(1);
  var paramArr = queryStr.split('&');
  var result = {};

  for (var i = 0; i < paramArr.length; i++) {
    var param = paramArr[i].split('=');
    result[param[0]] = param[1];
  }

  return result;
};

var ValidateEmail = function (email) {
  var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
};

var PadLeft = function (val, totalLen, ch) {
  var len = totalLen - String(val).length + 1;
  return len > 0 ? new Array(len).join(ch || '0') + val : val;
};

var util = {
  GetUrlParameter: GetUrlParameter,
  GetUrlHash: GetUrlHash,
  ValidateEmail: ValidateEmail,
  PadLeft: PadLeft
};
/* harmony default export */ __webpack_exports__["default"] = (util);

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/main.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./src/vue/dataset-statistic.vue":
/*!***************************************!*\
  !*** ./src/vue/dataset-statistic.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataset_statistic_vue_vue_type_template_id_20e466e9_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataset-statistic.vue?vue&type=template&id=20e466e9&lang=html& */ "./src/vue/dataset-statistic.vue?vue&type=template&id=20e466e9&lang=html&");
/* harmony import */ var _dataset_statistic_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataset-statistic.vue?vue&type=script&lang=js& */ "./src/vue/dataset-statistic.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _dataset_statistic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataset-statistic.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/dataset-statistic.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _dataset_statistic_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _dataset_statistic_vue_vue_type_template_id_20e466e9_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _dataset_statistic_vue_vue_type_template_id_20e466e9_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/dataset-statistic.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/dataset-statistic.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./src/vue/dataset-statistic.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_statistic_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-statistic.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-statistic.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_statistic_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/dataset-statistic.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************!*\
  !*** ./src/vue/dataset-statistic.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_statistic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-statistic.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-statistic.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_statistic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_statistic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_statistic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_statistic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_statistic_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/dataset-statistic.vue?vue&type=template&id=20e466e9&lang=html&":
/*!********************************************************************************!*\
  !*** ./src/vue/dataset-statistic.vue?vue&type=template&id=20e466e9&lang=html& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_statistic_vue_vue_type_template_id_20e466e9_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-statistic.vue?vue&type=template&id=20e466e9&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-statistic.vue?vue&type=template&id=20e466e9&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_statistic_vue_vue_type_template_id_20e466e9_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_statistic_vue_vue_type_template_id_20e466e9_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/image-info-filter.vue":
/*!***************************************!*\
  !*** ./src/vue/image-info-filter.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_info_filter_vue_vue_type_template_id_d7a6189a_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-info-filter.vue?vue&type=template&id=d7a6189a&lang=html& */ "./src/vue/image-info-filter.vue?vue&type=template&id=d7a6189a&lang=html&");
/* harmony import */ var _image_info_filter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-info-filter.vue?vue&type=script&lang=js& */ "./src/vue/image-info-filter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _image_info_filter_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-info-filter.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/image-info-filter.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _image_info_filter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _image_info_filter_vue_vue_type_template_id_d7a6189a_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _image_info_filter_vue_vue_type_template_id_d7a6189a_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/image-info-filter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/image-info-filter.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./src/vue/image-info-filter.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_filter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./image-info-filter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info-filter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_filter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/image-info-filter.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************!*\
  !*** ./src/vue/image-info-filter.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_filter_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./image-info-filter.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info-filter.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_filter_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_filter_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_filter_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_filter_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_filter_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/image-info-filter.vue?vue&type=template&id=d7a6189a&lang=html&":
/*!********************************************************************************!*\
  !*** ./src/vue/image-info-filter.vue?vue&type=template&id=d7a6189a&lang=html& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_filter_vue_vue_type_template_id_d7a6189a_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./image-info-filter.vue?vue&type=template&id=d7a6189a&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info-filter.vue?vue&type=template&id=d7a6189a&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_filter_vue_vue_type_template_id_d7a6189a_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_filter_vue_vue_type_template_id_d7a6189a_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/location-select.vue":
/*!*************************************!*\
  !*** ./src/vue/location-select.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _location_select_vue_vue_type_template_id_848c807c_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./location-select.vue?vue&type=template&id=848c807c&lang=html& */ "./src/vue/location-select.vue?vue&type=template&id=848c807c&lang=html&");
/* harmony import */ var _location_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./location-select.vue?vue&type=script&lang=js& */ "./src/vue/location-select.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _location_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./location-select.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/location-select.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _location_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _location_select_vue_vue_type_template_id_848c807c_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _location_select_vue_vue_type_template_id_848c807c_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/location-select.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/location-select.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./src/vue/location-select.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_location_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./location-select.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/location-select.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_location_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/location-select.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************!*\
  !*** ./src/vue/location-select.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_location_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./location-select.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/location-select.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_location_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_location_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_location_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_location_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_location_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/location-select.vue?vue&type=template&id=848c807c&lang=html&":
/*!******************************************************************************!*\
  !*** ./src/vue/location-select.vue?vue&type=template&id=848c807c&lang=html& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_location_select_vue_vue_type_template_id_848c807c_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./location-select.vue?vue&type=template&id=848c807c&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/location-select.vue?vue&type=template&id=848c807c&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_location_select_vue_vue_type_template_id_848c807c_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_location_select_vue_vue_type_template_id_848c807c_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/statistic-graph.vue":
/*!*************************************!*\
  !*** ./src/vue/statistic-graph.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _statistic_graph_vue_vue_type_template_id_3ef471bf_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statistic-graph.vue?vue&type=template&id=3ef471bf&lang=html& */ "./src/vue/statistic-graph.vue?vue&type=template&id=3ef471bf&lang=html&");
/* harmony import */ var _statistic_graph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statistic-graph.vue?vue&type=script&lang=js& */ "./src/vue/statistic-graph.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _statistic_graph_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statistic-graph.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/statistic-graph.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _statistic_graph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _statistic_graph_vue_vue_type_template_id_3ef471bf_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _statistic_graph_vue_vue_type_template_id_3ef471bf_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/statistic-graph.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/statistic-graph.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./src/vue/statistic-graph.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_graph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./statistic-graph.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-graph.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_graph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/statistic-graph.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************!*\
  !*** ./src/vue/statistic-graph.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_graph_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./statistic-graph.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-graph.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_graph_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_graph_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_graph_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_graph_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_graph_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/statistic-graph.vue?vue&type=template&id=3ef471bf&lang=html&":
/*!******************************************************************************!*\
  !*** ./src/vue/statistic-graph.vue?vue&type=template&id=3ef471bf&lang=html& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_graph_vue_vue_type_template_id_3ef471bf_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./statistic-graph.vue?vue&type=template&id=3ef471bf&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-graph.vue?vue&type=template&id=3ef471bf&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_graph_vue_vue_type_template_id_3ef471bf_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_graph_vue_vue_type_template_id_3ef471bf_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/statistic-map.vue":
/*!***********************************!*\
  !*** ./src/vue/statistic-map.vue ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _statistic_map_vue_vue_type_template_id_6a4bfde6_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statistic-map.vue?vue&type=template&id=6a4bfde6&lang=html& */ "./src/vue/statistic-map.vue?vue&type=template&id=6a4bfde6&lang=html&");
/* harmony import */ var _statistic_map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statistic-map.vue?vue&type=script&lang=js& */ "./src/vue/statistic-map.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _statistic_map_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statistic-map.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/statistic-map.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _statistic_map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _statistic_map_vue_vue_type_template_id_6a4bfde6_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _statistic_map_vue_vue_type_template_id_6a4bfde6_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/statistic-map.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/statistic-map.vue?vue&type=script&lang=js&":
/*!************************************************************!*\
  !*** ./src/vue/statistic-map.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./statistic-map.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-map.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/statistic-map.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************!*\
  !*** ./src/vue/statistic-map.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_map_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./statistic-map.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-map.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_map_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_map_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_map_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_map_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_map_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/statistic-map.vue?vue&type=template&id=6a4bfde6&lang=html&":
/*!****************************************************************************!*\
  !*** ./src/vue/statistic-map.vue?vue&type=template&id=6a4bfde6&lang=html& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_map_vue_vue_type_template_id_6a4bfde6_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./statistic-map.vue?vue&type=template&id=6a4bfde6&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/statistic-map.vue?vue&type=template&id=6a4bfde6&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_map_vue_vue_type_template_id_6a4bfde6_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_statistic_map_vue_vue_type_template_id_6a4bfde6_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/topbar.vue":
/*!****************************!*\
  !*** ./src/vue/topbar.vue ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _topbar_vue_vue_type_template_id_4d7f6460_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./topbar.vue?vue&type=template&id=4d7f6460&lang=html& */ "./src/vue/topbar.vue?vue&type=template&id=4d7f6460&lang=html&");
/* harmony import */ var _topbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./topbar.vue?vue&type=script&lang=js& */ "./src/vue/topbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _topbar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./topbar.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/topbar.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _topbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _topbar_vue_vue_type_template_id_4d7f6460_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _topbar_vue_vue_type_template_id_4d7f6460_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/topbar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/topbar.vue?vue&type=script&lang=js&":
/*!*****************************************************!*\
  !*** ./src/vue/topbar.vue?vue&type=script&lang=js& ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./topbar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/topbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/topbar.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************!*\
  !*** ./src/vue/topbar.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topbar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./topbar.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/topbar.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topbar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topbar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topbar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topbar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topbar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/topbar.vue?vue&type=template&id=4d7f6460&lang=html&":
/*!*********************************************************************!*\
  !*** ./src/vue/topbar.vue?vue&type=template&id=4d7f6460&lang=html& ***!
  \*********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_topbar_vue_vue_type_template_id_4d7f6460_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./topbar.vue?vue&type=template&id=4d7f6460&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/topbar.vue?vue&type=template&id=4d7f6460&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_topbar_vue_vue_type_template_id_4d7f6460_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_topbar_vue_vue_type_template_id_4d7f6460_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 4:
/*!***********************************!*\
  !*** multi ./src/js/statistic.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/statistic.js */"./src/js/statistic.js");


/***/ })

/******/ });
//# sourceMappingURL=statistic.js.map