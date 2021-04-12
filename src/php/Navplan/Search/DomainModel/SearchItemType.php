<?php declare(strict_types=1);

namespace Navplan\Search\DomainModel;


class SearchItemType {
    const AIRPORTS = 1;
    const NAVAIDS = 2;
    const AIRSPACES = 4;
    const REPORTINGPOINTS = 8;
    const USERPOINTS = 16;
    const WEBCAMS = 32;
    const GEONAMES = 64;
    const NOTAMS = 128;
}
