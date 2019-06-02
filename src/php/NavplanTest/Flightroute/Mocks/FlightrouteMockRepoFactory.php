<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Mocks;

use Navplan\Flightroute\UseCase\IFlightrouteRepo;
use Navplan\Flightroute\UseCase\IFlightrouteRepoFactory;


class FlightrouteMockRepoFactory implements IFlightrouteRepoFactory {
    private $flightrouteRepo;


    public function __construct() {
        $this->flightrouteRepo = new FlightrouteMockRepo();
    }


    public function createFlightrouteRepo(): IFlightrouteRepo {
        return $this->flightrouteRepo;
    }
}
