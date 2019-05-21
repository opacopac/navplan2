<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;

use Navplan\Geometry\Domain\Position2d;


class Webcam {
    public $name;
    public $url;
    public $position;


    public function __construct(
        string $name,
        string $url,
        ?Position2d $position
    ) {
        $this->name = $name;
        $this->url = $url;
        $this->position = $position;
    }
}
