<?php declare(strict_types=1);

namespace NavplanTest\User\RestModel;

use InvalidArgumentException;
use Navplan\User\Rest\Model\LoginRequestConverter;
use PHPUnit\Framework\TestCase;


class LoginRequestConverterTest extends TestCase {
    public function test_toArray_1() {
        $args = array(
            "email" => "asdf@asdf.com",
            "password" => "verysecret",
            "rememberme" => "1"
        );
        $req = LoginRequestConverter::fromArgs($args);

        $this->assertEquals("asdf@asdf.com", $req->email);
        $this->assertEquals("verysecret", $req->password);
        $this->assertEquals(TRUE, $req->rememberMe);
    }


    public function test_toArray_2() {
        $args = array(
            "email" => "asdf@asdf.com",
            "password" => "verysecret",
            "rememberme" => "0"
        );
        $req = LoginRequestConverter::fromArgs($args);

        $this->assertEquals("asdf@asdf.com", $req->email);
        $this->assertEquals("verysecret", $req->password);
        $this->assertEquals(FALSE, $req->rememberMe);
    }


    public function test_toArray_missing_token() {
        $args = array(
            "password" => "verysecret",
            "rememberme" => "1"
        );
        $this->expectException(InvalidArgumentException::class);
        LoginRequestConverter::fromArgs($args);
    }


    public function test_toArray_missing_password() {
        $args = array(
            "email" => "asdf@asdf.com",
            "rememberme" => "1"
        );
        $this->expectException(InvalidArgumentException::class);
        LoginRequestConverter::fromArgs($args);
    }


    public function test_toArray_missing_rememberme() {
        $args = array(
            "email" => "asdf@asdf.com",
            "password" => "verysecret",
        );
        $this->expectException(InvalidArgumentException::class);
        LoginRequestConverter::fromArgs($args);
    }
}
