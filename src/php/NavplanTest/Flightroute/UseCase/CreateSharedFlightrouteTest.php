<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\UseCase;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use Navplan\Flightroute\Domain\CreateSharedFlightrouteRequest;
use Navplan\Flightroute\UseCase\CreateSharedFlightroute;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\FlightrouteConfigMock;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use PHPUnit\Framework\TestCase;


class CreateSharedFlightrouteTest extends TestCase {
    /* @var $config FlightrouteConfigMock */
    private $config;
    /* @var $flightrouteRepo MockFlightrouteRepo */
    private $flightrouteRepo;


    protected function setUp(): void {
        $this->config = new FlightrouteConfigMock();
        $this->flightrouteRepo = $this->config->getFlightrouteRepo();
    }


    public function test__create_new() {
        $flightroute = DummyFlightroute1::create();
        $this->flightrouteRepo->readByHashResult = NULL;
        $this->flightrouteRepo->addResult = $flightroute;

        $request = new CreateSharedFlightrouteRequest($flightroute);
        $response = (new CreateSharedFlightroute($this->config))->create($request);

        $this->assertEquals($flightroute, $response->flightroute);
        $this->assertNotNull($response->flightroute->shareId);
        $this->assertEquals($this->flightrouteRepo->readByHashArgs[0], $response->flightroute->hash);
        $this->assertNotNull($this->flightrouteRepo->readByHashArgs[0]);
        $this->assertEquals($flightroute, $this->flightrouteRepo->addArgs[0]);
        $this->assertEquals(NULL, $this->flightrouteRepo->addArgs[1]);
    }


    public function test__create_existing() {
        $flightroute = DummyFlightroute1::create();
        $this->flightrouteRepo->readByHashResult = $flightroute;

        $request = new CreateSharedFlightrouteRequest($flightroute);
        $response = (new CreateSharedFlightroute($this->config))->create($request);

        $this->assertEquals($flightroute, $response->flightroute);
        $this->assertNotNull($this->flightrouteRepo->readByHashArgs[0]);
        $this->assertEquals(NULL, $this->flightrouteRepo->addArgs);
    }
}
