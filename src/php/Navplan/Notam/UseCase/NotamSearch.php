<?php declare(strict_types=1);

namespace Navplan\Notam\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Notam\IRepo\INotamRepo;


class NotamSearch {
    private $repo;


    private function getRepo(): INotamRepo {
        return $this->repo;
    }


    public function __construct(INotamRepo $repo) {
        $this->repo = $repo;
    }


    public function searchByExtent(Extent $extent, int $zoom, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        return $this->getRepo()->searchByExtent($extent, $zoom, $minNotamTimestamp, $maxNotamTimestamp);
    }


    public function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp, int $maxResults): array {
        return $this->getRepo()->searchByPosition($position, $minNotamTimestamp, $maxNotamTimestamp, $maxResults);
    }


    public function searchByIcao(array $icaoList, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        return $this->getRepo()->searchByIcao($icaoList, $minNotamTimestamp, $maxNotamTimestamp);
    }
}
