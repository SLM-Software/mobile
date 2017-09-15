var FB_APP_ID = "1915895988671514";
var FB_APP_NAME = "Spotlightmart";
var FB_APP_PERMISSION = ["public_profile"];
var AUTH0_DOMAIN = "spotlightmartdev.auth0.com";
var AUTH0_CLIENTID = "2XHm_I2RPZ3-lpUUi2gBODI_4KvjtaYP";
var AUTH0_REDIRECT_URI = "com.spotlight.retail://spotlightmartdev.auth0.com/cordova/com.spotlight.retail/callback";
var AUTH0_OPTIONS = {
    responseType : "token id_token",
    redirectUri : AUTH0_REDIRECT_URI,
    scope : "openid"
};
var USER_DATA_FILE = "user.dat";
var USER_CARD_FILE = "cards.dat";
var DS = "/";
var USER_PORTRAIT_FILE = "portrait.jpg";
var PRODUCT_CATGORIES = [   { "text" : "BEVERAGE", "value" : "BEVERAGE"  },
                            { "text" : "FROZEN FOOD", "value" : "FROZEN FOOD" },
                            { "text" : "ACCESSORIES", "value" : "ACCESSORIES" },
                            { "text" : "SNACKS", "value" : "SNACKS" },
                            { "test" : "CLOTHING", "value" : "CLOTHING" } ];