<?php declare(strict_types=1);

namespace Navplan\Track\Domain\Query;

use Navplan\Track\Domain\Model\Track;


interface ITrackByIdQuery
{
    function read(int $trackId, int $userId): ?Track;
}
