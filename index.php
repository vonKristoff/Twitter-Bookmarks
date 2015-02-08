<?php

// BASIC WORKING EXAMPLE WITH MY HARD CODED KEY PAIRS

$CONSUMER_KEY = "wjsSeqG8gD1EtsS5VCKPnvWgn";
$CONSUMER_SECRET = "Iz51UGp9bUrOoa9Pa2ZZvP4jf3ZrGzPbB7wB9s6O8MvVPp9dJJ";

$accesstoken = "545948256-kzHQm1k5RazWxcpNgMFBUafLvdbJYe5YOaXem7uk";
$accesstokensecret = "jPKp5aSviPMPGouTwS3MRchgA7eLzu0O5JRmuuNjSl6tb";
 
$connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $accesstoken, $accesstokensecret);

$statues = $connection->get("favorites/list", array("count" => 25, "exclude_replies" => true));

echo json_encode($statues);

?>
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1.0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <title>Twitter Bookmarks</title>
  <script data-main="js/main" src="js/libs/require.js"></script>
</head>
<body>
  <div class="wrapper"></div>
</body>
</html>