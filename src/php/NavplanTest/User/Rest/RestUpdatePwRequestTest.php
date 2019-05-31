<?php declare(strict_types=1);

namespace NavplanTest\User\Rest;

use InvalidArgumentException;
use Navplan\User\Rest\RestLoginRequest;
use Navplan\User\Rest\RestUpdatePwRequest;
use PHPUnit\Framework\TestCase;


class RestUpdatePwRequestTest extends TestCase {
    public function test_toArray_1() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array(
            "token" => $token,
            "oldpassword" => "verysecret",
            "newpassword" => "verysecret2"
        );
        $req = RestUpdatePwRequest::fromArgs($args);

        $this->assertEquals($token, $req->token);
        $this->assertEquals("verysecret", $req->oldPassword);
        $this->assertEquals("verysecret2", $req->newPassword);
    }


    public function test_toArray_missing_token() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array(
            "oldpassword" => "verysecret",
            "newpassword" => "verysecret2"
        );
        $this->expectException(InvalidArgumentException::class);
        RestLoginRequest::fromArgs($args);
    }


    public function test_toArray_missing_oldpassword() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array(
            "token" => $token,
            "newpassword" => "verysecret2"
        );
        $this->expectException(InvalidArgumentException::class);
        RestLoginRequest::fromArgs($args);
    }


    public function test_toArray_missing_newpassword() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array(
            "token" => $token,
            "oldpassword" => "verysecret",
        );
        $this->expectException(InvalidArgumentException::class);
        RestLoginRequest::fromArgs($args);
    }
}
