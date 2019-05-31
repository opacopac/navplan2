<?php declare(strict_types=1);

namespace Navplan\User\UseCase;


interface IUserRepo {
    function checkEmailExists(string $email): bool;

    function createUser(string $email, string $password);

    function updatePassword(string $email, string $newPassword);

    function verifyPwHash(string $email, string $password): bool;
}
