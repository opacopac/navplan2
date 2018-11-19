<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Message;
use Navplan\Shared\DbService;


class UserLogin
{
    public static function autoLogin(array $input)
    {
        $conn = DbService::openDb();
        $token = UserHelper::escapeTrimInput($conn, $input["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($conn, $token);

        if (!$email)
            UserHelper::sendErrorResponseAndDie(new Message(-1, 'error: invalid token'), $conn);

        UserHelper::sendSuccessResponse($email, $token);
        $conn->close();
    }


    public static function login(array $input)
    {
        $conn = DbService::openDb();
        $email = UserHelper::escapeTrimInput($conn, $input["email"]);
        $password = UserHelper::escapeTrimInput($conn, $input["password"]);
        $rememberMe = ($input["rememberme"] === "1");

        if (!UserHelper::checkEmailFormat($email) || !UserHelper::checkEmailExists($conn, $email))
            UserHelper::sendErrorResponseAndDie(new Message(-1, 'error: invalid email'), $conn);

        if (!UserHelper::checkPwFormat($password) || !UserHelper::verifyPwHash($conn, $email, $password))
            UserHelper::sendErrorResponseAndDie(new Message(-2, 'error: invalid password'), $conn);

        // create new token
        $token = UserHelper::createToken($email, $rememberMe);

        UserHelper::sendSuccessResponse($email, $token);
        $conn->close();
    }
}
