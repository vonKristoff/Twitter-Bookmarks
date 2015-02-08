<?php  
  // set constructor flag for app
  if(isset($_SESSION['access_token'])){
    echo '<script type="text/javascript">window.auth = true;</script>';    
  }
?>