<?php declare(strict_types=1);

namespace Navplan\Track;

use Navplan\System\Domain\Service\IDbService;
use Navplan\Track\Domain\Service\ITrackService;
use Navplan\Track\Domain\Service\TrackService;
use Navplan\Track\Persistence\Service\DbTrackRepo;
use Navplan\User\Domain\Service\ITokenService;


class ProdTrackDiContainer implements ITrackDiContainer {
    private ITrackService $trackService;


    public function __construct(
        private ITokenService $tokenService,
        private IDbService $dbService
    ) {
    }


    function getTrackService(): ITrackService {
        if (!isset($this->trackService)) {
            $this->trackService = new TrackService(
                $this->tokenService,
                new DbTrackRepo($this->dbService)
            );
        }

        return $this->trackService;
    }

}
