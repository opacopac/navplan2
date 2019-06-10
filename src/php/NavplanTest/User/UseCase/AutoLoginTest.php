<?php declare(strict_types=1);

namespace NavplanTest\Shared;

use Navplan\User\Domain\AutoLoginRequest;
use Navplan\User\UseCase\AutoLogin;
use Navplan\User\UseCase\TokenService;
use NavplanTest\MockNavplanConfig;
use PHPUnit\Framework\TestCase;


class AutoLoginTest extends TestCase {
    /* @var $config MockNavplanConfig */
    private $config;
    /* @var $tokenService TokenService */
    private $tokenService;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->tokenService = $this->config->getTokenService();
    }


    public function test_autoLogin_success_resultcode_is_0() {
        $token = $this->tokenService->createToken("test@navplan.ch", false);
        $request = new AutoLoginRequest($token);
        $response = (new AutoLogin($this->config))->autologin($request);

        $this->assertEquals(0, $response->code);
    }


    public function test_autoLogin_invalid_token_resultcode_is_n1() {
        $token = "invalid.dummy.token";
        $request = new AutoLoginRequest($token);
        $response = (new AutoLogin($this->config))->autologin($request);

        $this->assertEquals(-1, $response->code);
    }


    public function test_autoLogin_empty_token_resultcode_is_n1() {
        $token = "";
        $request = new AutoLoginRequest($token);
        $response = (new AutoLogin($this->config))->autologin($request);

        $this->assertEquals(-1, $response->code);
    }


    public function test_autoLogin_expired_token_resultcode_is_n1() {
        $expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $request = new AutoLoginRequest($expiredToken);
        $response = (new AutoLogin($this->config))->autologin($request);

        $this->assertEquals(-1, $response->code);
    }
}
