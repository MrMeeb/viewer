<?php
session_start();

include "elements/db.php";

$username = $_POST["username"];
$password_1 = $_POST["password_1"];
$password_2 = $_POST["password_2"];

$usernameErr = $passwordErr = "";

//Sign Up

if (isset($_POST["sign-up-submit"])) {

    if ($password_1 === $password_2) {

        $sql = "SELECT username FROM user_data WHERE username='$username'";
        $result = $conn->query($sql);

        if ($result->num_rows == 0) {
            
            $hash = password_hash( $password_1 , PASSWORD_BCRYPT);

            $date = date('Y-m-d H:i:s'); "<br>";

            $sql = "INSERT INTO user_data (username, password) VALUES ('$username', '$hash')";

            if ($conn->query($sql) === TRUE) {

                $_SESSION['username'] = $username;
                $_SESSION['success'] = "You are now logged in";
                header('location: dashboard');

              } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
              }

        }
        else {

            echo  "$username already exists <br>";
        }


    }

    if ($password_1 !== $password_2) {
        echo "Passwords don't match </br>";
        echo "$password_1, $password_2";
    }
}

//Sign In

if (isset($_POST["sign-in-submit"])) {

    $sql = "SELECT * FROM user_data WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        while($row = $result->fetch_assoc()) {

            if (password_verify($password_1, $row['password'])) {

                    $_SESSION['username'] = $username;
                    $_SESSION['success'] = "You are now logged in";

                    if (session_status() == PHP_SESSION_ACTIVE) {

                        $id = $row['user_id'];

                        $session_id = session_id();

                        $sql = "REPLACE INTO sessions (session_id, user_id) VALUES ('$session_id', '$id')";

                        if ($conn->query($sql) === TRUE) {

                            header('location: dashboard');
            
                          } else {
                            echo "Error: " . $sql . "<br>" . $conn->error;
                          }
                        
                    } else {
                        echo "An error occured";
                        session_destroy();
                    }               


            } else {

                $passwordErr = "Password is incorrect";

            }
        }
        
        $date = date('Y-m-d H:i:s'); "<br>";

    } else {

        $usernameErr = "Username not recognised";

    }

}
