<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


enum VehicleType: string
{
    case AIRPLANE = "AIRPLANE";
    case HELICOPTER = "HELICOPTER";
}
