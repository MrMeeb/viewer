<!doctype html>
<html lang="en">
    <head>

        <?php include "elements/header.php"?>

        <title>Home</title>
    </head>
    <body>

        <div id="mainBackground" class="mainBackground">
            <div class="mainBackground-overlay">

                <?php include "elements/nav1.php" ?>

                <div class="d-flex flex-column justify-content-center align-items-center" style="height: 80%">
                    <h1 class="text-center mb-2">Life's too short to remember what you want to watch.</h1>
                    <h3 class="text-center mb-5">Track the movies you've seen, and the ones you want to see, right here.</h3>
                    <div class="d-flex justify-content-center mt-3">
                        <a class="btn btn-primary" href="/signin" role="button">Sign In</a>
                    </div>
                    <p class="text-center font-italic">Don't have an account? <a href="/signup" class="text-decoration-none">Create one</a></p>             
                </div>
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
        <div class="d-flex justify-content-center footer">
            <p>Made by Charlie Macdonald, 2020</p>
        </div>
    </footer>
</html>