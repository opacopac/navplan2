<?php declare(strict_types=1);

namespace Navplan\Notam\Domain;


class ReadNotamResponse {
    public $notams;


    public function __construct(
        array $notams
    ) {
        $this->notams = $notams;
    }
}
