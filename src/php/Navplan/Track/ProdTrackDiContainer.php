<?php declare(strict_types=1);

namespace Navplan\Track;

use Navplan\System\DomainService\IDbService;
use Navplan\Track\DbService\DbTrackRepo;
use Navplan\Track\DomainService\ITrackService;
use Navplan\Track\DomainService\TrackService;
use Navplan\User\DomainService\ITokenService;


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
