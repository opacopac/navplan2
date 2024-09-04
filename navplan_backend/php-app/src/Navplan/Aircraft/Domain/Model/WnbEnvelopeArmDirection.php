<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


enum WnbEnvelopeArmDirection: string
{
    case LONGITUDINAL = "LONGITUDINAL";
    case LATERAL = "LATERAL";
}
