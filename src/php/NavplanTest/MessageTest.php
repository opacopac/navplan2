<?php namespace NavplanTest;

use Navplan\Message;
use PHPUnit\Framework\TestCase;


final class MessageTest extends TestCase
{
    public function testConstructorSetsCodeAndTextCorrectly()
    {
        $message = new Message(123, "test");
        $this->assertEquals(123, $message->code);
        $this->assertEquals("test", $message->text);
    }
}
