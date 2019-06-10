<?php declare(strict_types=1);

namespace NavplanTest\User\Shared;

use Navplan\User\Domain\User;
use Navplan\User\UseCase\TokenService;
use NavplanTest\MockNavplanConfig;
use PHPUnit\Framework\TestCase;


class TokenHelperTest extends TestCase {
    /* @var $tokenService TokenService */
    private $tokenService;


    protected function setUp(): void {
        $config = new MockNavplanConfig();
        $this->tokenService = $config->getTokenService();
    }


    public function test_checkEmailFormat() {
        $email1 = "test@navplan.ch";
        $email2 = "test";
        $email3 = "test@01234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890";

        $this->assertTrue(User::checkEmailFormat($email1));
        $this->assertFalse(User::checkEmailFormat($email2));
        $this->assertFalse(User::checkEmailFormat($email3));
    }


    public function test_checkPwFormat() {
        $pw1 = "123456";
        $pw2 = "123";
        $pw3 = "012345678901234567890123456789012345678901234567890123456789";

        $this->assertTrue(User::checkPwFormat($pw1));
        $this->assertFalse(User::checkPwFormat($pw2));
        $this->assertFalse(User::checkPwFormat($pw3));
    }


    public function test_createToken() {
        $email = "test@navplan.ch";
        $token1 = $this->tokenService->createToken($email, FALSE);
        $token2 = $this->tokenService->createToken($email, TRUE);
        $emailFromToken1 = $this->tokenService->getEmailFromToken($token1);
        $emailFromToken2 = $this->tokenService->getEmailFromToken($token2);

        $this->assertEquals($email, $emailFromToken1);
        $this->assertEquals($email, $emailFromToken2);
        // TODO: check validity duration
    }


    public function test_validateToken() {
        $email = "test@navplan.ch";
        $token1 = $this->tokenService->createToken($email, FALSE);
        $token2 = "xxx" . $token1;
        $token3 = "";

        $this->assertTrue($this->tokenService->validateToken($token1));
        $this->assertFalse($this->tokenService->validateToken($token2));
        $this->assertFalse($this->tokenService->validateToken($token3));
    }


    public function test_getEmailFromToken() {
        $email = "test@navplan.ch";
        $token1 = $this->tokenService->createToken($email, FALSE);
        $token2 = "xxx.yyy.zzz";
        $token3 = "";

        $this->assertEquals($email, $this->tokenService->getEmailFromToken($token1));
        $this->assertEquals(NULL, $this->tokenService->getEmailFromToken($token2));
        $this->assertEquals(NULL, $this->tokenService->getEmailFromToken($token3));
    }
}
