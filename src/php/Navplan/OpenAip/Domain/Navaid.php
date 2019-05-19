<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;


class Navaid {
    public $id;
    public $type;
    public $kuerzel;
    public $name;
    public $latitude;
    public $longitude;
    public $elevation;
    public $frequency;
    public $unit;
    public $declination;
    public $truenorth;


    public function __construct(
        int $id,
        string $type,
        string $kuerzel,
        string $name,
        float $latitude,
        float $longitude,
        float $elevation,
        string $frequency,
        string $unit,
        float $declination,
        bool $truenorth
    ) {
        $this->id = $id;
        $this->type = $type;
        $this->name = $name;
        $this->kuerzel = $kuerzel;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->elevation = $elevation;
        $this->frequency = $frequency;
        $this->unit = $unit;
        $this->declination = $declination;
        $this->truenorth = $truenorth;
    }
}
