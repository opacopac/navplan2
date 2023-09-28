<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DomainModel;

use Navplan\Flightroute\UseCase\DeleteFlightroute\RestDeleteFlightrouteRequest;
use Navplan\User\Domain\Service\TokenService;
use NavplanTest\MockNavplanDiContainer;
use PHPUnit\Framework\TestCase;


class DeleteFlightrouteRequestTest extends TestCase {
    private MockNavplanDiContainer $config;
    private TokenService $tokenService;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->tokenService = $this->config->getTokenService();
    }


    public function test__construct() {
        $routeId = 123;
        $token = $this->tokenService->createToken("test@navplan.ch", FALSE);
        $request = new RestDeleteFlightrouteRequest($routeId, $token);

        $this->assertNotNull($request);
        $this->assertEquals($routeId, $request->flightrouteId);
        $this->assertEquals($token, $request->token);
    }
}
