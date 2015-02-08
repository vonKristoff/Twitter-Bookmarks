<?php 
session_start();

$handle = $_SESSION['access_token']['screen_name'];
$results = $_SESSION['results'];

$response = array('handle' => $handle, 'favourites' => $results);

echo json_encode($response);

?>