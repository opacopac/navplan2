<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


class WnbEnvelope
{
    /**
     * @param string $name
     * @param WnbLonEnvelopeCoordinate[] $lonCoordinates
     * @param WnbLatEnvelopeCoordinate[] $latCoordinates
     */
    public function __construct(
        public string $name,
        public WnbEnvelopeAxisType $axisType,
        public array $lonCoordinates,
        public array $latCoordinates
    )
    {
    }
}
