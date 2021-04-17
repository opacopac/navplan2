<?php declare(strict_types=1);

namespace Navplan\Notam\DomainModel;


class ReadNotamResponse {
    public function __construct(public array $notams) {
    }
}
