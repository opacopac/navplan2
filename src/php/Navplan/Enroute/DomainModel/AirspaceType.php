<?php declare(strict_types=1);

namespace Navplan\Enroute\DomainModel;


enum AirspaceType: string {
    case OTHER = "OTHER";
    case RESTRICTED = "RESTRICTED";
    case DANGER = "DANGER";
    case PROHIBITED = "PROHIBITED";
    case CTR = "CTR";
    case TMZ = "TMZ";
    case RMZ = "RMZ";
    case TMA = "TMA";
    case TRA = "TRA";
    case TSA = "TSA";
    case FIR = "FIR";
    case UIR = "UIR";
    case ADIZ = "ADIZ";
    case ATZ = "ATZ";
    case MATZ = "MATZ";
    case AIRWAY = "AIRWAY";
    case MTR = "MTR";
    case ALERT_AREA = "ALERT_AREA";
    case WARNING_AREA = "WARNING_AREA";
    case PROTECTED_AREA = "PROTECTED_AREA";
    case HTZ = "HTZ";
    case GLIDING = "GLIDING";
    case TRP = "TRP";
    case TIZ = "TIZ";
    case TIA = "TIA";
    case MTA = "MTA";
    case CTA = "CTAZ";
    case ACC = "ACC";
    case SPORT_RECREATION = "SPORT_RECREATION";
    case LOW_ALT_RESTRICTION = "LOW_ALT_RESTRICTION";
}
