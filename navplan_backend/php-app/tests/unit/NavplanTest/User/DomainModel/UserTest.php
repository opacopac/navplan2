<?php declare(strict_types=1);

namespace NavplanTest\User\DomainModel;

use Navplan\User\Domain\Model\User;
use PHPUnit\Framework\TestCase;


class UserTest extends TestCase {
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
}
