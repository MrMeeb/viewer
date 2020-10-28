<script>
    localStorage.removeItem('token');
    window.location.replace('/signin')
</script>

<?php
session_start();

session_destroy();
unset($_SESSION['username']);
setcookie('user', "", 0, "/");
setcookie('password', "", 0, "/");
setcookie('id', "", 0, "/");
//header("location: ../index");
?>

