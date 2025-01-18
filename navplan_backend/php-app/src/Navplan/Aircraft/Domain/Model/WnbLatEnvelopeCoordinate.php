<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;

use Navplan\Common\Domain\Model\Length;


class WnbLatEnvelopeCoordinate
{
    public function __construct(
        public Length $lonArmCg,
        public Length $latArmCg
    )
    {
    }
}
