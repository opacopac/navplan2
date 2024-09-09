<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


class AircraftTypeDesignator
{
    public function __construct(
        public int $id,
        public string $designator,
        public string $model,
        public string $manufacturer,
        public AircraftType $ac_type,
        public EngineType $engine_type,
        public int $engine_count,
        public string $wtc
    )
    {
    }
}
