<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\UseCase;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use Navplan\Flightroute\UseCase\ReadSharedFlightroute\ReadSharedFlightrouteRequest;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use NavplanTest\MockNavplanDiContainer;
use PHPUnit\Framework\TestCase;


class ReadSharedFlightrouteTest extends TestCase {
    private MockNavplanDiContainer $config;
    private MockFlightrouteRepo $flightrouteRepo;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->flightrouteRepo = $this->config->flightrouteRepo;
    }


    public function test__readShared() {
        $flightroute = DummyFlightroute1::create();
        $shareId = "12345";
        $this->flightrouteRepo->readSharedResult = $flightroute;

        $request = new ReadSharedFlightrouteRequest($shareId);
        $response = $this->config->getReadSharedFlightrouteUc()->read($request);

        $this->assertEquals($flightroute, $response->flightroute);
        $this->assertEquals($shareId, $this->flightrouteRepo->readSharedArgs[0]);
    }


    public function test__readShared_not_found() {
        $flightroute = NULL;
        $shareId = "12345";
        $this->flightrouteRepo->readSharedResult = $flightroute;

        $request = new ReadSharedFlightrouteRequest($shareId);
        $response = $this->config->getReadSharedFlightrouteUc()->read($request);

        $this->assertEquals($flightroute, $response->flightroute);
        $this->assertEquals($shareId, $this->flightrouteRepo->readSharedArgs[0]);
    }
}
