<?php declare(strict_types=1);

namespace Navplan\Track\Domain\Service;

use InvalidArgumentException;
use Navplan\Track\Domain\Model\Track;
use Navplan\User\Domain\Service\ITokenService;


class TrackService implements ITrackService {
    public function __construct(
        private ITokenService $tokenService,
        private ITrackRepo $trackRepo
    ) {
    }


    /**
     * @param string $token
     * @return Track[]
     */
    function readTrackList(string $token): array {
        $email = $this->tokenService->getEmailFromToken($token);
        if (!$email) {
            throw new InvalidArgumentException('invalid user token');
        }

        return $this->trackRepo->readTrackList($email);
    }


    function readTrack(int $trackId, string $token): Track {
        $email = $this->tokenService->getEmailFromToken($token);
        if (!$email) {
            throw new InvalidArgumentException('invalid user token');
        }

        return $this->trackRepo->readTrack($trackId, $email);
    }
}
