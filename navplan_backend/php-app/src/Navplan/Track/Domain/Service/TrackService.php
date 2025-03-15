<?php declare(strict_types=1);

namespace Navplan\Track\Domain\Service;

use InvalidArgumentException;
use Navplan\Track\Domain\Command\ITrackDeleteCommand;
use Navplan\Track\Domain\Model\Track;
use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\Domain\Service\IUserService;


class TrackService implements ITrackService
{
    public function __construct(
        private ITokenService $tokenService,
        private ITrackRepo $trackRepo,
        private IUserService $userService,
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
        $email = $this->tokenService->getEmailFromToken($token);
        if (!$email) {
            throw new InvalidArgumentException('invalid user token');
        }

        return $this->trackRepo->readTrackList($email);
    }


    function readTrack(int $trackId, string $token): Track
    {
        $email = $this->tokenService->getEmailFromToken($token);
        if (!$email) {
            throw new InvalidArgumentException('invalid user token');
        }

        return $this->trackRepo->readTrack($trackId, $email);
    }


    function deleteTrack(int $trackId, string $token): bool
    {
        $user = $this->userService->getUserOrThrow($token);
        $this->trackDeleteCommand->delete($trackId, $user->id);

        return true; // TODO
    }
}
