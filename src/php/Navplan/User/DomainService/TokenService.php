<?php declare(strict_types=1);

namespace Navplan\User\DomainService;

use Exception;
use InvalidArgumentException;
use ReallySimpleJWT\Token;


class TokenService implements ITokenService {
    const JWT_SHORT_EXP_TIME_DAYS = 1;
    const JWT_LONG_EXP_TIME_DAYS = 90;

    private $jwt_secret;
    private $jwt_issuer;


    public function __construct(string $jwt_secret, string $jwt_issuer) {
        $this->jwt_secret = $jwt_secret;
        $this->jwt_issuer = $jwt_issuer;
    }


    public function createToken(string $email, bool $rememberMe): string {
        if (!$this->jwt_secret || !$this->jwt_issuer) {
            throw new InvalidArgumentException('jwt_secret, jwt_issuer missing');
        }

        $validDays = $rememberMe ? self::JWT_LONG_EXP_TIME_DAYS : self::JWT_SHORT_EXP_TIME_DAYS;
        $expiration = time() + $validDays * 24 * 3600;

        return Token::create($email, $this->jwt_secret, $expiration, $this->jwt_issuer);
    }


    public function validateToken(string $token): bool {
        try {
            return Token::validate($token, $this->jwt_secret);
        } catch(Exception $ex) {
            return FALSE;
        }
    }


    public function getEmailFromToken(string $token): ?string {
        if (!$token || $token === "" || !self::validateToken($token)) {
            return NULL;
        }

        $payload = Token::getPayload($token, $this->jwt_secret);
        return $payload->user_id;
    }
}
