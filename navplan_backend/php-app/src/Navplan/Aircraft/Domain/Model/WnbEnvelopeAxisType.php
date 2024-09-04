<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


enum WnbEnvelopeAxisType: string
{
    case WEIGHT_ARM = "WEIGHT_ARM";
    case WEIGHT_MOMENT = "WEIGHT_MOMENT";
}
