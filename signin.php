<?php

require 'twitteroauth/autoloader.php';
use Abraham\TwitterOAuth\TwitterOAuth;

session_start();

$CONSUMER_KEY = "wjsSeqG8gD1EtsS5VCKPnvWgn"; // application id
$CONSUMER_SECRET = "Iz51UGp9bUrOoa9Pa2ZZvP4jf3ZrGzPbB7wB9s6O8MvVPp9dJJ"; // application public key

// The TwitterOAuth instance
$connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET);
// Requesting authentication tokens, the parameter is the URL we will be redirected to
$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => 'http://localhost:8888/twitter/index.php')); 
// Saving them into the session
$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
 
$url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));

echo '<a href="'.$url.'">link</a>'; //  

// print_r($_SESSION);
?>