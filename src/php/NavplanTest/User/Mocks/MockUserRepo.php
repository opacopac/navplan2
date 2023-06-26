<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\User\Domain\Model\User;
use Navplan\User\Domain\Service\IUserRepo;


class MockUserRepo implements IUserRepo {
    public array $checkEmailExistArgs;
    public bool $checkEmailExistsResult;
    public array $verifyPwHashArgs;
    public bool $verifyPwHashResult;
    public array $readUserArgs;
    public ?User $readUserResult;
    public array $updatePasswordArgs;
    public array $createUserArgs;


    public function checkEmailExists(string $email): bool {
        $this->checkEmailExistArgs = [$email];
        return $this->checkEmailExistsResult;
    }


    public function verifyPwHash(string $email, string $password): bool {
        $this->verifyPwHashArgs = [$email, $password];
        return $this->verifyPwHashResult;
    }


    public function readUser(string $email): ?User {
        $this->readUserArgs = [$email];
        return $this->readUserResult;
    }


    public function updatePassword(string $email, string $newPassword) {
        $this->updatePasswordArgs = [$email, $newPassword];
    }


    public function createUser(string $email, string $password) {
        $this->createUserArgs = [$email, $password];
    }
}
