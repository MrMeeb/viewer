<?php 
  if (isset($_GET['sign-out'])) {
    session_destroy();
    unset($_SESSION['username']);
    header("location: index");
}
?>

<nav class="navbar justify-content-center navbar-custom navbar-expand-lg navbar-dark bg-transparent">
    <ul class="navbar-nav">
        <li class="nav-item px-3">
            <a class="nav-link" href="/">Home<span class="sr-only"></span></a>
        </li>
        <li class="nav-item px-3">
            <a class="nav-link" href="/dashboard">Dashboard<span class="sr-only"></span></a>
        </li>
        <li class="nav-item px-3">
            <a class="nav-link" href="/about">About<span class="sr-only"></span></a>
        </li>
        <li class="nav-item px-3">
            <a class="nav-link" style="color: #FF007F !important" href="elements/signout">Sign Out<span class="sr-only"></span></a>
        </li>
    </ul>
</nav>