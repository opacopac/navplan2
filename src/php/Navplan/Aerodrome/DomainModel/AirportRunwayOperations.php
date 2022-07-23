<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DomainModel;


enum AirportRunwayOperations: string {
    case ACTIVE = "ACTIVE";
    case CLOSED = "CLOSED";
    case TEMPORARILY_CLOSED = "TEMPORARILY CLOSED";
}
