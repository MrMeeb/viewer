<?php 
  session_start(); 

  if (!isset($_SESSION['username'])) {
  	$_SESSION['msg'] = "You must log in first";
  	header('location: signin');
  }
?>
<!doctype html>
<html lang="en">
    <head>

        <?php include "elements/header.php"?>

        <title>Dashboard</title>
    </head>
    <body>
        <div id="mainBackground" class="mainBackground">
            <div class="mainBackground-overlay">

                <?php include "elements/nav2.php" ?>

                <div class="d-flex flex-column align-items-center mt-5">
                    <div id="movie-search-container" class="input-group" style="max-width: 600px">
                        <div class="input-group-prepend">
                            <span class="input-group-text prepend"></span>
                        </div>
                        <input type="text" class="form-control movie-search" id="movie-search-input" placeholder="Movie Title">
                        <div class="input-group-append">
                            <span id="movie-search-status" onclick="search()" class="input-group-text append btn btn-primary btn-primary-append"><i class="fas fa-search"></i></span>
                        </div>
                    </div>
                    <div id="movie-search-feedback" class="mx-2" style="display: block"></div>
                </div>
                
                
                
            </div>
        </div>




        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/main.js"></script>
        <script src="js/search.js"></script>
    </body>
    <footer>
        <div class="d-flex justify-content-center footer">
            <p>Made by Charlie Macdonald, 2020</p>
        </div>
    </footer>
</html>