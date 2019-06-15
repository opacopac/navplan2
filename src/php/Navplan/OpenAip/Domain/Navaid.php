<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;

use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\Position2d;


class Navaid {
    public $id;
    public $type;
    public $kuerzel;
    public $name;
    public $position;
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
        Position2d $position,
        Length $elevation,
        string $frequency,
        string $unit,
        float $declination,
        bool $truenorth
    ) {
        $this->id = $id;
        $this->type = $type;
        $this->name = $name;
        $this->kuerzel = $kuerzel;
        $this->position = $position;
        $this->elevation = $elevation;
        $this->frequency = $frequency;
        $this->unit = $unit;
        $this->declination = $declination;
        $this->truenorth = $truenorth;
    }
}
