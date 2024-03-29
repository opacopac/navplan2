<?php declare(strict_types=1);

namespace Navplan\Webcam\Domain\Model;

use Navplan\Common\Domain\Model\Position2d;


class Webcam {
    public function __construct(
        public string $name,
        public string $url,
        public ?Position2d $position,
        public ?string $airportIcao
    ) {
    }
}
