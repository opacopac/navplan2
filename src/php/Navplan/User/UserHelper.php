<?php declare(strict_types=1);

namespace Navplan\User;

use Exception;
use InvalidArgumentException;
use Navplan\Message;
use Navplan\Shared\DbException;
use Navplan\Shared\IDbService;
use ReallySimpleJWT\Token;


class UserHelper {
    const JWT_SHORT_EXP_TIME_DAYS = 1;
    const JWT_LONG_EXP_TIME_DAYS = 90;


    // region handle input

    public static function escapeTrimInput(IDbService $dbService, string $value): string {
        return $dbService->escapeString(trim($value));
    }


    public static function checkEmailFormat(string $email) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 100)
            return FALSE;

        return TRUE;
    }


    public static function checkPwFormat(string $password): bool {
        if (strlen($password) < 6 || strlen($password) > 50)
            return FALSE;

        return TRUE;
    }

    // endregion


    // region token

    public static function createToken(string $email, bool $rememberMe): string {
        global $jwt_secret, $jwt_issuer;

        if (!$jwt_secret || !$jwt_issuer) {
            throw new InvalidArgumentException('jwt_secret, jwt_issuer missing');
        }

        $validDays = $rememberMe ? self::JWT_LONG_EXP_TIME_DAYS : self::JWT_SHORT_EXP_TIME_DAYS;
        $expiration = time() + $validDays * 24 * 3600;

        return Token::getToken($email, $jwt_secret, $expiration . "", $jwt_issuer);
    }


    public static function validateToken(string $token): bool {
        global $jwt_secret;

        try {
            return Token::validate($token, $jwt_secret);
        } catch(Exception $ex) {
            return FALSE;
        }
    }


    public static function getEmailFromToken(string $token): ?string {
        if (!self::validateToken($token)) {
            return NULL;
        }

        $payload = json_decode(Token::getPayload($token));
        return $payload->user_id;
    }


    public static function escapeAuthenticatedEmailOrDie(IDbService $dbService, ?string $token): string {
        $email = self::escapeAuthenticatedEmailOrNull($dbService, $token);
        if (!$email)
            throw new InvalidArgumentException('ERROR: invalid token');
        else
            return $email;
    }


    public static function escapeAuthenticatedEmailOrNull(IDbService $dbService, ?string $token): ?string {
        if (!$token || !self::validateToken($token))
            return NULL;

        $email = self::getEmailFromToken($token);
        if (!$email || $email === '')
            return NULL;

        return $dbService->escapeString($email);
    }

    // endregion


    // region check email / pw in DB

    /**
     * @param IDbService $dbService
     * @param string $email
     * @return bool
     * @throws DbException
     */
    public static function checkEmailExists(IDbService $dbService, string $email): bool {
        $query = "SELECT id FROM users WHERE email='" . $email . "'";
        $result = $dbService->execSingleResultQuery($query, TRUE, "error checking email");

        if ($result->getNumRows() == 1)
            return TRUE;
        else
            return FALSE;
    }


    public static function verifyPwHash(IDbService $dbService, string $email, string $password): bool {
        $query = "SELECT pw_hash FROM users WHERE email='" . $email . "'";
        $result = $dbService->execSingleResultQuery($query, TRUE, "error verifying pw hash");

        if ($result->getNumRows() == 1)
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

    public static function sendSuccessResponse(string $email, string $token): bool {
        $response = array(
            "resultcode" => 0,
            "message" => 'successful',
            "email" => $email,
            "token" => $token,
        );

        echo json_encode($response);

        return TRUE;
    }


    public static function sendErrorResponse(Message $message): bool {
        $response = array(
            "resultcode" => $message->code,
            "message" => $message->text
        );

        echo json_encode($response);

        return FALSE;
    }

    // endregion
}
