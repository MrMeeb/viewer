<!doctype html>
<html lang="en">
    <head>

        <?php include "elements/header.php"?>

        <title>Home</title>
    </head>
    <body>

        <div id="mainBackground" class="mainBackground">
            <div class="mainBackground-overlay d-flex flex-column">

                <?php include "elements/nav1.php" ?>

                <div class="d-flex flex-column justify-content-center align-items-center mt-auto mb-auto">
                    <h1 class="text-center mb-2">Life's too short to remember what you want to watch.</h1>
                    <h3 class="text-center mb-5">Track the movies you've seen, and the ones you want to see, right here.</h3>
                    <div class="d-flex justify-content-center mt-3">
                        <a class="btn btn-primary" href="/signin" role="button">Sign In</a>
                    </div>
                    <p class="text-center font-italic">Don't have an account? <a href="/signup" class="text-decoration-none">Create one</a></p>             
                </div>

                <footer class="d-flex justify-content-center footer mt-auto">
                    <p>Made by Charlie Macdonald, 2020</p>
                </footer>
            </div>
        </div>




        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <?php include "elements/footer.php"?>
    </body>
    <footer>

    </footer>
</html>