<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\ReadSharedFlightroute;

use Navplan\Flightroute\DomainService\IFlightrouteRepo;
use Navplan\Flightroute\UseCase\FlightrouteResponse;


class ReadSharedFlightrouteUc implements IReadSharedFlightrouteUc {
    public function __construct(private IFlightrouteRepo $flightrouteRepo) {
    }


    public function read(ReadSharedFlightrouteRequest $request): FlightrouteResponse {
        return new FlightrouteResponse(
            $this->flightrouteRepo->readByShareId($request->shareId)
        );
    }
}
