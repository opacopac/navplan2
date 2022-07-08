<?php declare(strict_types=1);

namespace Navplan\Enroute\DomainModel;


enum NavaidType: string {
    case DME = "DME";
    case TACAN = "TACAN";
    case NDB = "NDB";
    case VOR = "VOR";
    case VOR_DME = "VOR-DME";
    case VORTAC = "VORTAC";
    case DVOR = "DVOR";
    case DVOR_DME = "DVOR-DME";
    case DVORTAC = "DVORTAC";
}
