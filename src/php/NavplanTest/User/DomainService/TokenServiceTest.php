<?php declare(strict_types=1);

namespace NavplanTest\User\DomainService;

use Navplan\User\Domain\Service\TokenService;
use NavplanTest\MockNavplanDiContainer;
use PHPUnit\Framework\TestCase;


class TokenServiceTest extends TestCase {
    private TokenService $tokenService;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->tokenService = $config->getTokenService();
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
