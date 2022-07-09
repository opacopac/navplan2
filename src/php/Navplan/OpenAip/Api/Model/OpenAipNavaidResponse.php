<?php declare(strict_types=1);

namespace Navplan\OpenAip\Api\Model;

use Navplan\Enroute\DomainModel\Navaid;


class OpenAipNavaidResponse {
    /**
     * @param int $page
     * @param int $nextPage
     * @param Navaid[] $items
     */
    public function __construct(
        public int $page,
        public int $nextPage,
        public array $items
    ) {
    }
}
