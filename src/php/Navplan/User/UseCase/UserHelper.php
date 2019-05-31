<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Exception;
use InvalidArgumentException;
use ReallySimpleJWT\Token;


class UserHelper {
    const JWT_SHORT_EXP_TIME_DAYS = 1;
    const JWT_LONG_EXP_TIME_DAYS = 90;


    // region handle input

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
        if (!$token || $token === "" || !self::validateToken($token)) {
            return NULL;
        }

        $payload = json_decode(Token::getPayload($token));
        return $payload->user_id;
    }


    // endregion
}
