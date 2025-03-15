<?php declare(strict_types=1);

namespace Navplan\Track\Domain\Service;

use Navplan\Track\Domain\Command\ITrackDeleteCommand;
use Navplan\Track\Domain\Model\Track;
use Navplan\Track\Domain\Query\ITrackByIdQuery;
use Navplan\Track\Domain\Query\ITrackListQuery;
use Navplan\User\Domain\Service\IUserService;


class TrackService implements ITrackService
{
    public function __construct(
        private IUserService $userService,
        private ITrackListQuery $trackListQuery,
        private ITrackByIdQuery $trackByIdQuery,
        private ITrackDeleteCommand $trackDeleteCommand
    )
    {
    }


    /**
     * @param string $token
     * @return Track[]
     */
    function readTrackList(string $token): array
    {
        $user = $this->userService->getUserOrThrow($token);
        return $this->trackListQuery->readList($user->id);
    }


    function readTrack(int $trackId, string $token): Track
    {
        $user = $this->userService->getUserOrThrow($token);
        return $this->trackByIdQuery->read($trackId, $user->id);
    }


    function deleteTrack(int $trackId, string $token): bool
    {
        $user = $this->userService->getUserOrThrow($token);
        $this->trackDeleteCommand->delete($trackId, $user->id);

        return true; // TODO
    }
}
