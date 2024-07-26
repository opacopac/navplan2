<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


class WnbEnvelopeCoordinate
{
    /**
     * @param string $name
     * @param WnbEnvelopeCoordinate[] $coordinates
     */
    public function __construct(
        public string $name,
        public array $coordinates
    )
    {
    }
}
