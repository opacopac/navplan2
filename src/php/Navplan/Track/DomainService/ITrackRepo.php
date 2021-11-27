<?php declare(strict_types=1);

namespace Navplan\Track\DomainService;

use Navplan\Track\DomainModel\Track;


interface ITrackRepo {
    /**
     * @param string $email
     * @return Track[]
     */
    function readTrackList(string $email): array;

    function readTrack(int $trackId, string $email): Track;

    function createTrack(Track $track, string $email): bool;

    function updateTrack(Track $track, string $email): bool;

    function deleteTrack(string $trackId, string $email): bool;
}
