<?php declare(strict_types=1);

namespace Navplan\User\UseCase\SendRegisterEmail;


class SendRegisterEmailRequest {
    public function __construct(public string $email) {
    }
}
