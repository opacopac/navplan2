<?php declare(strict_types=1);

namespace Navplan\Track;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Track\Domain\Command\ITrackDeleteCommand;
use Navplan\Track\Domain\Service\ITrackService;
use Navplan\Track\Domain\Service\TrackService;
use Navplan\Track\Persistence\Command\DbTrackDeleteCommand;
use Navplan\Track\Persistence\Service\DbTrackRepo;
use Navplan\Track\Rest\Service\TrackController;
use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\Domain\Service\IUserService;


class ProdTrackDiContainer implements ITrackDiContainer {
    private IRestController $trackController;
    private ITrackService $trackService;
    private ITrackDeleteCommand $trackDeleteCommand;


    public function __construct(
        private ITokenService $tokenService,
        private IDbService $dbService,
        private IHttpService $httpService,
        private IUserService $userService,
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
                new DbTrackRepo($this->dbService),
                $this->userService,
                $this->getTrackDeleteCommand()
            );
        }

        return $this->trackService;
    }


    function getTrackDeleteCommand(): ITrackDeleteCommand {
        if (!isset($this->trackDeleteCommand)) {
            $this->trackDeleteCommand = new DbTrackDeleteCommand(
                $this->dbService
            );
        }

        return $this->trackDeleteCommand;
    }
}
