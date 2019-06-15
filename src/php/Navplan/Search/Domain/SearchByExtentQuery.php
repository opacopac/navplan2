<?php declare(strict_types=1);

namespace Navplan\Search\Domain;

use Navplan\Geometry\Domain\Extent;


class SearchByExtentQuery {
    public $searchItems;
    public $extent;
    public $zoom;
    public $minNotamTimestamp;
    public $maxNotamTimestamp;
    public $token;


    public function __construct(
        array $searchItems,
        Extent $extent,
        int $zoom,
        ?int $minNotamTimestamp,
        ?int $maxNotamTimestamp,
        ?string $token
    ) {
        $this->searchItems = $searchItems;
        $this->extent = $extent;
        $this->zoom = $zoom;
        $this->minNotamTimestamp = $minNotamTimestamp;
        $this->maxNotamTimestamp = $maxNotamTimestamp;
        $this->token = $token;
    }
}
