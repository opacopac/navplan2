<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;


class Airport {
    public $id;
    public $type;
    public $name;
    public $icao;
    public $country;
    public $latitude;
    public $longitude;
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
        float $latitude,
        float $longitude,
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
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->elevation = $elevation;
        $this->runways = $runways;
        $this->radios = $radios;
        $this->webcams = $webcams;
        $this->charts = $charts;
        $this->mapfeatures = $mapfeatures;
    }
}
