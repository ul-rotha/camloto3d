function CScoreBasketController(oParentContainer) {

    var _aBasket;

    this._init = function (oParentContainer) {

        var oScoreContainer = new createjs.Container();
        oScoreContainer.y = 1472;
        oParentContainer.addChild(oScoreContainer);

        var oSprite = s_oSpriteLibrary.getSprite('basket_display');
        var iWidth = oSprite.width / 4;
        var iHeight = oSprite.height;
        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: { width: iWidth, height: iHeight, regX: iWidth / 2, regY: iHeight / 2 },
            animations: { state_off: [0], state_green: [1], state_yellow: [2], state_red: [3] }
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _aBasket = new Array();

        //for(var i=0; i<PRIZE.length; i++){
        //    _aBasket.push(new CBasket(290 +i*140, 0, oScoreContainer, oSpriteSheet, iWidth, iHeight, PRIZE[i].toString()));
        //};

        _aBasket.push(new CBasket(290 + 0 * 140, 0, oScoreContainer, oSpriteSheet, iWidth, iHeight, "1,ក្រាស់,x5"));
        _aBasket.push(new CBasket(290 + 1 * 140, 0, oScoreContainer, oSpriteSheet, iWidth, iHeight, "2,ស្តើង,x3"));
        _aBasket.push(new CBasket(290 + 2 * 140, 0, oScoreContainer, oSpriteSheet, iWidth, iHeight, "3,ស្មើ,x2"));
        _aBasket.push(new CBasket(290 + 3 * 140, 0, oScoreContainer, oSpriteSheet, iWidth, iHeight, "4,ក្រាស់,x3"));
        _aBasket.push(new CBasket(290 + 4 * 140, 0, oScoreContainer, oSpriteSheet, iWidth, iHeight, "5,ស្តើង,x5"));
        _aBasket.push(new CBasket(290 + 5 * 140, 0, oScoreContainer, oSpriteSheet, iWidth, iHeight, "6,ស្មើ,x10"));


    };

    this.unload = function () {
        for (var i = 0; i < PRIZE.length; i++) {
            _aBasket[i].unload();
        };
    };

    this.litBasket = function (iIndex, iProfit) {
        _aBasket[iIndex].lit(iProfit);
    };

    this.refreshText = function (iMult) {
        for (var i = 0; i < PRIZE.length; i++) {
            _aBasket[i].refreshText((iMult * PRIZE[i]).toString());
        }
    };

    this._init(oParentContainer);
}


