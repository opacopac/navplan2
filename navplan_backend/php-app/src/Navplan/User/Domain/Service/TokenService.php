<?php declare(strict_types=1);

namespace Navplan\User\Domain\Service;

use Exception;
use InvalidArgumentException;
use Navplan\User\Domain\Model\TokenCredentials;
use ReallySimpleJWT\Token;


class TokenService implements ITokenService {
    const JWT_SHORT_EXP_TIME_DAYS = 1;
    const JWT_LONG_EXP_TIME_DAYS = 90;
    const JWT_USER_ID_KEY = "user_id";


    public function __construct(private readonly TokenCredentials $tokenCredentials) {
    }


    public function createToken(string $email, bool $rememberMe): string {
        if (!$this->tokenCredentials->jwt_secret || !$this->tokenCredentials->jwt_issuer) {
            throw new InvalidArgumentException('jwt_secret, jwt_issuer missing');
        }

        $validDays = $rememberMe ? self::JWT_LONG_EXP_TIME_DAYS : self::JWT_SHORT_EXP_TIME_DAYS;
        $expiration = time() + $validDays * 24 * 3600;

        return Token::create($email, $this->tokenCredentials->jwt_secret, $expiration, $this->tokenCredentials->jwt_issuer);
    }


    public function validateToken(string $token): bool {
        try {
            return Token::validate($token, $this->tokenCredentials->jwt_secret);
        } catch(Exception $ex) {
            return FALSE;
        }
    }


    public function getEmailFromToken(string $token): ?string {
        if (!$token || !self::validateToken($token)) {
            return NULL;
        }

        $payload = Token::getPayload($token);

        return $payload[self::JWT_USER_ID_KEY];
    }
}
