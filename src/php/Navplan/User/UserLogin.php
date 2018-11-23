<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;
use Navplan\Message;


class UserLogin
{
    public static function autoLogin(mysqli $conn, array $args)
    {
        $token = UserHelper::escapeTrimInput($conn, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($conn, $token);

        if (!$email)
            UserHelper::sendErrorResponseAndDie(new Message(-1, 'error: invalid token'), $conn);

        UserHelper::sendSuccessResponse($email, $token);
    }


    public static function login(mysqli $conn, array $args)
    {
        $email = UserHelper::escapeTrimInput($conn, $args["email"]);
        $password = UserHelper::escapeTrimInput($conn, $args["password"]);
        $rememberMe = ($args["rememberme"] === "1");

        if (!UserHelper::checkEmailFormat($email) || !UserHelper::checkEmailExists($conn, $email))
            UserHelper::sendErrorResponseAndDie(new Message(-1, 'error: invalid email'), $conn);

        if (!UserHelper::checkPwFormat($password) || !UserHelper::verifyPwHash($conn, $email, $password))
            UserHelper::sendErrorResponseAndDie(new Message(-2, 'error: invalid password'), $conn);

        // create new token
        $token = UserHelper::createToken($email, $rememberMe);

        UserHelper::sendSuccessResponse($email, $token);
    }
}
