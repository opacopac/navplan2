<?php declare(strict_types=1);

namespace Navplan\User\Domain;


class SendLostPwRequest {
    public $email;


    public function __construct(string $email) {
        $this->email = $email;
    }
}
