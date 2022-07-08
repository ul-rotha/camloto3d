////var CANVAS_WIDTH = 1280;
////var CANVAS_HEIGHT = 1920;

var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 1920;

var EDGEBOARD_X = 150;
var EDGEBOARD_Y = 200;

var GAME_NAME = "plinko";

/*var PRIMARY_FONT = "impact";*/
//var PRIMARY_FONT = "Muol";
//var PRIMARY_FONT = "Khmer OS Muol";
//var PRIMARY_FONT = "Koh Santepheap";
var PRIMARY_FONT = "Moul";

var FPS           = 30;
var FPS_TIME      = 1000/FPS;
var DISABLE_SOUND_MOBILE = false;

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;

var ON_MOUSE_DOWN  = 0;
var ON_MOUSE_UP    = 1;
var ON_MOUSE_OVER  = 2;
var ON_MOUSE_OUT   = 3;
var ON_DRAG_START  = 4;
var ON_DRAG_END    = 5;

var BOARD_ROW = 13;
var BOARD_COL = 7;

var BALL_RADIUS;
var NUM_INSERT_TUBE;

var CELL_SIZE = 140;
var CELL_PIVOT_FROM_CENTER = 90;

var BALL_FALL_MAX_ANGLE = 0.5;
var BALL_FALL_MAX_ROTATION = 80;
var BALL_FALL_ROTATION_ATTENUATION_FACTOR = 20;

var BALL_FALL_SPEED_INCREASE = 0.75;
var BALL_FALL_MAX_SPEED_LIMIT = 500; //IN MS

var BASKET_LIT_ITERATION = 10;

var SOUNDTRACK_VOLUME_IN_GAME = 0.3;

var PRIZE;
var PRIZE_PROBABILITY;

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;
var AD_SHOW_COUNTER;