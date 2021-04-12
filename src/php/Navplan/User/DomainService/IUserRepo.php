<?php declare(strict_types=1);

namespace Navplan\User\DomainService;

use Navplan\User\DomainModel\User;


interface IUserRepo {
    function checkEmailExists(string $email): bool;

    function createUser(string $email, string $password); // TODO: return user

    function readUser(string $email): ?User;

    function updatePassword(string $email, string $newPassword); // TODO: return user

    function verifyPwHash(string $email, string $password): bool;
}
