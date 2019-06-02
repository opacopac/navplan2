<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;

use Navplan\Flightroute\Domain\CreateSharedFlightrouteRequest;
use Navplan\Flightroute\Domain\FlightrouteResponse;
use Navplan\Shared\StringNumberService;


class CreateSharedFlightroute {
    private $flightrouteRepo;
    private $userRepo;


    public function __construct(IFlightrouteConfig $config) {
        $this->flightrouteRepo = $config->getFlightrouteRepoFactory()->createFlightrouteRepo();
        $this->userRepo = $config->getUserRepoFactory()->createUserRepo();
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
        $request->flightroute->shareId = StringNumberService::createRandomString(10);
        $request->flightroute->hash = $hash;

        return new FlightrouteResponse(
            $this->flightrouteRepo->add($request->flightroute, NULL)
        );
    }
}
