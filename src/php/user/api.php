<?php
include_once __DIR__ . "/User.php";


header("Access-Control-Allow-Origin: *"); // TODO: remove for PROD

$input = json_decode(file_get_contents('php://input'), true);

switch($input["action"])
{
    case "login":
        User::login($input);
        break;
    case "autologin":
        User::autoLogin($input);
        break;
    case "logout":
        logoutUser();
        break;
    case "register":
        registerUser();
        break;
    case "forgotpassword":
        forgotPassword();
        break;
    case "updatepassword":
        updatePassword();
        break;
    default:
        die("no or invalid action defined!");
}
