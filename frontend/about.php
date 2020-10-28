<!doctype html>
<html lang="en">
    <head>

        <?php include "elements/header.php"?>

        <title>About</title>
    </head>
    <body>

        <div id="mainBackground" class="mainBackground">
            <div class="mainBackground-overlay d-flex flex-column">

                <?php include "elements/nav1.php" ?>

                <div class="d-flex flex-column justify-content-center align-items-center mt-auto mb-auto">
                    <h1 class="text-center mb-5">About Viewer</h1>
                    <h5 class="text-center mb-3">Viewer was created to demonstrate an understanding of the following:</h5>
                    <div class="d-flex flex-wrap justify-content-center align-items-center">
                        <div class="p-4 language-container text-center">
                            <p class="mb-1">HTML 5</p>
                            <i class="fab fa-html5" style="font-size: 5rem"></i>
                        </div>
                        <div class="p-4 language-container text-center">
                            <p class="mb-1">CSS 3</p>
                            <i class="fab fa-css3-alt" style="font-size: 5rem"></i>
                        </div>
                        <div class="p-4 language-container text-center">
                            <p class="mb-1">JavaScript</p>
                            <i class="fab fa-js" style="font-size: 5rem"></i>
                        </div>
                        <div class="p-4 language-container text-center">
                            <p class="mb-1">Bootstrap</p>
                            <i class="fab fa-bootstrap" style="font-size: 5rem"></i>
                        </div>
                        <div class="p-4 language-container text-center">
                            <p class="mb-1">Node.js</p>
                            <i class="fab fa-node-js" style="font-size: 5rem"></i>
                        </div>
                        <div class="p-4 language-container text-center">
                            <p class="mb-1">PHP</p>
                            <i class="fab fa-php" style="font-size: 5rem"></i>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center mt-3">
                        <a class="btn btn-primary" href="https://github.com/MrMeeb/viewer" target="_blank" role="button">GitHub <i class="fab fa-github"></i></a>
                    </div>
                </div>

                <footer class="d-flex justify-content-center footer mt-auto">
                    <p>Made by Charlie Macdonald, 2020</p>
                </footer>
            </div>
        </div>




        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/main.js"></script>
        <script>fetchBackground()</script>
    </body>
    <footer>

    </footer>
</html>