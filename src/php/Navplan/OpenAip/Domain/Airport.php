<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;


use Navplan\Geometry\Domain\Position2d;

class Airport {
    public $id;
    public $type;
    public $name;
    public $icao;
    public $country;
    public $position;
    public $elevation;
    public $runways;
    public $radios;
    public $webcams;
    public $charts;
    public $mapfeatures;


    public function __construct(
        int $id,
        string $type,
        string $name,
        string $icao,
        string $country,
        Position2d $position,
        float $elevation,
        array $runways,
        array $radios,
        array $webcams,
        array $charts,
        array $mapfeatures
    ) {
        $this->id = $id;
        $this->type = $type;
        $this->name = $name;
        $this->icao = $icao;
        $this->country = $country;
        $this->position = $position;
        $this->elevation = $elevation;
        $this->runways = $runways;
        $this->radios = $radios;
        $this->webcams = $webcams;
        $this->charts = $charts;
        $this->mapfeatures = $mapfeatures;
    }
}
