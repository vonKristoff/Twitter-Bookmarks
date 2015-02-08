<?php
require "twitteroauth/autoloader.php";

use Abraham\TwitterOAuth\TwitterOAuth;

session_start();

// Twitter App Credentials 
$CONSUMER_KEY = "wjsSeqG8gD1EtsS5VCKPnvWgn";
$CONSUMER_SECRET = "Iz51UGp9bUrOoa9Pa2ZZvP4jf3ZrGzPbB7wB9s6O8MvVPp9dJJ";

// have you logged in already?
if(isset($_SESSION['access_token'])){

  // you are already 'logged in' for this sesh perform a refresh update

  // Could be DRYer

  $token = $_SESSION['access_token']["oauth_token"];
  $secret = $_SESSION['access_token']["oauth_token_secret"];

  $connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $token, $secret);

  $favorites = $connection->get("favorites/list", array("count" => 25));

  // store faves in session for ajax to obtain once app has booted
  $_SESSION['results'] = $favorites;

} else {
  // are there callback params from twitter - then you are logging in for first time as app has just verified the user
  if(isset($_REQUEST['oauth_verifier'])){

    // ok set session tokens
    $request_token = [];
    $request_token['oauth_token'] = $_SESSION['oauth_token'];
    $request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];

    if (isset($_REQUEST['oauth_token']) && $request_token['oauth_token'] !== $_REQUEST['oauth_token']) {
        // Abort! Something is wrong.
      echo 'Something is wrong.';
    }

    // build the connection with the required credentials

    $connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $request_token['oauth_token'], $request_token['oauth_token_secret']);

    // finally recieve the access token to recieve the users credentials

    $access_token = $connection->oauth("oauth/access_token", array("oauth_verifier" => $_REQUEST['oauth_verifier']));

    // store for auto login on refresh
    $_SESSION['access_token'] = $access_token; 


    // now user id has been verified pull back tweets 
    $token = $access_token["oauth_token"];
    $secret = $access_token["oauth_token_secret"];

    $connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $token, $secret);

    $favorites = $connection->get("favorites/list", array("count" => 25));

    // store faves in session for ajax to obtain once app has booted
    $_SESSION['results'] = $favorites;

  } else {
    // redirect to signin cos you are nobody
    header('Location: signin.php');
  }
}
?>