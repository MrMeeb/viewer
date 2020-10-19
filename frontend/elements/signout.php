<?php
session_start();

session_destroy();
unset($_SESSION['username']);
setcookie('user', "", -3600);
setcookie('password', "", -3600);
header("location: ../index");