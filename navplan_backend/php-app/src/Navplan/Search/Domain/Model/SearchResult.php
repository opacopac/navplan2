<?php declare(strict_types=1);

namespace Navplan\Search\Domain\Model;


class SearchResult {
    public function __construct(
        public array $airports,
        public array $navaids,
        public array $airspaces,
        public array $reportingPoints,
        public array $userPoints,
        public array $webcams,
        public array $geonames,
        public array $notams,
        public array $circuits
    ) {
    }
}
