<?php include "elements/registration.php" ?>
<!doctype html>
<html lang="en">
    <head>

        <?php include "elements/header.php"?>

        <title>Sign Up</title>
    </head>
    <body>
        <div id="mainBackground" class="mainBackground">
            <div class="mainBackground-overlay d-flex flex-column">

                <?php include "elements/nav1.php" ?>

                <div class="d-flex flex-column justify-content-center align-items-center mt-auto mb-auto">
                    <div id='signup-container' class="signup-container shadow d-flex flex-column justify-content-center align-items-center">
                        <form id="signup-form" action="signup" method="POST" class="d-flex flex-column justify-content-center align-items-center needs-validation linear-transitions">
                            <h3 class="mb-3 text-center">Create an Account</h3>
                            <div class="input-group my-1">
                                <div class="input-group-prepend">
                                    <span class="input-group-text prepend"></span>
                                </div>
                                <input type="text" class="form-control movie-search" style="font-size: 1rem" name="username" autocomplete="off" placeholder="Username" value="<?php echo $username;?>" required>
                                <div class="input-group-append">
                                    <span class="input-group-text append btn btn-primary btn-primary-append"><i class="fas fa-user"></i></span>
                                </div>
                            </div>
                            <div id="username-feedback" class="invalid-feedback mx-1 pb-2" style="display: block;"><?php echo $usernameErr;?></div>                    
                            <div class="form-group my-0">
                                <div class="input-group my-1">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text prepend"></span>
                                    </div>
                                    <input type="password" class="form-control movie-search" style="font-size: 1rem" name="password_1" placeholder="Password" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text append btn btn-primary btn-primary-append"><i class="fas fa-key"></i></span>
                                    </div>    
                                </div>
                                <div class="input-group my-1">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text prepend"></span>
                                    </div>
                                    <input type="password" class="form-control movie-search" style="font-size: 1rem" name="password_2" placeholder="Confirm" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text append btn btn-primary btn-primary-append"><i class="fas fa-key"></i></span>
                                    </div>    
                                </div>
                            </div>
                            <div id="password-feedback" class="invalid-feedback mx-1 pb-2" style="display: block"><?php echo $passwordErr;?></div>                    
                            <input class="btn btn-primary shadow" style="margin-top: 1rem" type="submit" name="sign-up-submit" value="Sign Up">
                        </form>
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
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/main.js"></script>
        <script>fetchBackground()</script>

    </body>
    <footer>

    </footer>
</html>