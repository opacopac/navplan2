<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


enum FuelType: string
{
    case MOGAS = "MOGAS";
    case AVGAS = "AVGAS";
}
