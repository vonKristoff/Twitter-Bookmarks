<?php
require "twitteroauth/autoloader.php";

use Abraham\TwitterOAuth\TwitterOAuth;

session_start();

// Twitter App Credentials 
$CONSUMER_KEY = "wjsSeqG8gD1EtsS5VCKPnvWgn";
$CONSUMER_SECRET = "Iz51UGp9bUrOoa9Pa2ZZvP4jf3ZrGzPbB7wB9s6O8MvVPp9dJJ";


// ok set session tokens
$request_token = [];
$request_token['oauth_token'] = $_SESSION['oauth_token'];
$request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];

// build the connection with the required credentials

$connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $request_token['oauth_token'], $request_token['oauth_token_secret']);

// finally recieve the access token to recieve the users credentials

$access_token = $connection->oauth("oauth/access_token", array("oauth_verifier" => $_REQUEST['oauth_verifier']));


// now user id has been verified pull back tweets 
$token = $access_token["oauth_token"];
$secret = $access_token["oauth_token_secret"];

$connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $token, $secret);

$favorites = $connection->get("favorites/list", array("count" => 25));

echo $favorites;


?>