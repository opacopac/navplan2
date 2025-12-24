<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Query;

use Navplan\Notam\Domain\Model\RawNotam;


interface IReadNotamChunkQuery
{
    /**
     * Loads a chunk of NOTAMs from the database starting after the given ID.
     *
     * @param int $lastNotamId The last NOTAM ID that was processed
     * @param int $maxCount Maximum number of NOTAMs to load in this chunk
     * @return RawNotam[]
     */
    function readNotamChunk(int $lastNotamId, int $maxCount): array;
}

