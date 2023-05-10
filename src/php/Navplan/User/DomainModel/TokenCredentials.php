<?php declare(strict_types=1);

namespace Navplan\User\DomainModel;


class TokenCredentials {
    public function __construct(
        public string $jwt_secret,
        public string $jwt_issuer
    ) {
    }
}
