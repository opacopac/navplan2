<?php declare(strict_types=1);

namespace NavplanTest\Shared;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use Navplan\User\Domain\AutoLoginRequest;
use Navplan\User\UseCase\AutoLogin;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\User\Mocks\MockUserConfig;
use PHPUnit\Framework\TestCase;


class AutoLoginTest extends TestCase {
    /* @var $config MockUserConfig */
    private $config;


    protected function setUp(): void {
        $this->config = new MockUserConfig();
    }


    public function test_autoLogin_success_resultcode_is_0() {
        $token = UserHelper::createToken("test@navplan.ch", false);
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
