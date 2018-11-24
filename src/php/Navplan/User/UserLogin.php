<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Message;
use Navplan\Shared\DbConnection;
use Navplan\Shared\DbException;


class UserLogin
{
    public static function autoLogin(DbConnection $conn, array $args)
    {
        $token = UserHelper::escapeTrimInput($conn, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($conn, $token);

        if (!$email)
            UserHelper::sendErrorResponseAndDie(new Message(-1, 'error: invalid token'), $conn);

        UserHelper::sendSuccessResponse($email, $token);
    }


    /**
     * @param DbConnection $conn
     * @param array $args
     * @throws DbException
     */
    public static function login(DbConnection $conn, array $args)
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
