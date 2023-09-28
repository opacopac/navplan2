<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Model;


enum AirportRadioType: string {
    case AIRMET = "AIRMET";
    case APPROACH = "APPROACH";
    case APRON = "APRON";
    case ARRIVAL = "ARRIVAL";
    case ATIS = "ATIS";
    case AWOS = "AWOS";
    case CENTER = "CENTER";
    case CTAF = "CTAF";
    case DELIVERY = "DELIVERY";
    case DEPARTURE = "DEPARTURE";
    case FIS = "FIS";
    case GLIDING = "GLIDING";
    case GROUND = "GROUND";
    case ILS = "ILS"; // TODO: n/a in new openaip
    case INFO = "INFO";
    case LIGHTS = "LIGHTS";
    case MILITARY = "MILITARY"; // TODO: n/a in new openaip
    case MULTICOM = "MULTICOM";
    case OTHER = "OTHER";
    case RADAR = "RADAR";
    case RADIO = "RADIO";
    case TOWER = "TOWER";
    case UNICOM = "UNICOM";
    case VOLMET = "VOLMET";
}
