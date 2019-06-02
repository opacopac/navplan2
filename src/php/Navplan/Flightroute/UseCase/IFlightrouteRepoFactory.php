<?php declare(strict_types=1);

namespace Navplan\Flightroute\UseCase;


interface IFlightrouteRepoFactory {
    function createFlightrouteRepo(): IFlightrouteRepo;
}
