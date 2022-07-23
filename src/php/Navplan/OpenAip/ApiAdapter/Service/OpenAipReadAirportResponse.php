<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Service;

use Navplan\Aerodrome\DomainModel\Airport;


class OpenAipReadAirportResponse {
    /**
     * @param int $page
     * @param int $nextPage
     * @param Airport[] $items
     */
    public function __construct(
        public int $page,
        public int $nextPage,
        public array $items
    ) {
    }
}
