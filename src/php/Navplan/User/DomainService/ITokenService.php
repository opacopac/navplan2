<?php declare(strict_types=1);

namespace Navplan\User\DomainService;


interface ITokenService {
    function createToken(string $email, bool $rememberMe): string;

    function validateToken(string $token): bool;

    function getEmailFromToken(string $token): ?string;
}
