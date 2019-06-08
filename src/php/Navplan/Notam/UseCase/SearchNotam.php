<?php declare(strict_types=1);

namespace Navplan\Notam\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;


class SearchNotam {
    /* @var $notamRepo INotamRepo */
    private $notamRepo;


    public function __construct(INotamConfig $config) {
        $this->notamRepo = $config->getNotamRepo();
    }


    public function searchByExtent(Extent $extent, int $zoom, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        return $this->notamRepo->searchByExtent($extent, $zoom, $minNotamTimestamp, $maxNotamTimestamp);
    }


    public function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp, int $maxResults): array {
        return $this->notamRepo->searchByPosition($position, $minNotamTimestamp, $maxNotamTimestamp, $maxResults);
    }


    public function searchByIcao(array $icaoList, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        return $this->notamRepo->searchByIcao($icaoList, $minNotamTimestamp, $maxNotamTimestamp);
    }
}
