<?php declare(strict_types=1);

namespace Navplan\User\Domain\Service;


use Navplan\User\Domain\Model\User;

interface IUserService
{
    function getUserOrThrow(string $token): User;
}
