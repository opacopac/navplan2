<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use Exception;
use mysqli;
use Navplan\Message;
use ReallySimpleJWT\Token;


class UserHelper
{
    const JWT_SHORT_EXP_TIME_DAYS = 1;
    const JWT_LONG_EXP_TIME_DAYS = 90;


    public static function getAuthenticatedEmailOrNull($token): ?string {
        if ($token && self::validateToken($token))
            return self::getEmailFromToken($token);
        else
            return NULL;
    }


    public static function getAuthenticatedEmailOrDie($token): string {
        $email = self::getAuthenticatedEmailOrNull($token);
        if (!$email || $email === '')
            die('ERROR: invalid token');
        else
            return $email;
    }


    public static function validateToken(string $token): bool {
        global $jwt_secret;

        try {
            return Token::validate($token, $jwt_secret);
        } catch(Exception $ex) {
            return FALSE;
        }
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


    public static function checkEmailFormat($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email > 100))
            return FALSE;

        return TRUE;
    }


    public static function checkPwFormat(string $password): bool
    {
        if (strlen($password) < 6 || strlen($password) > 50)
            return FALSE;

        return TRUE;
    }


    public static function sendSuccessResponse(string $email, string $token) {
        $response = array(
            "resultcode" => 0,
            "message" => 'successful',
            "email" => $email,
            "token" => $token,
        );

        echo json_encode($response);
    }


    public static function sendErrorResponse(Message $message) {
        $response = array(
            "resultcode" => $message->code,
            "message" => $message->text
        );

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
