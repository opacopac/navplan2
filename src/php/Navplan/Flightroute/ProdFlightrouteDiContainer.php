<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\Flightroute\DbRepo\DbFlightrouteRepo;
use Navplan\Flightroute\DomainService\FlightrouteService;
use Navplan\Flightroute\DomainService\IFlightrouteService;
use Navplan\System\DomainService\IDbService;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserRepo;


class ProdFlightrouteDiContainer implements IFlightrouteDiContainer {
    private IFlightrouteService $flightrouteService;


    public function __construct(
        private ITokenService $tokenService,
        private IUserRepo $userRepo,
        private IDbService $dbService
    ) {
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
