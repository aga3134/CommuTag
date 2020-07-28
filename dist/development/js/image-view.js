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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
/* harmony import */ var _tag_checkbox_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tag-checkbox.vue */ "./src/vue/tag-checkbox.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    "tag-checkbox": _tag_checkbox_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
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
      return this.$refs.tagCheckbox.tagSelect;
    },
    SkipTask: function () {
      this.$emit("skipTask");
    },
    GetSelectTag: function (annotation) {
      var selected = "";

      for (var i = 0; i < annotation.length; i++) {
        var tag = annotation[i];
        if (tag.value == "true") selected += "#" + tag.name + " ";
      }

      return selected;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-view.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator-view.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _annotator_image_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./annotator-image.vue */ "./src/vue/annotator-image.vue");
/* harmony import */ var _annotator_bbox_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./annotator-bbox.vue */ "./src/vue/annotator-bbox.vue");
//
//
//
//
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
  name: "annotator-view",
  components: {
    "annotator-image": _annotator_image_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    "annotator-bbox": _annotator_bbox_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    dataset: Object,
    image: Object
  },
  data: function () {
    return {};
  },
  mounted: function () {},
  methods: {}
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

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/form-reply.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/form-reply.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "form-editor",
  props: {
    formData: Object,
    formReply: Object
  },
  components: {},
  data: function () {
    return {
      editReply: {}
    };
  },
  created: function () {
    if (this.formReply) {
      this.editReply = Object.assign({}, this.formReply);
    } else {
      var initReply = {};

      for (var i = 0; i < this.formData.itemArr.length; i++) {
        var item = this.formData.itemArr[i];
        var reply = {};

        if (item.type == "checkbox") {
          reply.value = [];
        }

        initReply[item.id] = reply;
      }

      this.editReply = initReply;
    } //若沒資料mongodb不會存空物件或空陣列，把空資料放回去避免取資料時出錯


    for (var i = 0; i < this.formData.itemArr.length; i++) {
      var item = this.formData.itemArr[i];
      if (!item.attr) item.attr = {};
      if (!item.option) item.option = [];

      if (!this.editReply[item.id]) {
        var reply = {};

        if (item.type == "checkbox") {
          reply.value = [];
        }

        Vue.set(this.editReply, item.id, reply);
      } //依問題產生validate rule
      //radio跟checkbox沒內建validation，另外處理


      item.rule = [];

      switch (item.type) {
        case "text":
          if (item.canNotEmpty == "true") {
            item.rule.push(val => !!val || '文字不能空白');
          }

          break;

        case "number":
          item.rule.push(function () {
            var minValue = parseFloat(item.attr.minValue);
            var maxValue = parseFloat(item.attr.maxValue);
            var canNotEmpty = item.canNotEmpty == "true";
            return function (val) {
              if (canNotEmpty && val == null) return "數字不能空白";
              if (minValue != NaN && val < minValue) return "數值不能小於" + minValue;
              if (maxValue != NaN && val > maxValue) return "數值不能大於" + maxValue;
              return true;
            };
          }());
          break;
      }
    }
  },
  methods: {
    ValidateReply: function () {
      var valid = true;

      for (var i = 0; i < this.formData.itemArr.length; i++) {
        var item = this.formData.itemArr[i];
        var reply = this.editReply[item.id].value;

        switch (item.type) {
          case "text":
          case "number":
            //ref在v-for裡面會自動變array
            var ref = this.$refs[item.id][0];
            ref.validate();

            if (ref.hasError) {
              this.$q.notify({
                color: "negative",
                message: "欄位" + (i + 1) + " 格式不符"
              });
              valid = false;
            }

            break;

          case "radio":
            if (item.canNotEmpty == "true" && reply == null) {
              this.$q.notify({
                color: "negative",
                message: "欄位" + (i + 1) + " 不能空白"
              });
              valid = false;
            }

            break;

          case "checkbox":
            if (!reply) reply = [];

            if (item.canNotEmpty == "true" && !reply.length) {
              this.$q.notify({
                color: "negative",
                message: "欄位" + (i + 1) + " 不能空白"
              });
              valid = false;
            }

            if (reply.length > 0) {
              //有選擇才check數量
              var minCheck = parseFloat(item.attr.minCheck);
              var maxCheck = parseFloat(item.attr.maxCheck);

              if (minCheck != NaN && reply.length < minCheck || maxCheck != NaN && reply.length > maxCheck) {
                this.$q.notify({
                  color: "negative",
                  message: "欄位" + (i + 1) + " 選擇數量不符規定"
                });
                valid = false;
              }
            }

            break;
        }
      }

      return valid;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-control.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-control.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _annotator_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./annotator.vue */ "./src/vue/annotator.vue");
/* harmony import */ var _annotator_view_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./annotator-view.vue */ "./src/vue/annotator-view.vue");
/* harmony import */ var _location_select_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./location-select.vue */ "./src/vue/location-select.vue");
/* harmony import */ var _image_info_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./image-info.vue */ "./src/vue/image-info.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "image-control",
  props: {
    user: Object,
    dataset: Object,
    image: Object,
    showNavigate: Boolean,
    editable: Boolean
  },
  components: {
    "annotator": _annotator_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    "annotator-view": _annotator_view_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    "location-select": _location_select_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    "image-info": _image_info_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function () {
    return {
      openAnnotator: false,
      openLocationView: false,
      openInfoEdit: false,
      editImage: null,
      uploader: null,
      annotator: null,
      openUserInfo: false,
      targetUser: null
    };
  },
  mounted: function () {
    var idArr = [];
    var hasUploader = this.image.uploadFrom == "user" && this.image.uploader;
    var hasAnnotator = this.image.annotation && this.image.annotation.user;

    if (hasUploader) {
      idArr.push(this.image.uploader);
    }

    if (hasAnnotator) {
      idArr.push(this.image.annotation.user);
    }

    if (idArr.length == 0) return;
    $.get("/user/list-name?id=" + idArr.join(), function (result) {
      if (result.status != "ok") return alert("取得貢獻者資料失敗");
      var userHash = {};

      for (var i = 0; i < result.data.length; i++) {
        var d = result.data[i];
        userHash[d._id] = d;
      }

      if (hasUploader) {
        this.uploader = userHash[this.image.uploader];
      }

      if (hasAnnotator) {
        this.annotator = userHash[this.image.annotation.user];
      }
    }.bind(this));
  },
  methods: {
    GoToPrev: function () {
      this.$emit("goToPrev");
    },
    GoToNext: function () {
      this.$emit("goToNext");
    },
    CloseView: function () {
      this.$emit("closeView");
    },
    AnnotateImage: function () {
      this.openAnnotator = true;
    },
    FinishAnnotation: function () {
      this.openAnnotator = false;
      this.openViewImage = false;
      this.$emit("reload");
    },
    ViewLocation: function () {
      this.openLocationView = true;
      Vue.nextTick(function () {
        this.$refs.locationSelect.SetPosition(this.image.lat, this.image.lng);
      }.bind(this));
    },
    OpenInfoEditor: function () {
      //編輯前從伺服器取得最新資料，減少共同編輯時被蓋掉的機率
      $.get("/dataset/view-image?dataset=" + this.dataset._id + "&image=" + this.image._id, function (result) {
        if (result.status != "ok") return window.location.href = "/?message=" + encodeURIComponent("無法顯示影像");
        var tz = spacetime().name; //get browser time zone

        this.editImage = result.data;

        if (this.editImage.dataTime) {
          var t = spacetime(this.editImage.dataTime).goto(tz);
          this.editImage.time = t.unixFmt("yyyy-MM-dd HH:mm:ss");
        }

        this.editImage.url = "/static/upload/dataset/" + this.dataset._id + "/image/" + this.image._id + ".jpg";
        this.openInfoEdit = true;
      }.bind(this));
    },
    OpenUserInfo: function (user) {
      this.targetUser = user;
      this.openUserInfo = true;
    },
    UpdateImageInfo: function () {
      var csrfToken = $("meta[name='csrf-token']").attr("content");
      var info = this.$refs.imageInfo.GetImageInfo();
      var data = {};
      data.dataset = this.dataset._id;
      data.image = this.image._id;
      data.dataTime = info.dataTime;
      data.remark = info.remark;
      data.formReply = info.formReply;

      if (info.loc) {
        data.lat = info.loc.lat;
        data.lng = info.loc.lng;
      }

      data._csrf = csrfToken;
      $.post("/dataset/update-image-info", data, function (result) {
        if (result.status != "ok") return alert("更新失敗");
        this.$emit("reload");
        this.openInfoEdit = false;
        this.$q.notify("更新成功");
      }.bind(this));
    },
    DeleteImage: function () {
      if (confirm("確定刪除此影像?")) {
        var csrfToken = $("meta[name='csrf-token']").attr("content");
        var data = {};
        data.dataset = this.dataset._id;
        data.image = this.image._id;
        data._csrf = csrfToken;
        $.post("/dataset/delete-image", data, function (result) {
          if (result.status != "ok") return alert("刪除失敗");
          this.$emit("reload");
          this.$q.notify("刪除成功");
        }.bind(this));
      }
    },
    DownloadImage: function () {
      if (!this.image) return;
      var a = $("<a>").attr("href", this.image.url).attr("download", this.image._id + ".jpg").appendTo("body");
      a[0].click();
      a.remove();
    },
    GoToExternalLink: function () {
      var s = spacetime.now();
      var t = spacetime(this.image.dataTime).goto(s.timezone().name);
      t = t.subtract(t.minute() % 10, "minute");

      switch (this.dataset.externalLink) {
        case "riverlog":
          var link = "https://riverlog.lass-net.org/";
          link += "#year=" + t.year();
          link += "&date=" + t.unixFmt("MM-dd");
          link += "&time=" + t.unixFmt("HH:mm");
          link += "&lat=" + this.image.lat;
          link += "&lng=" + this.image.lng;
          link += "&marker=" + this.image.lat + "," + this.image.lng;
          link += "&zoom=16";
          window.open(link, "_blank");
          break;

        case "purbao":
          var link = "https://purbao.lass-net.org/";
          link += "?year=" + t.year();
          link += "&date=" + t.unixFmt("M/d");
          link += "&lat=" + this.image.lat;
          link += "&lng=" + this.image.lng;
          link += "&marker=" + this.image.lat + "," + this.image.lng;
          link += "&zoom=16";
          window.open(link, "_blank");
          break;
      }
    },
    GoToImageUrl: function () {
      if (!this.image) return;
      window.open("/image?dataset=" + this.dataset._id + "&image=" + this.image._id, "_blank");
    },
    DeleteAnnotation: function () {
      if (confirm("確定刪除此影像的標註?")) {
        this.openViewImage = false;
        var csrfToken = $("meta[name='csrf-token']").attr("content");
        var data = {};
        data.dataset = this.dataset._id;
        data.image = this.image._id;
        data._csrf = csrfToken;
        $.post("/dataset/set-annotation", data, function (result) {
          if (result.status != "ok") return alert("刪除標註失敗");
          this.$q.notify("刪除標註成功");
          this.$emit("reload");
        }.bind(this));
      }
    }
  },
  computed: {
    AgreeVerifyRatio: function () {
      var str = this.image.agreeNum + ' / ' + this.image.verifyNum;

      if (this.image.verifyNum > 0) {
        str += ' (' + (100 * this.image.agreeNum / this.image.verifyNum).toFixed(0) + '%)';
      }

      return str;
    },
    CheckAnnotationDelete: function () {
      if (!this.user) return false;
      if (!this.image) return false;
      if (!this.image.annotation) return false;
      if (this.user.authType == "admin") return true; //使用者可以刪除自己的標註

      if (this.image.annotation.user == this.user._id) return true; //確認目前使用者是不是在master list裡

      if (!this.info) return false;
      var isMaster = this.info.master.filter(function (master) {
        return master._id == this.user._id;
      }.bind(this));
      if (isMaster.length > 0) return true;
      return false;
    },
    CheckMasterAuth: function () {
      if (!this.user) return false;
      if (this.user.authType == "admin") return true; //確認目前使用者是不是在master list裡

      if (!this.dataset) return false;
      var isMaster = this.dataset.master.filter(function (master) {
        return master._id == this.user._id;
      }.bind(this));
      if (isMaster.length > 0) return true;
      return false;
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
/* harmony import */ var _form_reply_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-reply.vue */ "./src/vue/form-reply.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    initRemark: String,
    initReply: Object
  },
  components: {
    "location-select": _location_select_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    "form-reply": _form_reply_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
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

    if (this.$refs.locationSelect) {
      if (this.initLat && this.initLng) {
        this.$refs.locationSelect.SetPosition(this.initLat, this.initLng);
      } else if (this.dataset.enableGPS) {
        this.$refs.locationSelect.GetGPS();
      }
    }

    if (this.initRemark) this.remark = this.initRemark;
  },
  methods: {
    GetImageInfo: function () {
      var info = {};
      var s = spacetime.now();
      info.dataTime = spacetime(this.dataTime, s.timezone().name).format("iso");
      info.remark = this.remark;

      if (this.$refs.formReply) {
        info.formReply = this.$refs.formReply.editReply;
      }

      if (this.$refs.locationSelect) {
        info.loc = this.$refs.locationSelect.loc;
      }

      return info;
    },
    ConfirmSelect: function () {
      var formReply = this.$refs.formReply;
      if (formReply && !formReply.ValidateReply()) return;
      this.$emit("confirm");
    },
    CancelSelect: function () {
      this.$emit("cancel");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-view.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-view.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/util.js */ "./src/js/util.js");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _topbar_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./topbar.vue */ "./src/vue/topbar.vue");
/* harmony import */ var _image_control_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./image-control.vue */ "./src/vue/image-control.vue");
//
//
//
//
//
//
//
//
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
  name: "image-view",
  components: {
    "topbar": _topbar_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    "image-control": _image_control_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function () {
    return {
      user: null,
      datasetID: null,
      imageID: null,
      dataset: null,
      image: null
    };
  },
  created: function () {
    var param = _js_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].GetUrlParameter();
    this.datasetID = param.dataset;
    this.imageID = param.image;
    $.get("/user/info", function (result) {
      if (result.status != "ok") return;
      this.user = result.data;
    }.bind(this));
    $.get("/dataset/view-dataset?id=" + this.datasetID, function (result) {
      if (result.status != "ok") return window.location.href = "/?message=" + encodeURIComponent("無法顯示資料集");
      ;
      this.dataset = result.data;
      $.get("/dataset/view-image?dataset=" + this.datasetID + "&image=" + this.imageID, function (result) {
        if (result.status != "ok") return window.location.href = "/?message=" + encodeURIComponent("無法顯示影像");
        var tz = spacetime().name; //get browser time zone

        this.image = result.data;

        if (this.image.dataTime) {
          var t = spacetime(this.image.dataTime).goto(tz);
          this.image.time = t.unixFmt("yyyy-MM-dd HH:mm:ss");
        }

        this.image.url = "/static/upload/dataset/" + this.datasetID + "/image/" + this.imageID + ".jpg";
      }.bind(this));
    }.bind(this));
  },
  methods: {
    GoToDataset: function () {
      window.location.href = "/dataset?id=" + this.datasetID;
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

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-checkbox.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/tag-checkbox.vue?vue&type=script&lang=js& ***!
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
//
//
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
  name: "tag-checkbox",
  props: {
    dataset: Object
  },
  components: {},
  data: function () {
    return {
      btTitle: "選擇標籤",
      tagSelect: [],
      openTagSelect: false
    };
  },
  created: function () {
    this.tagSelect = [];

    for (var i = 0; i < this.dataset.tagArr.length; i++) {
      var tag = this.dataset.tagArr[i];
      this.tagSelect.push({
        "name": tag,
        "value": false
      });
    }
  },
  methods: {
    UpdateSelect: function () {
      var selected = 0;

      for (var i = 0; i < this.tagSelect.length; i++) {
        var tag = this.tagSelect[i];
        if (tag.value) selected++;
      }

      if (selected == 0) this.btTitle = "選擇標籤";else this.btTitle = selected + "個選擇";
    },
    ConfirmSelect: function () {
      this.openTagSelect = false;
      this.$emit("confirm");
    }
  }
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
exports.push([module.i, ".annotator-image {\n  width: 100%;\n  height: 100%;\n}\n.annotator-image .image {\n    margin: auto;\n    max-width: 800px;\n    max-height: 100%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-view.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator-view.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".annotator-view {\n  width: 100%;\n  height: 100%;\n}\n", ""]);
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/form-reply.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/form-reply.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".form-reply {\n  width: 100%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-control.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-control.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".image-control {\n  width: 100%;\n  height: 100%;\n}\n.image-control .form-area {\n    margin: 5px;\n    padding: 5px 10px;\n    border: 1px solid #888888;\n    border-radius: 5px;\n}\n", ""]);
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-view.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-view.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".image-view {\n  width: 100%;\n  height: 100%;\n}\n", ""]);
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-checkbox.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/tag-checkbox.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-view.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator-view.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./annotator-view.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-view.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/form-reply.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/form-reply.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./form-reply.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/form-reply.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-control.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-control.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./image-control.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-control.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-view.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-view.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./image-view.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-view.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-checkbox.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/tag-checkbox.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./tag-checkbox.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-checkbox.vue?vue&type=style&index=0&lang=scss&");

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
                              _vm._s(
                                _vm.GetSelectTag(
                                  _vm.image.annotation.annotation
                                )
                              ) +
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
                          _c("tag-checkbox", {
                            ref: "tagCheckbox",
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
                            _vm._s(
                              _vm.GetSelectTag(_vm.image.annotation.annotation)
                            ) +
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-view.vue?vue&type=template&id=ed034890&lang=html&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/annotator-view.vue?vue&type=template&id=ed034890&lang=html& ***!
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
  return _c("div", { staticClass: "annotator-view bg-grey-7" }, [
    _vm.dataset && _vm.image
      ? _c(
          "div",
          { staticClass: "fit" },
          [
            _vm.dataset.annotationType == "image"
              ? _c("annotator-image", {
                  attrs: {
                    dataset: _vm.dataset,
                    image: _vm.image,
                    task: "view"
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.dataset.annotationType == "bbox"
              ? _c("annotator-bbox", {
                  attrs: {
                    dataset: _vm.dataset,
                    image: _vm.image,
                    task: "view"
                  }
                })
              : _vm._e()
          ],
          1
        )
      : _c("div", { staticClass: "fit row justify-center items-center" }, [
          _c("div", { staticClass: "text-h5 text-white" }, [_vm._v("無影像")])
        ])
  ])
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/form-reply.vue?vue&type=template&id=7e7157e3&lang=html&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/form-reply.vue?vue&type=template&id=7e7157e3&lang=html& ***!
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
    { staticClass: "form-reply" },
    [
      _c(
        "q-list",
        { attrs: { bordered: "" } },
        _vm._l(_vm.formData.itemArr, function(item, i) {
          return _c(
            "q-item",
            { key: item.id },
            [
              _c("q-item-section", [
                _c("div", [
                  item.canNotEmpty == "true"
                    ? _c("span", { staticClass: "text-red" }, [_vm._v("*")])
                    : _vm._e(),
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(i + 1) +
                      ". " +
                      _vm._s(item.quest) +
                      "\n\t\t\t\t"
                  )
                ]),
                _vm._v(" "),
                _c("div", [
                  item.type == "text"
                    ? _c(
                        "div",
                        [
                          _c("q-input", {
                            ref: item.id,
                            refInFor: true,
                            attrs: {
                              dense: "",
                              placeholder: "請輸入文字",
                              rules: item.rule
                            },
                            model: {
                              value: _vm.editReply[item.id].value,
                              callback: function($$v) {
                                _vm.$set(_vm.editReply[item.id], "value", $$v)
                              },
                              expression: "editReply[item.id].value"
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  item.type == "radio"
                    ? _c(
                        "div",
                        _vm._l(item.option, function(op, j) {
                          return _c("q-radio", {
                            key: op,
                            attrs: { label: op, val: op },
                            model: {
                              value: _vm.editReply[item.id].value,
                              callback: function($$v) {
                                _vm.$set(_vm.editReply[item.id], "value", $$v)
                              },
                              expression: "editReply[item.id].value"
                            }
                          })
                        }),
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  item.type == "checkbox"
                    ? _c(
                        "div",
                        [
                          _c(
                            "div",
                            { staticClass: "text-subtitle2 text-red row" },
                            [
                              item.attr.minCheck
                                ? _c("div", { staticClass: "q-mx-sm" }, [
                                    _vm._v(
                                      "最少選" +
                                        _vm._s(item.attr.minCheck) +
                                        "項"
                                    )
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              item.attr.maxCheck
                                ? _c("div", { staticClass: "q-mx-sm" }, [
                                    _vm._v(
                                      "最多選" +
                                        _vm._s(item.attr.maxCheck) +
                                        "項"
                                    )
                                  ])
                                : _vm._e()
                            ]
                          ),
                          _vm._v(" "),
                          _vm._l(item.option, function(op, j) {
                            return _c("q-checkbox", {
                              key: op,
                              attrs: { label: op, val: op },
                              model: {
                                value: _vm.editReply[item.id].value,
                                callback: function($$v) {
                                  _vm.$set(_vm.editReply[item.id], "value", $$v)
                                },
                                expression: "editReply[item.id].value"
                              }
                            })
                          })
                        ],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  item.type == "number"
                    ? _c(
                        "div",
                        [
                          _c(
                            "div",
                            { staticClass: "text-subtitle2 text-red row" },
                            [
                              item.attr.minValue
                                ? _c("div", { staticClass: "q-mx-sm" }, [
                                    _vm._v(
                                      "最小數值" + _vm._s(item.attr.minValue)
                                    )
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              item.attr.maxValue
                                ? _c("div", { staticClass: "q-mx-sm" }, [
                                    _vm._v(
                                      "最大數值" + _vm._s(item.attr.maxValue)
                                    )
                                  ])
                                : _vm._e()
                            ]
                          ),
                          _vm._v(" "),
                          _c("q-input", {
                            ref: item.id,
                            refInFor: true,
                            attrs: {
                              type: "number",
                              dense: "",
                              placeholder: "請輸入數字",
                              rules: item.rule
                            },
                            model: {
                              value: _vm.editReply[item.id].value,
                              callback: function($$v) {
                                _vm.$set(_vm.editReply[item.id], "value", $$v)
                              },
                              expression: "editReply[item.id].value"
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ])
              ])
            ],
            1
          )
        }),
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/image-control.vue?vue&type=template&id=516f5699&lang=html&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-control.vue?vue&type=template&id=516f5699&lang=html& ***!
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
  return _vm.dataset && _vm.image
    ? _c(
        "div",
        { staticClass: "image-control" },
        [
          _c(
            "q-card",
            { staticClass: "full-width" },
            [
              _c(
                "div",
                { staticStyle: { height: "400px" } },
                [
                  _c("annotator-view", {
                    attrs: { dataset: _vm.dataset, image: _vm.image }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "q-card-section",
                [
                  _vm.image.time
                    ? _c(
                        "q-chip",
                        {
                          staticClass: "transparent",
                          attrs: { dense: "", icon: "access_time" }
                        },
                        [_vm._v(_vm._s(_vm.image.time))]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.image.lat && _vm.image.lng
                    ? _c(
                        "q-chip",
                        {
                          staticClass: "transparent",
                          attrs: { dense: "", clickable: "", icon: "room" },
                          on: {
                            click: function($event) {
                              return _vm.ViewLocation()
                            }
                          }
                        },
                        [_vm._v("觀看地點")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.image.annotation
                    ? _c(
                        "q-chip",
                        { staticClass: "transparent", attrs: { dense: "" } },
                        [
                          _vm._v(
                            _vm._s("認同數 / 驗證數 : " + _vm.AgreeVerifyRatio)
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "row" }, [
                    _vm.uploader
                      ? _c(
                          "div",
                          {
                            staticClass: "q-pa-sm",
                            on: {
                              click: function($event) {
                                return _vm.OpenUserInfo(_vm.uploader)
                              }
                            }
                          },
                          [
                            _vm._v("上傳者:\n\t\t\t\t\t"),
                            _c(
                              "span",
                              { staticClass: "cursor-pointer text-blue-10" },
                              [_vm._v(_vm._s(_vm.uploader.name))]
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.annotator
                      ? _c(
                          "div",
                          {
                            staticClass: "q-pa-sm",
                            on: {
                              click: function($event) {
                                return _vm.OpenUserInfo(_vm.annotator)
                              }
                            }
                          },
                          [
                            _vm._v("標註者:\n\t\t\t\t\t"),
                            _c(
                              "span",
                              { staticClass: "cursor-pointer  text-blue-10" },
                              [_vm._v(_vm._s(_vm.annotator.name))]
                            )
                          ]
                        )
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _vm.image.remark && _vm.image.remark != ""
                    ? _c("pre", { staticClass: "q-mx-sm q-my-none" }, [
                        _vm._v(_vm._s(_vm.image.remark))
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.dataset.form && _vm.image.formReply
                    ? _c(
                        "div",
                        { staticClass: "form-area" },
                        [
                          _c("div", { staticClass: "text-subtitle1" }, [
                            _vm._v("表單資料")
                          ]),
                          _vm._v(" "),
                          _vm._l(_vm.dataset.form.itemArr, function(item, i) {
                            return _c(
                              "div",
                              { staticClass: "row q-gutter-sm" },
                              [
                                _c("div", [
                                  _vm._v(
                                    _vm._s(i + 1) + ". " + _vm._s(item.quest)
                                  )
                                ]),
                                _vm._v(" "),
                                _vm.image.formReply[item.id]
                                  ? _c("div", [
                                      _vm._v(
                                        "\n\t\t\t\t\t\t" +
                                          _vm._s(
                                            item.type == "checkbox"
                                              ? _vm.image.formReply[
                                                  item.id
                                                ].value.join(", ")
                                              : _vm.image.formReply[item.id]
                                                  .value
                                          ) +
                                          "\n\t\t\t\t\t"
                                      )
                                    ])
                                  : _vm._e()
                              ]
                            )
                          })
                        ],
                        2
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "q-card-actions",
                [
                  _vm.editable
                    ? _c(
                        "div",
                        [
                          _vm.dataset && _vm.dataset.enableAnnotation
                            ? _c("q-btn", {
                                attrs: {
                                  flat: "",
                                  label: _vm.image.annotation
                                    ? "協助驗證"
                                    : "協助標註"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.AnnotateImage()
                                  }
                                }
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          _c("q-btn", {
                            attrs: { flat: "", label: "影像網址" },
                            on: {
                              click: function($event) {
                                return _vm.GoToImageUrl()
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("q-btn", {
                            attrs: { flat: "", label: "下載影像" },
                            on: {
                              click: function($event) {
                                return _vm.DownloadImage()
                              }
                            }
                          }),
                          _vm._v(" "),
                          _vm.CheckAnnotationDelete
                            ? _c("q-btn", {
                                attrs: { flat: "", label: "刪除標註" },
                                on: {
                                  click: function($event) {
                                    return _vm.DeleteAnnotation()
                                  }
                                }
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.CheckMasterAuth
                            ? _c("q-btn", {
                                attrs: { flat: "", label: "編輯資訊" },
                                on: {
                                  click: function($event) {
                                    return _vm.OpenInfoEditor()
                                  }
                                }
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.CheckMasterAuth
                            ? _c("q-btn", {
                                attrs: { flat: "", label: "刪除影像" },
                                on: {
                                  click: function($event) {
                                    return _vm.DeleteImage()
                                  }
                                }
                              })
                            : _vm._e()
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.dataset && _vm.dataset.externalLink == "riverlog"
                    ? _c("q-btn", {
                        attrs: { flat: "", label: "前往山河事件簿" },
                        on: {
                          click: function($event) {
                            return _vm.GoToExternalLink()
                          }
                        }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.dataset && _vm.dataset.externalLink == "purbao"
                    ? _c("q-btn", {
                        attrs: { flat: "", label: "前往紫豹在哪裡" },
                        on: {
                          click: function($event) {
                            return _vm.GoToExternalLink()
                          }
                        }
                      })
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _vm.showNavigate
                ? _c(
                    "div",
                    [
                      _c(
                        "q-page-sticky",
                        { attrs: { position: "left", offset: [9, 0] } },
                        [
                          _c("q-btn", {
                            attrs: {
                              round: "",
                              color: "accent",
                              icon: "arrow_back"
                            },
                            on: {
                              click: function($event) {
                                return _vm.GoToPrev()
                              }
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "q-page-sticky",
                        { attrs: { position: "right", offset: [9, 0] } },
                        [
                          _c("q-btn", {
                            staticClass: "rotate-90",
                            attrs: {
                              round: "",
                              color: "accent",
                              icon: "arrow_upward"
                            },
                            on: {
                              click: function($event) {
                                return _vm.GoToNext()
                              }
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "q-page-sticky",
                        { attrs: { position: "top-right", offset: [9, -9] } },
                        [
                          _c("q-btn", {
                            attrs: {
                              round: "",
                              color: "primary",
                              icon: "close"
                            },
                            on: {
                              click: function($event) {
                                return _vm.CloseView()
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
            ],
            1
          ),
          _vm._v(" "),
          _vm.dataset
            ? _c(
                "q-dialog",
                {
                  attrs: { maximized: "", persistent: "" },
                  model: {
                    value: _vm.openAnnotator,
                    callback: function($$v) {
                      _vm.openAnnotator = $$v
                    },
                    expression: "openAnnotator"
                  }
                },
                [
                  _c("annotator", {
                    attrs: {
                      user: _vm.user,
                      dataset: _vm.dataset,
                      image: _vm.image
                    },
                    on: {
                      done: function($event) {
                        return _vm.FinishAnnotation()
                      },
                      skip: function($event) {
                        _vm.openAnnotator = false
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c("q-btn", {
                        directives: [
                          { name: "close-popup", rawName: "v-close-popup" }
                        ],
                        staticClass:
                          "bg-teal text-white q-ma-md absolute-top-right",
                        attrs: { round: "", icon: "close" }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.editImage
            ? _c(
                "q-dialog",
                {
                  model: {
                    value: _vm.openInfoEdit,
                    callback: function($$v) {
                      _vm.openInfoEdit = $$v
                    },
                    expression: "openInfoEdit"
                  }
                },
                [
                  _c("image-info", {
                    ref: "imageInfo",
                    attrs: {
                      dataset: _vm.dataset,
                      initDataTime: _vm.editImage.dataTime,
                      initLat: _vm.editImage.lat,
                      initLng: _vm.editImage.lng,
                      initRemark: _vm.editImage.remark,
                      initReply: _vm.editImage.formReply
                    },
                    on: {
                      confirm: function($event) {
                        return _vm.UpdateImageInfo()
                      },
                      cancel: function($event) {
                        _vm.openInfoEdit = false
                      }
                    }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.image && _vm.image.lat && _vm.image.lng
            ? _c(
                "q-dialog",
                {
                  model: {
                    value: _vm.openLocationView,
                    callback: function($$v) {
                      _vm.openLocationView = $$v
                    },
                    expression: "openLocationView"
                  }
                },
                [
                  _c(
                    "q-card",
                    { staticClass: "full-width q-pa-sm" },
                    [
                      _c("div", { staticClass: "text-h6" }, [
                        _vm._v("資料地點")
                      ]),
                      _vm._v(" "),
                      _c("location-select", {
                        ref: "locationSelect",
                        attrs: { mode: "view" }
                      }),
                      _vm._v(" "),
                      _c("div", { staticClass: "text-center" }, [
                        _vm._v(
                          "座標: " +
                            _vm._s(
                              _vm.image.lat.toFixed(5) +
                                " " +
                                _vm.image.lng.toFixed(5)
                            )
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "q-card-actions",
                        { attrs: { align: "center" } },
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
            : _vm._e(),
          _vm._v(" "),
          _vm.user && _vm.targetUser
            ? _c(
                "q-dialog",
                {
                  model: {
                    value: _vm.openUserInfo,
                    callback: function($$v) {
                      _vm.openUserInfo = $$v
                    },
                    expression: "openUserInfo"
                  }
                },
                [
                  _c(
                    "q-card",
                    { staticClass: "q-pa-lg" },
                    [
                      _c(
                        "div",
                        { staticClass: "row justify-center q-pa-sm" },
                        [
                          _c("q-avatar", { attrs: { size: "150px" } }, [
                            _c("img", {
                              staticStyle: { "object-fit": "cover" },
                              attrs: { src: _vm.targetUser.photo }
                            })
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "column q-pa-sm" }, [
                        _c("div", [_vm._v(_vm._s(_vm.targetUser.name))]),
                        _vm._v(" "),
                        _c("div", [_vm._v(_vm._s(_vm.targetUser.contactEmail))])
                      ]),
                      _vm._v(" "),
                      _c(
                        "q-card-actions",
                        { attrs: { align: "center" } },
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
            : _vm._e()
        ],
        1
      )
    : _vm._e()
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
          _vm.dataset.form
            ? _c(
                "q-card-section",
                [
                  _c("div", { staticClass: "text-h6" }, [_vm._v("填寫表單")]),
                  _vm._v(" "),
                  _c("form-reply", {
                    ref: "formReply",
                    attrs: {
                      formData: _vm.dataset.form,
                      formReply: _vm.initReply
                    }
                  })
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/image-view.vue?vue&type=template&id=28159019&lang=html&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/image-view.vue?vue&type=template&id=28159019&lang=html& ***!
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
    "q-layout",
    {
      staticClass: "image-view bg-grey-1 shadow-2",
      attrs: { view: "lHh lpr lFf", container: "" }
    },
    [
      _c("q-header", [_c("topbar", { attrs: { user: _vm.user } })], 1),
      _vm._v(" "),
      _c(
        "q-page-container",
        [
          _c("image-control", {
            attrs: { user: _vm.user, dataset: _vm.dataset, image: _vm.image }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "q-footer",
        [
          _c("q-btn", {
            staticClass: "full-width bg-grey-8",
            attrs: { icon: "home", label: "回資料集" },
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-checkbox.vue?vue&type=template&id=4b92eed8&lang=html&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vue/tag-checkbox.vue?vue&type=template&id=4b92eed8&lang=html& ***!
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
    { staticClass: "tag-checkbox" },
    [
      _c(
        "q-btn",
        {
          staticClass: "q-ma-sm bg-brown-8",
          on: {
            click: function($event) {
              _vm.openTagSelect = true
            }
          }
        },
        [_vm._v(_vm._s(_vm.btTitle))]
      ),
      _vm._v(" "),
      _c(
        "q-dialog",
        {
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
                  _c("div", { staticClass: "text-h6" }, [_vm._v("選擇標籤")]),
                  _vm._v(" "),
                  _vm._l(_vm.tagSelect, function(tag) {
                    return _c("q-checkbox", {
                      key: tag.name,
                      attrs: { label: tag.name },
                      on: {
                        input: function($event) {
                          return _vm.UpdateSelect()
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

/***/ "./src/js/image-view.js":
/*!******************************!*\
  !*** ./src/js/image-view.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vue_image_view_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vue/image-view.vue */ "./src/vue/image-view.vue");

new Vue({
  el: "#imageViewApp",
  components: {
    "image-view": _vue_image_view_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
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

/***/ "./src/vue/annotator-view.vue":
/*!************************************!*\
  !*** ./src/vue/annotator-view.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _annotator_view_vue_vue_type_template_id_ed034890_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./annotator-view.vue?vue&type=template&id=ed034890&lang=html& */ "./src/vue/annotator-view.vue?vue&type=template&id=ed034890&lang=html&");
/* harmony import */ var _annotator_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./annotator-view.vue?vue&type=script&lang=js& */ "./src/vue/annotator-view.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _annotator_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./annotator-view.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/annotator-view.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _annotator_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _annotator_view_vue_vue_type_template_id_ed034890_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _annotator_view_vue_vue_type_template_id_ed034890_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/annotator-view.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/annotator-view.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./src/vue/annotator-view.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./annotator-view.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-view.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/annotator-view.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************!*\
  !*** ./src/vue/annotator-view.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./annotator-view.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-view.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/annotator-view.vue?vue&type=template&id=ed034890&lang=html&":
/*!*****************************************************************************!*\
  !*** ./src/vue/annotator-view.vue?vue&type=template&id=ed034890&lang=html& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_view_vue_vue_type_template_id_ed034890_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./annotator-view.vue?vue&type=template&id=ed034890&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/annotator-view.vue?vue&type=template&id=ed034890&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_view_vue_vue_type_template_id_ed034890_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_annotator_view_vue_vue_type_template_id_ed034890_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ "./src/vue/form-reply.vue":
/*!********************************!*\
  !*** ./src/vue/form-reply.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_reply_vue_vue_type_template_id_7e7157e3_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-reply.vue?vue&type=template&id=7e7157e3&lang=html& */ "./src/vue/form-reply.vue?vue&type=template&id=7e7157e3&lang=html&");
/* harmony import */ var _form_reply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-reply.vue?vue&type=script&lang=js& */ "./src/vue/form-reply.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _form_reply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-reply.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/form-reply.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _form_reply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_reply_vue_vue_type_template_id_7e7157e3_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_reply_vue_vue_type_template_id_7e7157e3_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/form-reply.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/form-reply.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./src/vue/form-reply.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_reply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./form-reply.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/form-reply.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_reply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/form-reply.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************!*\
  !*** ./src/vue/form-reply.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_reply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./form-reply.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/form-reply.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_reply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_reply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_reply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_reply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_reply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/form-reply.vue?vue&type=template&id=7e7157e3&lang=html&":
/*!*************************************************************************!*\
  !*** ./src/vue/form-reply.vue?vue&type=template&id=7e7157e3&lang=html& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_reply_vue_vue_type_template_id_7e7157e3_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./form-reply.vue?vue&type=template&id=7e7157e3&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/form-reply.vue?vue&type=template&id=7e7157e3&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_reply_vue_vue_type_template_id_7e7157e3_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_reply_vue_vue_type_template_id_7e7157e3_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/vue/image-control.vue":
/*!***********************************!*\
  !*** ./src/vue/image-control.vue ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_control_vue_vue_type_template_id_516f5699_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-control.vue?vue&type=template&id=516f5699&lang=html& */ "./src/vue/image-control.vue?vue&type=template&id=516f5699&lang=html&");
/* harmony import */ var _image_control_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-control.vue?vue&type=script&lang=js& */ "./src/vue/image-control.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _image_control_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-control.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/image-control.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _image_control_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _image_control_vue_vue_type_template_id_516f5699_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _image_control_vue_vue_type_template_id_516f5699_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/image-control.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/image-control.vue?vue&type=script&lang=js&":
/*!************************************************************!*\
  !*** ./src/vue/image-control.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_control_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./image-control.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-control.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_control_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/image-control.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************!*\
  !*** ./src/vue/image-control.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_control_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./image-control.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-control.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_control_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_control_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_control_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_control_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_control_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/image-control.vue?vue&type=template&id=516f5699&lang=html&":
/*!****************************************************************************!*\
  !*** ./src/vue/image-control.vue?vue&type=template&id=516f5699&lang=html& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_control_vue_vue_type_template_id_516f5699_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./image-control.vue?vue&type=template&id=516f5699&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/image-control.vue?vue&type=template&id=516f5699&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_control_vue_vue_type_template_id_516f5699_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_control_vue_vue_type_template_id_516f5699_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ "./src/vue/image-view.vue":
/*!********************************!*\
  !*** ./src/vue/image-view.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_view_vue_vue_type_template_id_28159019_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-view.vue?vue&type=template&id=28159019&lang=html& */ "./src/vue/image-view.vue?vue&type=template&id=28159019&lang=html&");
/* harmony import */ var _image_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-view.vue?vue&type=script&lang=js& */ "./src/vue/image-view.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _image_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-view.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/image-view.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _image_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _image_view_vue_vue_type_template_id_28159019_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _image_view_vue_vue_type_template_id_28159019_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/image-view.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/image-view.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./src/vue/image-view.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./image-view.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-view.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/image-view.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************!*\
  !*** ./src/vue/image-view.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./image-view.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/image-view.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_image_view_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/image-view.vue?vue&type=template&id=28159019&lang=html&":
/*!*************************************************************************!*\
  !*** ./src/vue/image-view.vue?vue&type=template&id=28159019&lang=html& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_view_vue_vue_type_template_id_28159019_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./image-view.vue?vue&type=template&id=28159019&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/image-view.vue?vue&type=template&id=28159019&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_view_vue_vue_type_template_id_28159019_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_image_view_vue_vue_type_template_id_28159019_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ "./src/vue/tag-checkbox.vue":
/*!**********************************!*\
  !*** ./src/vue/tag-checkbox.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tag_checkbox_vue_vue_type_template_id_4b92eed8_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tag-checkbox.vue?vue&type=template&id=4b92eed8&lang=html& */ "./src/vue/tag-checkbox.vue?vue&type=template&id=4b92eed8&lang=html&");
/* harmony import */ var _tag_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tag-checkbox.vue?vue&type=script&lang=js& */ "./src/vue/tag-checkbox.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _tag_checkbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tag-checkbox.vue?vue&type=style&index=0&lang=scss& */ "./src/vue/tag-checkbox.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _tag_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _tag_checkbox_vue_vue_type_template_id_4b92eed8_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _tag_checkbox_vue_vue_type_template_id_4b92eed8_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vue/tag-checkbox.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/vue/tag-checkbox.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/vue/tag-checkbox.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./tag-checkbox.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-checkbox.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/vue/tag-checkbox.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************!*\
  !*** ./src/vue/tag-checkbox.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_checkbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./tag-checkbox.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-checkbox.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_checkbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_checkbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_checkbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_checkbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_checkbox_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/vue/tag-checkbox.vue?vue&type=template&id=4b92eed8&lang=html&":
/*!***************************************************************************!*\
  !*** ./src/vue/tag-checkbox.vue?vue&type=template&id=4b92eed8&lang=html& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_checkbox_vue_vue_type_template_id_4b92eed8_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./tag-checkbox.vue?vue&type=template&id=4b92eed8&lang=html& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/vue/tag-checkbox.vue?vue&type=template&id=4b92eed8&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_checkbox_vue_vue_type_template_id_4b92eed8_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_tag_checkbox_vue_vue_type_template_id_4b92eed8_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ 5:
/*!************************************!*\
  !*** multi ./src/js/image-view.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/image-view.js */"./src/js/image-view.js");


/***/ })

/******/ });
//# sourceMappingURL=image-view.js.map