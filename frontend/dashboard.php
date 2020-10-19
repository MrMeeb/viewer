<?php 
  session_start(); 

  if (!isset($_SESSION['username'])) {
  	$_SESSION['msg'] = "You must log in first";
  	header('location: elements/signout');
  }
?>
<?php include "elements/registration.php"?>
<!doctype html>
<html lang="en">
    <head>

        <?php include "elements/header.php"?>

        <title>Dashboard</title>
    </head>
    <body>
        <div id="mainBackground" class="mainBackground">
            <div class="mainBackground-overlay-no-filter">

                <?php include "elements/nav2.php" ?>

                <div id="tabs-parent-container" class="d-flex flex-column align-items-center m-4">
                    <div id="tabs-container" class="tabs-container">
                        <ul class="nav nav-tabs nav-tabs-custom nav-justified" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="watch-tab" data-toggle="tab" href="#watch" role="tab" aria-controls="watch" aria-selected="true">To Watch</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="watched-tab" data-toggle="tab" href="#watched" role="tab" aria-controls="watched" aria-selected="false">Watched</a>
                            </li>
                        </ul>
                        <div class="tab-content mt-4" id="myTabContent">
                            <div class="tab-pane fade show active" id="watch" role="tabpanel" aria-labelledby="watch-tab">
                                <?php include 'elements/watch.php'?>
                            </div>
                            <div class="tab-pane fade" id="watched" role="tabpanel" aria-labelledby="watched-tab">
                                <?php include 'elements/watched.php'?>
                            </div>
                        </div>
                    </div>
                </div>               
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="add-movie-watch-modal" tabindex="-1" role="dialog" aria-labelledby="add-movie-watch-modal-label" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="add-movie-watch-modal-label">Add movie</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="watch-search-results-category" class="d-flex flex-wrap justify-content-center"></div>
                        <div id="watch-search-results-container" class="d-flex flex-wrap justify-content-center"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
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
        <script>gettoken(<?php echo "'$username'";?>, <?php echo "'$password'";?>, <?php echo "'$id'";?>)</script>
        <script>gettrending()</script>
        <script>getwatchlist()</script>
        <script>$(function () {$('[data-toggle="tooltip"]').tooltip()})</script>
    </body>
    <footer>
        <div class="d-flex justify-content-center footer-no-bottom">
            <p>Made by Charlie Macdonald, 2020</p>
        </div>
    </footer>
</html>