<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;
use Navplan\Shared\DbService;


class UserLogin
{
    const RESPONSE_MESSAGE_TEXTS = array(
        10 => 'login successful',
        11 => 'activation email sent',
        12 => 'registration successful',
        91 => 'error: invalid password',
        92 => 'error: invalid email',
        93 => 'error: invalid token',
        94 => 'error: invalid email format',
        95 => 'error: invalid password format',
        96 => 'error: email already exists'
    );


    public static function autoLogin(array $input)
    {
        $conn = DbService::openDb();
        $token = UserHelper::escapeToken($conn, $input);
        $email = UserHelper::getAuthenticatedEmailOrNull($token);

        // verify token
        if ($email) {
            UserHelper::sendResponse(10, $email, $token);
        } else {
            UserHelper::sendResponse(93);
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
        $code = self::verifyPwHash($conn, $email, $password);
        if ($code != 10) {
            UserHelper::sendResponse($code);
            $conn->close();
            return;
        }

        // create new token
        $token = UserHelper::createToken($email, $rememberMe);

        UserHelper::sendResponse($code, $email, $token);
        $conn->close();
    }


    private static function verifyPwHash(mysqli $conn, string $email, string $password): int {
        $query = "SELECT pw_hash FROM users WHERE email='" . $email . "'";
        $result = DbService::execSingleResultQuery($conn, $query);

        if ($result->num_rows == 1)
        {
            $row = $result->fetch_assoc();
            $pw_hash_db = $row["pw_hash"];

            // compare pw hashes
            if ($pw_hash_db === crypt($password, $pw_hash_db))
                return 10; // ok
            else
                return 91; // wrong pw
        }
        else
            return 92; // email not found
    }
}
