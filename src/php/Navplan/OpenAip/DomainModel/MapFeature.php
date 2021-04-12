<?php declare(strict_types=1);

namespace Navplan\OpenAip\DomainModel;

use Navplan\Geometry\DomainModel\Position2d;


class MapFeature {
    public $type;
    public $name;
    public $position;


    public function __construct(
        string $type,
        string $name,
        ?Position2d $position
    ) {
        $this->type = $type;
        $this->name = $name;
        $this->position = $position;
    }
}
