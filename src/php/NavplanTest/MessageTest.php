<?php namespace NavplanTest;

use Navplan\Message;
use PHPUnit\Framework\TestCase;


final class MessageTest extends TestCase
{
    public function test_constructor_sets_code_and_text_correctly()
    {
        $message = new Message(123, "test");
        $this->assertEquals(123, $message->code);
        $this->assertEquals("test", $message->text);
    }
}
