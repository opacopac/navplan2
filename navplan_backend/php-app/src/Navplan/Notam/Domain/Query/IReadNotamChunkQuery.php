<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Query;

use Navplan\Notam\Domain\Model\Notam;


interface IReadNotamChunkQuery {
    /**
     * Loads a chunk of NOTAMs from the database starting after the given ID.
     *
     * @param int $lastNotamId The last NOTAM ID that was processed
     * @param int $maxCount Maximum number of NOTAMs to load in this chunk
     * @return Notam[]
     */
    function readNotamChunk(int $lastNotamId, int $maxCount): array;
}

