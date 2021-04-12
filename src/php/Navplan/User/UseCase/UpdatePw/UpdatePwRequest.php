<?php declare(strict_types=1);

namespace Navplan\User\UseCase\UpdatePw;


class UpdatePwRequest {
    public function __construct(
        public string $token,
        public string $oldPassword,
        public string $newPassword
    ) {
    }
}
