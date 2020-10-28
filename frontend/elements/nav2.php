<?php 
  if (isset($_GET['sign-out'])) {
    session_destroy();
    unset($_SESSION['username']);
    header("location: index");
}
?>

<nav class="navbar navbar-custom navbar-expand-md navbar-dark bg-transparent">
    <a class="navbar-brand" href="#">Viewer</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
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
    </div>
</nav>