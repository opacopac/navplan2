<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


class WnbEnvelope
{
    /**
     * @param string $name
     * @param WnbEnvelopeCoordinate[] $coordinates
     */
    public function __construct(
        public string $name,
        public WnbEnvelopeAxisType $axisType,
        public array $coordinates
    )
    {
    }
}
