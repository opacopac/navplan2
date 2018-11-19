<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

header("Access-Control-Allow-Origin: *"); // TODO: remove for PROD

$input = json_decode(file_get_contents('php://input'), TRUE);

switch($input["action"])
{
    case "login":
        UserLogin::login($input);
        break;
    case "autologin":
        UserLogin::autoLogin($input);
        break;
    case "verifyemail":
        UserRegister::verifyEmail($input);
        break;
    case "register":
        UserRegister::register($input);
        break;
    case "forgotpassword":
        UserForgotPw::forgotPassword($input);
        break;
    case "updatepassword":
        UserUpdatePw::updatePassword($input);
        break;
    default:
        die("no or invalid action defined!");
}
