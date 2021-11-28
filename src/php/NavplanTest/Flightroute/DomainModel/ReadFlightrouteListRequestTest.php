<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DomainModel;

use Navplan\Flightroute\UseCase\ReadFlightrouteList\RestReadFlightrouteListRequest;
use Navplan\User\DomainService\TokenService;
use NavplanTest\MockNavplanDiContainer;
use PHPUnit\Framework\TestCase;


class ReadFlightrouteListRequestTest extends TestCase {
    private MockNavplanDiContainer $config;
    private TokenService $tokenService;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->tokenService = $this->config->getTokenService();
    }



    public function test__construct() {
        $token = $this->tokenService->createToken("test@navplan.ch", FALSE);
        $request = new RestReadFlightrouteListRequest($token);

        $this->assertNotNull($request);
        $this->assertEquals($token, $request->token);
    }
}
