<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Query;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Notam\Domain\Model\Notam;


interface INotamSearchByPositionQuery {
    /**
     * @param Position2d $position
     * @param int $minNotamTimestamp
     * @param int $maxNotamTimestamp
     * @return Notam[]
     */
    function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp): array;
}
