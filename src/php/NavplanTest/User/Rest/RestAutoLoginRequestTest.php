<?php declare(strict_types=1);

namespace NavplanTest\User\Rest;

use InvalidArgumentException;
use Navplan\User\Rest\RestAutoLoginRequest;
use PHPUnit\Framework\TestCase;


class RestAutoLoginRequestTest extends TestCase {
    public function test_toArray_1() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array("token" => $token);
        $req = RestAutoLoginRequest::fromArgs($args);

        $this->assertEquals($token, $req->token);
    }


    public function test_toArray_missing_email() {
        $args = array();
        $this->expectException(InvalidArgumentException::class);
        RestAutoLoginRequest::fromArgs($args);
    }
}
