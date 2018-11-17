<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use ReallySimpleJWT\Token;
use mysqli;


class UserHelper
{
    const JWT_SHORT_EXP_TIME_DAYS = 1;
    const JWT_LONG_EXP_TIME_DAYS = 90;
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


    public static function getAuthenticatedEmailOrNull($token): ?string {
        if ($token && self::validateToken($token))
            return self::getEmailFromToken($token);
        else
            return null;
    }


    public static function validateToken(string $token): bool {
        global $jwt_secret;

        return Token::validate($token, $jwt_secret);
    }


    public static function getEmailFromToken(string $token): string {
        $payload = json_decode(Token::getPayload($token));
        return $payload->user_id;
    }


    public static function createToken(string $email, bool $rememberMe): string {
        global $jwt_secret, $jwt_issuer;

        $validDays = $rememberMe ? self::JWT_LONG_EXP_TIME_DAYS : self::JWT_SHORT_EXP_TIME_DAYS;
        $expiration = time() + $validDays * 24 * 3600;

        return Token::getToken($email, $jwt_secret, $expiration, $jwt_issuer);
    }


    public static function escapeEmail(mysqli $conn, array $input): string {
        return mysqli_real_escape_string($conn, trim($input["email"]));
    }


    public static function escapePassword(mysqli $conn, array $input): string {
        return mysqli_real_escape_string($conn, trim($input["password"]));
    }


    public static function escapeRememberMe(array $input): bool {
        return ($input["rememberme"] === "1");
    }


    public static function escapeToken(mysqli $conn, array $input): string {
        return mysqli_real_escape_string($conn, trim($input["token"]));
    }


    public static function sendResponse(int $code, string $email = '', string $token = '') {
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


    public static function sendEmail(string $emailTo, string $subject, string $message): bool {
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: info@navplan.ch' . "\r\n";
        $headers .= 'Reply-To: info@navplan.ch' . "\r\n";

        return mail($emailTo, $subject, $message, $headers);
    }
}
