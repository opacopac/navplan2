<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;
use Navplan\Message;
use Navplan\Shared\DbService;


class UserLogin
{
    public static function autoLogin(array $input)
    {
        $conn = DbService::openDb();
        $token = UserHelper::escapeToken($conn, $input);
        $email = UserHelper::getAuthenticatedEmailOrNull($token);

        // verify token
        if ($email) {
            UserHelper::sendSuccessResponse($email, $token);
        } else {
            UserHelper::sendErrorResponse(new Message(-1, 'error: invalid token'));
        }

        $conn->close();
    }


    public static function login(array $input)
    {
        $conn = DbService::openDb();
        $email = UserHelper::escapeEmail($conn, $input);
        $password = UserHelper::escapePassword($conn, $input);
        $rememberMe = UserHelper::escapeRememberMe($input);

        // verify pw
        $msg = self::verifyPwHash($conn, $email, $password);
        if ($msg->code !== 0) {
            UserHelper::sendErrorResponse($msg);
            $conn->close();
            return;
        }

        // create new token
        $token = UserHelper::createToken($email, $rememberMe);

        UserHelper::sendSuccessResponse($email, $token);
        $conn->close();
    }


    private static function verifyPwHash(mysqli $conn, string $email, string $password): Message {
        $query = "SELECT pw_hash FROM users WHERE email='" . $email . "'";
        $result = DbService::execSingleResultQuery($conn, $query);

        if ($result->num_rows == 1)
        {
            $row = $result->fetch_assoc();
            $pw_hash_db = $row["pw_hash"];

            // compare pw hashes
            if ($pw_hash_db === crypt($password, $pw_hash_db))
                return new Message(0, 'success');
            else
                return new Message(-1, 'error: invalid password');
        }
        else
            return new Message(-2, 'error: invalid email');
    }
}
