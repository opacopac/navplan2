<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Flightroute\Domain\Service\FlightrouteService;
use Navplan\Flightroute\Domain\Service\IFlightrouteService;
use Navplan\Flightroute\Persistence\Repo\DbFlightrouteRepo;
use Navplan\Flightroute\Rest\Controller\FlightrouteController;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\IHttpService;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserRepo;


class ProdFlightrouteDiContainer implements IFlightrouteDiContainer {
    private IRestController $flightrouteController;
    private IFlightrouteService $flightrouteService;


    public function __construct(
        private ITokenService $tokenService,
        private IUserRepo $userRepo,
        private IDbService $dbService,
        private IHttpService $httpService
    ) {
    }


    public function getFlightrouteController(): IRestController {
        if (!isset($this->flightrouteController)) {
            $this->flightrouteController = new FlightrouteController(
                $this->getFLightrouteService(),
                $this->httpService
            );
        }

        return $this->flightrouteController;
    }


    public function getFLightrouteService(): IFlightrouteService {
        if (!isset($this->flightrouteService)) {
            $this->flightrouteService = new FlightrouteService(
                $this->tokenService,
                $this->userRepo,
                new DbFlightrouteRepo($this->dbService)
            );
        }

        return $this->flightrouteService;
    }
}
