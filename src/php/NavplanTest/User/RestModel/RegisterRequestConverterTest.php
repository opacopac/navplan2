<?php declare(strict_types=1);

namespace NavplanTest\User\RestModel;

use InvalidArgumentException;
use Navplan\User\RestModel\RegisterRequestConverter;
use PHPUnit\Framework\TestCase;


class RegisterRequestConverterTest extends TestCase {
    public function test_toArray_1() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array(
            "token" => $token,
            "password" => "verysecret",
            "rememberme" => "1"
        );
        $req = RegisterRequestConverter::fromArgs($args);

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
        $req = RegisterRequestConverter::fromArgs($args);

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
        RegisterRequestConverter::fromArgs($args);
    }


    public function test_toArray_missing_password() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array(
            "token" => $token,
            "rememberme" => "1"
        );
        $this->expectException(InvalidArgumentException::class);
        RegisterRequestConverter::fromArgs($args);
    }


    public function test_toArray_missing_rememberme() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array(
            "token" => $token,
            "password" => "verysecret",
        );
        $this->expectException(InvalidArgumentException::class);
        RegisterRequestConverter::fromArgs($args);
    }
}
