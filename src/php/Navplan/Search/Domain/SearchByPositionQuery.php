<?php declare(strict_types=1);

namespace Navplan\Search\Domain;

use Navplan\Geometry\Domain\Position2d;


class SearchByPositionQuery {
    public $searchItems;
    public $position;
    public $maxRadius_deg;
    public $token;


    public function __construct(
        array $searchItems,
        Position2d $position,
        float $maxRadius_deg,
        ?string $token
    ) {
        $this->searchItems = $searchItems;
        $this->position = $position;
        $this->maxRadius_deg = $maxRadius_deg;
        $this->token = $token;
    }
}
