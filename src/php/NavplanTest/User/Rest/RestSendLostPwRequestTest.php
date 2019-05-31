<?php declare(strict_types=1);

namespace NavplanTest\User\Rest;

use InvalidArgumentException;
use Navplan\User\Rest\RestSendLostPwRequest;
use PHPUnit\Framework\TestCase;


class RestSendLostPwRequestTest extends TestCase {
    public function test_toArray_1() {
        $args = array("email" => "asdf@asdf.com");
        $req = RestSendLostPwRequest::fromArgs($args);

        $this->assertEquals("asdf@asdf.com", $req->email);
    }


    public function test_toArray_missing_email() {
        $args = array();
        $this->expectException(InvalidArgumentException::class);
        RestSendLostPwRequest::fromArgs($args);
    }
}
