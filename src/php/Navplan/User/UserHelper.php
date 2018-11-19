<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use Exception;
use mysqli;
use Navplan\Message;
use Navplan\Shared\DbService;
use ReallySimpleJWT\Token;


class UserHelper
{
    const JWT_SHORT_EXP_TIME_DAYS = 1;
    const JWT_LONG_EXP_TIME_DAYS = 90;


    // region handle input

    public static function escapeTrimInput(mysqli $conn, string $value): string
    {
        return mysqli_real_escape_string($conn, trim($value));
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

    // endregion


    // region token

    public static function createToken(string $email, bool $rememberMe): string
    {
        global $jwt_secret, $jwt_issuer;

        $validDays = $rememberMe ? self::JWT_LONG_EXP_TIME_DAYS : self::JWT_SHORT_EXP_TIME_DAYS;
        $expiration = time() + $validDays * 24 * 3600;

        return Token::getToken($email, $jwt_secret, $expiration, $jwt_issuer);
    }


    public static function validateToken(string $token): bool
    {
        global $jwt_secret;

        try {
            return Token::validate($token, $jwt_secret);
        } catch(Exception $ex) {
            return FALSE;
        }
    }


    public static function getEmailFromToken(string $token): string
    {
        $payload = json_decode(Token::getPayload($token));
        return $payload->user_id;
    }


    public static function escapeAuthenticatedEmailOrDie($conn, $token): string
    {
        $email = self::escapeAuthenticatedEmailOrNull($conn, $token);
        if (!$email)
            die('ERROR: invalid token');
        else
            return $email;
    }


    public static function escapeAuthenticatedEmailOrNull($conn, $token): ?string
    {
        if (!$token || !self::validateToken($token))
            return NULL;

        $email = self::getEmailFromToken($token);
        if (!$email || $email === '')
            return NULL;

        return mysqli_real_escape_string($conn, $email);
    }

    // endregion


    // region check email / pw in DB

    public static function checkEmailExists(mysqli $conn, string $email): bool
    {
        $query = "SELECT id FROM users WHERE email='" . $email . "'";
        $result = DbService::execSingleResultQuery($conn, $query);

        if ($result->num_rows == 1)
            return TRUE;
        else
            return FALSE;
    }


    public static function verifyPwHash(mysqli $conn, string $email, string $password): bool
    {
        $query = "SELECT pw_hash FROM users WHERE email='" . $email . "'";
        $result = DbService::execSingleResultQuery($conn, $query);

        if ($result->num_rows == 1)
        {
            $row = $result->fetch_assoc();
            $pw_hash_db = $row["pw_hash"];

            // compare pw hashes
            if ($pw_hash_db === crypt($password, $pw_hash_db))
                return TRUE;
            else
                return FALSE;
        }

        return FALSE;
    }

    // endregion


    // region send responses

    public static function sendSuccessResponse(string $email, string $token)
    {
        $response = array(
            "resultcode" => 0,
            "message" => 'successful',
            "email" => $email,
            "token" => $token,
        );

        echo json_encode($response);
    }


    public static function sendErrorResponseAndDie(Message $message, ?mysqli $conn = NULL)
    {
        $response = array(
            "resultcode" => $message->code,
            "message" => $message->text
        );

        echo json_encode($response);

        if ($conn)
            $conn->close();

        die();
    }

    // endregion
}
