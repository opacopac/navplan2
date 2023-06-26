<?php declare(strict_types=1);

namespace NavplanTest\User\RestModel;

use InvalidArgumentException;
use Navplan\User\Rest\Model\ResetPwRequestConverter;
use PHPUnit\Framework\TestCase;


class ResetPwRequestConverterTest extends TestCase {
    public function test_toArray_1() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array(
            "token" => $token,
            "password" => "verysecret",
            "rememberme" => "1"
        );
        $req = ResetPwRequestConverter::fromArgs($args);

        $this->assertEquals($token, $req->token);
        $this->assertEquals("verysecret", $req->password);
        $this->assertEquals(TRUE, $req->rememberMe);
    }


    public function test_toArray_2() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array(
            "token" => $token,
            "password" => "verysecret",
            "rememberme" => "0"
        );
        $req = ResetPwRequestConverter::fromArgs($args);

        $this->assertEquals($token, $req->token);
        $this->assertEquals("verysecret", $req->password);
        $this->assertEquals(FALSE, $req->rememberMe);
    }


    public function test_toArray_missing_token() {
        $args = array(
            "password" => "verysecret",
            "rememberme" => "1"
        );
        $this->expectException(InvalidArgumentException::class);
        ResetPwRequestConverter::fromArgs($args);
    }


    public function test_toArray_missing_password() {
        $args = array(
            "token" => "1234567890123456789012345678901234567890",
            "rememberme" => "1"
        );
        $this->expectException(InvalidArgumentException::class);
        ResetPwRequestConverter::fromArgs($args);
    }


    public function test_toArray_missing_rememberme() {
        $args = array(
            "token" => "1234567890123456789012345678901234567890",
            "password" => "verysecret",
        );
        $this->expectException(InvalidArgumentException::class);
        ResetPwRequestConverter::fromArgs($args);
    }
}
