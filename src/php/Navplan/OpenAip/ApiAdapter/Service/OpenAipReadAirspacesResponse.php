<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Service;

use Navplan\Enroute\DomainModel\Airspace;


class OpenAipReadAirspacesResponse {
    /**
     * @param int $page
     * @param int $nextPage
     * @param Airspace[] $items
     */
    public function __construct(
        public int $page,
        public int $nextPage,
        public array $items
    ) {
    }
}
