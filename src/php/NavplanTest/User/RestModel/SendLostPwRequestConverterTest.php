<?php declare(strict_types=1);

namespace NavplanTest\User\RestModel;

use InvalidArgumentException;
use Navplan\User\RestModel\SendLostPwRequestConverter;
use PHPUnit\Framework\TestCase;


class SendLostPwRequestConverterTest extends TestCase {
    public function test_toArray_1() {
        $args = array("email" => "asdf@asdf.com");
        $req = SendLostPwRequestConverter::fromArgs($args);

        $this->assertEquals("asdf@asdf.com", $req->email);
    }


    public function test_toArray_missing_email() {
        $args = array();
        $this->expectException(InvalidArgumentException::class);
        SendLostPwRequestConverter::fromArgs($args);
    }
}
