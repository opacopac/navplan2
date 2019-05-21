<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;


class AirspaceAltitude {
    public $reference;
    public $height;
    public $unit;


    public function __construct(
        string $reference,
        int $height,
        string $unit
    ) {
        $this->reference = $reference;
        $this->height = $height;
        $this->unit = $unit;
    }
}
