<?php declare(strict_types=1);

namespace Navplan\Webcam\DomainModel;

use Navplan\Common\DomainModel\Position2d;


class Webcam {
    public function __construct(
        public string $name,
        public string $url,
        public ?Position2d $position,
        public ?string $airportIcao
    ) {
    }
}
