<?php declare(strict_types=1);

namespace NavplanTest\User\Shared;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use Navplan\User\UseCase\UserHelper;
use PHPUnit\Framework\TestCase;


class UserHelperTest extends TestCase {
    protected function setUp(): void {
    }


    public function test_checkEmailFormat() {
        $email1 = "test@navplan.ch";
        $email2 = "test";
        $email3 = "test@01234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890";

        $this->assertTrue(UserHelper::checkEmailFormat($email1));
        $this->assertFalse(UserHelper::checkEmailFormat($email2));
        $this->assertFalse(UserHelper::checkEmailFormat($email3));
    }


    public function test_checkPwFormat() {
        $pw1 = "123456";
        $pw2 = "123";
        $pw3 = "012345678901234567890123456789012345678901234567890123456789";

        $this->assertTrue(UserHelper::checkPwFormat($pw1));
        $this->assertFalse(UserHelper::checkPwFormat($pw2));
        $this->assertFalse(UserHelper::checkPwFormat($pw3));
    }


    public function test_createToken() {
        $email = "test@navplan.ch";
        $token1 = UserHelper::createToken($email, FALSE);
        $token2 = UserHelper::createToken($email, TRUE);
        $emailFromToken1 = UserHelper::getEmailFromToken($token1);
        $emailFromToken2 = UserHelper::getEmailFromToken($token2);

        $this->assertEquals($email, $emailFromToken1);
        $this->assertEquals($email, $emailFromToken2);
        // TODO: check validity duration
    }


    public function test_validateToken() {
        $email = "test@navplan.ch";
        $token1 = UserHelper::createToken($email, FALSE);
        $token2 = "xxx" . $token1;
        $token3 = "";

        $this->assertTrue(UserHelper::validateToken($token1));
        $this->assertFalse(UserHelper::validateToken($token2));
        $this->assertFalse(UserHelper::validateToken($token3));
    }


    public function test_getEmailFromToken() {
        $email = "test@navplan.ch";
        $token1 = UserHelper::createToken($email, FALSE);
        $token2 = "xxx.yyy.zzz";
        $token3 = "";

        $this->assertEquals($email, UserHelper::getEmailFromToken($token1));
        $this->assertEquals(NULL, UserHelper::getEmailFromToken($token2));
        $this->assertEquals(NULL, UserHelper::getEmailFromToken($token3));
    }
}
