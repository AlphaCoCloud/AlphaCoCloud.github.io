function App() {

    var _self = this,
        _config,
        _Stream,
        _liveSwiper,
        _lives = {
            /*
            * id : {
            *
            *
            * }
            *
            *
            * */
        },
        _QWebChannelInstance,
        _$snackBar,
        _snackBarTimeoutId,
        _protectMode = false,
        _streamRequestLoading = false;

    function constructor() {

        initEvent();

        getConfig(function (config) {
            _config = config;

            // addGames(_config.games);


            checkSize();

            checkOrientation();

            initIframes();

            initStreamModule();

            // initializeLivesSlider(_config.lives);


            if (Utils.checkPlatform.PC()) {
                handlePCMode();
            } else {
                registerIntroVideoEndListener(function () {
                    $(".gc-intro-video-content .gc-overlay").addClass("gc-show");
                    $(".gc-intro-section .gc-inner-content").addClass("gc-show");

                    setTimeout(function () {
                        $(".gc-tab-contents").addClass("gc-active-tab");
                    }, 1000);
                });
            }

        });

        _$snackBar = $("body > .gc-snack-bar");

        var uData = Utils.getUrlData(location.href);

        if (uData) {
            if (uData.protect === "true") {
                _protectMode = true;
            }
            if (uData.download === "true") {
                openDownloadDialog();
            }
        }


    }

    function handlePCMode() {
        $(".gc-main-container").addClass("pc-mode");
        $(".gc-loading-content").hide();
        $(".gc-refresh-content").addClass("gc-show");

        // showTab("gc-cloudgame-section");
    }


    function initStreamModule() {
        _Stream = new Stream({
            container: $(".gc-stream-container")
        });
    }

    function addGames(games) {

        for (var i = 0; i < games.length; i++) {
            addGame(games[i]);
        }
    }

    function AccessCodeDialog(callback) {

        if (_protectMode) {

            var content = '\
            <div class="modal gc-access-code-dialog" tabindex="-1" role="dialog">\
                <div class="modal-dialog" role="document">\
                    <div class="modal-content">\
                        <div class="modal-body">\
                            <input class="gc-input-access-code" placeholder="please enter your code" >\
                        </div>\
                        <div class="modal-footer">\
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>\
                            <button type="button" class="gc-accept btn btn-primary">Save changes</button>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        ';

            var $content = $(content);

            $content.find("button.gc-accept").on("click", function () {
                var val = $content.find(".gc-input-access-code").val();

                if (!val) {
                    _self.showMessage({
                        message: "please enter your code",
                        alert: true
                    });
                } else {
                    callback && callback(val);
                    $content.modal('hide')
                }
            });

            $content.modal({});
        } else {
            callback();
        }

    }

    function addGame(game) {

        var $container = $(".gc-cloudgame-section");

        var $gamesContainer = $container.find(".gc-inner-content >.gc-content");

        // var url = "./res/img/" + game.gameId + ".jpg";
        var url = _config.imageBaseUrl + "/" + game.gameId + ".jpg";

        var gameContent = '\
            <div class="gc-game-content">\
                <div class="gc-loading-content">\
                    <img src="./res/mov/loading.gif" >\
                </div>\
                <div class="gc-game-icon"  style="background-image: url('+ url + ')"></div>\
            </div>\
        ';


        var $content = $(gameContent);

        $content.on("click", function () {

            AccessCodeDialog(function (code) {

                if (_streamRequestLoading) return;
                _streamRequestLoading = true;


                $content.addClass("gc-disable");

                var reqData = { gameId: game.gameId };

                if (code) {
                    reqData.code = code;
                }

                streamRequest(reqData, function (res) {
                    $content.removeClass("gc-disable");
                    _streamRequestLoading = false;
                    if (res.hasError) {

                        _self.showMessage({
                            message: res.errorMessage,
                            alert: true
                        })
                    } else {

                        // var wsPrefix = isSiteSecure() ? "wss://" : "ws://";
                        var wsPrefix = "ws://";

                        var result = res.result;
                        var streamData = {
                            gameId: game.gameId,
                            socketAddress: {
                                io: result.io,
                                rtsp: result.rtsp,
                                ip: result.ip,
                                websocket: wsPrefix + result.ip + ":" + result.ws
                            },
                            width: result.w,
                            height: result.h,
                            name: game.name,
                            token: result.token
                        };

                        if (Utils.checkPlatform.PC()) {
                            postMessageToParent(
                                { type: 1, content: streamData });

                        } else {
                            _Stream.show(streamData);
                        }
                    }
                });
            });

        });

        $gamesContainer.append($content);
    }

    function isSiteSecure() {
        return location.href.indexOf("https") === 0;
    }

    function streamRequest(params, callback) {
        var clientType;
        if (Utils.checkPlatform.mobile()) {
            clientType = 4;
        } if (Utils.checkPlatform.PC()) {
            clientType = 3;
        } else {
            clientType = 1;
        }


        var url = _config.streamRequestUrl + "?gameID=" + params.gameId + "&clientType=" + clientType;

        if (params.code) {
            url += ("&protectCode=" + params.code)
        }

        $.ajax({
            method: "GET",
            url: url,
        })
            .done(function (res) {

                var resObj = {
                    hasError: res.HasError,
                    errorMessage: res.ErrorMessage,
                    result: res.Result
                };
                callback(resObj);
            })
            .fail(function (e) {
                var resObj = {
                    hasError: true,
                    errorMessage: "request fail,try again",
                    result: null
                };
                callback(resObj);
            });
    }

    function getLiveContent(id) {

        var content = '\
            <div class="swiper-slide " gc-id="'+ id + '">\
                <div class="gc-video-content gc-pointer">\
                    <video class="video-js vjs-default-skin " playsinline ></video>\
                    <div class="gc-overlay"></div>\
                </div>\
            </div>\
        ';

        return content;
    }

    function addLive(params) {


        if (!params.id) {
            params.id = Utils.generateUUID();
        }

        var $slideContent = $(getLiveContent(params.id));


        _lives[params.id] = {
            urlData: params.urlData,
            container: $slideContent
        };


        params.container.append($slideContent);

        var sources = [
            {
                // src: params.dash,
                // type: 'application/dash+xml'
                src: params.urlData.hls,
                type: 'application/x-mpegURL'
            }
        ];

        var options = {
            id: params.id,
            // loadingSpinner :false,
            muted: true,
            // autoplay: false,
            preload: 'metadata',
            // loop : true,
            controls: true,
            // liveui : true,
            sources: sources,
            aspectRatio: "16:9",
            nativeControlsForTouch: false,
            html5: {
                dash: {
                    // setFastSwitchEnabled : true,
                    // setAutoSwitchQualityFor : true,
                    // setLiveDelayFragmentCount: 3,
                    // setFragmentLoaderRetryInterval : 1000,
                    // setJumpGaps : true,
                    // setLowLatencyEnabled : true,
                    setLiveDelay: 0
                },
                nativeControlsForTouch: false,
            },
            language: 'fa',
            fluid: true,
            controlBar: {
                VolumeMenuButton: false,
                // volumeMenuButton: false
                children: [
                    // "PlayToggle",
                    "DurationDisplay",
                    "LiveDisplay",
                    "FullscreenToggle",
                ]
            },
            responsive: true,
        };


        var player = videojs($slideContent.find("video")[0], options);

        _lives[params.id].player = player;

        player.controlBar.hide();

        player.on("play", function (e) {

            var slide = _liveSwiper.slides[_liveSwiper.activeIndex];
            var activeId = $(slide).attr("gc-id");

            if (activeId !== player.id()) {
                player.pause();
                return;
            }

            player.controlBar.show();
        });

        player.on("pause", function (e) {
            player.controlBar.hide();
        });

        if (Utils.checkPlatform.iOS()) {
            function clickHandler() {
                if (player.paused()) {
                    player.play();
                    player.bigPlayButton.hide();
                } else {
                    player.pause();
                    player.bigPlayButton.show();
                }
            }
            var lastTouchTime;
            player.on('touchstart', function () {
                lastTouchTime = new Date();
            });

            player.on('touchend', function () {
                if (lastTouchTime && (new Date() - lastTouchTime < 300)) {
                    clickHandler();
                }
            });

        }

        // player.on("error", function (e) {
        //     console.log("eeeeeeeeeeeee",e);
        // });

        // if(params.play ){
        //     player.play();
        //     $slideContent.find(".gc-overlay").hide();
        // }

    }

    function initializeLivesSlider(lives) {

        var $container = $(".gc-live-section .swiper-container");
        var $wraperContainer = $container.find(".swiper-wrapper");

        var activeIndex = parseInt(lives.length / 2);
        for (let i = 0; i < lives.length; i++) {

            addLive({
                container: $wraperContainer,
                urlData: lives[i],
                play: i === activeIndex
            });
        }

        var effectName;

        if (!Utils.checkPlatform.Firefox()) {
            effectName = "coverflow";
        }

        _liveSwiper = new Swiper($container, {
            effect: effectName,
            // loop: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            // initialSlide: 5,
            // mousewheel: true,
            // preventClicks: true,
            // preventClicksPropagation: true,
            // lazyLoadingInPrevNext: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            initialSlide: activeIndex,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 250,
                modifier: 2,
                slideShadows: false,
            },
            noSwipingClass: "vjs-control-bar",
        });

        _liveSwiper.on('slideChange', function (e) {
            $container.find(".gc-overlay").show();

            var $slide = $(_liveSwiper.slides[_liveSwiper.activeIndex]);
            var slideId = $slide.attr("gc-id");

            for (var sldId in _lives) {
                if (sldId === slideId) {
                    playLive(sldId);
                } else {
                    _lives[sldId].player.pause();
                }
            }
        });
    }

    function playLive(id) {
        _lives[id].player.play();

        _lives[id].container.find('.gc-overlay').hide();
    }

    function getConfig(callback) {

        $.ajax({
            dataType: "json",
            url: "./src/share/Config.json",
            success: function (data) {

            }
        })
            .success(function (data) {
                callback(data);
            })
            .fail(function () {
                setTimeout(function () {
                    getConfig(callback);
                }, 2000);
            });
    }

    function renderYoutubeContent(url) {
        return `\
        <iframe src=${url}\
            frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"\
            allowfullscreen>\
        </iframe>\
    `;
    }

    function initIframes() {

        var falconUrl = "https://www.youtube.com/embed/ygpz35ddZ_4?autoplay=1&mute=1&enablejsapi=1&playsinline=1";
        var cloudgamingUrl = "https://www.youtube.com/embed/14KRyURyszI?autoplay=1&mute=1&enablejsapi=1&playsinline=1";

        var $falcon = $(".gc-tab-contents .gc-falcon-section .gc-iframe-content");
        var $cloudgaming = $(".gc-tab-contents .gc-cloudgaming-section .gc-iframe-content");

        $falcon.append(renderYoutubeContent(falconUrl));
        $cloudgaming.append(renderYoutubeContent(cloudgamingUrl));
    }

    function checkSize() {

        var width = $(window).width();
        var height = $(window).height();

        if (width < 500 && width < height) {
            var $vid = $(".gc-intro-video-content video");

            $vid.attr("src", "./res/mov/portrait.mp4");

            $vid[0].play();
        }
    }

    function registerIntroVideoEndListener(callback) {

        var $container = $(".gc-intro-video-content");
        var $vid = $container.find("video");

        $vid.on("ended", callback);

        var canPlay = false;

        function onVideoCanPlay() {
            if (canPlay) return;
            canPlay = true;

            setTimeout(function () {

                if ($vid[0].paused) {
                    $vid.remove();
                    var $img = $container.find(".gc-background");

                    var width = $(window).width();
                    var height = $(window).height();

                    if (width < 500 && width < height) {
                        $img.attr("src", "./res/img/portrait.jpg");
                    } else {
                        $img.attr("src", "./res/img/landscape.jpg");
                    }

                    $img.addClass("gc-show");

                    callback();
                }
                $("body > .gc-loading-content").hide();


            }, 200);
        }

        $vid.on("canplay", onVideoCanPlay);
        $vid.on("canplaythrough", onVideoCanPlay);
    }

    function showTab(className) {
        var $tabContents = $(".gc-tab-contents");

        var currentTabContent = $tabContents.find(".gc-active");

        if (currentTabContent.hasClass(className)) return;

        var selectedTabContent = $tabContents.find("." + className);

        selectedTabContent
            .removeClass("gc-page-out")
            .addClass("gc-page-in gc-active");


        currentTabContent
            .removeClass("gc-page-in gc-active")
            .addClass("gc-page-out");

        selectedTabContent.find("iframe").each(function () {
            this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');

        });

        currentTabContent.find("iframe").each(function () {
            this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

        });

        // if (currentTabContent.hasClass("gc-live-section")) {
        //     for (var id in _lives) {
        //         _lives[id].player.pause();
        //     }
        // }

        // if (selectedTabContent.hasClass("gc-live-section")) {

        //     var $slide = $(_liveSwiper.slides[_liveSwiper.activeIndex]);
        //     playLive($slide.attr("gc-id"));
        // }


        $(".gc-main-container >.gc-content >.gc-tab .gc-active").removeClass('gc-active');
    }

    function openDownloadDialog() {

        // <div class="gc-download-content">
        //         <a class="gc-link" href="./res/file/WolfEngine.zip" target="_blank">PC App</a>
        //     </div>
        var content = '\
            <div class="modal gc-download-dialog" tabindex="-1" role="dialog">\
                <div class="modal-dialog" role="document">\
                    <div class="modal-content">\
                        <div class="modal-header">\
                            <span>Download App</span>\
                        </div>\
                        <div class="modal-body">\
                            <div class="gc-download-content">\
                                <a class="gc-link" href="./res/file/WolfEngine.apk" target="_blank">Android App</a>\
                            </div>\
                        </div>\
                        <div class="modal-footer">\
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        ';

        var $content = $(content);

        $content.find("button.gc-accept").on("click", function () {

        });

        $content.modal({});
    }

    function initEvent() {

        $(document.body).on("click", "[gc-show-page]", function (e) {

            var className = $(this).attr("gc-show-page");

            showTab(className);

            $(this).addClass("gc-active");

        });

        $(document.body).on("click", ".gc-refresh-content", function (e) {

            location.reload();
        });

        // $(document.body).on("click",".gc-cloudgame-section .gc-header .gc-download", function () {
        //     openDownloadDialog();
        // });

        window.addEventListener("orientationchange", checkOrientation, false);

        $(window).on("resize", function () {
            _Stream && _Stream.onResize();
        });
    }

    function checkOrientation() {

        var $content = $(".gc-orientation-message");

        var orientation = window.screen.orientation ? window.screen.orientation.angle : window.orientation;

        if (typeof orientation != "undefined") {
            if (orientation !== 0) { // is not in portrait mode
                $content.addClass("gc-show");
            } else {
                $content.removeClass("gc-show");
            }
        }
    }

    function postMessageToParent(msg) {

        if (!_QWebChannelInstance) {
            new QWebChannel(qt.webChannelTransport, function (channel) {
                _QWebChannelInstance = channel.objects.playpod;
                _QWebChannelInstance.postMessage(JSON.stringify(msg));
            });
        } else {
            _QWebChannelInstance.postMessage(JSON.stringify(msg));

        }

    };

    this.showMessage = function (params) {

        if (_snackBarTimeoutId) {
            clearTimeout(_snackBarTimeoutId);
            _snackBarTimeoutId = null;
        }

        var addedClass = "";
        if (params.alert) {
            addedClass += "gc-alert";
        } else {
            _$snackBar
                .find(".gc-text")
                .removeClass("gc-alert");
        }

        _$snackBar
            .addClass("gc-show")
            .find(".gc-text")
            .text(params.message)
            .addClass(addedClass);

        _snackBarTimeoutId = setTimeout(function () {
            _snackBarTimeoutId = undefined;
            _$snackBar.removeClass("gc-show");
        }, 3000);

    };

    constructor();
}

