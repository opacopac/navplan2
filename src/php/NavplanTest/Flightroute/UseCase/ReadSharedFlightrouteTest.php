<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\UseCase;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use Navplan\Flightroute\Domain\ReadSharedFlightrouteRequest;
use Navplan\Flightroute\UseCase\ReadSharedFlightroute;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use NavplanTest\MockNavplanConfig;
use PHPUnit\Framework\TestCase;


class ReadSharedFlightrouteTest extends TestCase {
    /* @var $config MockNavplanConfig */
    private $config;
    /* @var $flightrouteRepo MockFlightrouteRepo */
    private $flightrouteRepo;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->flightrouteRepo = $this->config->getFlightrouteRepo();
    }


    public function test__readShared() {
        $flightroute = DummyFlightroute1::create();
        $shareId = "12345";
        $this->flightrouteRepo->readSharedResult = $flightroute;

        $request = new ReadSharedFlightrouteRequest($shareId);
        $response = (new ReadSharedFlightroute($this->config))->read($request);

        $this->assertEquals($flightroute, $response->flightroute);
        $this->assertEquals($shareId, $this->flightrouteRepo->readSharedArgs[0]);
    }


    public function test__readShared_not_found() {
        $flightroute = NULL;
        $shareId = "12345";
        $this->flightrouteRepo->readSharedResult = $flightroute;

        $request = new ReadSharedFlightrouteRequest($shareId);
        $response = (new ReadSharedFlightroute($this->config))->read($request);

        $this->assertEquals($flightroute, $response->flightroute);
        $this->assertEquals($shareId, $this->flightrouteRepo->readSharedArgs[0]);
    }
}
