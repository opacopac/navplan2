<?php declare(strict_types=1);

namespace Navplan\OpenAip\DomainModel;


class SearchPointItemsResponse {
    public $airports;
    public $navaids;
    public $reportingPoints;
    public $webcams;


    public function __construct(
        array $airports,
        array $navaids,
        array $reportingPoints,
        array $webcams
    ) {
        $this->airports = $airports;
        $this->navaids = $navaids;
        $this->reportingPoints = $reportingPoints;
        $this->webcams = $webcams;
    }
}
