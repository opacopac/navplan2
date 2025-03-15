<?php declare(strict_types=1);

namespace Navplan\Track\Domain\Query;

use Navplan\Track\Domain\Model\Track;


interface ITrackListQuery
{
    /**
     * @param int $userId
     * @return Track[]
     */
    function readList(int $userId): array;
}
