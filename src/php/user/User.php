<?php
require_once __DIR__ . "../services/DbService.php";
require_once __DIR__ . "../config.php";
require_once __DIR__ . "../helper.php";
require_once __DIR__ . "/ReallySimpleJWT/Token.php";

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
        $rememberMe = self::escapeRememberMe($conn, $input);

        // verify pw
        $code = self::verifyPwHash($conn, $email, $password);
        if ($code != 0) {
            self::sendResponse($code);
            $conn->close();
            return;
        }

        // create new token
        $token = self::createToken($email, $rememberMe);

        self::sendResponse($code, $token);
        $conn->close();
    }


    public static function autoLogin(array $input)
    {
        $conn = DbService::openDb();
        $token = self::escapeToken($conn, $input);

        // verify token
        if (self::validateToken($token)) {
            self::sendResponse(-3);
            $conn->close();
            return;
        } else {
            self::sendResponse(0, $token);
        }

        $conn->close();
    }


    public static function validateToken(string $token): bool {
        global $jwt_secret;

        return Token::validate($token, $jwt_secret);
    }


    public static function getEmailFromToken(string $token): string {
        $payload = json_decode(Token::getPayload($token));
        return $payload["sub"];
    }


    private static function createToken(string $email, bool $rememberMe): string {
        global $jwt_secret, $jwt_issuer;

        $validDays = $rememberMe ? self::JWT_LONG_EXP_TIME_DAYS : self::JWT_SHORT_EXP_TIME_DAYS;
        $expiration = (new DateTime())->add(new DateInterval("P" . $validDays . "D"));
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


    private static function escapeRememberMe(mysqli $conn, array $input): bool {
        return ($input["rememberme"] === "1");
    }


    private static function escapeToken(mysqli $conn, array $input): string {
        return checkEscapeAlphaNumeric($conn, trim($input["token"]), 10, 100);
    }


    private static function sendResponse(int $code, string $token = '') {
        $response = array(
            "resultcode" => $code,
            "message" => self::RESPONSE_MESSAGE_TEXTS[$code]
        );

        if ($token != '')
            $response["token"] = $token;

        echo json_encode($response);
    }
}
