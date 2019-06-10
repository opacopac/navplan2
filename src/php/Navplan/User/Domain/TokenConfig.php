<?php declare(strict_types=1);

namespace Navplan\User\Domain;


class TokenConfig {
    public $jwt_secret;
    public $jwt_issuer;


    public function __construct(
        string $jwt_secret,
        string $jwt_issuer
    ) {
        $this->jwt_secret = $jwt_secret;
        $this->jwt_issuer = $jwt_issuer;
    }
}
