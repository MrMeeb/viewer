<?php include "elements/registration.php" ?>
<!doctype html>
<html lang="en">
    <head>

        <?php include "elements/header.php"?>

        <title>Sign Up</title>
    </head>
    <body>
        <div id="mainBackground" class="mainBackground">
            <div class="mainBackground-overlay">

                <?php include "elements/nav1.php" ?>

                <div class="d-flex flex-column justify-content-center align-items-center" style="height: 80%">
                    <div id='signup-container' class="signup-container shadow d-flex flex-column justify-content-center align-items-center">
                        <form id="signup-form" action="signup" method="POST" class="d-flex flex-column justify-content-center align-items-center needs-validation linear-transitions">
                            <h3 class="mb-3">Create an Account</h3>
                            <div class="form-group">
                                <input type="text" class="form-control" name="username" placeholder="Username" required>
                                <div id="username-feedback" class="hidden" style="display: block;"></div>                    
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control mb-2" name="password_1" placeholder="Password" required>
                                <input type="password" class="form-control" name="password_2" placeholder="Confirm Password" required>
                                <div id="password-feedback" class="mx-2" style="display: block"></div>                    
                            </div>
                            <input class="btn btn-primary shadow" style="margin-top: 1rem" type="submit" name="sign-up-submit" value="Sign Up">
                        </form>
                    </div>
                </div>
            </div>
        </div>




        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/main.js"></script>
        <script>fetchBackground()</script>

    </body>
    <footer>
        <div class="d-flex justify-content-center footer">
            <p>Made by Charlie Macdonald, 2020</p>
        </div>
    </footer>
</html>