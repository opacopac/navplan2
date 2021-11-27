<?php declare(strict_types=1);

namespace Navplan\Track\DomainService;

use Navplan\Track\DomainModel\Track;


interface ITrackService {
    /**
     * @param string $token
     * @return Track[]
     */
    function readTrackList(string $token): array;

    function readTrack(int $trackId, string $token): Track;
}
