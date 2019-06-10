<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Domain;

use Navplan\Flightroute\Domain\ReadFlightrouteListRequest;
use Navplan\User\UseCase\TokenService;
use NavplanTest\MockNavplanConfig;
use PHPUnit\Framework\TestCase;


class ReadFlightrouteListRequestTest extends TestCase {
    /* @var $config MockNavplanConfig */
    private $config;
    /* @var $tokenService TokenService */
    private $tokenService;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->tokenService = $this->config->getTokenService();
    }



    public function test__construct() {
        $token = $this->tokenService->createToken("test@navplan.ch", FALSE);
        $request = new ReadFlightrouteListRequest($token);

        $this->assertNotNull($request);
        $this->assertEquals($token, $request->token);
    }
}
