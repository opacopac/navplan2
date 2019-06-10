<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Domain;

use Navplan\Flightroute\Domain\DeleteFlightrouteRequest;
use Navplan\User\UseCase\TokenService;
use NavplanTest\MockNavplanConfig;
use PHPUnit\Framework\TestCase;


class DeleteFlightrouteRequestTest extends TestCase {
    /* @var $config MockNavplanConfig */
    private $config;
    /* @var $tokenService TokenService */
    private $tokenService;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->tokenService = $this->config->getTokenService();
    }


    public function test__construct() {
        $routeId = 123;
        $token = $this->tokenService->createToken("test@navplan.ch", FALSE);
        $request = new DeleteFlightrouteRequest($routeId, $token);

        $this->assertNotNull($request);
        $this->assertEquals($routeId, $request->flightrouteId);
        $this->assertEquals($token, $request->token);
    }
}
