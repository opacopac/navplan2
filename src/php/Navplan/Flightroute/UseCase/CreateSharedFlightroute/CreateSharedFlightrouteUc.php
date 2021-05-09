<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\CreateSharedFlightroute;

use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\DomainService\IFlightrouteRepo;
use Navplan\Flightroute\UseCase\FlightrouteResponse;
use Navplan\User\DomainService\IUserRepo;


class CreateSharedFlightrouteUc implements ICreateSharedFlightrouteUc {
    public function __construct(
        private IFlightrouteRepo $flightrouteRepo,
        private IUserRepo $userRepo
    ) {
    }


    public function create(CreateSharedFlightrouteRequest $request): FlightrouteResponse {
        // check for duplicates
        $hash = hash("md5", serialize($request->flightroute));
        $existingFlightroute = $this->flightrouteRepo->readByHash($hash);
        if ($existingFlightroute !== NULL) {
            return new FlightrouteResponse($existingFlightroute);
        }

        // create shared flightroute
        $request->flightroute;
        $request->flightroute->shareId = StringNumberHelper::createRandomString(10);
        $request->flightroute->hash = $hash;

        return new FlightrouteResponse(
            $this->flightrouteRepo->add($request->flightroute, NULL)
        );
    }
}
