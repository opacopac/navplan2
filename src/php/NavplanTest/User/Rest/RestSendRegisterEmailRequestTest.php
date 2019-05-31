<?php declare(strict_types=1);

namespace NavplanTest\User\Rest;

use InvalidArgumentException;
use Navplan\User\Rest\RestSendRegisterEmailRequest;
use PHPUnit\Framework\TestCase;


class RestSendRegisterEmailRequestTest extends TestCase {
    public function test_toArray_1() {
        $args = array("email" => "asdf@asdf.com");
        $req = RestSendRegisterEmailRequest::fromArgs($args);

        $this->assertEquals("asdf@asdf.com", $req->email);
    }


    public function test_toArray_missing_email() {
        $args = array();
        $this->expectException(InvalidArgumentException::class);
        RestSendRegisterEmailRequest::fromArgs($args);
    }
}
