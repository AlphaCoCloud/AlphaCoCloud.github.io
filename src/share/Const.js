var GC_CONST = {
    GAME_PLATFORMS: {
        WEB: 1,
        MOBILE: 2,
        WEB_MOBILE: 3,
        PC: 4
    },
    PANEL_URL: "./panel/",
    REQUEST_RETRY_TIMEOUT: 2000,
    ANDROID: {
        LAST_FEATURE: [
            "امکان انجام بازی استریم",
            "عضویت در لیگ",
            "انجام بازی در لیگ",
        ],
        DOWNLOAD_URL: "./res/file/playpod.apk"
    },
    SOCKET_SEND_RES_TIMEOUT: 10000,
    SOCKET_CONNECTION_TIMEOUT: 13000,
    CONTACT: {
        EMAIL: "play@pod.land"
    },
    MATCH_STATUS_NAME: {
        1: "شروع نشده",
        2: "در حال بارگزاری",
        3: "در حال اجرا",
        4: "متوقف",
        5: "تمام شده",
        6: "لغو شده",
        7: "نا معتبر",
    },
    MAX_LOG_LENGTH: 1024 * 1024 * 5,
    MAX_LOG_COUNT: 3000,
    SUPPORTER_USER_NAME: "play.pod",
    JOYSTICK_CONTROLLER_ENABLE: true,
    JOYSTICK_KEY_ASCII_MAP: {
        FACE_1: 73, // I
        FACE_2: 76, // L
        FACE_3: 75, // K
        FACE_4: 74, // J
        START_FORWARD: 13, // ENTER
        HOME: 13, // ENTER
        SELECT_BACK: 27, // ESC
        DPAD_UP: 38,  // arrow up
        DPAD_DOWN: 40,  // arrow down
        DPAD_LEFT: 37,  // arrow left
        DPAD_RIGHT: 39,  // arrow right
        LEFT_TOP_SHOULDER: 70,  // F
        LEFT_BOTTOM_SHOULDER: 69,  // E
        RIGHT_TOP_SHOULDER: 80,  // P
        RIGHT_BOTTOM_SHOULDER: 79,  // O
        LEFT_STICK_UP: 87,  // W
        LEFT_STICK_DOWN: 83,  // S
        LEFT_STICK_LEFT: 65,  // A
        LEFT_STICK_RIGHT: 68,  // D
    },
    PC_SEND_MESSAGE_TYPE: {
        SHOW_STREAM: 1,
        CONFIG_EVENT: 2,
        SAVE_LOG: 3,
        LOGIN_EVENT: 4,
        LOGOUT_EVENT: 5,
    },
    IFRAME_RECEIVE_MESSAGE_TYPE: {
        READY_EVENT: 1,
        RESPONSE: 2,
        MATCH_NEW: 3,
        MATCH_START: 4,
        MATCH_PAUSE: 5,
        MATCH_RESUME: 6,
        MATCH_FINISH: 7
    },
    IFRAME_SEND_MESSAGE_TYPE: {
        GET_ACTIVE_MATCHES: 1,
        RESPONSE: 2,
        DESTROY: 3,
        TAB_FOCUS: 4,
        TAB_BLUR: 5
    },
    MOUSE_LEFT: 4,//100
    MOUSE_RIGHT: 2,//010
    MOUSE_MIDDLE: 6,//110
    LANDING_STATE: {
        SHOW_NOW: 1,
        SHOW_NEXT_TIME: 2,
        SHOW_DISABLE :3
    }
};