<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;


class SearchAreaItemsResponse {
    public $airspaces;
    public $reportingSectors;


    public function __construct(
        array $airspaces,
        array $reportingSectors
    ) {
        $this->airspaces = $airspaces;
        $this->reportingSectors = $reportingSectors;
    }
}
