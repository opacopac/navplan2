<?php declare(strict_types=1);

namespace Navplan\Search\Domain;


class SearchResult {
    public $airports;
    public $navaids;
    public $airspaces;
    public $reportingPoints;
    public $userPoints;
    public $webcams;
    public $geonames;
    public $notams;


    public function __construct(
        array $airports,
        array $navaids,
        array $airspaces,
        array $reportingPoints,
        array $userPoints,
        array $webcams,
        array $geonames,
        array $notams
    ) {
        $this->airports = $airports;
        $this->navaids = $navaids;
        $this->airspaces = $airspaces;
        $this->reportingPoints = $reportingPoints;
        $this->userPoints = $userPoints;
        $this->webcams = $webcams;
        $this->geonames = $geonames;
        $this->notams = $notams;
    }
}
