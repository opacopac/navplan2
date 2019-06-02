<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;

use Navplan\Flightroute\Domain\FlightrouteResponse;
use Navplan\Flightroute\Domain\ReadSharedFlightrouteRequest;


class ReadSharedFlightroute {
    private $flightrouteRepo;


    public function __construct(IFlightrouteConfig $config) {
        $this->flightrouteRepo = $config->getFlightrouteRepoFactory()->createFlightrouteRepo();
    }


    public function read(ReadSharedFlightrouteRequest $request): FlightrouteResponse {
        return new FlightrouteResponse(
            $this->flightrouteRepo->readByShareId($request->shareId)
        );
    }
}
