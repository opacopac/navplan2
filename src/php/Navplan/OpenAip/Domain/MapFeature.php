<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;


class MapFeature {
    public $type;
    public $name;
    public $longitude;
    public $latitude;


    public function __construct(
        string $type,
        string $name,
        ?float $longitude,
        ?float $latitude
    ) {
        $this->type = $type;
        $this->name = $name;
        $this->longitude = $longitude;
        $this->latitude = $latitude;
    }
}
