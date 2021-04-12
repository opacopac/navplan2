<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase\ReadFlightrouteList;


interface IReadFlightrouteListUc {
    public function read(ReadFlightrouteListRequest $request): ReadFlightrouteListResponse;
}
