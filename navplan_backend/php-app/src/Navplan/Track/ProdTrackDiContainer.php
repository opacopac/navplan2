<?php declare(strict_types=1);

namespace Navplan\Track;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Track\Domain\Service\ITrackService;
use Navplan\Track\Domain\Service\TrackService;
use Navplan\Track\Persistence\Service\DbTrackRepo;
use Navplan\Track\Rest\Service\TrackController;
use Navplan\User\Domain\Service\ITokenService;


class ProdTrackDiContainer implements ITrackDiContainer {
    private IRestController $trackController;
    private ITrackService $trackService;


    public function __construct(
        private ITokenService $tokenService,
        private IDbService $dbService,
        private IHttpService $httpService,
    ) {
    }


    function getTrackController(): IRestController {
        if (!isset($this->trackController)) {
            $this->trackController = new TrackController(
                $this->httpService,
                $this->getTrackService()
            );
        }

        return $this->trackController;
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
