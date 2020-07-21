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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-bbox.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator-bbox.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tag_select_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tag-select.vue */ "./src/vue/tag-select.vue");
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
  name: "annotator-bbox",
  components: {
    "tag-select": _tag_select_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    dataset: Object,
    image: Object,
    task: String
  },
  data: function () {
    return {
      openHelp: false,
      openTagSelect: false,
      tool: "move",
      toolOption: [{
        value: "bbox",
        slot: "bbox"
      }, {
        value: "move",
        slot: "move"
      }],
      container: null,
      stage: null,
      imageLayer: null,
      bboxLayer: null,
      imageNode: null,
      annotationArr: [],
      gesture: "",
      lastTouch: null,
      newRect: null,
      target: null,
      labelColor: {}
    };
  },
  mounted: function () {
    this.GenLabelColor();
    this.InitCanvas();
  },
  methods: {
    GetRelativeMousePos: function (node) {
      var transform = node.getAbsoluteTransform().copy();
      transform.invert();
      var pos = node.getStage().getPointerPosition();
      return transform.point(pos);
    },
    HSVtoRGB: function (h, s, v, alpha) {
      var r, g, b, i, f, p, q, t;

      if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
      }

      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          r = v, g = t, b = p;
          break;

        case 1:
          r = q, g = v, b = p;
          break;

        case 2:
          r = p, g = v, b = t;
          break;

        case 3:
          r = p, g = q, b = v;
          break;

        case 4:
          r = t, g = p, b = v;
          break;

        case 5:
          r = v, g = p, b = q;
          break;
      }

      r = Math.round(r * 255);
      g = Math.round(g * 255);
      b = Math.round(b * 255);
      return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
    },
    GenLabelColor: function () {
      this.labelColor = {};
      var colorNum = this.dataset.tagArr.length;
      var binNum = 5;
      var step = 1.0 / binNum;

      for (var i = 0; i < colorNum; i++) {
        var h = i % binNum * step;
        var s = 1 - parseInt(i * step) % binNum * step;
        var v = 1 - parseInt(i * step * step) % binNum * step;
        var bgColor = this.HSVtoRGB(h, s, v, 1);
        var fgColor = v >= 0.5 ? "#000000" : "#ffffff";
        var tag = this.dataset.tagArr[i];
        this.labelColor[tag] = {
          "fg": fgColor,
          "bg": bgColor
        };
      }
    },
    BoundInImage: function (pos) {
      var imPos = this.imageNode.absolutePosition();
      var imSize = this.imageNode.size();
      var imScale = this.imageNode.getAbsoluteScale();
      if (pos.x < imPos.x) pos.x = imPos.x;
      if (pos.x >= imPos.x + imSize.width * imScale.x) pos.x = imPos.x + imSize.width * imScale.x;
      if (pos.y < imPos.y) pos.y = imPos.y;
      if (pos.y >= imPos.y + imSize.height * imScale.y) pos.y = imPos.y + imSize.height * imScale.y;
      return pos;
    },
    BoundStage: function (pos) {
      var size = this.stage.size();
      var imSize = this.imageNode.size();
      var scale = this.stage.scale(); //影像四個角位置

      var left = (size.width - imSize.width) * 0.5 * scale.x;
      var top = (size.height - imSize.height) * 0.5 * scale.y;
      var right = (size.width + imSize.width) * 0.5 * scale.x;
      var bottom = (size.height + imSize.height) * 0.5 * scale.y; //影像scale後寬度>container寬度

      if (imSize.width * scale.x > size.width) {
        //讓影像寬cover整個container寬
        if (pos.x + left > 0) pos.x = -left;else if (pos.x + right < size.width) {
          pos.x = size.width - right;
        }
      } else {
        //讓container寬contain整個影像寬
        if (pos.x + left < 0) pos.x = -left;else if (pos.x + right > size.width) {
          pos.x = size.width - right;
        }
      } //影像scale後高度>container高度


      if (imSize.height * scale.y > size.height) {
        //讓影像高cover整個container高
        if (pos.y + top > 0) pos.y = -top;else if (pos.y + bottom < size.height) {
          pos.y = size.height - bottom;
        }
      } else {
        //讓container高contain整個影像高
        if (pos.y + top < 0) pos.y = -top;else if (pos.y + bottom > size.height) {
          pos.y = size.height - bottom;
        }
      }

      return pos;
    },
    InitCanvas: function () {
      this.container = this.task == "view" ? this.$refs.viewCanvas : this.$refs.editCanvas;
      this.stage = new Konva.Stage({
        container: this.container,
        width: this.container.clientWidth,
        height: this.container.clientHeight,
        draggable: false,
        dragBoundFunc: this.BoundStage
      }); //make konva center align

      this.stage.content.style.margin = "auto"; //手機選標籤時會產生resize，造成canvas變很小

      /*window.addEventListener("resize", function(){
      	this.stage.setAttrs({
      		width: this.container.clientWidth,
      		height: this.container.clientHeight,
      	});
      }.bind(this));*/
      //init tool according to task

      this.tool = this.task == "annotate" ? "bbox" : "move";
      this.ChangeTool();
      this.stage.on("wheel", function (e) {
        e.evt.preventDefault();
        var factor = 0.95;
        var old = this.stage.scaleX();
        var s = e.evt.deltaY > 0 ? old * factor : old / factor;
        if (s < 1) s = 1; //scale之後，滑鼠還是要指在影像上的同一個pixel

        var mousePt = this.stage.getPointerPosition();
        var imagePt = {
          x: (mousePt.x - this.stage.x()) / old,
          y: (mousePt.y - this.stage.y()) / old
        };
        this.stage.scale({
          x: s,
          y: s
        });
        var newPos = {
          x: -imagePt.x * s + mousePt.x,
          y: -imagePt.y * s + mousePt.y
        };
        newPos = this.BoundStage(newPos);
        this.stage.position(newPos);
        this.stage.batchDraw();
      }.bind(this));
      this.stage.on('mousedown touchstart', function (e) {
        if (e.type == "touchstart" && e.evt.touches.length == 2) {
          this.gesture = "pinch";
          this.lastTouch = e;
        } else {
          this.gesture = "drag";

          if (this.tool == "bbox") {
            //點到內部的物件，不產生新bbox
            if (e.target.name() != "") return;
            var mousePt = this.GetRelativeMousePos(this.stage);
            mousePt = this.BoundInImage(mousePt);
            this.lastTouch = this.stage.getPointerPosition();

            if (this.newRect) {
              this.newRect.destroy();
            }

            this.newRect = new Konva.Rect({
              x: mousePt.x,
              y: mousePt.y,
              width: 0,
              height: 0,
              fill: "rgba(0,0,0,0)",
              stroke: "#ffffff"
            });
            this.bboxLayer.add(this.newRect);
          }
        } //console.log(this.gesture);


        this.stage.batchDraw();
      }.bind(this));
      this.stage.on('mousemove touchmove', function (e) {
        if (this.gesture == "pinch") {
          var p1 = this.lastTouch.evt.touches[0];
          var p2 = this.lastTouch.evt.touches[1];
          var t1 = e.evt.touches[0];
          var t2 = e.evt.touches[1];
          this.lastTouch = e;
          if (!p1 || !p2 || !t1 || !t2) return;

          function ComputeDist(pt1, pt2) {
            var diffX = pt1.clientX - pt2.clientX;
            var diffY = pt1.clientY - pt2.clientY;
            return Math.sqrt(diffX * diffX + diffY * diffY);
          }

          var dist1 = ComputeDist(p1, p2);
          var dist2 = ComputeDist(t1, t2);
          var old = this.stage.scaleX();
          var scale = dist2 / dist1;
          if (scale > 1.1) scale = 1.1;else if (scale < 0.9) scale = 0.9;
          var s = old * scale;
          if (s < 1) s = 1; //scale之後，兩指中心點不變

          var centerPt = {
            x: (t1.clientX + t2.clientX) * 0.5,
            y: (t1.clientY + t2.clientY) * 0.5
          };
          var imagePt = {
            x: (centerPt.x - this.stage.x()) / old,
            y: (centerPt.y - this.stage.y()) / old
          };
          this.stage.scale({
            x: s,
            y: s
          });
          var newPos = {
            x: -imagePt.x * s + centerPt.x,
            y: -imagePt.y * s + centerPt.y
          };
          newPos = this.BoundStage(newPos);
          this.stage.position(newPos);
        } else if (this.gesture == "drag") {
          if (this.tool == "bbox") {
            //change bbox size
            if (!this.newRect) return;
            var mousePt = this.GetRelativeMousePos(this.stage);
            mousePt = this.BoundInImage(mousePt);
            var origin = this.newRect.position();
            this.newRect.setAttrs({
              width: mousePt.x - origin.x,
              height: mousePt.y - origin.y
            });
          } else if (this.tool == "move") {
            //drag stage
            var mousePt = this.stage.getPointerPosition();

            if (!this.lastTouch) {
              this.lastTouch = mousePt;
              return;
            }

            var pos = this.stage.position();
            var newPos = {
              x: pos.x + mousePt.x - this.lastTouch.x,
              y: pos.y + mousePt.y - this.lastTouch.y
            };
            this.lastTouch = mousePt;
            newPos = this.BoundStage(newPos);
            this.stage.position(newPos);
          }
        }

        this.stage.batchDraw();
      }.bind(this));
      this.stage.on('mouseup touchend', function (e) {
        this.lastTouch = null;

        if (this.gesture == "pinch") {
          this.gesture = "";
        } else if (this.gesture == "drag") {
          this.gesture = "";
          if (this.tool != "bbox") return;
          if (!this.newRect) return;
          var size = this.newRect.size();

          if (Math.abs(size.width) < 10 || Math.abs(size.height) < 10) {
            return this.CancelTagSelect();
          }

          this.openTagSelect = true;
        }
      }.bind(this));
      this.imageLayer = new Konva.Layer();
      this.bboxLayer = new Konva.Layer();
      this.stage.add(this.imageLayer);
      this.stage.add(this.bboxLayer);
    },
    ChangeTool: function () {
      switch (this.tool) {
        case "move":
          this.container.style.cursor = "grab"; //this.stage.setAttr("draggable",true);

          break;

        case "bbox":
          this.container.style.cursor = "default"; //this.stage.setAttr("draggable",false);

          break;
      }
    },
    ConfirmTagSelect: function () {
      if (!this.target) return;
      var tag = this.$refs.tagSelect.selectTag;
      if (!tag || tag == "") return alert("請選擇標籤");
      this.target.tag = tag;
      var bgColor = this.labelColor[tag].bg;
      var fgColor = this.labelColor[tag].fg;
      var bbox = this.target.node.find("Rect")[0];
      bbox.setAttr("stroke", bgColor);
      var label = this.target.node.find("Label")[0];
      label.getTag().setAttr("fill", bgColor);
      label.getText().setAttr("fill", fgColor).text(tag);
      this.target = null;
      this.openTagSelect = false;
      this.stage.batchDraw();
    },
    CancelTagSelect: function () {
      this.openTagSelect = false;
      this.target = null;

      if (this.newRect) {
        this.newRect.destroy();
        this.newRect = null;
      }

      this.stage.batchDraw();
    },
    AddAnnotation: function () {
      if (!this.newRect) return;
      var tag = this.$refs.tagSelect.selectTag;
      if (!tag || tag == "") return alert("請選擇標籤");
      var pos = this.newRect.position();
      var size = this.newRect.size();

      if (size.width < 0) {
        pos.x = pos.x + size.width;
        size.width = -size.width;
      }

      if (size.height < 0) {
        pos.y = pos.y + size.height;
        size.height = -size.height;
      }

      var group = new Konva.Group();
      this.bboxLayer.add(group); //add bbox

      var bbox = new Konva.Rect({
        x: pos.x,
        y: pos.y,
        width: size.width,
        height: size.height,
        fill: "rgba(0,0,0,0)",
        stroke: this.labelColor[tag].bg
      });
      group.add(bbox); //add annotation label

      var label = new Konva.Label({});
      label.add(new Konva.Tag({
        fill: this.labelColor[tag].bg
      }));
      label.add(new Konva.Text({
        text: tag,
        padding: 3,
        fontSize: 10,
        fill: this.labelColor[tag].fg,
        name: "BBoxLabel"
      }));
      label.on("click tap", function (e) {
        this.openTagSelect = true;
        this.target = annotation;
        Vue.nextTick(function () {
          this.$refs.tagSelect.selectTag = annotation.tag;
        }.bind(this));
      }.bind(this));
      label.position({
        x: pos.x,
        y: pos.y - label.height()
      });
      group.add(label);
      var annotation = {
        tag: tag,
        x: pos.x,
        y: pos.y,
        width: size.width,
        height: size.height,
        node: group,
        index: this.annotationArr.length
      };
      this.annotationArr.push(annotation); //add corner control

      var updateBBox = function (active) {
        //adjust corner to maintain rect shape
        var lt = group.find(".LT")[0];
        var rt = group.find(".RT")[0];
        var rb = group.find(".RB")[0];
        var lb = group.find(".LB")[0];

        switch (active.getName()) {
          case "LT":
            lb.x(active.x());
            rt.y(active.y());
            break;

          case "RT":
            rb.x(active.x());
            lt.y(active.y());
            break;

          case "RB":
            rt.x(active.x());
            lb.y(active.y());
            break;

          case "LB":
            lt.x(active.x());
            rb.y(active.y());
            break;
        } //get bbox corner


        var ctlArr = [lt, rt, rb, lb];
        var minX = Number.MAX_VALUE;
        var minY = Number.MAX_VALUE;
        var maxX = Number.MIN_VALUE;
        var maxY = Number.MIN_VALUE;

        for (var i = 0; i < ctlArr.length; i++) {
          var pos = ctlArr[i].position();
          var size = ctlArr[i].size();
          var cx = pos.x + size.width * 0.5;
          var cy = pos.y + size.height * 0.5;
          if (cx < minX) minX = cx;
          if (cx > maxX) maxX = cx;
          if (cy < minY) minY = cy;
          if (cy > maxY) maxY = cy;
        } //update bbox size


        var w = maxX - minX;
        var h = maxY - minY;
        bbox.setAttrs({
          x: minX,
          y: minY,
          width: w,
          height: h
        });
        annotation.x = minX;
        annotation.y = minY;
        annotation.width = w;
        annotation.height = h; //update label pos

        label.setAttrs({
          x: minX,
          y: minY - label.height()
        });
        this.stage.batchDraw();
      }.bind(this);

      var AddControl = function (group, x, y, name) {
        var ctlSize = 10;
        var offset = ctlSize * 0.5;
        var ctl = new Konva.Rect({
          x: x - offset,
          y: y - offset,
          width: ctlSize,
          height: ctlSize,
          fill: "#ffffff",
          stroke: "#3333ff",
          name: name,
          draggable: true,
          dragBoundFunc: function (pos) {
            pos.x += offset;
            pos.y += offset;
            pos = this.BoundInImage(pos);
            pos.x -= offset;
            pos.y -= offset;
            return pos;
          }.bind(this)
        });
        ctl.on("dragmove", function () {
          updateBBox(ctl);
        }.bind(this));
        group.add(ctl);
      }.bind(this);

      AddControl(group, pos.x, pos.y, "LT");
      AddControl(group, pos.x + size.width, pos.y, "RT");
      AddControl(group, pos.x + size.width, pos.y + size.height, "RB");
      AddControl(group, pos.x, pos.y + size.height, "LB");
      this.openTagSelect = false;
      this.newRect.destroy();
      this.newRect = null;
      this.stage.batchDraw();
    },
    RemoveAnnotation: function () {
      if (!this.target) return;
      this.target.node.destroy();
      this.annotationArr.splice(this.target.index, 1);
      this.target = null;
      this.openTagSelect = false;
      this.stage.batchDraw();
    },
    ChangeImage: function () {
      if (this.imageNode) {
        this.imageNode.destroy();
      }

      for (var i = 0; i < this.annotationArr.length; i++) {
        var annotation = this.annotationArr[i];
        annotation.node.destroy();
      }

      this.annotationArr = [];
      var srcImage = this.$refs.srcImage;
      var cw = this.container.clientWidth;
      var ch = this.container.clientHeight;
      var scaleW = cw / srcImage.width;
      var scaleH = ch / srcImage.height;
      var scale = Math.min(scaleW, scaleH);
      var w = srcImage.width * scale;
      var h = srcImage.height * scale;
      this.imageNode = new Konva.Image({
        x: (cw - w) * 0.5,
        y: (ch - h) * 0.5,
        width: w,
        height: h,
        image: srcImage
      });
      this.imageLayer.add(this.imageNode);

      if (this.task == "view" || this.task == "verify") {
        this.DrawAnnotation();
      }

      this.stage.batchDraw();
    },
    DrawAnnotation: function () {
      if (!this.image.annotation) return;
      var imPos = this.imageNode.position();
      var imSize = this.imageNode.size();
      var srcImage = this.$refs.srcImage;

      for (var i = 0; i < this.image.annotation.annotation.length; i++) {
        var annotation = this.image.annotation.annotation[i];
        var x = parseFloat(annotation.x);
        var y = parseFloat(annotation.y);
        var w = parseFloat(annotation.width);
        var h = parseFloat(annotation.height);
        var group = new Konva.Group();
        this.bboxLayer.add(group);
        var lt = {
          x: x,
          y: y
        };
        var rb = {
          x: x + w,
          y: y + h
        }; //從原始影像座標轉到canvas座標

        lt.x = lt.x * imSize.width / srcImage.width + imPos.x;
        lt.y = lt.y * imSize.height / srcImage.height + imPos.y;
        rb.x = rb.x * imSize.width / srcImage.width + imPos.x;
        rb.y = rb.y * imSize.height / srcImage.height + imPos.y; //add bbox

        var bbox = new Konva.Rect({
          x: lt.x,
          y: lt.y,
          width: rb.x - lt.x,
          height: rb.y - lt.y,
          fill: "rgba(0,0,0,0)",
          stroke: this.labelColor[annotation.tag].bg
        });
        group.add(bbox); //add annotation label

        var label = new Konva.Label({});
        label.add(new Konva.Tag({
          fill: this.labelColor[annotation.tag].bg
        }));
        label.add(new Konva.Text({
          text: annotation.tag,
          fontSize: 10,
          padding: 1,
          fill: this.labelColor[annotation.tag].fg,
          name: "BBoxLabel"
        }));
        label.position({
          x: lt.x,
          y: lt.y - label.height()
        });
        group.add(label);
        var a = {
          tag: annotation.tag,
          x: bbox.x(),
          y: bbox.y(),
          width: bbox.width(),
          height: bbox.height(),
          node: group,
          index: this.annotationArr.length
        };
        this.annotationArr.push(a);
      }

      this.stage.batchDraw();
    },
    SetAnnotation: function () {
      if (this.annotationArr.length == 0) {
        return alert("請至少新增一個標籤");
      }

      this.$emit("setAnnotation");
    },
    SetVerification: function (agree) {
      this.$emit("setVerification", agree);
    },
    GetAnnotation: function () {
      var result = [];
      var imPos = this.imageNode.position();
      var imSize = this.imageNode.size();
      var srcImage = this.$refs.srcImage;

      for (var i = 0; i < this.annotationArr.length; i++) {
        var annotation = this.annotationArr[i];
        var bbox = {};
        var lt = {
          x: annotation.x,
          y: annotation.y
        };
        var rb = {
          x: annotation.x + annotation.width,
          y: annotation.y + annotation.height
        }; //還原成原始影像座標

        lt.x = (lt.x - imPos.x) * srcImage.width / imSize.width;
        lt.y = (lt.y - imPos.y) * srcImage.height / imSize.height;
        rb.x = (rb.x - imPos.x) * srcImage.width / imSize.width;
        rb.y = (rb.y - imPos.y) * srcImage.height / imSize.height;
        bbox.x = lt.x;
        bbox.y = lt.y;
        bbox.width = rb.x - lt.x;
        bbox.height = rb.y - lt.y;
        bbox.tag = annotation.tag;
        result.push(bbox);
      }

      return result;
    },
    SkipTask: function () {
      this.$emit("skipTask");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-image.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator-image.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tag_select_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tag-select.vue */ "./src/vue/tag-select.vue");
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
  name: "annotator-image",
  components: {
    "tag-select": _tag_select_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    dataset: Object,
    image: Object,
    task: String,
    status: String
  },
  data: function () {
    return {
      openHelp: false
    };
  },
  mounted: function () {},
  methods: {
    SetAnnotation: function () {
      this.$emit("setAnnotation");
    },
    SetVerification: function (agree) {
      this.$emit("setVerification", agree);
    },
    GetAnnotation: function () {
      return this.$refs.tagSelect.selectTag;
    },
    SkipTask: function () {
      this.$emit("skipTask");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataset_select_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataset-select.vue */ "./src/vue/dataset-select.vue");
/* harmony import */ var _annotator_image_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./annotator-image.vue */ "./src/vue/annotator-image.vue");
/* harmony import */ var _annotator_bbox_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./annotator-bbox.vue */ "./src/vue/annotator-bbox.vue");
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
  name: "annotator",
  components: {
    "dataset-select": _dataset_select_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    "annotator-image": _annotator_image_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    "annotator-bbox": _annotator_bbox_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  props: {
    user: Object,
    dataset: Object,
    image: Object,
    autoTask: Boolean
  },
  data: function () {
    return {
      datasetSelect: null,
      imageSelect: null,
      taskSelect: "",
      openDatasetSelect: false,
      imageArr: [],
      status: "",
      verify: null
    };
  },
  mounted: function () {
    if (!this.user) window.location.href = "/login?intentUrl=" + encodeURIComponent(window.location.pathname + window.location.search);
    this.datasetSelect = this.dataset;
    this.imageSelect = this.image;

    if (!this.dataset) {
      this.status = "請選擇資料集";
      this.openDatasetSelect = true;
    } else {
      this.GenerateTask();
    }
  },
  methods: {
    ChangeDataset: function () {
      this.openDatasetSelect = false;
      this.datasetSelect = this.$refs.datasetSelect.GetSelectDataset();
      var url = "/dataset/list-image-for-annotation";
      url += "?dataset=" + this.datasetSelect._id;
      $.get(url, function (result) {
        if (result.status != "ok") return;

        for (var i = 0; i < result.data.length; i++) {
          var image = result.data[i];
          image.url = "/static/upload/dataset/" + this.datasetSelect._id + "/image/" + image._id + ".jpg";
        }

        this.imageArr = result.data;
        this.GenerateTask();
      }.bind(this));
    },
    GenerateTask: function () {
      this.imageSelect = null;

      if (!this.datasetSelect) {
        this.status = "請選擇資料集";
        return;
      }

      if (this.image) {
        //有指定標註影像
        if (this.image.annotation) {
          var myVerify = this.image.verification.filter(function (d) {
            return d.user == this.user._id;
          }.bind(this));

          if (myVerify.length > 0) {
            this.status = "您已驗證過此影像，感謝您的協助";
            return;
          }
        }

        this.imageSelect = this.image;
      } else {
        //沒指定標註影像，隨機選擇
        if (this.imageArr.length == 0) {
          this.status = "此資料集影像皆已標註完成";
          return;
        }

        var activeArr = [];

        for (var i = 0; i < this.imageArr.length; i++) {
          var image = this.imageArr[i];
          if (!image.annotation) activeArr.push(image);else {
            var myVerify = image.verification.filter(function (d) {
              return d.user == this.user._id;
            }.bind(this));
            if (myVerify.length == 0) activeArr.push(image);
          }
        }

        if (activeArr.length == 0) {
          this.status = "您已驗證過此資料集所有資料，感謝您的協助";
          return;
        }

        var GetRandomImage = function () {
          if (activeArr.length == 0) return null;
          var index = Math.floor(Math.random() * activeArr.length);
          return activeArr[index];
        }.bind(this);

        this.imageSelect = GetRandomImage();
      }

      var CheckTask = function () {
        //未標註 -> 標註
        if (!this.imageSelect.annotation) this.taskSelect = "annotate";else {
          //驗證數不夠 -> 驗證
          if (this.imageSelect.verifyNum < this.verify.sample) this.taskSelect = "verify";else {
            //認同率太低 -> 重新標註
            if (this.imageSelect.agreeNum < this.imageSelect.verifyNum * this.verify.reject) this.taskSelect = "annotate";else this.taskSelect = "verify";
          }
        }
      }.bind(this);

      if (!this.verify) {
        $.get("/dataset/verify-condition", function (result) {
          if (result.status != "ok") return alert("讀取驗證條件失敗");
          this.verify = result.data;
          CheckTask();
        }.bind(this));
      } else CheckTask();
    },
    GetAnnotator: function () {
      if (!this.datasetSelect) return null;
      var annotator = null;

      switch (this.datasetSelect.annotationType) {
        case "image":
          annotator = this.$refs.annotatorImage;
          break;

        case "bbox":
          annotator = this.$refs.annotatorBBox;
          break;
      }

      ;
      return annotator;
    },
    UploadAnnotation: function () {
      var annotator = this.GetAnnotator();
      if (!annotator) return;
      var csrfToken = $("meta[name='csrf-token']").attr("content");
      var data = {};
      data.dataset = annotator.dataset._id;
      data.image = annotator.image._id;
      data.annotation = annotator.GetAnnotation();
      data._csrf = csrfToken;
      $.post("/dataset/set-annotation", data, function (result) {
        if (result.status != "ok") {
          switch (result.message) {
            case "blacklist":
              return alert("黑名單使用者無此權限");

            default:
              return alert("標註失敗");
          }
        }

        this.imageSelect.annotation = {
          user: this.user._id,
          annotation: data.annotation
        };
        this.$q.notify("標註成功");

        if (this.autoTask) {
          this.GenerateTask();
        } else {
          this.$emit("done");
        }
      }.bind(this));
    },
    UploadVerification: function (agree) {
      var annotator = this.GetAnnotator();
      if (!annotator) return;
      var csrfToken = $("meta[name='csrf-token']").attr("content");
      var data = {};
      data.dataset = annotator.dataset._id;
      data.image = annotator.image._id;
      data.agree = agree ? "1" : "0";
      data._csrf = csrfToken;
      $.post("/dataset/add-verification", data, function (result) {
        if (result.status != "ok") {
          switch (result.message) {
            case "verification duplicate":
              this.$q.notify("您之前已驗證過這個標註");
              break;

            case "blacklist":
              alert("黑名單使用者無此權限");
              break;

            default:
              alert("驗證失敗");
              break;
          }
        } else this.$q.notify("驗證成功");

        this.imageSelect.verification.push({
          user: this.user._id,
          agree: data.agree
        });

        if (this.autoTask) {
          this.GenerateTask();
        } else {
          this.$emit("done");
        }
      }.bind(this));
    },
    OpenHelp: function () {
      var annotator = this.GetAnnotator();
      if (!annotator) return;
      annotator.openHelp = true;
    },
    SkipTask: function () {
      if (this.autoTask) {
        this.GenerateTask();
      } else {
        this.$emit("skip");
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/camera-capture.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/camera-capture.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "camera-capture",
  props: {},
  data: function () {
    return {
      selectCamerea: null,
      cameraList: [],
      camStatus: "無相機",
      camStream: null,
      openCameraSelect: false,
      OnCamSelect: null,
      OnCamStart: null,
      OnCamCapture: null,
      imageData: null
    };
  },
  created: function () {
    this.GetLastCamera();
  },
  beforeDestroy: function () {
    this.StopCamera();
  },
  methods: {
    GetLastCamera: function () {
      var storage = window.localStorage;
      this.lastCamera = JSON.parse(localStorage.getItem("lastCamera"));
    },
    SetLastCamera: function (camera) {
      var storage = window.localStorage;
      localStorage.setItem("lastCamera", JSON.stringify(camera));
    },
    OpenCameraSelect: function () {
      //list device
      if (!navigator.mediaDevices) {
        this.camStatus = "無法讀取裝置列表，請開啟權限或使用右下角的檔案上傳功能";
        return;
      }

      navigator.mediaDevices.enumerateDevices().then(function (devices) {
        this.cameraList = [];

        for (var i = 0; i < devices.length; i++) {
          var device = devices[i];
          var name = device.label;
          if (name == "") name = "相機" + (this.cameraList.length + 1);

          if (device.kind === 'videoinput') {
            this.cameraList.push({
              "id": device.deviceId,
              "name": name
            });
          }
        }

        if (this.cameraList.length > 0) {
          this.selectCamera = this.cameraList[0].id;
        }

        this.openCameraSelect = true;
      }.bind(this));
    },

    SelectCamera(camera) {
      this.SetLastCamera(camera);
      this.selectCamera = camera.id;
      this.StartCamera();
      if (this.OnCamSelect) this.OnCamSelect();
    },

    StartCamera: function () {
      this.camStatus = "無相機";
      var option = {};
      option.video = {};

      if (this.selectCamera) {
        option.video.deviceId = {
          exact: this.selectCamera
        };
      } else {
        option.video.facingMode = "environment";
      } //取得相機權限


      if (navigator.getUserMedia) {
        navigator.getUserMedia(option, function (stream) {
          this.camStream = stream;
          this.camStatus = "ok";
          if (this.OnCamStart) this.OnCamStart();
        }.bind(this), function (error) {
          this.camStatus = "讀取相機失敗";
        }.bind(this));
      } else {
        this.camStatus = "瀏覽器不支援相機";
      }

      this.openCameraSelect = false;
    },
    StopCamera: function () {
      if (this.camStream) {
        this.camStream.getTracks()[0].stop();
        this.camStream = null;
      }
    },
    CaptureImage: function () {
      var video = this.$refs.video;
      var dstCanvas = document.createElement("canvas");
      dstCanvas.width = video.videoWidth;
      dstCanvas.height = video.videoHeight;
      var dstCtx = dstCanvas.getContext('2d');
      dstCtx.save();
      dstCtx.drawImage(video, 0, 0);
      dstCtx.restore();
      this.imageData = dstCanvas.toDataURL('image/jpeg', 0.9);
      if (this.OnCamCapture) this.OnCamCapture();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-editor.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-editor.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_upload_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-upload.vue */ "./src/vue/image-upload.vue");
/* harmony import */ var _user_list_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-list.vue */ "./src/vue/user-list.vue");
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
  name: "dataset-editor",
  props: {
    info: Object
  },
  components: {
    "image-upload": _image_upload_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    "user-list": _user_list_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function () {
    return {
      annotationTypeOption: [{
        "label": "框選標註",
        "value": "bbox"
      }, {
        "label": "整張標註",
        "value": "image"
      }],
      externalLinkOption: [{
        "label": "無",
        "value": ""
      }, {
        "label": "山河事件簿",
        "value": "riverlog"
      }, {
        "label": "紫豹在哪裡",
        "value": "purbao"
      }],
      tagName: "",
      uploadCover: false
    };
  },
  created: function () {},
  methods: {
    ChangeCover: function () {
      if (this.uploadCover) return;
      var uploader = this.$refs.uploader;

      uploader.OnSucc = function (result) {
        if (result.status != "ok") return alert("更新圖片失敗");
        this.uploadCover = false;
        this.$emit("updateCover");
      }.bind(this);

      uploader.OnFail = function (errorMessage) {
        console.log(errorMessage);

        switch (errorMessage) {
          case "Request Entity Too Large":
            return alert("影像資料過大");
        }
      }.bind(this);

      uploader.OnChange = function () {
        this.uploadCover = true;
        uploader.UploadImage();
      }.bind(this);

      uploader.url = "/dataset/change-cover";
      uploader.additionData = {
        "dataset": this.info._id
      };
      uploader.SelectFile();
    },
    UpdateDataset: function () {
      this.$refs.name.validate();

      if (this.$refs.name.hasError) {
        return this.$q.notify({
          color: "negative",
          message: "資料集名稱無效"
        });
      }

      this.$refs.maxWidth.validate();

      if (this.$refs.maxWidth.hasError) {
        return this.$q.notify({
          color: "negative",
          message: "最大寬度無效"
        });
      }

      this.$refs.maxHeight.validate();

      if (this.$refs.maxHeight.hasError) {
        return this.$q.notify({
          color: "negative",
          message: "最大高度無效"
        });
      }

      this.$refs.annotationType.validate();

      if (this.$refs.annotationType.hasError) {
        return this.$q.notify({
          color: "negative",
          message: "標註方式無效"
        });
      }

      if (this.info.tagArr.length == 0) {
        return this.$q.notify({
          color: "negative",
          message: "請至少新增一個標籤"
        });
      }

      var csrfToken = $("meta[name='csrf-token']").attr("content");
      var data = {};
      data.dataset = this.info._id;
      data.info = this.info;
      data._csrf = csrfToken;
      $.post("/dataset/update-dataset", data, function (result) {
        if (result.status != "ok") return alert("修改失敗");
        this.$q.notify("修改成功");
        this.$emit("confirm");
      }.bind(this));
    },
    AddTag: function () {
      if (!this.info.tagArr) Vue.set(this.info, "tagArr", []);

      if (this.info.tagArr.includes(this.tagName)) {
        alert("此標籤已存在");
      } else this.info.tagArr.push(this.tagName);

      this.tagName = "";
    },
    RemoveTag: function (i) {
      this.info.tagArr.splice(i, 1);
    },
    AddMember: function (user) {
      var duplicate = this.info.member.filter(function (member) {
        return member._id == user._id;
      });

      if (duplicate.length == 0) {
        this.info.member.unshift(user);
      } else {
        this.$q.notify("此使用者已是私密成員");
      }
    },
    RemoveMember: function (i) {
      this.info.member.splice(i, 1);
    },
    AddMaster: function (user) {
      var duplicate = this.info.master.filter(function (master) {
        return master._id == user._id;
      });

      if (duplicate.length == 0) {
        this.info.master.unshift(user);
      } else {
        this.$q.notify("此使用者已是私密成員");
      }
    },
    RemoveMaster: function (i) {
      this.info.master.splice(i, 1);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-list.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-list.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataset_editor_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataset-editor.vue */ "./src/vue/dataset-editor.vue");
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
  name: "dataset-list",
  props: {
    mode: String
  },
  components: {
    "dataset-editor": _dataset_editor_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function () {
    return {
      searchKey: "",
      sortKey: "createdAt",
      sortOption: [{
        label: "建立時間",
        value: "createdAt"
      }, {
        label: "更新時間",
        value: "updatedAt"
      }, {
        label: "圖片數",
        value: "picNum"
      }, {
        label: "標註數",
        value: "annotationNum"
      }],
      orderType: "desc",
      orderTypeOption: [{
        label: "遞減",
        value: "desc"
      }, {
        label: "遞增",
        value: "asc"
      }],
      datasetArr: [],
      datasetPage: 0,
      hasMoreDataset: true,
      editInfo: {},
      openDatasetEditor: false,
      favoriteID: []
    };
  },
  created: function () {
    this.LoadMoreDataset();
  },
  methods: {
    LoadMoreDataset: function () {
      var url = "/dataset/list-dataset";
      url += "?page=" + this.datasetPage;
      url += "&sort=" + this.sortKey;
      url += "&orderType=" + this.orderType;
      url += "&keyword=" + this.searchKey;
      if (this.mode == "favorite") url += "&favorite=1";
      $.get(url, function (result) {
        if (result.status != "ok") return;
        this.hasMoreDataset = result.data.hasMore;
        this.datasetArr = this.datasetArr.concat(result.data.dataset);
        this.datasetPage++;
      }.bind(this));
    },
    ClearDataset: function () {
      this.datasetArr = [];
      this.datasetPage = 0;
    },
    ReloadDataset: function (closeDialog) {
      this.ClearDataset();
      this.LoadMoreDataset();
      if (closeDialog) this.openDatasetEditor = false;
    },
    AddDataset: function () {
      var csrfToken = $("meta[name='csrf-token']").attr("content");
      var data = {};
      data._csrf = csrfToken;
      $.post("/dataset/create-dataset", data, function (result) {
        if (result.status != "ok") return alert("新增失敗");
        this.ReloadDataset();
        this.openDatasetEditor = true;
        this.editInfo = result.data;
      }.bind(this));
    },
    ModifyDataset: function (data) {
      this.openDatasetEditor = true;
      this.editInfo = Object.assign({}, data);
    },
    DeleteDataset: function (dataset) {
      if (confirm("刪除資料集將一併刪除所有影像與標註資料，並且無法復原。確定刪除資料集 " + dataset.name + "?")) {
        var csrfToken = $("meta[name='csrf-token']").attr("content");
        var data = {};
        data.id = dataset._id;
        data._csrf = csrfToken;
        $.post("/dataset/delete-dataset", data, function (result) {
          if (result.status != "ok") return alert("刪除失敗");
          this.ReloadDataset();
        }.bind(this));
      }
    },
    GoToDataset: function (dataset) {
      window.location.href = "/dataset?id=" + dataset._id;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-select.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-select.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************/
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
  name: "dataset-select",
  props: {
    forUpload: Boolean,
    forAnnotation: Boolean
  },
  components: {},
  data: function () {
    return {
      searchKey: "",
      datasetArr: [],
      hasMore: true,
      selectIndex: -1,
      lastDataset: {}
    };
  },
  created: function () {
    this.GetLastDataset();
  },
  methods: {
    GetLastDataset: function () {
      var storage = window.localStorage;
      this.lastDataset = JSON.parse(localStorage.getItem("lastDataset"));
    },
    SetLastDataset: function (dataset) {
      var storage = window.localStorage;
      localStorage.setItem("lastDataset", JSON.stringify(dataset));
    },
    LoadMoreDataset: function (index, done) {
      var url = "/dataset/list-dataset";
      url += "?page=" + (index - 1);
      url += "&sort=updatedAt";
      url += "&orderType=desc";

      if (this.forUpload) {
        url += "&enableUpload=1";
      }

      if (this.forAnnotation) {
        url += "&enableAnnotation=1";
      }

      url += "&keyword=" + this.searchKey;
      $.get(url, function (result) {
        if (result.status != "ok") return;
        this.hasMore = result.data.hasMore;

        if (!this.hasMore) {
          this.$refs.datasetScroll.stop();
        }

        this.datasetArr = this.datasetArr.concat(result.data.dataset);
        done();
      }.bind(this));
    },
    ReloadDataset: function () {
      this.datasetArr = [];
      this.$refs.datasetScroll.reset();
      this.$refs.datasetScroll.resume();
      this.selectIndex = -1;
    },
    GetSelectDataset: function () {
      if (this.selectIndex == -1 && this.lastDataset) {
        return this.lastDataset;
      }

      if (this.selectIndex < 0 || this.selectIndex >= this.datasetArr.length) return null;else return this.datasetArr[this.selectIndex];
    },
    SelectItem: function (i) {
      this.selectIndex = i;
      this.$emit("change");
    },
    ConfirmSelect: function () {
      if (this.selectIndex == -1 && this.lastDataset) {
        return this.$emit("confirm");
      }

      if (this.selectIndex < 0 || this.selectIndex >= this.datasetArr.length) return alert("請選擇資料集");
      this.SetLastDataset(this.datasetArr[this.selectIndex]);
      this.$emit("confirm");
    },
    CancelSelect: function () {
      this.$emit("cancel");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-edit.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-edit.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "image-edit",
  props: {
    "maxResW": {
      type: Number,
      default: 1024
    },
    "maxResH": {
      type: Number,
      default: 1024
    }
  },
  data: function () {
    return {
      imageData: null,
      cropper: null,
      mode: "move"
    };
  },
  mounted: function () {},
  methods: {
    SetImage: function (imageData) {
      if (this.cropper) {
        this.cropper.destroy();
      }

      var image = this.$refs.image;

      image.onload = function () {
        this.cropper = new Cropper(image, {
          viewMode: 2,
          dragMode: this.mode,
          autoCrop: false
        });
      }.bind(this);

      this.imageData = imageData;
    },
    ChangeMode: function (mode) {
      this.mode = mode;
      this.cropper.setDragMode(mode);
    },
    ClearEdit: function () {
      if (confirm("確定清除所有編輯動作?")) {
        this.cropper.clear();
        this.cropper.reset();
      }
    },
    GetCanvasData: function () {
      return this.cropper.getCroppedCanvas();
    },
    ConfirmEdit: function () {
      this.$emit("confirm");
    },
    CancelEdit: function () {
      this.$emit("cancel");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-info.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "image-info",
  props: {
    dataset: Object,
    initDataTime: String,
    initLat: Number,
    initLng: Number,
    initRemark: String
  },
  components: {
    "location-select": _location_select_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function () {
    return {
      dataTime: null,
      remark: ""
    };
  },
  mounted: function () {
    var tz = spacetime().name; //get browser time zone

    if (this.initDataTime) {
      this.dataTime = spacetime(this.initDataTime).goto(tz).unixFmt("yyyy-MM-ddTHH:mm");
    } else {
      this.dataTime = spacetime.now().unixFmt("yyyy-MM-ddTHH:mm");
    }

    if (this.initLat && this.initLng) {
      this.$refs.locationSelect.SetPosition(this.initLat, this.initLng);
    } else if (this.dataset.enableGPS) {
      this.$refs.locationSelect.GetGPS();
    }

    if (this.initRemark) this.remark = this.initRemark;
  },
  methods: {
    GetImageInfo: function () {
      var info = {};
      var s = spacetime.now();
      info.dataTime = spacetime(this.dataTime, s.timezone().name).format("iso");
      info.remark = this.remark;

      if (this.$refs.locationSelect) {
        info.loc = this.$refs.locationSelect.loc;
      }

      return info;
    },
    ConfirmSelect: function () {
      this.$emit("confirm");
    },
    CancelSelect: function () {
      this.$emit("cancel");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-upload.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-upload.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "image-upload",
  props: {
    "maxResW": {
      type: Number,
      default: 1024
    },
    "maxResH": {
      type: Number,
      default: 1024
    },
    "showPreview": Boolean,
    "src": String
  },
  data: function () {
    return {
      file: null,
      imageData: null,
      url: "",
      additionData: {},
      OnSucc: null,
      OnFail: null,
      OnProgress: null,
      OnChange: null,
      maxW: 1024,
      maxH: 1024,
      uploading: false,
      loc: {}
    };
  },
  created: function () {
    if (this.src) {
      this.imageData = this.src;
    }

    if (this.maxResW) this.maxW = this.maxResW;
    if (this.maxResH) this.maxH = this.maxResH;
  },
  methods: {
    SetMaxRes: function (maxW, maxH) {
      this.maxW = maxW;
      this.maxH = maxH;
    },
    SelectFile: function () {
      var elem = this.$refs.uploadBt;
      elem.click();
    },
    UpdateFile: function (e) {
      var files = e.target.files;

      if (FileReader && files && files.length) {
        var reader = new FileReader();

        reader.onload = function () {
          //read file ready
          var img = new Image();

          img.onload = function () {
            //image load ready
            //get gps position if exist
            EXIF.getData(img, function () {
              function ToDegree(arr, dir) {
                if (!arr) return null;
                var deg = arr[0] + arr[1] / 60 + arr[2] / 3600;
                if (dir == "S" || dir == "W") deg *= -1;
                return deg;
              }

              var lat = ToDegree(img.exifdata.GPSLatitude, img.exifdata.GPSLatitudeRef);
              var lng = ToDegree(img.exifdata.GPSLongitude, img.exifdata.GPSLongitudeRef);

              if (lat && lng) {
                this.loc.lat = lat;
                this.loc.lng = lng;
              }
            }.bind(this));
            this.FitCanvasFromImage(img);

            if (this.OnChange) {
              this.OnChange();
            }
          }.bind(this);

          img.src = reader.result;
        }.bind(this);

        this.file = files[0];
        reader.readAsDataURL(files[0]);
      }
    },
    FitCanvasFromImage: function (image) {
      var srcCanvas = document.createElement("canvas");
      srcCanvas.width = image.width;
      srcCanvas.height = image.height;
      var srcCtx = srcCanvas.getContext('2d');
      srcCtx.save();
      srcCtx.drawImage(image, 0, 0);
      srcCtx.restore();
      var scaleW = this.maxW / image.width;
      var scaleH = this.maxH / image.height;
      var scale = Math.min(scaleW, scaleH);
      var w = image.width * scale;
      var h = image.height * scale;
      var dstCanvas = this.ResizeImage(srcCanvas, w, h);
      this.imageData = dstCanvas.toDataURL('image/jpeg', 0.9);
    },
    FitCanvasFromCanvas: function (canvas) {
      var scaleW = this.maxW / canvas.width;
      var scaleH = this.maxH / canvas.height;
      var scale = Math.min(scaleW, scaleH);
      var w = canvas.width * scale;
      var h = canvas.height * scale;
      var dstCanvas = this.ResizeImage(canvas, w, h);
      this.imageData = dstCanvas.toDataURL('image/jpeg', 0.9);
    },
    CropImage: function (canvas, x, y, w, h) {
      var dstCanvas = document.createElement("canvas");
      dstCanvas.width = w;
      dstCanvas.height = h;
      var dstCtx = dstCanvas.getContext('2d');
      dstCtx.save();
      dstCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);
      dstCtx.restore();
      return dstCanvas;
    },
    ResizeImage: function (canvas, w, h) {
      var resizeW = Math.max(canvas.width * 0.5, w);
      var resizeH = Math.max(canvas.height * 0.5, h);
      var srcCanvas = canvas; //每次降一半，減少鋸齒

      while (resizeW > w || resizeH > h) {
        var dstCanvas = document.createElement("canvas");
        dstCanvas.width = resizeW;
        dstCanvas.height = resizeH;
        var dstCtx = dstCanvas.getContext('2d');
        dstCtx.drawImage(srcCanvas, 0, 0, srcCanvas.width, srcCanvas.height, 0, 0, resizeW, resizeH);
        srcCanvas = dstCanvas;
        resizeW = Math.max(srcCanvas.width * 0.5, w);
        resizeH = Math.max(srcCanvas.height * 0.5, h);
      } //最終size


      var dstCanvas = document.createElement("canvas");
      dstCanvas.width = w;
      dstCanvas.height = h;
      var dstCtx = dstCanvas.getContext('2d');
      dstCtx.drawImage(srcCanvas, 0, 0, srcCanvas.width, srcCanvas.height, 0, 0, w, h);
      return dstCanvas;
    },
    UploadImage: function () {
      if (this.uploading) return;
      this.uploading = true;
      var csrfToken = $("meta[name='csrf-token']").attr("content");
      var formData = new FormData();

      for (var key in this.additionData) {
        formData.append(key, this.additionData[key]);
      }

      formData.append("uploadImage", this.imageData);
      $.ajax({
        url: this.url,
        headers: {
          "csrf-token": csrfToken
        },
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {
          var xhr = $.ajaxSettings.xhr();

          if (xhr.upload && this.OnProgress) {
            xhr.upload.addEventListener("progress", this.OnProgress, false);
          }

          return xhr;
        }.bind(this),
        success: function (result) {
          this.uploading = false;

          if (result.status != "ok") {
            switch (result.message) {
              case "blacklist":
                return alert("黑名單使用者無此權限");

              default:
                return alert("上傳影像失敗");
            }
          }

          if (this.OnSucc) {
            return this.OnSucc(result);
          }
        }.bind(this),
        error: function (jqXHR, textStatus, errorMessage) {
          this.uploading = false;

          if (this.OnFail) {
            return this.OnFail(errorMessage);
          }
        }.bind(this)
      });
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
    mode: String,
    initLoc: Object
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

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/main-app.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/main-app.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/util.js */ "./src/js/util.js");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _topbar_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./topbar.vue */ "./src/vue/topbar.vue");
/* harmony import */ var _dataset_list_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dataset-list.vue */ "./src/vue/dataset-list.vue");
/* harmony import */ var _uploader_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uploader.vue */ "./src/vue/uploader.vue");
/* harmony import */ var _annotator_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./annotator.vue */ "./src/vue/annotator.vue");
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
  name: "main-app",
  components: {
    "topbar": _topbar_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    "dataset-list": _dataset_list_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    "uploader": _uploader_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    "annotator": _annotator_vue__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  data: function () {
    return {
      tab: "dataset",
      user: null
    };
  },
  created: function () {
    var urlParam = _js_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].GetUrlParameter();

    if (urlParam.message) {
      alert(decodeURIComponent(urlParam.message));
    }

    $.get("/user/info", function (result) {
      if (result.status != "ok") return;
      this.user = result.data;
    }.bind(this));
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-select.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/tag-select.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "tag-select",
  props: {
    dataset: Object
  },
  components: {},
  data: function () {
    return {
      tagArr: [],
      selectTag: ""
    };
  },
  created: function () {},
  methods: {
    FilterTag: function (val, update, abort) {
      update(function () {
        this.tagArr = this.dataset.tagArr.filter(function (v) {
          return v.indexOf(val) > -1;
        }.bind(this));
      }.bind(this));
    },
    SelectTag: function (value) {
      this.selectTag = value;
      this.$emit("change");
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

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/uploader.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/uploader.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _camera_capture_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera-capture.vue */ "./src/vue/camera-capture.vue");
/* harmony import */ var _image_upload_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-upload.vue */ "./src/vue/image-upload.vue");
/* harmony import */ var _image_edit_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-edit.vue */ "./src/vue/image-edit.vue");
/* harmony import */ var _dataset_select_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dataset-select.vue */ "./src/vue/dataset-select.vue");
/* harmony import */ var _image_info_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./image-info.vue */ "./src/vue/image-info.vue");
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
  name: "uploader",
  components: {
    "camera-capture": _camera_capture_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    "image-upload": _image_upload_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    "image-edit": _image_edit_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    "dataset-select": _dataset_select_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    "image-info": _image_info_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  props: {
    user: Object,
    dataset: Object
  },
  data: function () {
    return {
      camStatus: "",
      stepArr: [],
      step: 0,
      datasetSelect: null,
      imageInfo: null,
      initLoc: {}
    };
  },
  mounted: function () {
    if (!this.user) window.location.href = "/login?intentUrl=" + encodeURIComponent(window.location.pathname + window.location.search);
    this.stepArr = [];
    this.stepArr.push({
      "id": "capture",
      name: "拍照選檔"
    });
    this.stepArr.push({
      "id": "crop",
      name: "旋轉裁切"
    });

    if (!this.dataset) {
      this.stepArr.push({
        "id": "dataset",
        name: "選擇資料集"
      });
    } else {
      this.datasetSelect = this.dataset;
    }

    this.stepArr.push({
      "id": "info",
      name: "影像資訊"
    });
    this.ChangeCamera();
  },
  methods: {
    ChangeCamera: function () {
      var cam = this.$refs.cam;

      cam.OnCamStart = function () {
        this.camStatus = cam.camStatus;
      }.bind(this);

      cam.OpenCameraSelect();
    },
    CaptureCameraImage: function () {
      var cam = this.$refs.cam;

      cam.OnCamCapture = function () {
        this.$refs.imageEdit.SetImage(cam.imageData);
        this.NextStep();
      }.bind(this);

      cam.CaptureImage();
    },
    SelectFile: function () {
      var uploader = this.$refs.uploader;

      uploader.OnChange = function () {
        this.initLoc = uploader.loc;
        this.$refs.imageEdit.SetImage(uploader.imageData);
        this.NextStep();
      }.bind(this);

      uploader.SelectFile();
    },
    NextStep: function () {
      this.step++;

      if (this.step >= this.stepArr.length) {
        this.UploadImageToDataset();
      }
    },
    PrevStep: function () {
      this.step--;
      if (this.step < 0) this.step = 0;
    },
    DatasetChange: function () {
      if (this.dataset) return;
      this.datasetSelect = this.$refs.datasetSelect.GetSelectDataset();
      console.log(this.datasetSelect);
      var uploader = this.$refs.uploader;
      uploader.SetMaxRes(this.datasetSelect.maxWidth, this.datasetSelect.maxHeight);
    },
    UpdateImageInfo: function () {
      this.imageInfo = this.$refs.imageInfo.GetImageInfo();
    },
    UploadImageToDataset: function () {
      var dataset = this.dataset || this.datasetSelect;
      var loc, remark, dataTime;

      if (this.imageInfo) {
        loc = this.imageInfo.loc;
        remark = this.imageInfo.remark;
        dataTime = this.imageInfo.dataTime;
      }

      var uploader = this.$refs.uploader;

      uploader.OnSucc = function (result) {
        if (result.status != "ok") {
          switch (result.message) {
            case "blacklist":
              return alert("黑名單使用者無此權限");

            default:
              return alert("上傳圖片失敗");
          }
        }

        this.step = 0;
        this.$q.notify("已將影像上傳至" + dataset.name);
        this.$emit("uploaded");
      }.bind(this);

      uploader.OnFail = function (errorMessage) {
        console.log(errorMessage);

        switch (errorMessage) {
          case "Request Entity Too Large":
            return alert("影像資料過大");
        }
      }.bind(this);

      uploader.url = "/dataset/upload-image";
      var data = {};
      data.dataset = dataset._id;

      if (loc) {
        data.lat = loc.lat;
        data.lng = loc.lng;
      }

      if (remark && remark != "") {
        data.remark = remark;
      }

      if (dataTime) {
        data.dataTime = dataTime;
      }

      uploader.additionData = data;
      var canvas = this.$refs.imageEdit.GetCanvasData();
      uploader.FitCanvasFromCanvas(canvas);
      uploader.UploadImage();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/user-list.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/user-list.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user_select_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-select.vue */ "./src/vue/user-select.vue");
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
  name: "user-list",
  props: {
    enableAdd: Boolean,
    enableSearch: Boolean,
    enableRemove: Boolean,
    userAuth: String,
    userStatus: String,
    list: Array
  },
  components: {
    "user-select": _user_select_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function () {
    return {
      searchKey: "",
      userArr: [],
      userPage: 0,
      hasMoreUser: true,
      openUserSelect: false
    };
  },
  created: function () {
    if (!this.list) {
      this.LoadMoreUserList();
    } else {
      this.userArr = this.list;
    }
  },
  methods: {
    LoadMoreUserList: function () {
      var url = "/user/list-user";
      url += "?page=" + this.userPage;
      url += "&keyword=" + this.searchKey;

      if (this.userAuth) {
        url += "&authType=" + this.userAuth;
      }

      if (this.userStatus) {
        url += "&status=" + this.userStatus;
      }

      $.get(url, function (result) {
        if (result.status != "ok") return;
        this.hasMoreUser = result.data.hasMore;
        this.userArr = this.userArr.concat(result.data.user);
        this.userPage++;
      }.bind(this));
    },
    ClearUserList: function () {
      this.userArr = [];
      this.userPage = 0;
    },
    ReloadUserList: function () {
      this.ClearUserList();

      if (this.list) {
        this.userArr = this.list.filter(function (d) {
          if (d.name.indexOf(this.searchKey) != -1) return true;
          if (d.contactEmail.indexOf(this.searchKey) != -1) return true;
          return false;
        });
      } else {
        this.LoadMoreUserList();
      }
    },
    AddUser: function () {
      this.openUserSelect = false;
      var user = this.$refs.userSelect.GetSelectUser();
      if (!user) return;
      this.$emit("add", user);
    },
    RemoveUser: function (i) {
      this.$emit("remove", i);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/user-select.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/user-select.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************/
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
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "user-select",
  props: {},
  components: {},
  data: function () {
    return {
      searchKey: "",
      userArr: [],
      hasMore: true,
      selectIndex: -1
    };
  },
  created: function () {},
  methods: {
    LoadMoreUser: function (index, done) {
      var url = "/user/list-user";
      url += "?page=" + (index - 1);
      url += "&keyword=" + this.searchKey;
      $.get(url, function (result) {
        if (result.status != "ok") return;
        this.hasMore = result.data.hasMore;

        if (!this.hasMore) {
          this.$refs.userScroll.stop();
        }

        this.userArr = this.userArr.concat(result.data.user);
        done();
      }.bind(this));
    },
    ReloadUser: function () {
      this.userArr = [];
      this.$refs.userScroll.reset();
      this.$refs.userScroll.resume();
      this.selectIndex = -1;
    },
    GetSelectUser: function () {
      if (this.selectIndex < 0 || this.selectIndex >= this.userArr.length) return null;else return this.userArr[this.selectIndex];
    },
    SelectItem: function (i) {
      this.selectIndex = i;
      this.$emit("change");
    },
    ConfirmSelect: function () {
      if (this.selectIndex < 0 || this.selectIndex >= this.userArr.length) return alert("請選擇使用者");
      this.$emit("confirm");
    },
    CancelSelect: function () {
      this.$emit("cancel");
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-bbox.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator-bbox.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".annotator-bbox {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.annotator-bbox .tool-set {\n    position: absolute;\n    display: inline-block;\n    bottom: 10px;\n    left: 10px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-image.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator-image.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".annotator-image {\n  width: 100%;\n  height: 100%;\n}\n.annotator-image .image {\n    margin: auto;\n    max-width: 800px;\n    max-height: 100%;\n}\n.annotator-image .tag-select {\n    width: 150px;\n    display: inline-block;\n    padding: 0px 5px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".annotator {\n  width: 100%;\n  height: 100%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/camera-capture.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/camera-capture.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".camera-capture {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  display: flex;\n  justify-content: center;\n}\n.camera-capture video {\n    width: auto;\n    height: 100%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-editor.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-editor.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".dataset-editor {\n  width: 100%;\n}\n.dataset-editor .cover-container {\n    width: 320px;\n    height: 240px;\n    position: relative;\n}\n.dataset-editor .cover-container .change-bt {\n      position: absolute;\n      bottom: 0px;\n      left: 0px;\n      width: 100%;\n      background-color: rgba(0, 0, 0, 0.5);\n      color: #ffffff;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-list.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-list.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".dataset-list {\n  width: 100%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-select.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-select.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".dataset-select {\n  width: 100%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-edit.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-edit.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".image-edit {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  display: flex;\n  justify-content: center;\n}\n.image-edit img {\n    width: 100%;\n    height: 100%;\n    object-fit: contain;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-info.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".image-info {\n  width: 100%;\n  height: 100%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-upload.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-upload.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".image-upload {\n  width: 100%;\n  height: 100%;\n}\n.image-upload img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n}\n", ""]);
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/main-app.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/main-app.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".main-app {\n  width: 100%;\n  height: 100%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-select.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/tag-select.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".tag-select {\n  width: 100%;\n}\n", ""]);
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/uploader.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/uploader.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".camera-capture {\n  width: 100%;\n  height: 100%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/user-list.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/user-list.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".user-list {\n  width: 100%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/user-select.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/user-select.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".user-select {\n  width: 100%;\n}\n", ""]);
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-bbox.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator-bbox.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./annotator-bbox.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-bbox.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-image.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator-image.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./annotator-image.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-image.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./annotator.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/camera-capture.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/camera-capture.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./camera-capture.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/camera-capture.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-editor.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-editor.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-editor.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-editor.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-list.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-list.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-list.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-list.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-select.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-select.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-select.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-select.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-edit.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-edit.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./image-edit.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-edit.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-info.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./image-info.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-upload.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-upload.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./image-upload.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-upload.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/main-app.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/main-app.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./main-app.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/main-app.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-select.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/tag-select.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./tag-select.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-select.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/uploader.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/uploader.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./uploader.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/uploader.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/user-list.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/user-list.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./user-list.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/user-list.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/user-select.vue?vue&type=style&index=0&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/user-select.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./user-select.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/user-select.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-bbox.vue?vue&type=template&id=0ab9c93c&lang=html&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator-bbox.vue?vue&type=template&id=0ab9c93c&lang=html& ***!
  \***********************************************************************************************************************************************************************************************************/
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
    { staticClass: "annotator-bbox" },
    [
      _c("img", {
        ref: "srcImage",
        staticClass: "hidden",
        attrs: { src: _vm.image.url },
        on: { load: _vm.ChangeImage }
      }),
      _vm._v(" "),
      _vm.task == "view"
        ? _c("div", { staticClass: "column fit" }, [
            _c("div", { ref: "viewCanvas", staticClass: "col" })
          ])
        : _c(
            "div",
            { staticClass: "column fit" },
            [
              _c("div", { staticClass: "col q-ma-auto relative-position" }, [
                _c("div", { ref: "editCanvas", staticClass: "fit" }),
                _vm._v(" "),
                _vm.task == "annotate"
                  ? _c(
                      "div",
                      { staticClass: "tool-set" },
                      [
                        _c("q-btn-toggle", {
                          attrs: {
                            glossy: "",
                            size: "sm",
                            options: _vm.toolOption,
                            color: "grey-1",
                            "text-color": "grey-6"
                          },
                          on: {
                            input: function($event) {
                              return _vm.ChangeTool()
                            }
                          },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "bbox",
                                fn: function() {
                                  return [
                                    _c("q-icon", {
                                      attrs: { name: "aspect_ratio" }
                                    })
                                  ]
                                },
                                proxy: true
                              },
                              {
                                key: "move",
                                fn: function() {
                                  return [
                                    _c("q-icon", {
                                      attrs: { name: "pan_tool" }
                                    })
                                  ]
                                },
                                proxy: true
                              }
                            ],
                            null,
                            false,
                            1866943705
                          ),
                          model: {
                            value: _vm.tool,
                            callback: function($$v) {
                              _vm.tool = $$v
                            },
                            expression: "tool"
                          }
                        })
                      ],
                      1
                    )
                  : _vm._e()
              ]),
              _vm._v(" "),
              _vm.task == "annotate"
                ? _c(
                    "q-banner",
                    {
                      staticClass: "bg-grey-6 text-white col-shrink",
                      attrs: { "inline-actions": "" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "action",
                            fn: function() {
                              return [
                                _c("q-btn", {
                                  staticClass: "q-ma-xs bg-primary",
                                  attrs: { label: "確定" },
                                  on: {
                                    click: function($event) {
                                      return _vm.SetAnnotation()
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("q-btn", {
                                  staticClass: "q-ma-xs bg-primary",
                                  attrs: { label: "略過" },
                                  on: {
                                    click: function($event) {
                                      return _vm.SkipTask()
                                    }
                                  }
                                })
                              ]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        false,
                        2135591169
                      )
                    },
                    [
                      _c("div", { staticClass: "text-h6 inline-block" }, [
                        _vm._v(
                          "\n\t\t\t\t請框選出影像中的物件並給予標籤\n\t\t\t"
                        )
                      ])
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.task == "verify"
                ? _c(
                    "q-banner",
                    {
                      staticClass: "bg-grey-6 text-white col-shrink",
                      attrs: { "inline-actions": "" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "action",
                            fn: function() {
                              return [
                                _c("q-btn", {
                                  staticClass: "q-ma-xs bg-primary",
                                  attrs: { label: "是" },
                                  on: {
                                    click: function($event) {
                                      return _vm.SetVerification(true)
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("q-btn", {
                                  staticClass: "q-ma-xs bg-primary",
                                  attrs: { label: "否" },
                                  on: {
                                    click: function($event) {
                                      return _vm.SetVerification(false)
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("q-btn", {
                                  staticClass: "q-ma-xs bg-primary",
                                  attrs: { label: "略過" },
                                  on: {
                                    click: function($event) {
                                      return _vm.SkipTask()
                                    }
                                  }
                                })
                              ]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        false,
                        767176183
                      )
                    },
                    [
                      _c("div", { staticClass: "text-h6 inline-block" }, [
                        _vm._v(
                          "\n\t\t\t\t請驗證此影像框選的物件及標籤是否正確?\n\t\t\t"
                        )
                      ])
                    ]
                  )
                : _vm._e()
            ],
            1
          ),
      _vm._v(" "),
      _c(
        "q-dialog",
        {
          attrs: { persistent: "" },
          model: {
            value: _vm.openTagSelect,
            callback: function($$v) {
              _vm.openTagSelect = $$v
            },
            expression: "openTagSelect"
          }
        },
        [
          _c(
            "q-card",
            [
              _c(
                "q-card-section",
                [
                  _c("div", { staticClass: "text-h6 q-py-sm" }, [
                    _vm._v("請選擇標籤")
                  ]),
                  _vm._v(" "),
                  _c("tag-select", {
                    ref: "tagSelect",
                    attrs: { dataset: _vm.dataset }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c("q-separator"),
              _vm._v(" "),
              _c(
                "q-card-actions",
                { attrs: { align: "around" } },
                [
                  _vm.newRect
                    ? _c("q-btn", {
                        attrs: { flat: "", label: "新增" },
                        on: {
                          click: function($event) {
                            return _vm.AddAnnotation()
                          }
                        }
                      })
                    : _c("q-btn", {
                        attrs: { flat: "", label: "修改" },
                        on: {
                          click: function($event) {
                            return _vm.ConfirmTagSelect()
                          }
                        }
                      }),
                  _vm._v(" "),
                  _c("q-btn", {
                    attrs: { flat: "", label: "取消" },
                    on: {
                      click: function($event) {
                        return _vm.CancelTagSelect()
                      }
                    }
                  }),
                  _vm._v(" "),
                  _vm.target
                    ? _c("q-btn", {
                        attrs: { flat: "", label: "刪除" },
                        on: {
                          click: function($event) {
                            return _vm.RemoveAnnotation()
                          }
                        }
                      })
                    : _vm._e()
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
        "q-dialog",
        {
          model: {
            value: _vm.openHelp,
            callback: function($$v) {
              _vm.openHelp = $$v
            },
            expression: "openHelp"
          }
        },
        [
          _c(
            "q-card",
            { staticClass: "full-width q-pa-sm" },
            [
              _c("q-card-section", [
                _c("div", { staticClass: "text-h6" }, [_vm._v("如何標註")]),
                _vm._v(" "),
                _c("ul", { staticClass: "text-subtitle2" }, [
                  _c("li", [
                    _vm._v(
                      "框選出影像中所有符合標籤的物件並選擇對應的標籤，完成後按「確定」送出。"
                    )
                  ]),
                  _vm._v(" "),
                  _c("li", [
                    _vm._v("優良的標註應符合以下條件：\n\t\t\t\t\t\t"),
                    _c("ol", [
                      _c("li", [
                        _vm._v("框選出所有符合標籤的物件並選擇正確的物件標籤")
                      ]),
                      _vm._v(" "),
                      _c("li", [
                        _vm._v(
                          "方框應完整涵蓋該物件可以看到的範圍(不包含被遮住的部分)，並且盡量逼近該物件的大小"
                        )
                      ]),
                      _vm._v(" "),
                      _c("li", [
                        _vm._v(
                          "一個方框只能框一個物件，若有多個物件請分不同方框框選"
                        )
                      ])
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "text-h6" }, [_vm._v("如何驗證")]),
                _vm._v(" "),
                _c("ol", { staticClass: "text-subtitle2" }, [
                  _c("li", [_vm._v("確認影像中框選出的物件標籤是否正確")]),
                  _vm._v(" "),
                  _c("li", [
                    _vm._v(
                      "確認方框是否完整涵蓋該物件可以看到的範圍(不包含被遮住的部分)，並且盡量逼近該物件的大小"
                    )
                  ]),
                  _vm._v(" "),
                  _c("li", [
                    _vm._v(
                      "確認一個方框只能框一個物件，若有多個物件需分成不同方框框選"
                    )
                  ]),
                  _vm._v(" "),
                  _c("li", [_vm._v("確認是否已框選出所有符合標籤的物件")]),
                  _vm._v(" "),
                  _c("li", [
                    _vm._v(
                      "若以上條件皆符合即為優良的標註，按「是」送出。反之按「否」。"
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "text-h6" }, [_vm._v("參考資料")]),
                _vm._v(" "),
                _c("ul", [
                  _c("li", [
                    _c(
                      "a",
                      {
                        attrs: {
                          href:
                            "http://vision.stanford.edu/pdf/bbox_submission.pdf",
                          target: "_blank"
                        }
                      },
                      [
                        _vm._v(
                          "Su, H., Deng, J., & Fei-Fei, L. (2012). Crowdsourcing annotations for visual object detection. In AAAI human computation workshop."
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("li", [
                    _c(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://chtseng.wordpress.com/2019/03/10/ai%e9%a0%98%e5%9f%9f%e7%9a%84%e8%97%8d%e9%a0%98%e5%b7%a5%e4%bd%9c-image-labeling/",
                          target: "_blank"
                        }
                      },
                      [_vm._v("AI領域的藍領工作- Image Labeling")]
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _c(
                "q-card-actions",
                { staticClass: "justify-center" },
                [
                  _c("q-btn", {
                    directives: [
                      { name: "close-popup", rawName: "v-close-popup" }
                    ],
                    attrs: { flat: "", label: "確定" }
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-image.vue?vue&type=template&id=5b4fe650&lang=html&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator-image.vue?vue&type=template&id=5b4fe650&lang=html& ***!
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
  return _c(
    "div",
    { staticClass: "annotator-image" },
    [
      _vm.task == "view"
        ? _c(
            "div",
            { staticClass: "column fit" },
            [
              _c(
                "q-img",
                {
                  staticClass: "col",
                  attrs: { contain: "", src: _vm.image.url }
                },
                [
                  _vm.image.annotation
                    ? _c(
                        "div",
                        {
                          staticClass:
                            "absolute-bottom text-subtitle1 text-center"
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t" +
                              _vm._s(_vm.image.annotation.annotation) +
                              "\n\t\t\t"
                          )
                        ]
                      )
                    : _vm._e()
                ]
              )
            ],
            1
          )
        : _c(
            "div",
            { staticClass: "column fit" },
            [
              _c("q-img", {
                staticClass: "col q-my-md",
                attrs: { contain: "", src: _vm.image.url }
              }),
              _vm._v(" "),
              _vm.task == "annotate"
                ? _c(
                    "q-banner",
                    {
                      staticClass: "bg-grey-6 text-white col-shrink",
                      attrs: { "inline-actions": "" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "action",
                            fn: function() {
                              return [
                                _c("q-btn", {
                                  staticClass: "q-ma-xs bg-primary",
                                  attrs: { label: "確定" },
                                  on: {
                                    click: function($event) {
                                      return _vm.SetAnnotation()
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("q-btn", {
                                  staticClass: "q-ma-xs bg-primary",
                                  attrs: { label: "略過" },
                                  on: {
                                    click: function($event) {
                                      return _vm.SkipTask()
                                    }
                                  }
                                })
                              ]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        false,
                        2135591169
                      )
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "row items-center" },
                        [
                          _c("div", { staticClass: "text-h6 inline-block" }, [
                            _vm._v(
                              "\n\t\t\t\t\t請選擇符合此影像的標籤\n\t\t\t\t"
                            )
                          ]),
                          _vm._v(" "),
                          _c("tag-select", {
                            ref: "tagSelect",
                            staticClass: "tag-select",
                            attrs: { dataset: _vm.dataset }
                          })
                        ],
                        1
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.task == "verify"
                ? _c(
                    "q-banner",
                    {
                      staticClass: "bg-grey-6 text-white col-shrink",
                      attrs: { "inline-actions": "" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "action",
                            fn: function() {
                              return [
                                _c("q-btn", {
                                  staticClass: "q-ma-xs bg-primary",
                                  attrs: { label: "是" },
                                  on: {
                                    click: function($event) {
                                      return _vm.SetVerification(true)
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("q-btn", {
                                  staticClass: "q-ma-xs bg-primary",
                                  attrs: { label: "否" },
                                  on: {
                                    click: function($event) {
                                      return _vm.SetVerification(false)
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("q-btn", {
                                  staticClass: "q-ma-xs bg-primary",
                                  attrs: { label: "略過" },
                                  on: {
                                    click: function($event) {
                                      return _vm.SkipTask()
                                    }
                                  }
                                })
                              ]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        false,
                        767176183
                      )
                    },
                    [
                      _c("div", { staticClass: "text-h6 inline-block" }, [
                        _vm._v(
                          "\n\t\t\t\t請驗證此影像是否為 " +
                            _vm._s(_vm.image.annotation.annotation) +
                            "?\n\t\t\t"
                        )
                      ])
                    ]
                  )
                : _vm._e()
            ],
            1
          ),
      _vm._v(" "),
      _c(
        "q-dialog",
        {
          model: {
            value: _vm.openHelp,
            callback: function($$v) {
              _vm.openHelp = $$v
            },
            expression: "openHelp"
          }
        },
        [
          _c(
            "q-card",
            { staticClass: "full-width q-pa-sm" },
            [
              _c("q-card-section", [
                _c("div", { staticClass: "text-h6" }, [_vm._v("如何標註")]),
                _vm._v(" "),
                _c("ul", { staticClass: "text-subtitle2" }, [
                  _c("li", [_vm._v("選擇符合此影像的標籤並按「確定」。")])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "text-h6" }, [_vm._v("如何驗證")]),
                _vm._v(" "),
                _c("ul", { staticClass: "text-subtitle2" }, [
                  _c("li", [
                    _vm._v("若此影像符合選擇的標籤，按「是」。反之按「否」。")
                  ])
                ])
              ]),
              _vm._v(" "),
              _c(
                "q-card-actions",
                { staticClass: "justify-center" },
                [
                  _c("q-btn", {
                    directives: [
                      { name: "close-popup", rawName: "v-close-popup" }
                    ],
                    attrs: { flat: "", label: "確定" }
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator.vue?vue&type=template&id=f7adf7ec&lang=html&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator.vue?vue&type=template&id=f7adf7ec&lang=html& ***!
  \******************************************************************************************************************************************************************************************************/
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
    { staticClass: "annotator bg-grey-9" },
    [
      _vm.datasetSelect && _vm.imageSelect && _vm.taskSelect
        ? _c(
            "div",
            { staticClass: "fit" },
            [
              _vm.datasetSelect.annotationType == "image"
                ? _c("annotator-image", {
                    ref: "annotatorImage",
                    attrs: {
                      dataset: _vm.datasetSelect,
                      image: _vm.imageSelect,
                      task: _vm.taskSelect
                    },
                    on: {
                      setAnnotation: _vm.UploadAnnotation,
                      setVerification: _vm.UploadVerification,
                      skipTask: _vm.SkipTask
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.datasetSelect.annotationType == "bbox"
                ? _c("annotator-bbox", {
                    ref: "annotatorBBox",
                    attrs: {
                      dataset: _vm.datasetSelect,
                      image: _vm.imageSelect,
                      task: _vm.taskSelect
                    },
                    on: {
                      setAnnotation: _vm.UploadAnnotation,
                      setVerification: _vm.UploadVerification,
                      skipTask: _vm.SkipTask
                    }
                  })
                : _vm._e()
            ],
            1
          )
        : _c("div", { staticClass: "fit row justify-center items-center" }, [
            _c("div", { staticClass: "text-h5 text-white" }, [
              _vm._v(_vm._s(_vm.status))
            ])
          ]),
      _vm._v(" "),
      _c(
        "q-dialog",
        {
          model: {
            value: _vm.openDatasetSelect,
            callback: function($$v) {
              _vm.openDatasetSelect = $$v
            },
            expression: "openDatasetSelect"
          }
        },
        [
          _c("dataset-select", {
            ref: "datasetSelect",
            attrs: { forAnnotation: "" },
            on: {
              confirm: function($event) {
                return _vm.ChangeDataset()
              },
              cancel: function($event) {
                _vm.openDatasetSelect = false
              }
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "q-page-sticky",
        { attrs: { position: "top-left", offset: [18, 18] } },
        [
          _c(
            "div",
            { staticClass: "column q-gutter-sm" },
            [
              _c(
                "q-btn",
                {
                  staticClass: "bg-primary text-white",
                  attrs: {
                    flat: "",
                    round: "",
                    size: "md",
                    icon: "help",
                    disable: _vm.imageSelect == null
                  },
                  on: {
                    click: function($event) {
                      return _vm.OpenHelp()
                    }
                  }
                },
                [
                  _c(
                    "q-tooltip",
                    { attrs: { "content-class": "bg-primary" } },
                    [_vm._v("如何標註")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "q-btn",
                {
                  staticClass: "bg-primary text-white",
                  attrs: {
                    flat: "",
                    round: "",
                    size: "md",
                    icon: "view_quilt",
                    disable: _vm.dataset != null
                  },
                  on: {
                    click: function($event) {
                      _vm.openDatasetSelect = true
                    }
                  }
                },
                [
                  _c(
                    "q-tooltip",
                    { attrs: { "content-class": "bg-primary" } },
                    [_vm._v("選擇資料集")]
                  )
                ],
                1
              )
            ],
            1
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/camera-capture.vue?vue&type=template&id=0a675460&lang=html&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/camera-capture.vue?vue&type=template&id=0a675460&lang=html& ***!
  \***********************************************************************************************************************************************************************************************************/
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
    { staticClass: "camera-capture bg-grey-9" },
    [
      _c("video", {
        ref: "video",
        attrs: { autoplay: "", playsinline: "", muted: "" },
        domProps: { muted: true, srcObject: _vm.camStream }
      }),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.camStatus != "ok",
              expression: "camStatus !='ok' "
            }
          ],
          staticClass: "fixed-center text-white text-h5"
        },
        [_vm._v(_vm._s(_vm.camStatus))]
      ),
      _vm._v(" "),
      _c(
        "q-dialog",
        {
          model: {
            value: _vm.openCameraSelect,
            callback: function($$v) {
              _vm.openCameraSelect = $$v
            },
            expression: "openCameraSelect"
          }
        },
        [
          _c(
            "q-card",
            { staticClass: "full-width" },
            [
              _c("div", { staticClass: "text-h6 q-pa-md" }, [
                _vm._v("選擇相機")
              ]),
              _vm._v(" "),
              _vm.lastCamera
                ? _c(
                    "div",
                    { staticClass: "q-px-md" },
                    [
                      _c("div", { staticClass: "text-subtitle2" }, [
                        _vm._v("上次使用")
                      ]),
                      _vm._v(" "),
                      _c(
                        "q-item",
                        {
                          attrs: { clickable: "" },
                          on: {
                            click: function($event) {
                              return _vm.SelectCamera(_vm.lastCamera)
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.lastCamera.name))]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "q-list",
                { attrs: { bordered: "", separator: "" } },
                _vm._l(_vm.cameraList, function(camera) {
                  return _c(
                    "q-item",
                    {
                      key: camera.id,
                      attrs: { clickable: "" },
                      on: {
                        click: function($event) {
                          return _vm.SelectCamera(camera)
                        }
                      }
                    },
                    [_vm._v(_vm._s(camera.name))]
                  )
                }),
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-editor.vue?vue&type=template&id=166fba24&lang=html&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-editor.vue?vue&type=template&id=166fba24&lang=html& ***!
  \***********************************************************************************************************************************************************************************************************/
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
    "q-card",
    { staticClass: "dataset-editor" },
    [
      _c("q-card-section", [
        _c("div", { staticClass: "text-h6" }, [_vm._v("編輯資料集")])
      ]),
      _vm._v(" "),
      _c(
        "q-card-section",
        [
          _c(
            "q-form",
            [
              _c("q-item", [
                _c(
                  "div",
                  { staticClass: "cover-container bg-grey-7" },
                  [
                    _c("image-upload", {
                      ref: "uploader",
                      attrs: {
                        src: _vm.info.picCover || "/static/image/logo-16-9.png",
                        showPreview: "",
                        maxResW: parseInt(_vm.info.maxWidth),
                        maxResH: parseInt(_vm.info.maxHeight)
                      }
                    }),
                    _vm._v(" "),
                    _c("q-btn", {
                      staticClass: "change-bt",
                      attrs: {
                        loading: _vm.uploadCover,
                        flat: "",
                        label: "變更封面"
                      },
                      on: {
                        click: function($event) {
                          return _vm.ChangeCover()
                        }
                      }
                    })
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "row" },
                [
                  _c("q-input", {
                    ref: "name",
                    staticClass: "col-12 q-pa-sm",
                    attrs: {
                      label: "資料集名稱",
                      rules: [
                        function(val) {
                          return !!val || "資料集名稱不能空白"
                        }
                      ]
                    },
                    model: {
                      value: _vm.info.name,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "name", $$v)
                      },
                      expression: "info.name"
                    }
                  }),
                  _vm._v(" "),
                  _c("q-input", {
                    staticClass: "full-width q-px-sm",
                    attrs: {
                      label: "資料集簡介",
                      filled: "",
                      type: "textarea"
                    },
                    model: {
                      value: _vm.info.desc,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "desc", $$v)
                      },
                      expression: "info.desc"
                    }
                  }),
                  _vm._v(" "),
                  _c("q-input", {
                    ref: "maxWidth",
                    staticClass: "col-12 col-sm-6 q-pa-sm",
                    attrs: {
                      type: "number",
                      label: "最大寬度",
                      rules: [
                        function(val) {
                          return !!val || "最大寬度不能空白"
                        },
                        function(val) {
                          return val >= 32 || "最大寬度不能小於32"
                        },
                        function(val) {
                          return val <= 1920 || "最大寬度不能大於1920"
                        }
                      ]
                    },
                    model: {
                      value: _vm.info.maxWidth,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "maxWidth", $$v)
                      },
                      expression: "info.maxWidth"
                    }
                  }),
                  _vm._v(" "),
                  _c("q-input", {
                    ref: "maxHeight",
                    staticClass: "col-12 col-sm-6 q-pa-sm",
                    attrs: {
                      type: "number",
                      label: "最大高度",
                      rules: [
                        function(val) {
                          return !!val || "最大高度不能空白"
                        },
                        function(val) {
                          return val >= 32 || "最大高度不能小於32"
                        },
                        function(val) {
                          return val <= 1920 || "最大高度不能大於1920"
                        }
                      ]
                    },
                    model: {
                      value: _vm.info.maxHeight,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "maxHeight", $$v)
                      },
                      expression: "info.maxHeight"
                    }
                  }),
                  _vm._v(" "),
                  _c("q-toggle", {
                    staticClass: "col-12 col-sm-6 q-pa-sm",
                    attrs: { label: "公開資料集" },
                    model: {
                      value: _vm.info.isPublic,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "isPublic", $$v)
                      },
                      expression: "info.isPublic"
                    }
                  }),
                  _vm._v(" "),
                  _c("q-toggle", {
                    staticClass: "col-12 col-sm-6 q-pa-sm",
                    attrs: { label: "開放上傳影像" },
                    model: {
                      value: _vm.info.enableUpload,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "enableUpload", $$v)
                      },
                      expression: "info.enableUpload"
                    }
                  }),
                  _vm._v(" "),
                  _c("q-toggle", {
                    staticClass: "col-12 col-sm-6 q-pa-sm",
                    attrs: { label: "開放下載資料集" },
                    model: {
                      value: _vm.info.enableDownload,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "enableDownload", $$v)
                      },
                      expression: "info.enableDownload"
                    }
                  }),
                  _vm._v(" "),
                  _c("q-toggle", {
                    staticClass: "col-12 col-sm-6 q-pa-sm",
                    attrs: { label: "儲存位置資訊" },
                    model: {
                      value: _vm.info.enableGPS,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "enableGPS", $$v)
                      },
                      expression: "info.enableGPS"
                    }
                  }),
                  _vm._v(" "),
                  _c("q-toggle", {
                    staticClass: "col-12 col-sm-6 q-pa-sm",
                    attrs: { label: "開放編輯標註" },
                    model: {
                      value: _vm.info.enableAnnotation,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "enableAnnotation", $$v)
                      },
                      expression: "info.enableAnnotation"
                    }
                  }),
                  _vm._v(" "),
                  _c("q-select", {
                    ref: "annotationType",
                    staticClass: "col-12 col-sm-6 q-pa-sm",
                    attrs: {
                      options: _vm.annotationTypeOption,
                      "option-value": "value",
                      "option-label": "label",
                      "emit-value": "",
                      "map-options": "",
                      label: "標註方式",
                      rules: [
                        function(val) {
                          return !!val || "標註方式不能空白"
                        }
                      ]
                    },
                    model: {
                      value: _vm.info.annotationType,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "annotationType", $$v)
                      },
                      expression: "info.annotationType"
                    }
                  }),
                  _vm._v(" "),
                  _c("q-input", {
                    staticClass: "col-12 q-pa-sm",
                    attrs: { label: "新增標籤" },
                    on: {
                      keyup: function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k(
                            $event.keyCode,
                            "enter",
                            13,
                            $event.key,
                            "Enter"
                          )
                        ) {
                          return null
                        }
                        return _vm.AddTag()
                      }
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "append",
                        fn: function() {
                          return [
                            _c("q-btn", {
                              attrs: {
                                round: "",
                                dense: "",
                                flat: "",
                                icon: "add"
                              },
                              on: {
                                click: function($event) {
                                  return _vm.AddTag()
                                }
                              }
                            })
                          ]
                        },
                        proxy: true
                      }
                    ]),
                    model: {
                      value: _vm.tagName,
                      callback: function($$v) {
                        _vm.tagName = $$v
                      },
                      expression: "tagName"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "full-width" },
                    _vm._l(_vm.info.tagArr, function(tag, i) {
                      return _c(
                        "q-chip",
                        {
                          key: tag,
                          attrs: { removable: "" },
                          on: {
                            remove: function($event) {
                              return _vm.RemoveTag(i)
                            }
                          }
                        },
                        [_vm._v(_vm._s(tag))]
                      )
                    }),
                    1
                  ),
                  _vm._v(" "),
                  !_vm.info.isPublic
                    ? _c(
                        "div",
                        { staticClass: "full-width q-pa-md" },
                        [
                          _c("div", { staticClass: "text-h6" }, [
                            _vm._v("私密成員")
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "text-subtitle2" }, [
                            _vm._v("不公開的資料集只有管理員跟私密成員能看到")
                          ]),
                          _vm._v(" "),
                          _c("user-list", {
                            ref: "memberList",
                            attrs: {
                              enableAdd: "",
                              enableRemove: "",
                              list: _vm.info.member
                            },
                            on: { add: _vm.AddMember, remove: _vm.RemoveMember }
                          })
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "full-width q-pa-md" },
                    [
                      _c("div", { staticClass: "text-h6" }, [
                        _vm._v("資料集版主")
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "text-subtitle2" }, [
                        _vm._v("版主擁有修改此資料集的完整權限")
                      ]),
                      _vm._v(" "),
                      _c("user-list", {
                        ref: "masterList",
                        attrs: {
                          enableAdd: "",
                          enableRemove: "",
                          list: _vm.info.master
                        },
                        on: { add: _vm.AddMaster, remove: _vm.RemoveMaster }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("q-select", {
                    ref: "annotationType",
                    staticClass: "col-12 col-sm-6 q-pa-sm",
                    attrs: {
                      options: _vm.externalLinkOption,
                      "option-value": "value",
                      "option-label": "label",
                      "emit-value": "",
                      "map-options": "",
                      label: "外部連結"
                    },
                    model: {
                      value: _vm.info.externalLink,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "externalLink", $$v)
                      },
                      expression: "info.externalLink"
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
      ),
      _vm._v(" "),
      _c(
        "q-card-actions",
        { attrs: { align: "right" } },
        [
          _c("q-btn", {
            attrs: { flat: "", label: "儲存", color: "primary" },
            on: {
              click: function($event) {
                return _vm.UpdateDataset()
              }
            }
          }),
          _vm._v(" "),
          _c("q-btn", {
            attrs: { flat: "", label: "取消", color: "primary" },
            on: {
              click: function($event) {
                return _vm.$emit("cancel")
              }
            }
          })
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-list.vue?vue&type=template&id=773036d6&lang=html&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-list.vue?vue&type=template&id=773036d6&lang=html& ***!
  \*********************************************************************************************************************************************************************************************************/
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
    { staticClass: "dataset-list" },
    [
      _vm.mode == "edit"
        ? _c(
            "div",
            { staticClass: "row q-px-md" },
            [
              _c("q-btn", {
                staticClass: "bg-grey-8 text-white",
                attrs: { icon: "add", label: "新增資料集" },
                on: {
                  click: function($event) {
                    return _vm.AddDataset()
                  }
                }
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-12 col-sm-6 col-md-3 q-pa-md" },
          [
            _c("q-input", {
              attrs: { dense: "", label: "搜尋資料集" },
              on: {
                keyup: function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  return _vm.ReloadDataset()
                }
              },
              scopedSlots: _vm._u([
                {
                  key: "append",
                  fn: function() {
                    return [
                      _c("q-btn", {
                        staticClass: "bg-grey-8 text-white",
                        attrs: { icon: "search" },
                        on: {
                          click: function($event) {
                            return _vm.ReloadDataset()
                          }
                        }
                      })
                    ]
                  },
                  proxy: true
                }
              ]),
              model: {
                value: _vm.searchKey,
                callback: function($$v) {
                  _vm.searchKey = $$v
                },
                expression: "searchKey"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "col-12 col-sm-6 col-md-3 q-pa-md" },
          [
            _c("q-select", {
              attrs: {
                dense: "",
                options: _vm.sortOption,
                "option-value": "value",
                "option-label": "label",
                "emit-value": "",
                "map-options": "",
                label: "排序"
              },
              on: {
                input: function($event) {
                  return _vm.ReloadDataset()
                }
              },
              model: {
                value: _vm.sortKey,
                callback: function($$v) {
                  _vm.sortKey = $$v
                },
                expression: "sortKey"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "col-6 col-sm-4 col-md-2 q-pa-md" },
          [
            _c("q-select", {
              attrs: {
                dense: "",
                options: _vm.orderTypeOption,
                "option-value": "value",
                "option-label": "label",
                "emit-value": "",
                "map-options": ""
              },
              on: {
                input: function($event) {
                  return _vm.ReloadDataset()
                }
              },
              model: {
                value: _vm.orderType,
                callback: function($$v) {
                  _vm.orderType = $$v
                },
                expression: "orderType"
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "row q-col-gutter-md q-mb-md" },
        _vm._l(_vm.datasetArr, function(dataset) {
          return _c(
            "div",
            { staticClass: "col-12 col-sm-6 col-md-3" },
            [
              _c(
                "q-card",
                { staticClass: "bg-grey-7 text-white" },
                [
                  _c(
                    "q-img",
                    {
                      staticClass: "cursor-pointer",
                      attrs: {
                        src: dataset.picCover || "/static/image/logo-16-9.png",
                        ratio: 16 / 9
                      },
                      on: {
                        click: function($event) {
                          return _vm.GoToDataset(dataset)
                        }
                      }
                    },
                    [
                      !dataset.isPublic
                        ? _c("div", { staticClass: "absolute-top" }, [
                            _vm._v("\n\t\t\t\t\t\t不公開\n\t\t\t\t\t")
                          ])
                        : _vm._e()
                    ]
                  ),
                  _vm._v(" "),
                  _c("q-separator", { attrs: { dark: "" } }),
                  _vm._v(" "),
                  _c(
                    "q-card-section",
                    {
                      staticClass: "cursor-pointer",
                      on: {
                        click: function($event) {
                          return _vm.GoToDataset(dataset)
                        }
                      }
                    },
                    [
                      _c("div", { staticClass: "text-h6" }, [
                        _vm._v(_vm._s(dataset.name))
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "text-subtitle2" }, [
                        _vm._v("影像數: " + _vm._s(dataset.picNum))
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "text-subtitle2" }, [
                        _vm._v("標註數: " + _vm._s(dataset.annotationNum))
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c("q-separator", { attrs: { dark: "" } }),
                  _vm._v(" "),
                  _vm.mode == "edit"
                    ? _c(
                        "q-card-actions",
                        { attrs: { align: "right" } },
                        [
                          _c("q-btn", {
                            attrs: { flat: "", icon: "edit", label: "修改" },
                            on: {
                              click: function($event) {
                                return _vm.ModifyDataset(dataset)
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("q-btn", {
                            attrs: { flat: "", icon: "delete", label: "刪除" },
                            on: {
                              click: function($event) {
                                return _vm.DeleteDataset(dataset)
                              }
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        }),
        0
      ),
      _vm._v(" "),
      _c("q-btn", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.hasMoreDataset,
            expression: "hasMoreDataset"
          }
        ],
        staticClass: "full-width bg-grey-4 q-ma-sm",
        attrs: { label: "載入更多" },
        on: {
          click: function($event) {
            return _vm.LoadMoreDataset()
          }
        }
      }),
      _vm._v(" "),
      _c(
        "q-dialog",
        {
          model: {
            value: _vm.openDatasetEditor,
            callback: function($$v) {
              _vm.openDatasetEditor = $$v
            },
            expression: "openDatasetEditor"
          }
        },
        [
          _c("dataset-editor", {
            attrs: { info: _vm.editInfo },
            on: {
              confirm: function($event) {
                return _vm.ReloadDataset(true)
              },
              cancel: function($event) {
                _vm.openDatasetEditor = false
              },
              updateCover: function($event) {
                return _vm.ReloadDataset(false)
              }
            }
          })
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-select.vue?vue&type=template&id=10806e33&lang=html&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/dataset-select.vue?vue&type=template&id=10806e33&lang=html& ***!
  \***********************************************************************************************************************************************************************************************************/
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
    "q-card",
    { staticClass: "dataset-select full-width q-pa-sm" },
    [
      _c(
        "q-card-section",
        [
          _c("div", { staticClass: "text-h6" }, [_vm._v("選擇資料集")]),
          _vm._v(" "),
          _vm.lastDataset
            ? _c(
                "div",
                [
                  _c("div", { staticClass: "text-subtitle2" }, [
                    _vm._v("上次使用")
                  ]),
                  _vm._v(" "),
                  _c(
                    "q-item",
                    {
                      attrs: {
                        clickable: "",
                        active: _vm.selectIndex == -1,
                        "active-class": "bg-green-2"
                      },
                      on: {
                        click: function($event) {
                          return _vm.SelectItem(-1)
                        },
                        dblclick: function($event) {
                          return _vm.ConfirmSelect()
                        }
                      }
                    },
                    [
                      _c(
                        "q-item-section",
                        { attrs: { avatar: "" } },
                        [
                          _c(
                            "q-avatar",
                            { attrs: { square: "", rounded: "" } },
                            [
                              _c("img", {
                                staticStyle: { "object-fit": "cover" },
                                attrs: {
                                  src:
                                    _vm.lastDataset.picCover ||
                                    "/static/image/logo-16-9.png"
                                }
                              })
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "q-item-section",
                        [
                          _c("q-item-label", [
                            _vm._v(_vm._s(_vm.lastDataset.name))
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
            : _vm._e(),
          _vm._v(" "),
          _c(
            "q-scroll-area",
            { staticStyle: { height: "300px" } },
            [
              _c(
                "q-infinite-scroll",
                {
                  ref: "datasetScroll",
                  on: { load: _vm.LoadMoreDataset },
                  scopedSlots: _vm._u([
                    {
                      key: "loading",
                      fn: function() {
                        return [
                          _c(
                            "div",
                            { staticClass: "row justify-center q-my-md" },
                            [
                              _c("q-spinner-dots", {
                                attrs: { color: "primary", size: "40px" }
                              })
                            ],
                            1
                          )
                        ]
                      },
                      proxy: true
                    }
                  ])
                },
                [
                  _c("q-input", {
                    attrs: {
                      placeholder: "輸入篩選文字",
                      outlined: "",
                      dense: "",
                      square: ""
                    },
                    on: {
                      change: function($event) {
                        return _vm.ReloadDataset()
                      }
                    },
                    model: {
                      value: _vm.searchKey,
                      callback: function($$v) {
                        _vm.searchKey = $$v
                      },
                      expression: "searchKey"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "q-list",
                    { attrs: { bordered: "", separator: "" } },
                    _vm._l(_vm.datasetArr, function(dataset, i) {
                      return _c(
                        "q-item",
                        {
                          key: i,
                          attrs: {
                            clickable: "",
                            active: _vm.selectIndex == i,
                            "active-class": "bg-green-2"
                          },
                          on: {
                            click: function($event) {
                              return _vm.SelectItem(i)
                            },
                            dblclick: function($event) {
                              return _vm.ConfirmSelect()
                            }
                          }
                        },
                        [
                          _c(
                            "q-item-section",
                            { attrs: { avatar: "" } },
                            [
                              _c(
                                "q-avatar",
                                { attrs: { square: "", rounded: "" } },
                                [
                                  _c("img", {
                                    staticStyle: { "object-fit": "cover" },
                                    attrs: {
                                      src:
                                        dataset.picCover ||
                                        "/static/image/logo-16-9.png"
                                    }
                                  })
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "q-item-section",
                            [
                              _c("q-item-label", [_vm._v(_vm._s(dataset.name))])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    }),
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
        "q-card-actions",
        { staticClass: "justify-center" },
        [
          _c("q-btn", {
            attrs: { flat: "", label: "確定" },
            on: {
              click: function($event) {
                return _vm.ConfirmSelect()
              }
            }
          }),
          _vm._v(" "),
          _c("q-btn", {
            attrs: { flat: "", label: "取消" },
            on: {
              click: function($event) {
                return _vm.CancelSelect()
              }
            }
          })
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/image-edit.vue?vue&type=template&id=404b88fe&lang=html&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-edit.vue?vue&type=template&id=404b88fe&lang=html& ***!
  \*******************************************************************************************************************************************************************************************************/
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
    { staticClass: "image-edit bg-grey-9" },
    [
      _c("img", { ref: "image", attrs: { src: _vm.imageData } }),
      _vm._v(" "),
      _c(
        "q-page-sticky",
        { attrs: { position: "top", offset: [9, 9] } },
        [
          _c(
            "q-btn",
            {
              attrs: { dense: "", color: "primary", icon: "rotate_left" },
              on: {
                click: function($event) {
                  return _vm.cropper.rotate(-90)
                }
              }
            },
            [
              _c("q-tooltip", { attrs: { "content-class": "bg-primary" } }, [
                _vm._v("逆時針旋轉90°")
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "q-btn",
            {
              attrs: { dense: "", color: "primary", icon: "rotate_right" },
              on: {
                click: function($event) {
                  return _vm.cropper.rotate(90)
                }
              }
            },
            [
              _c("q-tooltip", { attrs: { "content-class": "bg-primary" } }, [
                _vm._v("順時針旋轉90°")
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "q-btn",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.mode == "move",
                  expression: "mode=='move' "
                }
              ],
              attrs: { dense: "", color: "primary", icon: "crop" },
              on: {
                click: function($event) {
                  return _vm.ChangeMode("crop")
                }
              }
            },
            [
              _c("q-tooltip", { attrs: { "content-class": "bg-primary" } }, [
                _vm._v("框選裁切")
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "q-btn",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.mode == "crop",
                  expression: "mode=='crop' "
                }
              ],
              attrs: { dense: "", color: "primary", icon: "gamepad" },
              on: {
                click: function($event) {
                  return _vm.ChangeMode("move")
                }
              }
            },
            [
              _c("q-tooltip", { attrs: { "content-class": "bg-primary" } }, [
                _vm._v("移動影像")
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "q-btn",
            {
              attrs: { dense: "", color: "primary", icon: "clear" },
              on: {
                click: function($event) {
                  return _vm.ClearEdit()
                }
              }
            },
            [
              _c("q-tooltip", { attrs: { "content-class": "bg-primary" } }, [
                _vm._v("重設影像")
              ])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "q-page-sticky",
        { attrs: { position: "bottom", offset: [9, 9] } },
        [
          _c("q-btn", {
            attrs: { color: "primary", label: "確定" },
            on: {
              click: function($event) {
                return _vm.ConfirmEdit()
              }
            }
          }),
          _vm._v(" "),
          _c("q-btn", {
            attrs: { color: "primary", label: "取消" },
            on: {
              click: function($event) {
                return _vm.CancelEdit()
              }
            }
          })
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info.vue?vue&type=template&id=292ce4bc&lang=html&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-info.vue?vue&type=template&id=292ce4bc&lang=html& ***!
  \*******************************************************************************************************************************************************************************************************/
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
  return _vm.dataset
    ? _c(
        "q-card",
        { staticClass: "image-info full-width q-pa-sm" },
        [
          _c("q-card-section", [
            _c("div", { staticClass: "text-h6" }, [_vm._v("選擇資料時間")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.dataTime,
                  expression: "dataTime"
                }
              ],
              staticClass: "q-pa-sm",
              attrs: { type: "datetime-local" },
              domProps: { value: _vm.dataTime },
              on: {
                change: function($event) {
                  return _vm.$emit("change")
                },
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.dataTime = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _vm.dataset.enableGPS
            ? _c(
                "q-card-section",
                [
                  _c("div", { staticClass: "text-h6" }, [
                    _vm._v("選擇資料地點")
                  ]),
                  _vm._v(" "),
                  _c("location-select", {
                    ref: "locationSelect",
                    attrs: { mode: "selectLoc" }
                  }),
                  _vm._v(" "),
                  _vm.$refs.locationSelect
                    ? _c("div", { staticClass: "text-center" }, [
                        _vm._v(_vm._s(_vm.$refs.locationSelect.status))
                      ])
                    : _vm._e()
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "q-card-section",
            [
              _c("div", { staticClass: "text-h6" }, [
                _vm._v("資料備註說明(若無備註說明請直接按確定)")
              ]),
              _vm._v(" "),
              _c("q-input", {
                attrs: { filled: "", type: "textarea" },
                on: {
                  input: function($event) {
                    return _vm.$emit("change")
                  }
                },
                model: {
                  value: _vm.remark,
                  callback: function($$v) {
                    _vm.remark = $$v
                  },
                  expression: "remark"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "q-card-actions",
            { staticClass: "justify-center" },
            [
              _c("q-btn", {
                attrs: { flat: "", label: "確定" },
                on: {
                  click: function($event) {
                    return _vm.ConfirmSelect()
                  }
                }
              }),
              _vm._v(" "),
              _c("q-btn", {
                attrs: { flat: "", label: "取消" },
                on: {
                  click: function($event) {
                    return _vm.CancelSelect()
                  }
                }
              })
            ],
            1
          )
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/image-upload.vue?vue&type=template&id=18676e75&lang=html&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-upload.vue?vue&type=template&id=18676e75&lang=html& ***!
  \*********************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "image-upload" }, [
    _c("img", {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.showPreview,
          expression: "showPreview"
        }
      ],
      attrs: { src: _vm.imageData }
    }),
    _vm._v(" "),
    _c("input", {
      ref: "uploadBt",
      attrs: { type: "file", hidden: "" },
      on: { change: _vm.UpdateFile }
    })
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/main-app.vue?vue&type=template&id=ad9c3862&lang=html&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/main-app.vue?vue&type=template&id=ad9c3862&lang=html& ***!
  \*****************************************************************************************************************************************************************************************************/
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
      staticClass: "main-app bg-grey-1 shadow-2",
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
                    { attrs: { name: "dataset" } },
                    [_c("dataset-list", { attrs: { mode: "view" } })],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "q-tab-panel",
                    { staticClass: "q-pa-none", attrs: { name: "upload" } },
                    [_c("uploader", { attrs: { user: _vm.user } })],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "q-tab-panel",
                    { staticClass: "q-pa-none", attrs: { name: "annotation" } },
                    [
                      _c("annotator", {
                        attrs: { autoTask: "", user: _vm.user }
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
                attrs: { name: "dataset", icon: "folder", label: "資料集" }
              }),
              _vm._v(" "),
              _c("q-tab", {
                attrs: {
                  name: "upload",
                  icon: "add_photo_alternate",
                  label: "拍照上傳"
                }
              }),
              _vm._v(" "),
              _c("q-tab", {
                attrs: {
                  name: "annotation",
                  icon: "aspect_ratio",
                  label: "照片標註"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-select.vue?vue&type=template&id=05d61ed1&lang=html&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/tag-select.vue?vue&type=template&id=05d61ed1&lang=html& ***!
  \*******************************************************************************************************************************************************************************************************/
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
    { staticClass: "tag-select" },
    [
      _c("q-select", {
        attrs: {
          filled: "",
          dense: "",
          "bg-color": "grey-2",
          "use-input": "",
          "hide-selected": "",
          "fill-input": "",
          "input-debounce": "0",
          options: _vm.tagArr
        },
        on: { filter: _vm.FilterTag, input: _vm.SelectTag },
        model: {
          value: _vm.selectTag,
          callback: function($$v) {
            _vm.selectTag = $$v
          },
          expression: "selectTag"
        }
      })
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/uploader.vue?vue&type=template&id=91e60ca0&lang=html&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/uploader.vue?vue&type=template&id=91e60ca0&lang=html& ***!
  \*****************************************************************************************************************************************************************************************************/
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
    { staticClass: "camera-capture bg-grey-8" },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value:
                _vm.stepArr[_vm.step] && _vm.stepArr[_vm.step].id == "capture",
              expression: "stepArr[step] && stepArr[step].id == 'capture' "
            }
          ],
          staticClass: "full-width"
        },
        [
          _c("camera-capture", { ref: "cam" }),
          _vm._v(" "),
          _c(
            "q-page-sticky",
            { attrs: { position: "bottom", offset: [18, 18] } },
            [
              _c(
                "q-btn",
                {
                  staticClass: "bg-white text-grey-8",
                  attrs: {
                    round: "",
                    push: "",
                    disable: _vm.camStatus != "ok",
                    size: "lg",
                    icon: "camera_alt"
                  },
                  on: {
                    click: function($event) {
                      return _vm.CaptureCameraImage()
                    }
                  }
                },
                [
                  _c(
                    "q-tooltip",
                    { attrs: { "content-class": "bg-primary" } },
                    [_vm._v("拍照上傳")]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "q-page-sticky",
            { attrs: { position: "bottom-right", offset: [18, 18] } },
            [
              _c(
                "div",
                { staticClass: "column q-gutter-sm" },
                [
                  _c(
                    "q-btn",
                    {
                      staticClass: "bg-primary text-white",
                      attrs: {
                        flat: "",
                        round: "",
                        size: "md",
                        icon: "flip_camera_ios"
                      },
                      on: {
                        click: function($event) {
                          return _vm.ChangeCamera()
                        }
                      }
                    },
                    [
                      _c(
                        "q-tooltip",
                        { attrs: { "content-class": "bg-primary" } },
                        [_vm._v("切換相機")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "q-btn",
                    {
                      staticClass: "bg-primary text-white",
                      attrs: {
                        flat: "",
                        round: "",
                        size: "md",
                        icon: "folder"
                      },
                      on: {
                        click: function($event) {
                          return _vm.SelectFile()
                        }
                      }
                    },
                    [
                      _c(
                        "q-tooltip",
                        { attrs: { "content-class": "bg-primary" } },
                        [_vm._v("檔案上傳")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value:
                _vm.stepArr[_vm.step] && _vm.stepArr[_vm.step].id == "crop",
              expression: "stepArr[step] && stepArr[step].id == 'crop' "
            }
          ],
          staticClass: "full-width"
        },
        [
          _c("image-edit", {
            ref: "imageEdit",
            on: {
              confirm: function($event) {
                return _vm.NextStep()
              },
              cancel: function($event) {
                return _vm.PrevStep()
              }
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "q-dialog",
        {
          model: {
            value:
              _vm.stepArr[_vm.step] && _vm.stepArr[_vm.step].id == "dataset",
            callback: function($$v) {
              _vm.$set(
                _vm.stepArr[_vm.step] && _vm.stepArr[_vm.step],
                "id == 'dataset'",
                $$v
              )
            },
            expression: "stepArr[step] && stepArr[step].id == 'dataset'"
          }
        },
        [
          _c("dataset-select", {
            ref: "datasetSelect",
            attrs: { forUpload: "" },
            on: {
              change: function($event) {
                return _vm.DatasetChange()
              },
              confirm: function($event) {
                return _vm.NextStep()
              },
              cancel: function($event) {
                return _vm.PrevStep()
              }
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "q-dialog",
        {
          model: {
            value: _vm.stepArr[_vm.step] && _vm.stepArr[_vm.step].id == "info",
            callback: function($$v) {
              _vm.$set(
                _vm.stepArr[_vm.step] && _vm.stepArr[_vm.step],
                "id == 'info'",
                $$v
              )
            },
            expression: "stepArr[step] && stepArr[step].id == 'info'"
          }
        },
        [
          _c("image-info", {
            ref: "imageInfo",
            attrs: {
              dataset: _vm.datasetSelect,
              initLat: _vm.initLoc.lat,
              initLng: _vm.initLoc.lng
            },
            on: {
              confirm: function($event) {
                _vm.UpdateImageInfo()
                _vm.NextStep()
              },
              cancel: function($event) {
                return _vm.PrevStep()
              }
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("image-upload", {
        directives: [
          { name: "show", rawName: "v-show", value: false, expression: "false" }
        ],
        ref: "uploader"
      }),
      _vm._v(" "),
      _vm.stepArr[_vm.step]
        ? _c(
            "q-page-sticky",
            { attrs: { position: "bottom-left", offset: [9, 9] } },
            [
              _c("q-badge", { attrs: { color: "secondary q-pa-sm" } }, [
                _vm._v(
                  "\n\t\t\t" +
                    _vm._s(
                      _vm.stepArr[_vm.step].name +
                        " (" +
                        (_vm.step + 1) +
                        "/" +
                        _vm.stepArr.length +
                        ")"
                    ) +
                    "\n\t\t"
                )
              ])
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/user-list.vue?vue&type=template&id=066cf58e&lang=html&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/user-list.vue?vue&type=template&id=066cf58e&lang=html& ***!
  \******************************************************************************************************************************************************************************************************/
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
    { staticClass: "user-list q-pa-sm" },
    [
      _c("div", { staticClass: "row items-center" }, [
        _vm.enableAdd
          ? _c(
              "div",
              { staticClass: "col-shrink q-pr-lg" },
              [
                _c("q-btn", {
                  staticClass: "bg-grey-8 text-white",
                  attrs: { icon: "add", label: "新增名單" },
                  on: {
                    click: function($event) {
                      _vm.openUserSelect = true
                    }
                  }
                })
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.enableSearch
          ? _c(
              "div",
              { staticClass: "col-12 col-sm-6 col-md-3" },
              [
                _c("q-input", {
                  attrs: { label: "搜尋名單" },
                  on: {
                    keyup: function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      return _vm.ReloadUserList()
                    }
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "append",
                        fn: function() {
                          return [
                            _c("q-btn", {
                              staticClass: "bg-grey-8 text-white",
                              attrs: { icon: "search" },
                              on: {
                                click: function($event) {
                                  return _vm.ReloadUserList()
                                }
                              }
                            })
                          ]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    false,
                    1309159698
                  ),
                  model: {
                    value: _vm.searchKey,
                    callback: function($$v) {
                      _vm.searchKey = $$v
                    },
                    expression: "searchKey"
                  }
                })
              ],
              1
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "q-list",
        { staticClass: "q-my-md", attrs: { bordered: "" } },
        _vm._l(_vm.userArr, function(user, i) {
          return _c(
            "q-item",
            { key: user._id },
            [
              _c(
                "q-item-section",
                { attrs: { avatar: "" } },
                [_c("q-avatar", [_c("img", { attrs: { src: user.icon } })])],
                1
              ),
              _vm._v(" "),
              _c(
                "q-item-section",
                [
                  _c("q-item-label", [_vm._v(_vm._s(user.name))]),
                  _vm._v(" "),
                  _c("q-item-label", { attrs: { caption: "", lines: "1" } }, [
                    _vm._v(_vm._s(user.contactEmail))
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _vm.enableRemove
                ? _c(
                    "q-item-section",
                    { attrs: { side: "" } },
                    [
                      _c("q-btn", {
                        staticClass: "text-gray-8",
                        attrs: { flat: "", icon: "close" },
                        on: {
                          click: function($event) {
                            return _vm.RemoveUser(i)
                          }
                        }
                      })
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
        }),
        1
      ),
      _vm._v(" "),
      !_vm.list
        ? _c("q-btn", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.hasMoreUser,
                expression: "hasMoreUser"
              }
            ],
            staticClass: "full-width bg-grey-4 q-ma-sm",
            attrs: { label: "載入更多" },
            on: {
              click: function($event) {
                return _vm.LoadMoreUserList()
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "q-dialog",
        {
          model: {
            value: _vm.openUserSelect,
            callback: function($$v) {
              _vm.openUserSelect = $$v
            },
            expression: "openUserSelect"
          }
        },
        [
          _c("user-select", {
            ref: "userSelect",
            on: {
              confirm: function($event) {
                return _vm.AddUser()
              },
              cancel: function($event) {
                _vm.openUserSelect = false
              }
            }
          })
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/user-select.vue?vue&type=template&id=34f5b628&lang=html&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/user-select.vue?vue&type=template&id=34f5b628&lang=html& ***!
  \********************************************************************************************************************************************************************************************************/
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
    "q-card",
    { staticClass: "user-select full-width q-pa-sm" },
    [
      _c(
        "q-card-section",
        [
          _c("div", { staticClass: "text-h6" }, [_vm._v("選擇使用者")]),
          _vm._v(" "),
          _c(
            "q-scroll-area",
            { staticStyle: { height: "300px" } },
            [
              _c(
                "q-infinite-scroll",
                {
                  ref: "userScroll",
                  on: { load: _vm.LoadMoreUser },
                  scopedSlots: _vm._u([
                    {
                      key: "loading",
                      fn: function() {
                        return [
                          _c(
                            "div",
                            { staticClass: "row justify-center q-my-md" },
                            [
                              _c("q-spinner-dots", {
                                attrs: { color: "primary", size: "40px" }
                              })
                            ],
                            1
                          )
                        ]
                      },
                      proxy: true
                    }
                  ])
                },
                [
                  _c("q-input", {
                    attrs: {
                      placeholder: "輸入篩選文字",
                      outlined: "",
                      dense: "",
                      square: ""
                    },
                    on: {
                      change: function($event) {
                        return _vm.ReloadUser()
                      }
                    },
                    model: {
                      value: _vm.searchKey,
                      callback: function($$v) {
                        _vm.searchKey = $$v
                      },
                      expression: "searchKey"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "q-list",
                    { attrs: { bordered: "", separator: "" } },
                    _vm._l(_vm.userArr, function(user, i) {
                      return _c(
                        "q-item",
                        {
                          key: i,
                          attrs: {
                            clickable: "",
                            active: _vm.selectIndex == i,
                            "active-class": "bg-green-2"
                          },
                          on: {
                            click: function($event) {
                              return _vm.SelectItem(i)
                            },
                            dblclick: function($event) {
                              return _vm.ConfirmSelect()
                            }
                          }
                        },
                        [
                          _c(
                            "q-item-section",
                            { attrs: { avatar: "" } },
                            [
                              _c("q-avatar", [
                                _c("img", { attrs: { src: user.icon } })
                              ])
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "q-item-section",
                            [
                              _c("q-item-label", [_vm._v(_vm._s(user.name))]),
                              _vm._v(" "),
                              _c(
                                "q-item-label",
                                { attrs: { caption: "", lines: "1" } },
                                [_vm._v(_vm._s(user.contactEmail))]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    }),
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
        "q-card-actions",
        { staticClass: "justify-center" },
        [
          _c("q-btn", {
            attrs: { flat: "", label: "確定" },
            on: {
              click: function($event) {
                return _vm.ConfirmSelect()
              }
            }
          }),
          _vm._v(" "),
          _c("q-btn", {
            attrs: { flat: "", label: "取消" },
            on: {
              click: function($event) {
                return _vm.CancelSelect()
              }
            }
          })
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

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_main_app_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vue/main-app.vue */ "./src/vue/main-app.vue");

new Vue({
  el: "#mainApp",
  components: {
    "main-app": _vue_main_app_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
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

/***/ "./src/vue/annotator-bbox.vue":
/*!************************************!*\
  !*** ./src/vue/annotator-bbox.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _annotator_bbox_vue_vue_type_template_id_0ab9c93c_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./annotator-bbox.vue?vue&type=template&id=0ab9c93c&lang=html& */ "./src/vue/annotator-bbox.vue?vue&type=template&id=0ab9c93c&lang=html&");
/* harmony import */ var _annotator_bbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./annotator-bbox.vue?vue&type=script&lang=js& */ "./src/vue/annotator-bbox.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _annotator_bbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./annotator-bbox.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/annotator-bbox.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _annotator_bbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _annotator_bbox_vue_vue_type_template_id_0ab9c93c_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _annotator_bbox_vue_vue_type_template_id_0ab9c93c_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/annotator-bbox.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/annotator-bbox.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./src/vue/annotator-bbox.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_bbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./annotator-bbox.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-bbox.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_bbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/annotator-bbox.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************!*\
  !*** ./src/vue/annotator-bbox.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_bbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./annotator-bbox.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-bbox.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_bbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_bbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_bbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_bbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_bbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/annotator-bbox.vue?vue&type=template&id=0ab9c93c&lang=html&":
/*!*****************************************************************************!*\
  !*** ./src/vue/annotator-bbox.vue?vue&type=template&id=0ab9c93c&lang=html& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_bbox_vue_vue_type_template_id_0ab9c93c_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./annotator-bbox.vue?vue&type=template&id=0ab9c93c&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-bbox.vue?vue&type=template&id=0ab9c93c&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_bbox_vue_vue_type_template_id_0ab9c93c_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_bbox_vue_vue_type_template_id_0ab9c93c_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/annotator-image.vue":
/*!*************************************!*\
  !*** ./src/vue/annotator-image.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _annotator_image_vue_vue_type_template_id_5b4fe650_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./annotator-image.vue?vue&type=template&id=5b4fe650&lang=html& */ "./src/vue/annotator-image.vue?vue&type=template&id=5b4fe650&lang=html&");
/* harmony import */ var _annotator_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./annotator-image.vue?vue&type=script&lang=js& */ "./src/vue/annotator-image.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _annotator_image_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./annotator-image.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/annotator-image.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _annotator_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _annotator_image_vue_vue_type_template_id_5b4fe650_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _annotator_image_vue_vue_type_template_id_5b4fe650_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/annotator-image.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/annotator-image.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./src/vue/annotator-image.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./annotator-image.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-image.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/annotator-image.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************!*\
  !*** ./src/vue/annotator-image.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_image_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./annotator-image.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-image.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_image_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_image_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_image_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_image_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_image_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/annotator-image.vue?vue&type=template&id=5b4fe650&lang=html&":
/*!******************************************************************************!*\
  !*** ./src/vue/annotator-image.vue?vue&type=template&id=5b4fe650&lang=html& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_image_vue_vue_type_template_id_5b4fe650_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./annotator-image.vue?vue&type=template&id=5b4fe650&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-image.vue?vue&type=template&id=5b4fe650&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_image_vue_vue_type_template_id_5b4fe650_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_image_vue_vue_type_template_id_5b4fe650_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/annotator.vue":
/*!*******************************!*\
  !*** ./src/vue/annotator.vue ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _annotator_vue_vue_type_template_id_f7adf7ec_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./annotator.vue?vue&type=template&id=f7adf7ec&lang=html& */ "./src/vue/annotator.vue?vue&type=template&id=f7adf7ec&lang=html&");
/* harmony import */ var _annotator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./annotator.vue?vue&type=script&lang=js& */ "./src/vue/annotator.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _annotator_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./annotator.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/annotator.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _annotator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _annotator_vue_vue_type_template_id_f7adf7ec_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _annotator_vue_vue_type_template_id_f7adf7ec_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/annotator.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/annotator.vue?vue&type=script&lang=js&":
/*!********************************************************!*\
  !*** ./src/vue/annotator.vue?vue&type=script&lang=js& ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./annotator.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/annotator.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************!*\
  !*** ./src/vue/annotator.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./annotator.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/annotator.vue?vue&type=template&id=f7adf7ec&lang=html&":
/*!************************************************************************!*\
  !*** ./src/vue/annotator.vue?vue&type=template&id=f7adf7ec&lang=html& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_vue_vue_type_template_id_f7adf7ec_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./annotator.vue?vue&type=template&id=f7adf7ec&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator.vue?vue&type=template&id=f7adf7ec&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_vue_vue_type_template_id_f7adf7ec_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_vue_vue_type_template_id_f7adf7ec_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/camera-capture.vue":
/*!************************************!*\
  !*** ./src/vue/camera-capture.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _camera_capture_vue_vue_type_template_id_0a675460_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera-capture.vue?vue&type=template&id=0a675460&lang=html& */ "./src/vue/camera-capture.vue?vue&type=template&id=0a675460&lang=html&");
/* harmony import */ var _camera_capture_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camera-capture.vue?vue&type=script&lang=js& */ "./src/vue/camera-capture.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _camera_capture_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./camera-capture.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/camera-capture.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _camera_capture_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _camera_capture_vue_vue_type_template_id_0a675460_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _camera_capture_vue_vue_type_template_id_0a675460_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/camera-capture.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/camera-capture.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./src/vue/camera-capture.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_camera_capture_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./camera-capture.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/camera-capture.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_camera_capture_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/camera-capture.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************!*\
  !*** ./src/vue/camera-capture.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_camera_capture_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./camera-capture.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/camera-capture.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_camera_capture_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_camera_capture_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_camera_capture_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_camera_capture_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_camera_capture_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/camera-capture.vue?vue&type=template&id=0a675460&lang=html&":
/*!*****************************************************************************!*\
  !*** ./src/vue/camera-capture.vue?vue&type=template&id=0a675460&lang=html& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_camera_capture_vue_vue_type_template_id_0a675460_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./camera-capture.vue?vue&type=template&id=0a675460&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/camera-capture.vue?vue&type=template&id=0a675460&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_camera_capture_vue_vue_type_template_id_0a675460_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_camera_capture_vue_vue_type_template_id_0a675460_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/dataset-editor.vue":
/*!************************************!*\
  !*** ./src/vue/dataset-editor.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataset_editor_vue_vue_type_template_id_166fba24_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataset-editor.vue?vue&type=template&id=166fba24&lang=html& */ "./src/vue/dataset-editor.vue?vue&type=template&id=166fba24&lang=html&");
/* harmony import */ var _dataset_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataset-editor.vue?vue&type=script&lang=js& */ "./src/vue/dataset-editor.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _dataset_editor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataset-editor.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/dataset-editor.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _dataset_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _dataset_editor_vue_vue_type_template_id_166fba24_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _dataset_editor_vue_vue_type_template_id_166fba24_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/dataset-editor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/dataset-editor.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./src/vue/dataset-editor.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-editor.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-editor.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/dataset-editor.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************!*\
  !*** ./src/vue/dataset-editor.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_editor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-editor.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-editor.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_editor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_editor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_editor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_editor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_editor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/dataset-editor.vue?vue&type=template&id=166fba24&lang=html&":
/*!*****************************************************************************!*\
  !*** ./src/vue/dataset-editor.vue?vue&type=template&id=166fba24&lang=html& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_editor_vue_vue_type_template_id_166fba24_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-editor.vue?vue&type=template&id=166fba24&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-editor.vue?vue&type=template&id=166fba24&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_editor_vue_vue_type_template_id_166fba24_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_editor_vue_vue_type_template_id_166fba24_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/dataset-list.vue":
/*!**********************************!*\
  !*** ./src/vue/dataset-list.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataset_list_vue_vue_type_template_id_773036d6_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataset-list.vue?vue&type=template&id=773036d6&lang=html& */ "./src/vue/dataset-list.vue?vue&type=template&id=773036d6&lang=html&");
/* harmony import */ var _dataset_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataset-list.vue?vue&type=script&lang=js& */ "./src/vue/dataset-list.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _dataset_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataset-list.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/dataset-list.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _dataset_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _dataset_list_vue_vue_type_template_id_773036d6_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _dataset_list_vue_vue_type_template_id_773036d6_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/dataset-list.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/dataset-list.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/vue/dataset-list.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-list.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-list.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/dataset-list.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************!*\
  !*** ./src/vue/dataset-list.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-list.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-list.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/dataset-list.vue?vue&type=template&id=773036d6&lang=html&":
/*!***************************************************************************!*\
  !*** ./src/vue/dataset-list.vue?vue&type=template&id=773036d6&lang=html& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_list_vue_vue_type_template_id_773036d6_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-list.vue?vue&type=template&id=773036d6&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-list.vue?vue&type=template&id=773036d6&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_list_vue_vue_type_template_id_773036d6_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_list_vue_vue_type_template_id_773036d6_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/dataset-select.vue":
/*!************************************!*\
  !*** ./src/vue/dataset-select.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataset_select_vue_vue_type_template_id_10806e33_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataset-select.vue?vue&type=template&id=10806e33&lang=html& */ "./src/vue/dataset-select.vue?vue&type=template&id=10806e33&lang=html&");
/* harmony import */ var _dataset_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataset-select.vue?vue&type=script&lang=js& */ "./src/vue/dataset-select.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _dataset_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataset-select.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/dataset-select.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _dataset_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _dataset_select_vue_vue_type_template_id_10806e33_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _dataset_select_vue_vue_type_template_id_10806e33_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/dataset-select.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/dataset-select.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./src/vue/dataset-select.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-select.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-select.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/dataset-select.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************!*\
  !*** ./src/vue/dataset-select.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-select.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-select.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/dataset-select.vue?vue&type=template&id=10806e33&lang=html&":
/*!*****************************************************************************!*\
  !*** ./src/vue/dataset-select.vue?vue&type=template&id=10806e33&lang=html& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_select_vue_vue_type_template_id_10806e33_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./dataset-select.vue?vue&type=template&id=10806e33&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/dataset-select.vue?vue&type=template&id=10806e33&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_select_vue_vue_type_template_id_10806e33_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dataset_select_vue_vue_type_template_id_10806e33_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/image-edit.vue":
/*!********************************!*\
  !*** ./src/vue/image-edit.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_edit_vue_vue_type_template_id_404b88fe_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-edit.vue?vue&type=template&id=404b88fe&lang=html& */ "./src/vue/image-edit.vue?vue&type=template&id=404b88fe&lang=html&");
/* harmony import */ var _image_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-edit.vue?vue&type=script&lang=js& */ "./src/vue/image-edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _image_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-edit.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/image-edit.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _image_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _image_edit_vue_vue_type_template_id_404b88fe_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _image_edit_vue_vue_type_template_id_404b88fe_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/image-edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/image-edit.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./src/vue/image-edit.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./image-edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/image-edit.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************!*\
  !*** ./src/vue/image-edit.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./image-edit.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-edit.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/image-edit.vue?vue&type=template&id=404b88fe&lang=html&":
/*!*************************************************************************!*\
  !*** ./src/vue/image-edit.vue?vue&type=template&id=404b88fe&lang=html& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_edit_vue_vue_type_template_id_404b88fe_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./image-edit.vue?vue&type=template&id=404b88fe&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/image-edit.vue?vue&type=template&id=404b88fe&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_edit_vue_vue_type_template_id_404b88fe_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_edit_vue_vue_type_template_id_404b88fe_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/image-info.vue":
/*!********************************!*\
  !*** ./src/vue/image-info.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_info_vue_vue_type_template_id_292ce4bc_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-info.vue?vue&type=template&id=292ce4bc&lang=html& */ "./src/vue/image-info.vue?vue&type=template&id=292ce4bc&lang=html&");
/* harmony import */ var _image_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-info.vue?vue&type=script&lang=js& */ "./src/vue/image-info.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _image_info_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-info.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/image-info.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _image_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _image_info_vue_vue_type_template_id_292ce4bc_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _image_info_vue_vue_type_template_id_292ce4bc_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/image-info.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/image-info.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./src/vue/image-info.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./image-info.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/image-info.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************!*\
  !*** ./src/vue/image-info.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./image-info.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/image-info.vue?vue&type=template&id=292ce4bc&lang=html&":
/*!*************************************************************************!*\
  !*** ./src/vue/image-info.vue?vue&type=template&id=292ce4bc&lang=html& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_vue_vue_type_template_id_292ce4bc_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./image-info.vue?vue&type=template&id=292ce4bc&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/image-info.vue?vue&type=template&id=292ce4bc&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_vue_vue_type_template_id_292ce4bc_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_info_vue_vue_type_template_id_292ce4bc_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/image-upload.vue":
/*!**********************************!*\
  !*** ./src/vue/image-upload.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_upload_vue_vue_type_template_id_18676e75_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-upload.vue?vue&type=template&id=18676e75&lang=html& */ "./src/vue/image-upload.vue?vue&type=template&id=18676e75&lang=html&");
/* harmony import */ var _image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-upload.vue?vue&type=script&lang=js& */ "./src/vue/image-upload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _image_upload_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-upload.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/image-upload.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _image_upload_vue_vue_type_template_id_18676e75_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _image_upload_vue_vue_type_template_id_18676e75_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/image-upload.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/image-upload.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/vue/image-upload.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./image-upload.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-upload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/image-upload.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************!*\
  !*** ./src/vue/image-upload.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_upload_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./image-upload.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-upload.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_upload_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_upload_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_upload_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_upload_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_upload_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/image-upload.vue?vue&type=template&id=18676e75&lang=html&":
/*!***************************************************************************!*\
  !*** ./src/vue/image-upload.vue?vue&type=template&id=18676e75&lang=html& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_upload_vue_vue_type_template_id_18676e75_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./image-upload.vue?vue&type=template&id=18676e75&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/image-upload.vue?vue&type=template&id=18676e75&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_upload_vue_vue_type_template_id_18676e75_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_upload_vue_vue_type_template_id_18676e75_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ "./src/vue/main-app.vue":
/*!******************************!*\
  !*** ./src/vue/main-app.vue ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_app_vue_vue_type_template_id_ad9c3862_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-app.vue?vue&type=template&id=ad9c3862&lang=html& */ "./src/vue/main-app.vue?vue&type=template&id=ad9c3862&lang=html&");
/* harmony import */ var _main_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main-app.vue?vue&type=script&lang=js& */ "./src/vue/main-app.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _main_app_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main-app.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/main-app.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _main_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _main_app_vue_vue_type_template_id_ad9c3862_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _main_app_vue_vue_type_template_id_ad9c3862_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/main-app.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/main-app.vue?vue&type=script&lang=js&":
/*!*******************************************************!*\
  !*** ./src/vue/main-app.vue?vue&type=script&lang=js& ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./main-app.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/main-app.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/main-app.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************!*\
  !*** ./src/vue/main-app.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_app_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./main-app.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/main-app.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_app_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_app_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_app_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_app_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_app_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/main-app.vue?vue&type=template&id=ad9c3862&lang=html&":
/*!***********************************************************************!*\
  !*** ./src/vue/main-app.vue?vue&type=template&id=ad9c3862&lang=html& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_main_app_vue_vue_type_template_id_ad9c3862_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./main-app.vue?vue&type=template&id=ad9c3862&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/main-app.vue?vue&type=template&id=ad9c3862&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_main_app_vue_vue_type_template_id_ad9c3862_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_main_app_vue_vue_type_template_id_ad9c3862_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/tag-select.vue":
/*!********************************!*\
  !*** ./src/vue/tag-select.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tag_select_vue_vue_type_template_id_05d61ed1_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tag-select.vue?vue&type=template&id=05d61ed1&lang=html& */ "./src/vue/tag-select.vue?vue&type=template&id=05d61ed1&lang=html&");
/* harmony import */ var _tag_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tag-select.vue?vue&type=script&lang=js& */ "./src/vue/tag-select.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _tag_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tag-select.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/tag-select.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _tag_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _tag_select_vue_vue_type_template_id_05d61ed1_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _tag_select_vue_vue_type_template_id_05d61ed1_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/tag-select.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/tag-select.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./src/vue/tag-select.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./tag-select.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-select.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/tag-select.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************!*\
  !*** ./src/vue/tag-select.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./tag-select.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-select.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/tag-select.vue?vue&type=template&id=05d61ed1&lang=html&":
/*!*************************************************************************!*\
  !*** ./src/vue/tag-select.vue?vue&type=template&id=05d61ed1&lang=html& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_select_vue_vue_type_template_id_05d61ed1_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./tag-select.vue?vue&type=template&id=05d61ed1&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-select.vue?vue&type=template&id=05d61ed1&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_select_vue_vue_type_template_id_05d61ed1_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_select_vue_vue_type_template_id_05d61ed1_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ "./src/vue/uploader.vue":
/*!******************************!*\
  !*** ./src/vue/uploader.vue ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uploader_vue_vue_type_template_id_91e60ca0_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uploader.vue?vue&type=template&id=91e60ca0&lang=html& */ "./src/vue/uploader.vue?vue&type=template&id=91e60ca0&lang=html&");
/* harmony import */ var _uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uploader.vue?vue&type=script&lang=js& */ "./src/vue/uploader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _uploader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uploader.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/uploader.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uploader_vue_vue_type_template_id_91e60ca0_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uploader_vue_vue_type_template_id_91e60ca0_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/uploader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/uploader.vue?vue&type=script&lang=js&":
/*!*******************************************************!*\
  !*** ./src/vue/uploader.vue?vue&type=script&lang=js& ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./uploader.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/uploader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/uploader.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************!*\
  !*** ./src/vue/uploader.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_uploader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./uploader.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/uploader.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_uploader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_uploader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_uploader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_uploader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_uploader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/uploader.vue?vue&type=template&id=91e60ca0&lang=html&":
/*!***********************************************************************!*\
  !*** ./src/vue/uploader.vue?vue&type=template&id=91e60ca0&lang=html& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_uploader_vue_vue_type_template_id_91e60ca0_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./uploader.vue?vue&type=template&id=91e60ca0&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/uploader.vue?vue&type=template&id=91e60ca0&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_uploader_vue_vue_type_template_id_91e60ca0_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_uploader_vue_vue_type_template_id_91e60ca0_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/user-list.vue":
/*!*******************************!*\
  !*** ./src/vue/user-list.vue ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user_list_vue_vue_type_template_id_066cf58e_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-list.vue?vue&type=template&id=066cf58e&lang=html& */ "./src/vue/user-list.vue?vue&type=template&id=066cf58e&lang=html&");
/* harmony import */ var _user_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-list.vue?vue&type=script&lang=js& */ "./src/vue/user-list.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _user_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-list.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/user-list.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _user_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _user_list_vue_vue_type_template_id_066cf58e_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _user_list_vue_vue_type_template_id_066cf58e_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/user-list.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/user-list.vue?vue&type=script&lang=js&":
/*!********************************************************!*\
  !*** ./src/vue/user-list.vue?vue&type=script&lang=js& ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./user-list.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/user-list.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/user-list.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************!*\
  !*** ./src/vue/user-list.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./user-list.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/user-list.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_list_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/user-list.vue?vue&type=template&id=066cf58e&lang=html&":
/*!************************************************************************!*\
  !*** ./src/vue/user-list.vue?vue&type=template&id=066cf58e&lang=html& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_user_list_vue_vue_type_template_id_066cf58e_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./user-list.vue?vue&type=template&id=066cf58e&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/user-list.vue?vue&type=template&id=066cf58e&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_user_list_vue_vue_type_template_id_066cf58e_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_user_list_vue_vue_type_template_id_066cf58e_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/user-select.vue":
/*!*********************************!*\
  !*** ./src/vue/user-select.vue ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user_select_vue_vue_type_template_id_34f5b628_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-select.vue?vue&type=template&id=34f5b628&lang=html& */ "./src/vue/user-select.vue?vue&type=template&id=34f5b628&lang=html&");
/* harmony import */ var _user_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-select.vue?vue&type=script&lang=js& */ "./src/vue/user-select.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _user_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-select.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/user-select.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _user_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _user_select_vue_vue_type_template_id_34f5b628_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _user_select_vue_vue_type_template_id_34f5b628_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/user-select.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/user-select.vue?vue&type=script&lang=js&":
/*!**********************************************************!*\
  !*** ./src/vue/user-select.vue?vue&type=script&lang=js& ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./user-select.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/user-select.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/user-select.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************!*\
  !*** ./src/vue/user-select.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./user-select.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/user-select.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_user_select_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/user-select.vue?vue&type=template&id=34f5b628&lang=html&":
/*!**************************************************************************!*\
  !*** ./src/vue/user-select.vue?vue&type=template&id=34f5b628&lang=html& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_user_select_vue_vue_type_template_id_34f5b628_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./user-select.vue?vue&type=template&id=34f5b628&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/user-select.vue?vue&type=template&id=34f5b628&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_user_select_vue_vue_type_template_id_34f5b628_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_user_select_vue_vue_type_template_id_34f5b628_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 0:
/*!******************************!*\
  !*** multi ./src/js/main.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/main.js */"./src/js/main.js");


/***/ })

/******/ });
//# sourceMappingURL=main.js.map