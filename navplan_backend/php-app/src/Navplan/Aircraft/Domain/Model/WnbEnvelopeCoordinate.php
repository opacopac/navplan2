<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Weight;


class WnbEnvelopeCoordinate
{
    public function __construct(
        public Weight $weight,
        public Length $armCg
    )
    {
    }
}
