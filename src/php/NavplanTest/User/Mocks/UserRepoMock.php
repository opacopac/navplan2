<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\User\UseCase\IUserRepo;


class UserRepoMock implements IUserRepo {
    /* @var $checkEmailExistsResult bool */
    public $checkEmailExistsResult;
    /* @var $verifyPwHashResult bool */
    public $verifyPwHashResult;
    /* @var $checkEmailExistArgs array */
    public $checkEmailExistArgs;
    /* @var $verifyPwHashArgs array */
    public $verifyPwHashArgs;
    /* @var $updatePasswordArgs array */
    public $updatePasswordArgs;
    /* @var $createUserArgs bool */
    public $createUserArgs;


    public function checkEmailExists(string $email): bool {
        $this->checkEmailExistArgs = [$email];
        return $this->checkEmailExistsResult;
    }


    public function verifyPwHash(string $email, string $password): bool {
        $this->verifyPwHashArgs = [$email, $password];
        return $this->verifyPwHashResult;
    }


    public function updatePassword(string $email, string $newPassword) {
        $this->updatePasswordArgs = [$email, $newPassword];
    }


    public function createUser(string $email, string $password) {
        $this->createUserArgs = [$email, $password];
    }
}
