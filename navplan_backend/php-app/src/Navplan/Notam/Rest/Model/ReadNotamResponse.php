<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Model;


class ReadNotamResponse {
    public function __construct(public array $notams) {
    }


    public function toRest(): array {
        return array(
            'notams' => RestNotamConverter::toRestList($this->notams)
        );
    }
}
