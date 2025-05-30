<?php declare(strict_types=1);

namespace Navplan\Track\Domain\Service;

use Navplan\Track\Domain\Model\Track;


interface ITrackService
{
    /**
     * @param string $token
     * @return Track[]
     */
    function readTrackList(string $token): array;

    function readTrack(int $trackId, string $token): Track;

    function createTrack(Track $track, string $token): Track;

    function updateTrack(Track $track, string $token): Track;

    function deleteTrack(int $trackId, string $token): bool;
}
