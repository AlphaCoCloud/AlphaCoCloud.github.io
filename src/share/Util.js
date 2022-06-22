var Utils = {};

/* ==============================================================================
*                                  game card
*  ============================================================================== */
Utils.createGameLandscapeView = function (game) {
    GCCacheHandler.setGame(game);

    var rateContent = Utils.getRateView(game.rate.rate);

    var platformContent = Utils.getPlatformContent(game);


    var content = '\
       <div class="gc-game-card gc-landscape gc-pointer" style="background-image: url('+game.imageUrl+')" gc-id="'+game.id+'">\
            <div class="gc-footer">\
                <div class="gc-row">\
                    <div class="gc-name">'+game.name+'</div>\
                    <div class="gc-rate">'+rateContent+'</div>\
                </div>\
                <div class="gc-row">\
                    <div class="gc-business-name">'+game.business.name+'</div>\
                    <div class="gc-platform">\
                       '+platformContent+'\
                    </div>\
                </div>\
            </div>\
       </div>\
    ';

    return content;
};
Utils.createGameLandscapeSlideView = function (game) {

    var content = '\
    <div class="swiper-slide gc-landscape"  >\
        '+Utils.createGameLandscapeView(game)+'\
    </div>';

    return content;
};

Utils.createGamePortraitView = function (game){
    GCCacheHandler.setGame(game);

    var rateContent = Utils.getRateView(game.rate.rate);

    var likeStateClass = "";

    var platformContent = Utils.getPlatformContent(game);


    if(game.userPostInfo) {

        if(game.userPostInfo.favorite) {
            likeStateClass = "icon-like-full-2";
        } else {
            likeStateClass = "icon-like-empty-2";
        }
    }

    var likeContent = "";

    // likeContent = '<i class="gc-like '+likeStateClass+'"></i>';

    var content = '\
       <div class="gc-game-card gc-portrait gc-pointer" gc-id="'+game.id+'">\
            <div class="gc-header">\
                <div class="gc-score">'+game.score+'</div>\
                <div class="gc-rate">'+rateContent+'</div>\
                <div class="gc-pin"><i class="icon-pin-2"></i></div>\
            </div>\
            <div class="gc-content" style="background-image: url('+game.imageUrl+')">\
                '+likeContent+'\
            </div>\
            <div class="gc-footer">\
                <div class="gc-row gc-lobby-content">\
                    <span class="gc-lobby">'+game.lobby.name+'</span>\
                </div>\
                <div class="gc-row">\
                    <div class="gc-name">'+game.name+'</div>\
                </div>\
                <div class="gc-row">\
                    <div class="gc-business-name">'+game.business.name+'</div>\
                </div>\
                <div class="gc-row">\
                    <div class="gc-platform">\
                        '+platformContent+'\
                    </div>\
                </div>\
            </div>\
       </div>\
    ';

    return content;
};
Utils.createGamePortraitSlideView = function (game) {

    var content = '\
    <div class="swiper-slide gc-portrait"  >\
        '+Utils.createGamePortraitView(game)+'\
    </div>';

    return content;
};

/* ==============================================================================
*                                  league card
*  ============================================================================== */
Utils.createLeagueLandscapeView = function (league) {

    GCCacheHandler.setLeague(league);
    var rateContent = Utils.getRateView(league.rate.rate);

    var platformContent = Utils.getPlatformContent(league.games[0]);


    var content = '\
       <div class="gc-league-card gc-landscape gc-pointer" style="background-image: url('+league.imageUrl+')" gc-id="'+league.id+'">\
            <div class="gc-footer">\
                <div class="gc-row">\
                    <div class="gc-name">'+league.name+'</div>\
                    <div class="gc-rate">'+rateContent+'</div>\
                </div>\
                <div class="gc-row">\
                    <div class="gc-business-name">'+league.games[0].name+'</div>\
                    <div class="gc-platform">\
                        '+platformContent+'\
                    </div>\
                </div>\
            </div>\
       </div>\
    ';

    return content;
};
Utils.createLeagueLandscapeSlideView = function (league) {

    var content = '\
    <div class="swiper-slide gc-landscape"  >\
        '+Utils.createLeagueLandscapeView(league)+'\
    </div>';

    return content;
};

Utils.createLeaguePortraitView = function (league){
    GCCacheHandler.setLeague(league);
    var rateContent = Utils.getRateView(league.rate.rate);


    var rate = league.rate.rate.toFixed(1);

    var platformContent = Utils.getPlatformContent(league.games[0]);


    var likeStateClass = "";

    if(league.userPostInfo) {

        if(league.userPostInfo.favorite) {
            likeStateClass = "icon-like-full-2";
        } else {
            likeStateClass = "icon-like-empty-2";
        }
    }

    var likeContent = "";

    // likeContent = '<i class="gc-like '+likeStateClass+'"></i>';

    var content = '\
       <div class="gc-league-card gc-portrait gc-pointer" gc-id="'+league.id+'">\
            <div class="gc-header">\
                <div class="gc-score">'+rate+'</div>\
                <div class="gc-rate">'+rateContent+'</div>\
                <div class="gc-pin"><i class="icon-pin-2"></i></div>\
            </div>\
            <div class="gc-content" style="background-image: url('+league.imageUrl+')">\
                '+likeContent+'\
            </div>\
            <div class="gc-footer">\
                <div class="gc-row gc-lobby-content">\
                    <span class="gc-lobby">'+league.games[0].lobby.name+'</span>\
                </div>\
                <div class="gc-row">\
                    <div class="gc-name">'+league.name+'</div>\
                </div>\
                <div class="gc-row">\
                    <div class="gc-business-name">'+league.games[0].name+'</div>\
                </div>\
                <div class="gc-row">\
                    <div class="gc-platform">\
                        '+platformContent+'\
                    </div>\
                </div>\
            </div>\
       </div>\
    ';

    return content;
};
Utils.createLeaguePortraitSlideView = function (league) {

    var content = '\
    <div class="swiper-slide gc-portrait"  >\
        '+Utils.createLeaguePortraitView(league)+'\
    </div>';

    return content;
};

/* ==============================================================================
*                                  user card
*  ============================================================================== */
Utils.createUserLandscapeView = function (user) {

    GCCacheHandler.setUser(user);
    var rate = user.rate.rate;
    var fullRateCount = parseInt(rate);
    var halfRateCount = (rate === fullRateCount) ? 0 : 1;
    var emptyRateCount = 5 - (fullRateCount + halfRateCount);

    var rateContent = "";

    if(emptyRateCount>0) {
        for (var i = 0; i < emptyRateCount; i++) {
            rateContent+= '<i class="gc-star icon-star-empty-1"></i>'
        }
    }

    if(halfRateCount>0) {
        for (var i = 0; i < halfRateCount; i++) {
            rateContent+= '<i class="gc-star icon-star-half-3"></i>'
        }
    }
    if(fullRateCount>0) {
        for (var i = 0; i < fullRateCount; i++) {
            rateContent+= '<i class="gc-star icon-star-full-1_1"></i>'
        }
    }


    var content = '\
       <div class="gc-user-card gc-landscape gc-pointer" style="background-image: url('+user.imageUrl+')" gc-id="'+user.id+'">\
            <div class="gc-footer">\
                <div class="gc-row">\
                    <div class="gc-name">'+user.name+'</div>\
                    <div class="gc-rate">'+rateContent+'</div>\
                </div>\
                <div class="gc-row">\
                    <div class="gc-business-name">'+user.business.name+'</div>\
                    <div class="gc-platform">\
                        <i class="gc-platform-stream icon-cloud-game-1"></i>\
                        <i class="gc-platform-web icon-web-game-1"></i>\
                        <i class="gc-platform-mobile  icon-device-mobile-1"></i>\
                    </div>\
                </div>\
            </div>\
       </div>\
    ';
    return content;
};
Utils.createUserLandscapeSlideView = function (user) {

    var content = '\
    <div class="swiper-slide gc-landscape"  >\
        '+Utils.createUserLandscapeView(user)+'\
    </div>';

    return content;
};

Utils.createUserPortraitView = function (user){
    GCCacheHandler.setUser(user);


    var scoreContent = "";

    if(typeof user.score !== "undefined") {
        scoreContent = '\
            <div class="gc-row">\
                <div class="gc-score"><span>امتیاز : </span><span>'+user.score+'</span></div>\
            </div>\
        ';
    }

    var userImage;

    if(user.imageUrl){
        userImage = '<img  alt="user" src="' + user.imageUrl + '">';
    } else {
        userImage = '<i class="icon-profile-1"></i>'
    }

    var content = '\
       <div class="gc-user-card gc-portrait gc-pointer" gc-id="'+user.id+'">\
            <div class="gc-content">\
                '+userImage+'\
            </div>\
            <div class="gc-footer">\
                <div class="gc-row">\
                    <div class="gc-name">'+user.name+'</div>\
                </div>\
                '+scoreContent+'\
            </div>\
       </div>\
    ';

    return content;
};
Utils.createUserPortraitSlideView = function (user) {

    var content = '\
    <div class="swiper-slide gc-portrait"  >\
        '+Utils.createUserPortraitView(user)+'\
    </div>';

    return content;
};


/* ==============================================================================
*                               online user card
*  ============================================================================== */

Utils.createOnlineUserPortraitView = function (params){
    var user = params.user;
    GCCacheHandler.setOnlineUser(params);

    var userImage;

    if(user.imageUrl){
        userImage = '<img  alt="user online" src="' + user.imageUrl + '">';
    } else {
        userImage = '<i class="icon-profile-1"></i>'
    }
    var content = '\
       <div class="gc-online-user-card gc-portrait gc-pointer" \
        gc-id="'+user.id+'" \
        gc-name="'+user.name+'" \
        gc-league-id="'+params.leagueId+'"\
        gc-game-id="'+params.gameId+'"\
        gc-game-version="'+params.gameVersion+'" >\
            <div class="gc-content">\
                '+userImage+'\
            </div>\
            <div class="gc-footer">\
                <div class="gc-name">'+user.name+'</div>\
            </div>\
       </div>\
    ';

    return content;
};
Utils.createOnlineUserPortraitSlideView = function (params) {

    var content = '\
    <div class="swiper-slide gc-portrait"  >\
        '+Utils.createOnlineUserPortraitView(params)+'\
    </div>';

    return content;
};

Utils.createDownloadCardView = function (params) {

    var title = params.title;
    var features = params.features;
    var downloadLink = params.downloadLink;
    var version = params.version;
    var icon = params.icon;
    var featureContent = '';

    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        feature = feature.replace(/\\/g, "");
        if(feature.length<1) continue;

        featureContent += '\
            <li>'+feature+'</li>\
        ';
    }

    var target = '';

    if (Utils.checkPlatform.iOS()) {
        target = 'target="_blank"';
    }

    var content = '\
        <section class="gc-platform gc-platform-mobile-android">\
            <header class="gc-header">\
                <div class="gc-title">'+title+'</div>\
                <img class="gc-icon" src="'+icon+'">\
            </header>\
            <main class="gc-body gc-scroll">\
                <div class="gc-version-content">\
                    <span class="gam-name">شماره نسخه : </span>\
                    <span class="gam-value">'+version+'</span>\
                </div>\
                <ul class="gc-version-list">\
                    '+featureContent+'\
                </ul>\
            </main>\
            <footer class="gc-footer">\
                <a class="gc-download gc-pointer" href="'+downloadLink+'" '+target+'>\
                    <span>دانلود</span>\
                    <i class="icon-download-2"></i>\
                </a>\
            </footer>\
        </section>\
    ';

    return content
};


/* ==============================================================================
*                               match request card
*  ============================================================================== */

Utils.createReceiveMatchRequestView = function (requestData) {

    var imgContent = "";

    if(requestData.opponentImageUrl) {
        imgContent = '<img  alt="user"  src="'+requestData.opponentImageUrl+'">'
    } else{
        imgContent = '<i class="icon-profile-1"></i>'
    }
    var content = '\
            <div class="gc-receive-match-request-card gc-show" gc-id="'+requestData.requestId+'" gc-user-id="'+requestData.opponentId+'">\
                <div class="gc-close-content"><i class="icon-deny-1"></i></div>\
                <div class="gc-image-content">\
                    '+imgContent+'\
                </div>\
                <div class="gc-info-content">\
                    <div class="gc-name-content">\
                        '+requestData.opponentName+'\
                    </div>\
                    <div class="gc-extra-content">\
                        <div class="gc-league-content">\
                            <div class="gc-name">لیگ : </div>\
                            <div class="gc-value">'+requestData.leagueName+'</div>\
                        </div>\
                        <div class="gc-game-content">\
                            <div class="gc-name">بازی : </div>\
                            <div class="gc-value">'+requestData.gameName+'</div>\
                        </div>\
                    </div>\
                </div>\
                <div class="gc-button-content">\
                    <div class="gc-btn-accept gc-pointer">باشه,بازی می کنم</div>\
                    <div class="gc-btn-reject gc-pointer">\
                        <span>نه,بازی نمی کنم</span>\
                        <i class="icon-arrow-1-down"></i>\
                    </div>\
                </div>\
            </div>\
        ';

    return content;
};

Utils.createSentMatchRequestView = function (requestData) {

    var imgContent = "";

    if(requestData.opponentImageUrl) {
        imgContent = '<img alt="user" src="'+requestData.opponentImageUrl+'">'
    } else{
        imgContent = '<i class="icon-profile-1"></i>'
    }
    var content = '\
            <div class="gc-sent-match-request-card gc-show" gc-id="'+requestData.requestId+'" gc-league-id="'+requestData.leagueId+'" gc-user-id="'+requestData.opponentId+'">\
                <div class="gc-image-content">\
                    '+imgContent+'\
                </div>\
                <div class="gc-info-content">\
                    <div class="gc-name-content">\
                        '+requestData.opponentName+'\
                    </div>\
                    <div class="gc-extra-content">\
                        <div class="gc-league-content">\
                            <div class="gc-name">لیگ : </div>\
                            <div class="gc-value">'+requestData.leagueName+'</div>\
                        </div>\
                        <div class="gc-game-content">\
                            <div class="gc-name">بازی : </div>\
                            <div class="gc-value">'+requestData.gameName+'</div>\
                        </div>\
                    </div>\
                </div>\
                <div class="gc-button-content">\
                    <div class="gc-remain-time-content">\
                        <span class="gc-time"></span>\
                    </div>\
                    <div class="gc-btn-reject gc-pointer">\
                        <span>انصراف</span>\
                    </div>\
                </div>\
            </div>\
        ';

    return content;
};

/* ==============================================================================
*                               match result card
*  ============================================================================== */

Utils.createLeagueMatchResultView = function (match) {

    var rightUser = match.users[0],
        leftUser = match.users[1],
        rightUserInfo = rightUser.info,
        leftUserInfo = leftUser && leftUser.info,
        winUserId,
        rightImage,
        headerRightContent = "",
        headerMiddleContent = "",
        headerLeftContent ="",
        headerTimeContent="";


    if(rightUser && leftUser) {
        var rightUserScores = rightUser.scores;
        var leftUserScores = leftUser.scores;

        var length = rightUserScores.length;

        for (var i = 0; i < length; i++) {


           if(rightUserScores[i].value > leftUserScores[i].value) {
               winUserId = rightUser.info.id;
           } else if(rightUserScores[i].value < leftUserScores[i].value){
               winUserId = leftUser.info.id;
           }

           if(winUserId) {
               break;
           }

        }
    }


    if(rightUser.info.imageUrl) {
        rightImage = '<img alt="league" src=' + rightUser.info.imageUrl + '>';
    } else {
        rightImage = '<i class="icon-profile-1"></i>';
    }

    var rightStateName = "",
        rightStateClass = "";

    if(rightUserInfo.id === winUserId) {
        rightStateName = "برنده";
        rightStateClass = "gc-win";

    } else if(leftUserInfo && leftUserInfo.id === winUserId) {
        rightStateName = "بازنده";
        rightStateClass = "gc-lose";
    } else {

        if(match.playerNumberType!== 1) {
            rightStateName = "مساوی";
        }

    }


    headerRightContent = '\
        <section class="gc-right-content">\
            <div class="gc-icon-content">\
                '+rightImage+'\
            </div>\
            <div class="gc-info-content">\
                <div class="gc-name">'+rightUser.info.name+'</div>\
                <div class="gc-state '+rightStateClass+'">'+rightStateName+'</div>\
            </div>\
        </section>\
    ';

    if(leftUser) {
        var leftImage;
        var leftStateName = "",
            leftStateClass = "";

        if(rightUserInfo.id === winUserId) {
            leftStateName = "بازنده";
            leftStateClass = "gc-lose";
        } else if(leftUserInfo.id === winUserId) {
            leftStateName = "برنده";
            leftStateClass = "gc-win";
        } else {
            leftStateName = "مساوی";
        }

        if(leftUser.info.imageUrl) {
            leftImage = '<img  alt="user match" src=' + leftUser.info.imageUrl + '>';
        } else {
            leftImage = '<i class="icon-profile-1"></i>';
        }

        headerLeftContent = '\
        <section class="gc-left-content">\
            <div class="gc-icon-content">\
                '+leftImage+'\
            </div>\
            <div class="gc-info-content">\
                <div class="gc-name">'+leftUser.info.name+'</div>\
                <div class="gc-state '+leftStateClass+'">'+leftStateName+'</div>\
            </div>\
        </section>\
    ';
    }


    var startTime = new Date(match.startTime);
    var endTime = new Date(match.endTime);

    var shamsiStartTime = Utils.miladiToShamsiObject(startTime);
    var shamsiEndTime = Utils.miladiToShamsiObject(endTime);


    headerMiddleContent = '\
        <section class="gc-middle-content">\
            <div class="gc-vs">\
                <i class="icon-multiplay-1" ></i>\
            </div>\
            <div class="gc-time">\
            '+shamsiStartTime.y + "/" + shamsiStartTime.m + "/" + shamsiStartTime.d+'\
            </div>\
        </section>\
    ';


    var rightResultContent = "",
        middleResultContent = "",
        leftResultContent = "";

    for (var i = 0; i < rightUser.scores.length; i++) {
        var score = rightUser.scores[i];

        rightResultContent += '\
            <div>'+score.value+'</div>\
        ';
        middleResultContent += '\
            <div>'+score.name+'</div>\
        ';
    }


    if(leftUser) {
        for (var i = 0; i < leftUser.scores.length; i++) {
            var score = leftUser.scores[i];
            leftResultContent += '<div>'+score.value+'</div>';
        }
    }

    var winClass = "";

    if(rightUser.info.id === winUserId) {
        winClass = "gc-right-win";

    } else if(leftUser && leftUser.info.id === winUserId) {
        winClass = "gc-left-win";
    }
    var content = '\
        <div class="gc-match-result-card '+winClass+'">\
            <header class="gc-header">\
               '+headerRightContent+'\
               '+headerMiddleContent+'\
               '+headerLeftContent+'\
            </header>\
            <div class="gc-result-content">\
                <div class="gc-info-content">\
                    <div class="gc-right-content">\
                        <div class="gc-title">زمان شروع</div>\
                        <div class="gc-value">\
                            '+shamsiStartTime.y + "/" +
                            shamsiStartTime.m+ "/" +
                            shamsiStartTime.d+' - \
                            '+Utils.padNumber(startTime.getHours(),2) +' : '+Utils.padNumber(startTime.getMinutes(),2)+'\
                        </div>\
                    </div>\
                    <div class="gc-middle-content">\
                        <div class="gc-title">شناسه مسابقه</div>\
                        <div class="gc-value">'+match.id+'</div>\
                    </div>\
                    <div class="gc-left-content">\
                        <div class="gc-title">زمان پایان</div>\
                        <div class="gc-value">\
                            '+shamsiEndTime.y + "/" +
                            shamsiEndTime.m + "/" +
                            shamsiEndTime.d +' - \
                            '+Utils.padNumber(endTime.getHours(),2) +' : '+Utils.padNumber(endTime.getMinutes(),2)+'\
                        </div>\
                    </div>\
                </div>\
                <div class="gc-score-content">\
                    <div class="gc-right-content">'+rightResultContent+'</div>\
                    <div class="gc-middle-content">'+middleResultContent+'</div>\
                    <div class="gc-left-content">'+leftResultContent+'</div>\
                </div>\
            </div>\
        </div>\
    ';

    return content;
};

Utils.createLeagueMatchView = function (match) {

    var rightUser = match.users[0],
        leftUser = match.users[1],
        rightImage,
        headerRightContent = "",
        headerMiddleContent = "",
        headerLeftContent ="",
        headerTimeContent="";


    if(rightUser.imageUrl) {
        rightImage = '<img  alt="user" src=' + rightUser.imageUrl + '>';
    } else {
        rightImage = '<i class="icon-profile-1"></i>';
    }

    var statusName = GC_CONST.MATCH_STATUS_NAME[match.statusNumber];

    if (!statusName) {
        statusName = "نامشخص";
    }


    headerRightContent = '\
        <section class="gc-right-content">\
            <div class="gc-icon-content">\
                '+rightImage+'\
            </div>\
            <div class="gc-info-content">\
                <div class="gc-name">'+rightUser.name+'</div>\
                <div class="gc-state"></div>\
            </div>\
        </section>\
    ';

    if(leftUser) {
        var leftImage;

        if(leftUser.imageUrl) {
            leftImage = '<img  alt="user" src=' + leftUser.imageUrl + '>';
        } else {
            leftImage = '<i class="icon-profile-1"></i>';
        }

        headerLeftContent = '\
        <section class="gc-left-content">\
            <div class="gc-icon-content">\
                '+leftImage+'\
            </div>\
            <div class="gc-info-content">\
                <div class="gc-name">'+leftUser.name+'</div>\
                <div class="gc-state"></div>\
            </div>\
        </section>\
    ';
    }


    var startTime = new Date(match.startTime);
    var shamsiStartTime = Utils.miladiToShamsiObject(startTime);

    headerMiddleContent = '\
        <section class="gc-middle-content">\
            <div class="gc-vs">\
                <i class="icon-multiplay-1" ></i>\
            </div>\
            <div class="gc-time">\
            '+shamsiStartTime.y + "/" + shamsiStartTime.m + "/" + shamsiStartTime.d+'\
            </div>\
        </section>\
    ';



    var content = '\
        <div class="gc-match-result-card">\
            <header class="gc-header">\
               '+headerRightContent+'\
               '+headerMiddleContent+'\
               '+headerLeftContent+'\
            </header>\
            <div class="gc-result-content">\
                <div class="gc-match-content">\
                    <div class="gc-match-id-content">\
                        <span class="gc-title">شناسه مسابقه : </span>\
                        <span class="gc-value">'+match.id+'</span>\
                    </div>\
                    <div class="gc-match-time-content">\
                        <span class="gc-title">زمان مسابقه : </span>\
                        <span class="gc-value">'+shamsiStartTime.y + "/" +
                                shamsiStartTime.m + "/" +
                                shamsiStartTime.d+' - \
                                '+Utils.padNumber(startTime.getHours(),2) +' : '+Utils.padNumber(startTime.getMinutes(),2)+'\
                        </span>\
                    </div>\
                    <div class="gc-match-state-content">\
                        <span class="gc-title">وضعیت مسابقه : </span>\
                        <span class="gc-value">'+statusName+'</span>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ';

    return content;
};

Utils.createNeedLoginView = function () {

    var content = '\
        <div class="gc-need-login">ابتدا وارد حساب کاربری خود شوید</div>\
    ';

    return content;
};

Utils.createSlideRowContent = function (params) {
    var idContent = "";

    if (params.id) {
        idContent = 'id="' + params.id + '"';
    }

    var moreContent = "";

    if(params.moreType) {

        moreContent = '\
                <div class="gc-more-content" gc-type="'+params.moreType+'" gc-content="'+encodeURIComponent(JSON.stringify(params.moreContent))+'">\
                    <i class=" gc-pointer icon-grid-1"></i>\
                </div>\
            ';
    }

    var titrContent = "";

    if(params.title) {
        titrContent = '\
            <div class="gc-title">'+params.title + '</div>\
        ';
    }

    var titrMoreContent = "";

    if(params.title || params.moreType) {
        titrMoreContent = '\
            <div class="gc-titr">\
                '+titrContent+'\
                '+moreContent+'\
            </div>\
        ';
    }
    var content = '\
            <div '+ idContent + ' class="gc-slide-row ' + params.rootClasses + '">\
                <div class="gc-tir-swiper">\
                    '+titrMoreContent+'\
                    <div class="swiper-container">\
                        <div class="swiper-wrapper"></div>\
                    </div>\
                </div>\
                <i class="gc-navigation-left  gc-navigation icon-arrow-1-left gc-pointer" ></i>\
                <i class="gc-navigation-right gc-navigation icon-arrow-1-right gc-pointer"></i>\
            </div>\
        ';
    return content;
};

Utils.isSiteSecure = function () {
    return location.href.indexOf("https") === 0;
};

Utils.createCommentView = function (comment) {

    var imageContent = "";

    if(comment.user.imageUrl) {
        imageContent = '<img alt="user" src="'+comment.user.imageUrl+'">';
    } else {
        imageContent = '<i class="icon-profile-1"></i>';
    }

    var time = new Date(comment.timestamp);
    var shamshi = Utils.miladiToShamsiObject(time);


    var dataContent =
        shamshi.y + "/" +
        shamshi.m + "/" +
        shamshi.d + " " +
        Utils.padNumber(time.getHours(),2) + " : " +
        Utils.padNumber(time.getMinutes(),2);

    var content = '\
        <div class="gc-comment-card">\
            <div class="gc-image-content">\
                '+imageContent+'\
            </div>\
            <div class="gc-info-content">\
                <div class="gc-user-name">'+comment.user.name+'</div>\
                <div class="gc-date">'+dataContent+'</div>\
            </div>\
            <div class="gc-text-content">\
                '+comment.text+'\
            </div>\
        </div>\
    ';


    return content;
};

Utils.miladiToShamsiObject = function (date) {
    function jalCal(jy) {
        // Jalaali years starting the 33-year rule.
        var breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210
            , 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
        ]
            , bl = breaks.length
            , gy = jy + 621
            , leapJ = -14
            , jp = breaks[0]
            , jm
            , jump
            , leap
            , leapG
            , march
            , n
            , i;

        if (jy < jp || jy >= breaks[bl - 1])
            throw new Error('Invalid Jalaali year ' + jy)

        // Find the limiting years for the Jalaali year jy.
        for (i = 1; i < bl; i += 1) {
            jm = breaks[i]
            jump = jm - jp
            if (jy < jm)
                break
            leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4)
            jp = jm
        }
        n = jy - jp;

        // Find the number of leap years from AD 621 to the beginning
        // of the current Jalaali year in the Persian calendar.
        leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4)
        if (mod(jump, 33) === 4 && jump - n === 4)
            leapJ += 1

        // And the same in the Gregorian calendar (until the year gy).
        leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150

        // Determine the Gregorian date of Farvardin the 1st.
        march = 20 + leapJ - leapG

        // Find how many years have passed since the last leap year.
        if (jump - n < 6)
            n = n - jump + div(jump + 4, 33) * 33
        leap = mod(mod(n + 1, 33) - 1, 4)
        if (leap === -1) {
            leap = 4
        }

        return {
            leap: leap
            , y: gy
            , march: march
        }
    }

    function j2d(jy, jm, jd) {
        var r = jalCal(jy);
        return g2d(r.y, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1
    }

    function d2j(jdn) {
        var gy = d2g(jdn).y // Calculate Gregorian year (gy).
            , jy = gy - 621
            , r = jalCal(jy)
            , jdn1f = g2d(gy, 3, r.march)
            , jd
            , jm
            , k;

        // Find number of days that passed since 1 Farvardin.
        k = jdn - jdn1f;
        if (k >= 0) {
            if (k <= 185) {
                // The first 6 months.
                jm = 1 + div(k, 31)
                jd = mod(k, 31) + 1
                return {
                    y: jy,
                    m: jm,
                    d: jd
                }
            } else {
                // The remaining months.
                k -= 186
            }
        } else {
            // Previous Jalaali year.
            jy -= 1
            k += 179
            if (r.leap === 1)
                k += 1
        }
        jm = 7 + div(k, 30);
        jd = mod(k, 30) + 1;
        return {
            y: jy,
            m: jm,
            d: jd
        }
    }

    function g2d(gy, gm, gd) {
        var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
            + div(153 * mod(gm + 9, 12) + 2, 5)
            + gd - 34840408;
        d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
        return d
    }

    function d2g(jdn) {
        var j
            , i
            , gd
            , gm
            , gy;
        j = 4 * jdn + 139361631;
        j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
        i = div(mod(j, 1461), 4) * 5 + 308;
        gd = div(mod(i, 153), 5) + 1;
        gm = mod(div(i, 153), 12) + 1;
        gy = div(j, 1461) - 100100 + div(8 - gm, 6);
        return {
            y: gy
            , m: gm
            , d: gd
        }
    }

    function div(a, b) {
        return ~~(a / b);
    }

    function mod(a, b) {
        return a - ~~(a / b) * b;
    }


    return d2j(g2d(date.getFullYear(), date.getMonth()+1, date.getUTCDate()));

};

Utils.miladiToShamsi = function (date) {

    var time = Utils.miladiToShamsiObject(date);

    var newDate = new Date();

    newDate.setMonth(time.m);
    newDate.setDate(time.d);
    newDate.setYear(time.y);
    newDate.setHours(date.getHours());
    newDate.setMinutes(date.getMinutes());
    newDate.setSeconds(date.getSeconds());

    return newDate;
};

Utils.getRateView = function (rate) {

    var fullRateCount = parseInt(rate);
    var halfRateCount = (rate === fullRateCount) ? 0 : 1;
    var emptyRateCount = 5 - (fullRateCount + halfRateCount);

    var rateContent = "";

    if(emptyRateCount>0) {
        for (var i = 0; i < emptyRateCount; i++) {
            rateContent+= '<i class="gc-star icon-star-empty-1"></i>'
        }
    }

    if(halfRateCount>0) {
        for (var i = 0; i < halfRateCount; i++) {
            rateContent+= '<i class="gc-star icon-star-half-3"></i>'
        }
    }
    if(fullRateCount>0) {
        for (var i = 0; i < fullRateCount; i++) {
            rateContent+= '<i class="gc-star icon-star-full-1_1"></i>'
        }
    }
    return rateContent;
};

Utils.generateUUID = function (sectionCount) {
    var d = new Date().getTime();
    var textData = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

    if (sectionCount == 1) {
        textData = 'xxxxxxxx';
    }

    if (sectionCount == 2) {
        textData = 'xxxxxxxx-xxxx';
    }

    if (sectionCount == 3) {
        textData = 'xxxxxxxx-xxxx-4xxx';
    }

    if (sectionCount == 4) {
        textData = 'xxxxxxxx-xxxx-4xxx-yxxx';
    }

    var uuid = textData.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);

        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
};

Utils.fullscreen = function (elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    } else {
        return false
    }
    return true;
};

Utils.mergeObjects = function (obj1, obj2) {

    for(var key in obj1) {
        obj2[key] = obj1[key];
    }
};

Utils.getPlatformContent = function (params) {

    var content = '';
    var platform = params.platformType;
    // var infrustructure = params.infrustructure;
    var selectedPlatform = [];

    for (var name in  GC_CONST.GAME_PLATFORMS) {
        var num = GC_CONST.GAME_PLATFORMS[name];

       if((num & platform) ===num) {
           selectedPlatform.push(num);
       }
    }




    for (var i = 0; i < selectedPlatform.length; i++) {

        switch (selectedPlatform[i]) {

            case GC_CONST.GAME_PLATFORMS.WEB :
                content += '<i class="gc-platform-web icon-web-game-1"></i>';
                break;

            case GC_CONST.GAME_PLATFORMS.MOBILE :
                content += '<i class="gc-platform-mobile  icon-device-mobile-1"></i>';
                break;
            case GC_CONST.GAME_PLATFORMS.PC :
                content += '<i class="gc-platform-stream icon-cloud-game-1"></i>';
                break;
        }
    }

    return content;

};

Utils.millisToMinutesAndSeconds = function (millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

Utils.checkEsrb = function (params) {

    var esrbApplyAge = parseInt(localStorage.getItem("esrbApplyAge"));

    if (params.esrb >= 15 && (!esrbApplyAge || esrbApplyAge<params.esrb)) {
        var esrb = Utils.toFaDigit(params.esrb);
        Utils.confirmDialog({
            title: "توجه",
            acceptText: "تایید",
            rejectText: "خروج",
            description: "این بازی برای گروه سنی زیر "+esrb+" سال مناسب نمی باشد.لطفا تایید نمایید سن شما بالای "+esrb+" سال می باشد.",
            onAccept: function () {
                localStorage.setItem("esrbApplyAge", params.esrb);
                params.onAccept && params.onAccept();
            },
            onReject : function(){
                params.onReject && params.onReject();
            },
            onHide : function(){
                params.onHide && params.onHide();
            },
            acceptClass : "gc-red",
            rejectClass : "gc-green",
            titleClass : "gc-red",
        });
    } else{
        params.onAccept && params.onAccept();
    }
};

Utils.gamePlayAction = function (params, callback) {

    function act() {

        if(params.infrustructure === 2) { //STREAM

            var requestData = {
                leagueId: params.leagueId,
                gameId : params.gameId
            };

            if(Utils.checkPlatform.mobile()) {
                requestData.clientType = 4;
            } if(Utils.checkPlatform.PC()) {
                requestData.clientType = 3;
            }else {
                requestData.clientType = 1;
            }

            params.pageHandler.getService().streamMatchIdRequest(requestData, function (res) {
                callback && callback(res);

                if(!res.hasError) {
                    if(params.onBeforeShowMatchPage && !params.onBeforeShowMatchPage()) return;

                    var content = {
                        leagueId: params.leagueId,
                        leagueName: params.leagueName,
                        gameId: params.gameId,
                        gameName: params.gameName,
                        matchId: res.result.matchId,
                        ip: res.result.ip,
                        port: res.result.ws,
                        rtsp: res.result.rtsp,
                        io: res.result.io,
                        width: res.result.width,
                        height: res.result.height,
                        fromGame: params.fromGame
                    };

                    if (Utils.checkPlatform.PC()) {

                        content.token = params.pageHandler.getService().getUserData().token;
                        content.tokenIssuer = params.pageHandler.getService().getUserData().tokenIssuer;
                        params.pageHandler.postMessageToParent(
                            {type: GC_CONST.PC_SEND_MESSAGE_TYPE.SHOW_STREAM, content: content});

                    } else {
                        params.pageHandler.showPage(MatchPage.NAME,{
                            type : MatchPage.MATCH_TYPE.STREAM,
                            content : content
                        });
                    }
                }

            });

        } else if (params.hasSdk) {
            if (params.playerNumberType === 1) {// single player

                params.pageHandler.getService().matchIdRequest({
                    leagueId: params.leagueId,
                    gameId: params.gameId,
                }, function (res) {

                    callback && callback(res);

                    if (!res.hasError) {

                        if (params.onBeforeShowMatchPage && !params.onBeforeShowMatchPage()) return;

                        params.pageHandler.showPage(MatchPage.NAME, {
                            type: MatchPage.MATCH_TYPE.SINGLE_PLAYER,
                            content: {
                                isMultiPlayer: false,
                                leagueId: params.leagueId,
                                leagueName: params.leagueName,
                                gameId: params.gameId,
                                gameName: params.gameName,
                                matchId: res.result.matchId,
                                fromGame: params.fromGame,
                                webUrl: params.webUrl
                            }
                        });

                    }


                });

            }
            else if (params.playerNumberType === 2 || params.playerNumberType === 4) {//multi player

                callback && callback();

                if (params.onBeforeShowMatchPage && !params.onBeforeShowMatchPage()) return;

                params.pageHandler.showPage(MatchPage.NAME, {
                    type: MatchPage.MATCH_TYPE.MULTI_PLAYER,
                    content: {
                        leagueId: params.leagueId,
                        quickMatch: params.quickMatch,
                        leagueName: params.leagueName,
                        gameId: params.gameId,
                        gameName: params.gameName,
                        gameVersion: params.gameVersion,
                        fromGame: params.fromGame,
                        webUrl: params.webUrl
                    }
                });

            }
        } else {
            params.pageHandler.showPage(MatchPage.NAME, {
                type: MatchPage.MATCH_TYPE.SINGLE_PLAYER,
                content: {
                    leagueId: params.leagueId,
                    quickMatch: params.quickMatch,
                    leagueName: params.leagueName,
                    gameId: params.gameId,
                    gameName: params.gameName,
                    gameVersion: params.gameVersion,
                    fromGame: params.fromGame,
                    webUrl: params.webUrl
                }
            });
        }

    }

    function checkCanSubscribe() {
        if(params.member || params.infrustructure === 2 || ! params.hasSdk){
            act();
        } else {
            params.pageHandler.getService().subscribeDefaultLeagueRequest({
                gameId: params.gameId
            }, function (res) {

                if (res.hasError) {
                    callback && callback(res);
                } else {
                    act();
                }
            });
        }
    }

    // function checkEsrb() {
    //     var esrbApplyAge = parseInt(localStorage.getItem("esrbApplyAge"));
    //
    //     if (params.esrb >= 15 && (!esrbApplyAge || esrbApplyAge<params.esrb)) {
    //         var esrb = Utils.toFaDigit(params.esrb);
    //         Utils.confirmDialog({
    //             title: "توجه",
    //             acceptText: "تایید",
    //             rejectText: "خروج",
    //             description: "این بازی برای گروه سنی زیر "+esrb+" سال مناسب نمی باشد.لطفا تایید نمایید سن شما بالای "+esrb+" سال می باشد.",
    //             onAccept: function () {
    //                 localStorage.setItem("esrbApplyAge", params.esrb);
    //                 checkCanSubscribe();
    //             },
    //             onReject : function(){
    //                 callback && callback();
    //             },
    //             onHide : function(){
    //                 callback && callback();
    //             },
    //             acceptClass : "gc-red",
    //             rejectClass : "gc-green",
    //             titleClass : "gc-red",
    //         });
    //     } else{
    //         checkCanSubscribe();
    //     }
    //     // checkCanSubscribe();
    // }
    //
    // checkEsrb();


    checkCanSubscribe();
};

Utils.loginWithConfirm = function (params) {
    var dialogParams = {
        rootClass : "gc-login-confirm-dialog",
        title : "ورود"
    };

    var text = params.description || "آیا می خواهید وارد شوید؟";

    dialogParams.footer = '\
                <div class="gc-button-content">\
                    <div class="gc-btn-yes gc-pointer">ورود</div>\
                    <div class="gc-btn-no gc-pointer">فعلا نه</div>\
                <div>\
            \
            ';

    var selectionContent = '\
        <div class="gc-body">\
            <div><img alt="icon" src="./res/img/icon.png"></div>\
            <div>'+text+'</div>\
        </div>\
    ';


    dialogParams.body = '\
            <div >\
                '+selectionContent+'\
            </div>\
        ';

    var dialog = new Dialog(dialogParams);

    var rejectCalled = false;
    dialog.onHide = function () {
        dialog.destroy();

        if (!rejectCalled) {
            rejectCalled = true;
            params.onReject && params.onReject();
        }

    };


    dialog.addEventListener("click", ".gc-button-content .gc-btn-yes", function () {
        params.pageHandler.showLogin();
        dialog.destroy();
        params.onAccept && params.onAccept();
    });

    dialog.addEventListener("click", ".gc-button-content .gc-btn-no", function () {
        dialog.destroy();
        if (!rejectCalled) {
            rejectCalled = true;
            params.onReject && params.onReject();
        }
    });


    dialog.show();

    return dialog;
};

Utils.confirmDialog = function (params) {
    var dialogParams = {
        rootClass : "gc-confirm-dialog",
        title : params.title
    };


    var acceptClass = "";
    var rejectClass = "";

    if(params.acceptClass) {
        acceptClass = params.acceptClass;
    }

    if(params.rejectClass) {
        rejectClass = params.rejectClass;
    }

    if(params.titleClass) {
        dialogParams.titleClass = params.titleClass;
    }



    dialogParams.footer = '\
                <div class="gc-button-content">\
                    <div class="gc-btn-yes gc-pointer '+acceptClass+'">'+params.acceptText+'</div>\
                    <div class="gc-btn-no gc-pointer '+rejectClass+'">'+params.rejectText+'</div>\
                <div>\
            \
            ';

    var selectionContent = '\
        <div class="gc-body">\
            <div><img  alt="icon"  src="./res/img/icon.png"></div>\
            <div>'+params.description+'</div>\
        </div>\
    ';


    dialogParams.body = '\
            <div >\
                '+selectionContent+'\
            </div>\
        ';

    var dialog = new Dialog(dialogParams);

    dialog.onHide = function () {
        params.onHide && params.onHide();
        dialog.destroy();
    };


    dialog.addEventListener("click", ".gc-button-content .gc-btn-yes", function () {
        params.onAccept && params.onAccept();
        dialog.destroy();
    });

    dialog.addEventListener("click", ".gc-button-content .gc-btn-no", function () {
        params.onReject && params.onReject();
        dialog.destroy();
    });


    dialog.show();
};

Utils.convertToRange = function (value, srcRange, dstRange) {
    // value is outside source range return
    if (value > 0) {
        if (value < srcRange[0] || value > srcRange[1]) {
            return NaN;
        }
    }


    var srcMax = srcRange[1] - srcRange[0],
        dstMax = dstRange[1] - dstRange[0],
        adjValue = value - srcRange[0];
    return (adjValue * dstMax / srcMax) + dstRange[0];

};

Utils.padNumber = function (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

Utils.checkPlatform = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Firefox: function () {
        return navigator.userAgent.match(/Firefox/i);
    },
    Chrome: function () {
        return navigator.userAgent.match(/Chrome/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    mobile: function () {
        return (Utils.checkPlatform.Android() || Utils.checkPlatform.BlackBerry() || Utils.checkPlatform.iOS() || Utils.checkPlatform.Opera() || Utils.checkPlatform.Windows());
    },
    PC : function () {
        // console.log("check PC platform",typeof  window.QWebChannel !== "undefined");
        return (typeof  window.QWebChannel !== "undefined");
    }
};


Utils.copyArray = function (params) {

    var newArray = [];

    for (var i = params.start; i <= params.end; i++) {
        newArray.push(params.array[i]);
    }

    return newArray;
};

Utils.toFaDigit = function (enNumber) {
    if(typeof enNumber === "number") {
        enNumber += "";
    }
    return enNumber.replace(/\d+/g, function(digit) {
        var ret = '';
        for (var i = 0, len = digit.length; i < len; i++) {
            ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
        }

        return ret;
    });
};

Utils.getUrlData = function (url) {
    var data = url.match(/\?([^#]*)/i);

    if (!data) {
        return;
    }
    var url_data = data[1];
    // separate the data into an array, in case the are multiple pairs name=value
    var ar_url_data = url_data.split('&');

    // traverse the array, and adds into an object elements name:value
    var data_url = {};
    for (var i = 0; i < ar_url_data.length; i++) {
        var ar_val = ar_url_data[i].split('=');           // separate name and value from each pair
        data_url[ar_val[0]] = ar_val[1];
        /*
         if(ar_val[1].indexOf("%22") !== -1)
         {
         data_url[ar_val[0]] =ar_val[1].split("%22")[1];
         }
         else
         {
         data_url[ar_val[0]] = ar_val[1];
         }
         */

    }
    return data_url;
};
