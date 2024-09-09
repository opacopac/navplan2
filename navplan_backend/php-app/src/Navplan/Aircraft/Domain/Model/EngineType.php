<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


enum EngineType: string
{
    case ELECTRIC = "E";
    case JET = "J";
    case PISTON = "P";
    case ROCKET = "R";
    case TURBOPROP = "T";
    case UNKNONW = "U";
}
