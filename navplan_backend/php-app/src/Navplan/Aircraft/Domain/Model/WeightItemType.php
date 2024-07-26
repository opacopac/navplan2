<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


enum WeightItemType: string
{
    case AIRCRAFT = "AIRCRAFT";
    case FUEL = "FUEL";
    case PERSON = "PERSON";
    case BAGGAGE = "BAGGAGE";
    case CUSTOM = "CUSTOM";
}
