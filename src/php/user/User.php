<?php

require_once __DIR__ . "/../services/DbService.php";
require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../helper.php";
require_once __DIR__ . "/autoloader.php";

use ReallySimpleJWT\Token;


class User
{
    const JWT_SHORT_EXP_TIME_DAYS = 1;
    const JWT_LONG_EXP_TIME_DAYS = 90;
    const RESPONSE_MESSAGE_TEXTS = array(
        0 => 'login successful',
        -1 => 'error: invalid password',
        -2 => 'error: invalid email',
        -3 => 'error: invalid token'
    );


    public static function login(array $input)
    {
        $conn = DbService::openDb();
        $email = self::escapeEmail($conn, $input);
        $password = self::escapePassword($conn, $input);
        $rememberMe = self::escapeRememberMe($input);

        // verify pw
        $code = self::verifyPwHash($conn, $email, $password);
        if ($code != 0) {
            self::sendResponse($code);
            $conn->close();
            return;
        }

        // create new token
        $token = self::createToken($email, $rememberMe);

        self::sendResponse($code, $email, $token);
        $conn->close();
    }


    public static function autoLogin(array $input)
    {
        $conn = DbService::openDb();
        $token = self::escapeToken($conn, $input);
        $email = self::getAuthenticatedEmailOrNull($token);

        // verify token
        if ($email) {
            self::sendResponse(0, $email, $token);
        } else {
            self::sendResponse(-3);
        }

        $conn->close();
    }


    public static function getAuthenticatedEmailOrNull($token): ?string {
        if ($token && self::validateToken($token))
            return self::getEmailFromToken($token);
        else
            return null;
    }


    private static function validateToken(string $token): bool {
        global $jwt_secret;

        return Token::validate($token, $jwt_secret);
    }


    private static function getEmailFromToken(string $token): string {
        $payload = json_decode(Token::getPayload($token));
        return $payload->user_id;
    }


    private static function createToken(string $email, bool $rememberMe): string {
        global $jwt_secret, $jwt_issuer;

        $validDays = $rememberMe ? self::JWT_LONG_EXP_TIME_DAYS : self::JWT_SHORT_EXP_TIME_DAYS;
        $expiration = time() + $validDays * 24 * 3600;

        return Token::getToken($email, $jwt_secret, $expiration, $jwt_issuer);
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
                return 0; // ok
            else
                return -1; // wrong pw
        }
        else
            return -2; // email not found
    }


    private static function escapeEmail(mysqli $conn, array $input): string {
        return mysqli_real_escape_string($conn, trim($input["email"]));
    }


    private static function escapePassword(mysqli $conn, array $input): string {
        return mysqli_real_escape_string($conn, trim($input["password"]));
    }


    private static function escapeRememberMe(array $input): bool {
        return ($input["rememberme"] === "1");
    }


    private static function escapeToken(mysqli $conn, array $input): string {
        return mysqli_real_escape_string($conn, trim($input["token"]));
    }


    private static function sendResponse(int $code, string $email = '', string $token = '') {
        $response = array(
            "resultcode" => $code,
            "message" => self::RESPONSE_MESSAGE_TEXTS[$code]
        );

        if ($email != '')
            $response["email"] = $email;

        if ($token != '')
            $response["token"] = $token;

        echo json_encode($response);
    }
}
