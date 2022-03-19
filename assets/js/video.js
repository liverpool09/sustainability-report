/**
 * lightgallery | 2.2.1 | September 4th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

! function(e, o) { "object" == typeof exports && "undefined" != typeof module ? module.exports = o() : "function" == typeof define && define.amd ? define(o) : (e = "undefined" != typeof globalThis ? globalThis : e || self).lgVideo = o() }(this, (function() {
    "use strict";
    var e = function() {
            return (e = Object.assign || function(e) {
                for (var o, i = 1, t = arguments.length; i < t; i++)
                    for (var s in o = arguments[i]) Object.prototype.hasOwnProperty.call(o, s) && (e[s] = o[s]);
                return e
            }).apply(this, arguments)
        },
        o = { autoplayFirstVideo: !0, youTubePlayerParams: !1, vimeoPlayerParams: !1, wistiaPlayerParams: !1, gotoNextSlideOnVideoEnd: !0, autoplayVideoOnSlide: !1, videojs: !1, videojsOptions: {} },
        i = "lgHasVideo",
        t = "lgBeforeSlide",
        s = "lgAfterSlide",
        l = "lgPosterClick";

    function n(e) { return Object.keys(e).map((function(o) { return encodeURIComponent(o) + "=" + encodeURIComponent(e[o]) })).join("&") }
    return function() {
        function r(i) { return this.core = i, this.settings = e(e({}, o), this.core.settings), this }
        return r.prototype.init = function() {
            var e = this;
            this.core.LGel.on(i + ".video", this.onHasVideo.bind(this)), this.core.LGel.on(l + ".video", (function() {
                var o = e.core.getSlideItem(e.core.index);
                e.loadVideoOnPosterClick(o)
            })), this.core.LGel.on(t + ".video", this.onBeforeSlide.bind(this)), this.core.LGel.on(s + ".video", this.onAfterSlide.bind(this))
        }, r.prototype.onHasVideo = function(e) {
            var o = e.detail,
                i = o.index,
                t = o.src,
                s = o.html5Video,
                l = o.hasPoster,
                n = o.isFirstSlide;
            if (l || (this.appendVideos(this.core.getSlideItem(i), { src: t, addClass: "lg-object", index: i, html5Video: s }), this.gotoNextSlideOnVideoEnd(t, i)), this.settings.autoplayFirstVideo && n)
                if (l) {
                    var r = this.core.getSlideItem(i);
                    this.loadVideoOnPosterClick(r)
                } else this.playVideo(i)
        }, r.prototype.onBeforeSlide = function(e) {
            var o = e.detail,
                i = o.prevIndex;
            o.index, this.pauseVideo(i)
        }, r.prototype.onAfterSlide = function(e) {
            var o = this,
                i = e.detail.index;
            this.settings.autoplayVideoOnSlide && this.core.lGalleryOn && setTimeout((function() {
                var e = o.core.getSlideItem(i);
                e.hasClass("lg-video-loaded") ? o.playVideo(i) : o.loadVideoOnPosterClick(e)
            }), 100)
        }, r.prototype.playVideo = function(e) { this.controlVideo(e, "play") }, r.prototype.pauseVideo = function(e) { this.controlVideo(e, "pause") }, r.prototype.getVideoHtml = function(e, o, i, t) {
            var s = "",
                l = this.core.galleryItems[i].__slideVideoInfo || {},
                r = this.core.galleryItems[i],
                d = r.title || r.alt;
            d = d ? 'title="' + d + '"' : "";
            var a = 'allowtransparency="true"\n            frameborder="0"\n            scrolling="no"\n            allowfullscreen\n            mozallowfullscreen\n            webkitallowfullscreen\n            oallowfullscreen\n            msallowfullscreen';
            if (l.youtube) {
                var c = "lg-youtube" + i,
                    f = "?wmode=opaque&autoplay=0&enablejsapi=1" + (this.settings.youTubePlayerParams ? "&" + n(this.settings.youTubePlayerParams) : "");
                s = '<iframe allow="autoplay" id=' + c + ' class="lg-video-object lg-youtube ' + o + '" ' + d + ' src="//www.youtube.com/embed/' + (l.youtube[1] + f) + '" ' + a + "></iframe>"
            } else if (l.vimeo) {
                c = "lg-vimeo" + i, f = n(this.settings.vimeoPlayerParams);
                s = '<iframe allow="autoplay" id=' + c + ' class="lg-video-object lg-vimeo ' + o + '" ' + d + ' src="//player.vimeo.com/video/' + (l.vimeo[1] + f) + '" ' + a + "></iframe>"
            } else if (l.wistia) {
                var u = "lg-wistia" + i;
                f = n(this.settings.wistiaPlayerParams);
                s = '<iframe allow="autoplay" id="' + u + '" src="//fast.wistia.net/embed/iframe/' + (l.wistia[4] + f) + '" ' + d + ' class="wistia_embed lg-video-object lg-wistia ' + o + '" name="wistia_embed" ' + a + "></iframe>"
            } else if (l.html5) {
                for (var h = "", g = 0; g < t.source.length; g++) h += '<source src="' + t.source[g].src + '" type="' + t.source[g].type + '">';
                if (t.tracks) {
                    var y = function(e) {
                        var o = "",
                            i = t.tracks[e];
                        Object.keys(i || {}).forEach((function(e) { o += e + '="' + i[e] + '" ' })), h += "<track " + o + ">"
                    };
                    for (g = 0; g < t.tracks.length; g++) y(g)
                }
                var v = "",
                    p = t.attributes || {};
                Object.keys(p || {}).forEach((function(e) { v += e + '="' + p[e] + '" ' })), s = '<video class="lg-video-object lg-html5 ' + (this.settings.videojs ? "video-js" : "") + '" ' + v + ">\n                " + h + "\n                Your browser does not support HTML5 video.\n            </video>"
            }
            return s
        }, r.prototype.appendVideos = function(e, o) {
            var i, t = this.getVideoHtml(o.src, o.addClass, o.index, o.html5Video);
            e.find(".lg-video-cont").append(t);
            var s = e.find(".lg-video-object").first();
            if (o.html5Video && s.on("mousedown.lg.video", (function(e) { e.stopPropagation() })), this.settings.videojs && (null === (i = this.core.galleryItems[o.index].__slideVideoInfo) || void 0 === i ? void 0 : i.html5)) try { return videojs(s.get(), this.settings.videojsOptions) } catch (e) { console.error("lightGallery:- Make sure you have included videojs") }
        }, r.prototype.gotoNextSlideOnVideoEnd = function(e, o) {
            var i = this,
                t = this.core.getSlideItem(o).find(".lg-video-object").first(),
                s = this.core.galleryItems[o].__slideVideoInfo || {};
            if (this.settings.gotoNextSlideOnVideoEnd)
                if (s.html5) t.on("ended", (function() { i.core.goToNextSlide() }));
                else if (s.vimeo) try { new Vimeo.Player(t.get()).on("ended", (function() { i.core.goToNextSlide() })) } catch (e) { console.error("lightGallery:- Make sure you have included //github.com/vimeo/player.js") } else if (s.wistia) try { window._wq = window._wq || [], window._wq.push({ id: t.attr("id"), onReady: function(e) { e.bind("end", (function() { i.core.goToNextSlide() })) } }) } catch (e) { console.error("lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js") }
        }, r.prototype.controlVideo = function(e, o) {
            var i = this.core.getSlideItem(e).find(".lg-video-object").first(),
                t = this.core.galleryItems[e].__slideVideoInfo || {};
            if (i.get())
                if (t.youtube) try { i.get().contentWindow.postMessage('{"event":"command","func":"' + o + 'Video","args":""}', "*") } catch (e) { console.error("lightGallery:- " + e) } else if (t.vimeo) try { new Vimeo.Player(i.get())[o]() } catch (e) { console.error("lightGallery:- Make sure you have included //github.com/vimeo/player.js") } else if (t.html5)
                    if (this.settings.videojs) try { videojs(i.get())[o]() } catch (e) { console.error("lightGallery:- Make sure you have included videojs") } else i.get()[o]();
                    else if (t.wistia) try { window._wq = window._wq || [], window._wq.push({ id: i.attr("id"), onReady: function(e) { e[o]() } }) } catch (e) { console.error("lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js") }
        }, r.prototype.loadVideoOnPosterClick = function(e) {
            var o = this;
            if (!e.hasClass("lg-video-loaded"))
                if (e.hasClass("lg-has-video")) this.playVideo(this.core.index);
                else {
                    e.addClass("lg-has-video");
                    var i = void 0,
                        t = this.core.galleryItems[this.core.index].src,
                        s = this.core.galleryItems[this.core.index].video;
                    s && (i = "string" == typeof s ? JSON.parse(s) : s);
                    var l = this.appendVideos(e, { src: t, addClass: "", index: this.core.index, html5Video: i });
                    this.gotoNextSlideOnVideoEnd(t, this.core.index);
                    var n = e.find(".lg-object").first().get();
                    e.find(".lg-video-cont").first().append(n), e.addClass("lg-video-loading"), l && l.ready((function() { l.on("loadedmetadata", (function() { o.onVideoLoadAfterPosterClick(e, o.core.index) })) })), e.find(".lg-video-object").first().on("load.lg error.lg loadeddata.lg", (function() { setTimeout((function() { o.onVideoLoadAfterPosterClick(e, o.core.index) }), 50) }))
                }
        }, r.prototype.onVideoLoadAfterPosterClick = function(e, o) { e.addClass("lg-video-loaded"), this.playVideo(o) }, r.prototype.destroy = function() { this.core.LGel.off(".lg.video"), this.core.LGel.off(".video") }, r
    }()
}));