function Stream(options) {

    var _self = this,
        _$container,
        _gamePad,
        _canSupportJoystick,
        _keyEventRegister = false,
        _fullscreenState = false,
        _currentAxisKeyDown = {},
        _streamData,
        _rightAxisData = {
            x:0,
            vx:0,
            ax:0,
            timeX : null,
            y:0,
            vy:0,
            ay:0,
            timeY : null,
            threshold : 0.2,
            keyDownTime : []
        },
        _visible = false;

    function constructor(params) {

        _$container = params.container;

        initialGamepad();

        initEvents();

    }

    function initEvents() {

        _$container.on("click",".gc-game-stream-container .gc-btn-help", function () {

            _$container.find(".gc-game-stream-container .gc-help-content")
                .removeClass("gc-hide")
                .addClass("gc-show");

        });

        _$container.on("click",".gc-game-stream-container .gc-help-content", function (e) {

            if($(e.target).hasClass('gc-navigation')) return;

            $(this)
                .removeClass("gc-show")
                .addClass("gc-hide");

        });

        function exitHandler(e) {
            _fullscreenState = true;
            if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                _fullscreenState = false;
                _$container
                    .find(".gc-view-container > .gc-button-content")
                    .removeClass("gc-fullscreen");
                _$container
                    .find(".gc-game-content .gc-full-screen-message-content")
                    .removeClass("gc-show")
                    .addClass("gc-hide");
            }


            _self.onResize();
        }

        document.addEventListener('webkitfullscreenchange', exitHandler, false);
        document.addEventListener('mozfullscreenchange', exitHandler, false);
        document.addEventListener('fullscreenchange', exitHandler, false);
        document.addEventListener('MSFullscreenChange', exitHandler, false);

        var clickEventName = "click";

        if(Utils.checkPlatform.mobile()) {
            clickEventName = "touchend";
        }
        _$container.on(clickEventName,".gc-footer .gc-btn-full-screen", function () {
            // var $this = $(this);
            //
            // var $parentContainer = $this.closest(".gc-match-content");
            // var $viewContainer = $parentContainer.find(">.gc-game-content .gc-view-container");
            // $viewContainer
            //     .find("> .gc-button-content")
            //     .addClass("gc-fullscreen");
            // Utils.fullscreen($viewContainer[0]);
            //
            // var $msgContainer = $parentContainer.find(".gc-full-screen-message-content");
            //
            // if($msgContainer.length === 1) {
            //
            //     $msgContainer
            //         .removeClass("gc-hide")
            //         .addClass("gc-show");
            //
            //     setTimeout(function () {
            //         $msgContainer
            //             .addClass("gc-hide")
            //             .removeClass("gc-show");
            //     },3000);
            // }


            var $this = $(this);

            var $parentContainer = $this.closest(".gc-match-content");
            var $viewContainer = $parentContainer.find(">.gc-game-content .gc-view-container");


            var support = Utils.fullscreen($viewContainer[0]);


            if(support) {
                $viewContainer
                    .find("> .gc-button-content")
                    .addClass("gc-fullscreen");

                var $msgContainer = $parentContainer.find(".gc-full-screen-message-content");

                if($msgContainer.length === 1) {

                    $msgContainer
                        .removeClass("gc-hide")
                        .addClass("gc-show");

                    setTimeout(function () {
                        $msgContainer
                            .addClass("gc-hide")
                            .removeClass("gc-show");
                    },3000);
                }
            } else {
                // _parent.showMessage({
                //     message: "مرورگر شما این ویژگی را پشتیبانی نمی کند!",
                //     alert: true
                // });
            }

        });

        _$container.on(clickEventName,".gc-footer .gc-btn-exit", function () {
            _self.hide();
        });

    }

    function initialGamepad() {
        if(GC_CONST.JOYSTICK_CONTROLLER_ENABLE) {
            _gamePad = new Gamepad();
            _canSupportJoystick = _gamePad.init();
            _gamePad.pause();
        }
    }

    function initStream(params) {

        _streamData = {
            width: params.width,
            height: params.height,
            streamData : {}
        };

        var swiperContent = '\
            <div class="swiper-container">\
                <div class="swiper-wrapper">\
                    <div class="swiper-slide">\
                        <img alt="joystick"  class="gc-help-joystick-sega" src="./res/img/help_joystick_sega.png">\
                    </div>\
                    <div class="swiper-slide">\
                        <img  alt="joystick"  class="gc-help-joystick-sega" src="./res/img/help_joystick_playstation.png">\
                    </div>\
                </div>\
            </div>\
            <i class="swiper-button-prev" ></i>\
            <i class="swiper-button-next"></i>\
        ';

        var content = '\
            <div class="gc-match-content gc-game-stream-container">\
                <section class="gc-game-content">\
                    <div class="gc-view-container">\
                         <canvas class="gc-game-view" width="'+params.width+'" height="'+params.height+'"></canvas>\
                         <div class="gc-btn-help gc-pointer"><i class="icon-question"></i></div>\
                         <div class="gc-help-content gc-pointer">\
                            '+swiperContent+'\
                         </div>\
                         <div class="gc-video-content">\
                            <video class="gc-video" autoplay muted playsinline>\
                                 <source src="./res/mov/streamPreLoad.mp4" type="video/mp4">\
                            </video>\
                         </div>\
                         <div class="gc-message-content"></div>\
                         <div class="gc-button-content">\
                            <div class="gc-center-down-controller">\
                                <div class="gc-right-content gc-pointer" gc-code="13">\
                                    <div class="gc-button-content">\
                                        <div class="gc-btn"></div>\
                                    </div>\
                                </div>\
                                <div class="gc-left-content gc-pointer" gc-code="27">\
                                    <div class="gc-button-content">\
                                        <div class="gc-btn"></div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="gc-left-down-controller">\
                                <div class="gc-up gc-pointer" gc-code="87"></div>\
                                <div class="gc-right gc-pointer" gc-code="68"></div>\
                                <div class="gc-down gc-pointer" gc-code="83"></div>\
                                <div class="gc-left gc-pointer" gc-code="65"></div>\
                            </div>\
                            <div class="gc-right-down-controller">\
                                <div class="gc-triangle gc-pointer" gc-code="73"></div>\
                                <div class="gc-circle gc-pointer" gc-code="76"></div>\
                                <div class="gc-square gc-pointer" gc-code="74"></div>\
                                <div class="gc-multiply gc-pointer" gc-code="75"></div>\
                            </div>\
                            <div class="gc-left-up-controller">\
                                <div class="gc-L1-content gc-pointer" gc-code="70">\
                                    <div class="gc-image"></div>\
                                </div>\
                                <div class="gc-L2-content gc-pointer" gc-code="69">\
                                    <div class="gc-image"></div>\
                                </div>\
                            </div>\
                            <div class="gc-right-up-controller">\
                                <div class="gc-R1-content gc-pointer" gc-code="80">\
                                    <div class="gc-image"></div>\
                                </div>\
                                <div class="gc-R2-content gc-pointer" gc-code="79">\
                                    <div class="gc-image"></div>\
                                </div>\
                            </div>\
                         </div>\
                         <i class="gc-mouse icon icon-telegram"></i>\
                         '+getFullScreenContent()+'\
                    </div>\
                </section>\
                <section class="gc-footer">\
                    <div class="gc-button-content">\
                        <div class="gc-button gc-btn-exit gc-pointer">Exit</div>\
                        <div class="gc-button gc-btn-full-screen gc-pointer">Fullscreen</div>\
                    </div>\
                </section>\
            </div>\
        ';

        var $content = $(content);

        _streamData.container = $content;

        _$container.find(".gc-inner-content >.gc-content").append($content);

        var bestConf = {
            spaceBetween : 20,
            slidesPerView: 'auto',
            // navigation: {
            //     nextEl: _$container.find(".gc-navigation-left"),
            //     prevEl: _$container.find(".gc-navigation-right")
            // }
        };

        new Swiper(_$container.find(".swiper-container"), bestConf);


        _gamePad && _gamePad.resume();

        initStreamEvents(_$container);
        initStreamConnection(params);
    }

    function onKeyDown(e) {
        // console.log("onKeyDown", e.keyCode);

        if( _streamData.streamData && _streamData.streamData.io_key_down) {
            _streamData.streamData.io_key_down.push( e.keyCode);
        }
    }

    function onKeyUp(e) {
        // console.log("onKeyUp", e.keyCode);
        if( _streamData.streamData && _streamData.streamData.io_key_up) _streamData.streamData.io_key_up.push(e.keyCode);
    }

    function onMouseClick(event){
        // console.log("onMouseClick",event);

        var pos;
        var state = event.type === "mousedown" ? 1 : 0;

        switch (event.which) {
            case 1://'Left Mouse button pressed.'
                pos = GC_CONST.MOUSE_LEFT;
                break;
            case 2://Middle Mouse button pressed.
                pos = GC_CONST.MOUSE_MIDDLE;
                break;
            case 3: //'Right Mouse button pressed.'
                pos = GC_CONST.MOUSE_RIGHT;
                break;
            default:
            // alert('You have a strange Mouse!');
        }

        if (pos) {

            if(_streamData.streamData && _streamData.streamData.mouseClick) {
                _streamData.streamData.mouseClick.push(pos | state);
            }
        }


    }

    function onMouseWheel(e){
        if(_streamData.streamData && _streamData.streamData.mouseWheel) {
            _streamData.streamData.mouseWheel.push(e.originalEvent.wheelDelta);
        }
    }

    function onMouseMove(e) {

        if(_streamData.streamData) {
            var $canvas = $(e.target);


            var canvasOffset=$canvas.offset();
            var offsetX=canvasOffset.left;
            var offsetY=canvasOffset.top;


            _streamData.streamData.lastMouseX = parseInt(e.clientX-offsetX);
            _streamData.streamData.lastMouseY = parseInt(e.clientY-offsetY);



            var newXPos = Utils.convertToRange(
                _streamData.streamData.lastMouseX,
                [0, $canvas[0].width],
                [0, _streamData.width]);

            var newYPos = Utils.convertToRange(
                _streamData.streamData.lastMouseY,
                [0, $canvas[0].height],
                [0, _streamData.height]);

            _streamData.streamData.mouseX = parseInt(newXPos);
            _streamData.streamData.mouseY = parseInt(newYPos);
        }

    }

    function removeListener() {
        _keyEventRegister = false;
        document.removeEventListener('keydown',onKeyDown);
        document.removeEventListener('keyup',onKeyUp);
        _gamePad && _gamePad.unbind(Gamepad.Event.BUTTON_DOWN, onJoystickButtonDown);
        _gamePad && _gamePad.unbind(Gamepad.Event.BUTTON_UP,onJoystickButtonUp);
        _gamePad && _gamePad.unbind(Gamepad.Event.AXIS_CHANGED, onAxisChange);
    }

    function initStreamEvents($container) {

        var keyDownEventName = ('ontouchstart' in document.documentElement)  ? 'touchstart' : 'mousedown';
        var keyUpEventName   = ('ontouchend' in document.documentElement)  ? 'touchend' : 'mouseup';

        $container.on(keyDownEventName, "[gc-code]", function (e) {

            var $this = $(this);
            onKeyDown({keyCode: $this.attr("gc-code")});

            e.preventDefault();
        });

        $container.on(keyUpEventName, "[gc-code]", function (e) {

            var $this = $(this);
            onKeyUp({keyCode: $this.attr("gc-code")});
            e.preventDefault();
        });

        if(_keyEventRegister) return;
        _keyEventRegister = true;

        document.addEventListener('keydown',onKeyDown);
        document.addEventListener('keyup',onKeyUp);

        var $canvas = $container.find(".gc-game-view");
        $canvas.mousedown(onMouseClick);
        $canvas.mouseup(onMouseClick);
        $canvas.bind('mousewheel',onMouseWheel);
        $canvas.bind('contextmenu', function(e){return false;});

        $canvas.mousemove(onMouseMove);

        if(_canSupportJoystick && GC_CONST.JOYSTICK_CONTROLLER_ENABLE) {
            _gamePad.bind(Gamepad.Event.BUTTON_DOWN,onJoystickButtonDown);
            _gamePad.bind(Gamepad.Event.BUTTON_UP,onJoystickButtonUp);
            _gamePad.bind(Gamepad.Event.AXIS_CHANGED,onAxisChange);
        }

    }

    function computeMouseMove(){

        var sign;

        if (_rightAxisData.x > _rightAxisData.threshold ||  _rightAxisData.x < -_rightAxisData.threshold ) {


            sign = _rightAxisData.x > 0 ? 1 : -1;

            _streamData.streamData.lastMouseX += (800 * sign * _rightAxisData.ax);

            if (_streamData.streamData.lastMouseX < 0) {
                _streamData.streamData.lastMouseX = 0;
            } else if (_streamData.streamData.lastMouseX > _streamData.currentWidth) {
                _streamData.streamData.lastMouseX = _streamData.currentWidth;
            }

            _streamData.streamData.mouseX = parseInt(Utils.convertToRange(
                _streamData.streamData.lastMouseX,
                [0,_streamData.currentWidth],
                [0, _streamData.width]));
        }

        if (_rightAxisData.y > _rightAxisData.threshold ||  _rightAxisData.y < -_rightAxisData.threshold ) {
            sign = _rightAxisData.y > 0 ? 1 : -1;

            _streamData.streamData.lastMouseY += (800 * sign * _rightAxisData.ay);

            if (_streamData.streamData.lastMouseY < 0) {
                _streamData.streamData.lastMouseY = 0;
            } else if (_streamData.streamData.lastMouseY > _streamData.currentHeight) {
                _streamData.streamData.lastMouseY = _streamData.currentHeight;
            }

            _streamData.streamData.mouseY = parseInt(Utils.convertToRange(
                _streamData.streamData.lastMouseY,
                [0,_streamData.currentHeight],
                [0, _streamData.height]));

        }

        if (_streamData.streamData.mouseX !== -1 && _streamData.streamData.mouseY === -1) {
            _streamData.streamData.mouseY = parseInt(_streamData.streamData.lastMouseY);
            if (_streamData.streamData.mouseY === -1) {
                _streamData.streamData.mouseY = 0;
            }
        }

        if (_streamData.streamData.mouseX === -1 && _streamData.streamData.mouseY !== -1) {
            _streamData.streamData.mouseX = parseInt(_streamData.streamData.lastMouseX);
            if (_streamData.streamData.mouseX === -1) {
                _streamData.streamData.mouseX = 0;
            }
        }

        // var $mouse = _streamData.container.find(".gc-mouse");
        // $mouse.css({
        //     left : _streamData.streamData.lastMouseX  + "px",
        //     top : _streamData.streamData.lastMouseY   + "px"
        // });
    }

    function getJoystickAxisControl(e) {
        var control = {
            down : null,
            up : null
        };


        var threshold = 0.4;

        switch (e.axis) {

            case "DPAD_Y" :
                if(e.value > threshold) {
                    control.down = "DPAD_DOWN";
                    control.up = "DPAD_UP";

                } else if(e.value < -threshold) {
                    control.down = "DPAD_UP";
                    control.up = "DPAD_DOWN";
                } else {
                    if(_currentAxisKeyDown["DPAD_DOWN"]) {
                        control.up = "DPAD_DOWN";
                    } else {
                        control.up = "DPAD_UP";
                    }
                }
                break;

            case "LEFT_STICK_Y" :
                if(e.value > threshold) {
                    control.down = "LEFT_STICK_DOWN";
                    control.up = "LEFT_STICK_UP";

                } else if(e.value < -threshold) {
                    control.down = "LEFT_STICK_UP";
                    control.up = "LEFT_STICK_DOWN";
                } else {
                    if(_currentAxisKeyDown["LEFT_STICK_DOWN"]) {
                        control.up = "LEFT_STICK_DOWN";
                    } else {
                        control.up = "LEFT_STICK_UP";
                    }
                }

                break;
            case "DPAD_X" :

                if(e.value  > threshold) {
                    control.down = "DPAD_RIGHT";
                    control.up = "DPAD_LEFT";
                } else if(e.value < -threshold) {
                    control.down = "DPAD_LEFT";
                    control.up = "DPAD_RIGHT";
                } else {
                    if(_currentAxisKeyDown["DPAD_RIGHT"]) {
                        control.up = "DPAD_RIGHT";
                    } else {
                        control.up = "DPAD_LEFT";
                    }
                }

                break;

            case "LEFT_STICK_X" :
                if(e.value  > threshold) {
                    control.down = "LEFT_STICK_RIGHT";
                    control.up = "LEFT_STICK_LEFT";
                } else if(e.value < -threshold) {
                    control.down = "LEFT_STICK_LEFT";
                    control.up = "LEFT_STICK_RIGHT";
                } else {
                    if(_currentAxisKeyDown["LEFT_STICK_RIGHT"]) {
                        control.up = "LEFT_STICK_RIGHT";
                    } else {
                        control.up = "LEFT_STICK_LEFT";
                    }
                }

                break;

            // case "RIGHT_STICK_Y" :
            //     if(e.value > threshold) {
            //         control.down = "FACE_3";
            //         control.up = "FACE_1";
            //     } else if(e.value < -threshold) {
            //         control.down = "FACE_1";
            //         control.up = "FACE_3";
            //     } else {
            //         if(_currentAxisKeyDown["FACE_3"]) {
            //             control.up = "FACE_3";
            //         } else {
            //             control.up = "FACE_1";
            //         }
            //     }
            //     break;
            // case "RIGHT_STICK_X" :
            //     if(e.value > threshold) {
            //         control.down = "FACE_2";
            //         control.up = "FACE_4";
            //     } else if(e.value < -threshold) {
            //         control.down = "FACE_4";
            //         control.up = "FACE_2";
            //     } else {
            //         if(_currentAxisKeyDown["FACE_4"]) {
            //             control.up = "FACE_4";
            //         } else {
            //             control.up = "FACE_2";
            //         }
            //     }
            //     break;

            case "RIGHT_STICK_Y" :
            case "RIGHT_STICK_X" :
                var posDif;

                if (e.axis === "RIGHT_STICK_Y") {

                    var currentTimeY = new Date();
                    posDif = Math.abs(e.value - _rightAxisData.y);

                    if (posDif > _rightAxisData.threshold) {
                        if (_rightAxisData.timeY) {
                            var currentVY = posDif/ (currentTimeY-_rightAxisData.timeY);
                            var currentAY = currentVY - _rightAxisData.vy/(currentTimeY-_rightAxisData.timeY);

                            _rightAxisData.vy    = currentVY;
                            _rightAxisData.ay    = currentAY;

                        } else {
                            _rightAxisData.vy    = 0;
                            _rightAxisData.ay    = 0;
                        }
                        _rightAxisData.timeY = currentTimeY;
                        _rightAxisData.y  = e.value;
                    }


                }

                if (e.axis === "RIGHT_STICK_X" ) {

                    var currentTimeX = new Date();

                    posDif = Math.abs(e.value - _rightAxisData.x);

                    if (posDif > _rightAxisData.threshold) {
                        if (_rightAxisData.timeX) {

                            var currentVX = posDif/ (currentTimeX-_rightAxisData.timeX);
                            var currentAX = currentVX - _rightAxisData.vx/(currentTimeX-_rightAxisData.timeX);

                            _rightAxisData.vx    = currentVX;
                            _rightAxisData.ax    = currentAX;


                        } else {
                            _rightAxisData.vx    = 0;
                            _rightAxisData.ax    = 0;
                        }

                        _rightAxisData.timeX = currentTimeX;
                        _rightAxisData.x     = e.value;
                    }


                }

                // console.log(e.axis, e.value, _rightAxisData.ax * 1000);

                break;

        }

        if(control.down && _currentAxisKeyDown[control.down]) {
            control.down = null;
        } else {
            _currentAxisKeyDown[control.down] = true;
        }

        if(control.up && !_currentAxisKeyDown[control.up]) {
            control.up = null;
        } else {
            _currentAxisKeyDown[control.up] = false;
        }

        return control;
    }

    function onJoystickButtonUp(e) {
        // console.log("BUTTON_UP",e.control, e);

        if (e.control === "RIGHT_STICK") {

            if (_rightAxisData.keyDownTime.length === 2) {
                var currentTime = new Date();

                if (currentTime - _rightAxisData.keyDownTime[1] <= 300) {
                    // console.log("double click--------------");

                    onMouseClick({
                        type: "mousedown",
                        which:3 //right click
                    });

                    setTimeout(function () {
                        onMouseClick({
                            type: "mouseup",
                            which:3 //right click
                        });
                    },100);

                }
                _rightAxisData.keyDownTime = [];
            } else if(_rightAxisData.keyDownTime.length === 1) {
                var currentTime = new Date();

                if (currentTime - _rightAxisData.keyDownTime[0] <= 300) {
                    setTimeout(function () {
                        if (_rightAxisData.keyDownTime.length === 1) {
                            // console.log("click--------------");

                            onMouseClick({
                                type: "mousedown",
                                which:1 //left click
                            });

                            setTimeout(function () {
                                onMouseClick({
                                    type: "mouseup",
                                    which:1 //left click
                                });
                            },100);

                            _rightAxisData.keyDownTime = [];
                        }

                    },150)
                } else {
                    _rightAxisData.keyDownTime = [];
                }
            } else {
                _rightAxisData.keyDownTime = [];
            }

        } else {
            var keyCode = GC_CONST.JOYSTICK_KEY_ASCII_MAP[e.control];

            if(keyCode) {
                onKeyUp({keyCode: keyCode});
            }
        }

    }

    function onJoystickButtonDown(e) {
        // console.log("BUTTON_DOWN",e.control, e);

        if (e.control === "RIGHT_STICK") {
            _rightAxisData.keyDownTime.push(new Date());
        } else {
            var keyCode = GC_CONST.JOYSTICK_KEY_ASCII_MAP[e.control];

            if(keyCode) {
                onKeyDown({keyCode: keyCode});
            }
        }

    }

    function onAxisChange(e) {
        // console.log("AXIS_CHANGED", e);
        var controlData = getJoystickAxisControl(e);

        if(controlData.down){
            onKeyDown({keyCode: GC_CONST.JOYSTICK_KEY_ASCII_MAP[controlData.down]});
        }

        if(controlData.up) {
            onKeyUp({keyCode: GC_CONST.JOYSTICK_KEY_ASCII_MAP[controlData.up]});
        }
    }

    function getFullScreenContent() {

        var name = "ESC";

        if(Utils.checkPlatform.mobile()) {
            name = "بازگشت"
        }

        return "";

        // return '\
        //      <div class="gc-full-screen-message-content gc-hide">\
        // برای خروج از حالت تمام صفحه بر روی دکمه <span>'+name+'</span> کلیک کنید\
        // </div>\
        // ';
    }

    function initStreamConnection(params) {

        var messagesCallback = {};
        var id = 1;
        var play = false;
        var img = new Image();
        var canvas = _streamData.container.find(".gc-game-view")[0];
        var context = canvas.getContext("2d");
        var $videoContent = _streamData.container.find('.gc-video-content');
        var $video = $videoContent.find('.gc-video');
        var messageReceived = false;
        var sendTimeoutId;
        var $mobileBtns = _streamData.container.find(".gc-view-container > .gc-button-content");

        var videoEndState = params.isResume === true;
        var streamMessageState = false;
        var closeMessage;

        _streamData.streamData ={
            io_key_down: [],
            io_key_up: [],
            mouseClick: [],
            mouseWheel: [],
            mouseX: -1,
            mouseY: -1,
            lastMouseX: -1,
            lastMouseY: -1,
            messageReceived: false,
            ws: null,
            live: true,
            intervalId: null,
            width: 640,
            height: 360,
        };
        _streamData.container.find(".gc-game-content").css({"background-color": "black"});

        resetStream();

        var lastSendTime;

        function timeoutCallback() {
            if(!messageReceived) {

                var currentTime = new Date();
                if(currentTime-lastSendTime > GC_CONST.SOCKET_SEND_RES_TIMEOUT-1000) {
                    _streamData.streamData.ws && _streamData.streamData.ws.close(_self.CLOSE_CODE.RESPONSE_FAIL);
                }

            }
        }

        function sendMessage(message,callback) {


            if(callback) {
                id += 1;
                messagesCallback[id] = callback;
                _streamData.streamData.ws.send(id + "|"+ message);
            } else {
                _streamData.streamData.ws.send(message);
            }

            messageReceived = false;

            lastSendTime = new Date();

            sendTimeoutId = setTimeout(timeoutCallback,GC_CONST.SOCKET_SEND_RES_TIMEOUT);

        }


        function onMessage(message) {
            messageReceived = true;
            if(sendTimeoutId) {
                clearTimeout(sendTimeoutId);
                sendTimeoutId = undefined;
            }
            if(!play) {
                var msg = message.split("|");
                var id = msg[0];
                var res = msg[1];

                if(messagesCallback[id]) {
                    messagesCallback[id](res);
                }
            } else {
                _streamData.streamData.messageReceived = true;
                if(message === "pong") return;

                img.onload = function () {
                    context.drawImage( img,0,0,canvas.width,canvas.height);
                    img.src = "";
                };

                img.src = "data:image/jpeg;base64," + message;
            }

        }

        function checkMessageShow() {

            if(videoEndState && streamMessageState) {
                $videoContent.hide();

                if(closeMessage) {
                    showErrorMessage(closeMessage);
                    closeMessage = undefined;
                } else {
                    _streamData.container.find(".gc-game-view").addClass("gc-show");
                    if(Utils.checkPlatform.mobile()) {
                        $mobileBtns.show();
                    }
                }
            }
        }

        $video.on("ended", function () {
            videoEndState = true;
            checkMessageShow();
        });

        function showErrorMessage(params) {
            var buttonContent = "";

            if(params.canReload || true) {
                buttonContent = '\
                    <div class="gc-button-content">\
                        <div class="gc-button gc-btn-reload gc-pointer">Retry</div>\
                    </div>\
                ';
            }

            var content = '\
                <div class="gc-inner-content">\
                    <div class="gc-gif"><img src="./res/mov/connection_drop.gif"></div>\
                    <div class="gc-text">'+params.message+'</div>\
                   '+buttonContent+'\
                </div>\
            ';

            var $content = $(content);

            $mobileBtns.hide();


            _streamData.container.find(".gc-message-content")
                .show()
                .empty()
                .append($content);

            $videoContent.hide();

            $content.find(".gc-btn-reload").on("click", function () {
                $content.hide();
                $videoContent.show();
                $videoContent.find("video")[0].load();
                initConnection({reload: false});
            });
        }

        function connectionClosed(params) {
            streamMessageState = true;
            closeMessage = params;
            checkMessageShow();

        }

        function streamPing() {
            var streamData = _streamData.streamData;

            if (streamData.io_key_down.length === 0 &&
                streamData.io_key_up.length === 0 &&
                streamData.mouseClick.length === 0 &&
                streamData.mouseWheel.length === 0 &&
                streamData.mouseX === -1 &&
                streamData.mouseY === -1
            ) {
                sendMessage("ping");
            } else {
                var _msg = "";

                //========================  add mouse position data ==============================

                if (streamData.mouseX === -1 && streamData.mouseY === -1) {
                    _msg += "-1|-1|";
                } else {
                    // console.log(streamData.mouseX,streamData.mouseY);
                    _msg += (streamData.mouseX) + "|" + (streamData.mouseY) + "|";
                    streamData.mouseX = -1;
                    streamData.mouseY = -1;
                }


                //========================  add mouse click data ==============================
                if (streamData.mouseClick.length > 0) {

                    for (var i = 0; i < streamData.mouseClick.length; i++) {
                        _msg += streamData.mouseClick[i];

                        if(i<streamData.mouseClick.length-1) {
                            _msg += ",";
                        }

                    }

                    streamData.mouseClick = [];

                } else {

                    _msg += ""
                }

                _msg += "|";

                //========================  add mouse wheel data ==============================

                if (streamData.mouseWheel.length > 0) {

                    for (var i = 0; i < streamData.mouseWheel.length; i++) {
                        _msg += streamData.mouseWheel[i];

                        if(i<streamData.mouseWheel.length-1) {
                            _msg += ",";
                        }
                    }

                    streamData.mouseWheel = [];

                } else {
                    _msg += ""
                }

                _msg += "|";

                //========================  add keyboard click data ==============================

                if (streamData.io_key_down.length>0) {
                    for (var i = 0; i < streamData.io_key_down.length; i++) {
                        _msg += streamData.io_key_down[i];

                        if(i<streamData.io_key_down.length-1) {
                            _msg += ",";
                        }

                    }
                    streamData.io_key_down = [];
                }
                _msg += "|";

                if (streamData.io_key_up.length>0) {
                    for (var i = 0; i < streamData.io_key_up.length; i++) {
                        _msg += streamData.io_key_up[i];

                        if(i<streamData.io_key_up.length-1) {
                            _msg += ",";
                        }

                    }
                    streamData.io_key_up = [];
                }

                sendMessage(_msg)
            }
            streamData.messageReceived = false;
        }

        function stopInterval() {
            if(_streamData.streamData.intervalId) {
                clearInterval(_streamData.streamData.intervalId);
                _streamData.streamData.intervalId = undefined;
            }
        }

        function initInterval() {
            play = true;
            streamPing();
            _streamData.streamData.intervalId =
                setInterval(function () {
                    if (_streamData.streamData.messageReceived) {
                        streamPing();
                        if (_gamePad) {
                            computeMouseMove(params.id);
                        }
                    }
                }, 16);
        }

        function initConnection(options) {

            var socketAddress = params.socketAddress;

            var address = socketAddress.websocket;

            var lastTime;

            _streamData.streamData.ws = new WebSocket(address);
            // tabData.streamData.ws = new WebSocket("ws://192.168.1.101:8000");

            _streamData.streamData.ws.onopen = function () {
                lastTime = new Date();

                var token = params.token;


                if(options.reload) {
                    sendMessage("rec:" + token,function (res) {

                        if(res === "play") {
                            initInterval();
                        }

                        streamMessageState = true;
                        checkMessageShow();
                    });
                } else {

                    sendMessage("tok:" + token,function (res) {


                        if(res === "success") {
                            sendMessage("ping:num", function (res) {

                                var count = parseInt(res);

                                function send(sendCount) {
                                    if(sendCount<count) {
                                        sendMessage("ping", function () {
                                            send(sendCount + 1);
                                        });

                                    } else {

                                        sendMessage("ping:result", function (res) {
                                            if(res === "play") {
                                                initInterval();
                                                streamMessageState = true;
                                                checkMessageShow();
                                            }
                                        });
                                    }
                                }

                                send(0);

                            });
                        } else {// failed
                            _streamData.streamData.ws.close(_self.CLOSE_CODE.TOKEN_INVALID);
                        }
                    });
                }

            };

            _streamData.streamData.ws.onclose = function (e) {
                console.log("STREAM_CONNECTION_CLOSE_CODE", e.code,e.reason);
                stopInterval();

                switch (e.code) {

                    case 1006 :

                        connectionClosed({
                            message : "The server is not available",
                            canReload : false
                        });

                        break;

                    case 4000 :
                        connectionClosed({
                            message : "All game rooms are full",
                            canReload : false
                        });
                        break;

                    case 4001:
                    case 4002:
                    case 4003:
                    case _self.CLOSE_CODE.RESPONSE_FAIL:
                        connectionClosed({
                            message : "Error making connection to server",
                            canReload : true
                        });
                        break;

                    case 4006://stream lost
                        connectionClosed({
                            message : "Sorry, your connection to the server was disconnected",
                            canReload : true
                        });
                        break;


                    case _self.CLOSE_CODE.TOKEN_INVALID:
                        connectionClosed({
                            message : "Unable to access you",
                            canReload : false
                        });
                        break;

                    case 4004:
                        connectionClosed({
                            message : "Your internet speed is not right",
                            canReload : true
                        });
                        break;


                    case _self.CLOSE_CODE.CLOSE_BY_CLIENT:
                        //for close tab
                        break;

                    default :
                        connectionClosed({
                            message : "Unable to connect to server",
                            canReload : true
                        });
                }

                play = false;

            };

            _streamData.streamData.ws.onerror = function (e) {
            };

            _streamData.streamData.ws.onmessage = function (e) {
                // _$container.find(".gc-game-view").attr('src', 'data:image/jpeg;base64,' + e.data);

                onMessage(e.data);
            };


            if (_streamData.streamData.socketOpenTimeoutId) {
                clearTimeout(_streamData.streamData.socketOpenTimeoutId);
            }
            _streamData.streamData.socketOpenTimeoutId = setTimeout(function () {

                if(_streamData.streamData.ws && _streamData.streamData.ws.readyState === 0) {
                    _streamData.streamData.ws.close(4600);
                }

            },GC_CONST.SOCKET_CONNECTION_TIMEOUT);
        }


        initConnection({
            reload : false
        });
    }

    function resetStream() {

        _streamData.messageReceived = false;
        _streamData.io_key_down = [];
        _streamData.io_key_up = [];
        _streamData.mouseClick = [];
        _streamData.mouseWheel = [];
        _streamData.mouseX = -1;
        _streamData.mouseY = -1;
        _streamData.lastMouseX = -1;
        _streamData.lastMouseY = -1;
        var ws = _streamData.streamData && _streamData.streamData.ws;
        if(ws) {
            _streamData.ws = null;
            ws.close(_self.CLOSE_CODE.CLOSE_BY_CLIENT);
        }

        if(_streamData.intervalId) {
            clearInterval(_streamData.intervalId);
        }
    }



    this.show = function (params) {
        _visible = true;
        _$container.addClass("gc-show");

        initStream(params);
    };

    this.destroy = function () {
        _visible = false;

        removeListener();

        if(_gamePad) {
            _gamePad.pause();
        }
    };

    this.onResize = function () {
        if(!_visible) return;


        var screenWidth = $(window).width();
        var screenHeight = $(window).height();

        var $container = _streamData.container.find(".gc-game-content");
        var containerWidth = $container.width();
        var containerHeight = $container.height();

        var newWidth = _streamData.width;
        var newHeight = _streamData.height;

        if(_fullscreenState) {


            newWidth = screenWidth - 40;
            newHeight = screenWidth * (_streamData.height/_streamData.width);

            if(newHeight > screenHeight) {
                newHeight = screenHeight - 40;
                newWidth = screenHeight * (_streamData.width/_streamData.height);
            }

        } else {

            if(containerWidth < _streamData.width) {
                newWidth = containerWidth;
                newHeight = containerWidth * (_streamData.height/_streamData.width);

                if(newHeight > containerHeight) {
                    newHeight = containerHeight;
                    newWidth = containerHeight * (_streamData.width/_streamData.height);
                }
            } else if(containerHeight<_streamData.height){
                newWidth = containerHeight * (_streamData.width/_streamData.height);
                newHeight = containerHeight;
            }

        }
        _streamData.currentWidth = newWidth;
        _streamData.currentHeight = newHeight;

        _$container.find(".gc-game-stream-container .gc-game-view")
            .attr("height", newHeight)
            .attr("width", newWidth );

        _$container.find(".gc-game-stream-container .gc-message-content")
            .css({
                width: newWidth + "px",
                height: newHeight + "px"
            });

        _$container.find(".gc-game-stream-container .gc-video-content")
            .css({
                width: newWidth + "px",
                height: newHeight + "px"
            });

        var $activeContent = _$container.find(".gc-tab-content .tab-pane.active");

        var $gameContent = $activeContent.find(">.gc-game-content");
        var $tabFooter = $activeContent.find(">.gc-footer");

        $gameContent
            .css({
                height : ($activeContent.height() - $tabFooter.height() - 80)+"px",
                flex : "none"
            })


    };

    this.hide = function () {
        resetStream();
        _visible = false;

        _$container.removeClass("gc-show");
    };


    constructor(options);
}


Stream.prototype.CLOSE_CODE = Stream.CLOSE_CODE = {
    CLOSE_BY_CLIENT : 4500,
    RESPONSE_FAIL : 4501,
    TOKEN_INVALID : 4502
};
