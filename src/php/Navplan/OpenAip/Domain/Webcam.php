<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;


class Webcam {
    public $name;
    public $url;
    public $latitude;
    public $longitude;


    public function __construct(
        string $name,
        string $url,
        ?float $latitude,
        ?float $longitude
    ) {
        $this->name = $name;
        $this->url = $url;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
    }
}
