<?php declare(strict_types=1);

namespace Navplan\User\DomainModel;


class TokenConfig {
    public function __construct(
        public string $jwt_secret,
        public string $jwt_issuer
    ) {
    }
}
