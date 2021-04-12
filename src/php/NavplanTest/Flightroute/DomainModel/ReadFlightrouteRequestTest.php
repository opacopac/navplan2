<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DomainModel;

use Navplan\Flightroute\UseCase\ReadFlightroute\ReadFlightrouteRequest;
use Navplan\User\DomainService\TokenService;
use NavplanTest\MockNavplanDiContainer;
use PHPUnit\Framework\TestCase;


class ReadFlightrouteRequestTest extends TestCase {
    private MockNavplanDiContainer $config;
    private TokenService $tokenService;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->tokenService = $this->config->getTokenService();
    }

    public function test__construct() {
        $routeId = 123;
        $token = $this->tokenService->createToken("test@navplan.ch", FALSE);
        $request = new ReadFlightrouteRequest($routeId, $token);

        $this->assertNotNull($request);
        $this->assertEquals($routeId, $request->flightrouteId);
        $this->assertEquals($token, $request->token);
    }
}
