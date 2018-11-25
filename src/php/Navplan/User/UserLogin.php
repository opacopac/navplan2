<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";


use Navplan\Message;
use Navplan\Shared\DbConnection;
use Navplan\Shared\DbException;


class UserLogin
{
    /**
     * @param DbConnection $conn
     * @param array $args
     * @return bool
     */
    public static function autoLogin(DbConnection $conn, array $args): bool
    {
        if (!$args["token"])
            return UserHelper::sendErrorResponse(new Message(-1, 'error: token is missing'), $conn);

        $token = UserHelper::escapeTrimInput($conn, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($conn, $token);

        if (!$email)
            return UserHelper::sendErrorResponse(new Message(-1, 'error: invalid token'), $conn);

        return UserHelper::sendSuccessResponse($email, $token);
    }


    /**
     * @param DbConnection $conn
     * @param array $args
     * @return bool
     * @throws DbException
     */
    public static function login(DbConnection $conn, array $args): bool
    {
        if (!$args["email"])
            return UserHelper::sendErrorResponse(new Message(-1, 'error: email missing'), $conn);

        if (!$args["password"])
            return UserHelper::sendErrorResponse(new Message(-2, 'error: password missing'), $conn);

        $email = UserHelper::escapeTrimInput($conn, $args["email"]);
        $password = UserHelper::escapeTrimInput($conn, $args["password"]);
        $rememberMe = ($args["rememberme"] === "1");

        if (!UserHelper::checkEmailFormat($email) || !UserHelper::checkEmailExists($conn, $email))
            return UserHelper::sendErrorResponse(new Message(-1, 'error: invalid email'), $conn);

        if (!UserHelper::checkPwFormat($password) || !UserHelper::verifyPwHash($conn, $email, $password))
            return UserHelper::sendErrorResponse(new Message(-2, 'error: invalid password'), $conn);

        // create new token
        $token = UserHelper::createToken($email, $rememberMe);

        return UserHelper::sendSuccessResponse($email, $token);
    }
}
